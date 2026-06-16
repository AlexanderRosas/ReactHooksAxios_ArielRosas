import { useState } from "react";
import usePosts from "../hooks/usePosts";

function GestorPosts() {
  const {
    posts,
    cargando,
    error,
    agregarPost,
    eliminarPost
  } = usePosts();

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [autor, setAutor] = useState("");

  async function manejarEnvio(evento) {
    evento.preventDefault();
    if (titulo.trim() === "" || contenido.trim() === "" || autor.trim() === "") {
      alert("Debe completar el título, el contenido y el autor.");
      return;
    }
    await agregarPost(titulo, contenido, autor);
    setTitulo("");
    setContenido("");
    setAutor("");
  }

  if (cargando) {
    return (
      <section className="card">
        <p>Cargando publicaciones...</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>Gestor de publicaciones</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={manejarEnvio} className="formulario">
        <label htmlFor="titulo">Título:</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ingrese el título"
        />

        <label htmlFor="autor">Autor:</label>
        <input
            id="autor"
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            placeholder="Ingrese el nombre del autor"
        />

        <label htmlFor="contenido">Contenido:</label>
        <textarea
          id="contenido"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Ingrese el contenido"
          rows="4"
        />

        <button type="submit">Crear publicación</button>
      </form>
      <hr />

      <h3>Publicaciones registradas</h3>
      <p>Total de publicaciones: {posts.length}</p> {/* Código agregado */}

      {posts.length === 0 ? (
        <p>No existen publicaciones.</p>
      ) : (
        <div className="lista-posts">
          {posts.map((post) => (
            <article className="post" key={post.id}>
                <h4>{post.title}</h4>
                {/* MOSTRAMOS EL AUTOR AQUÍ */}
                <p style={{ color: "gray", fontSize: "14px", marginTop: "-10px" }}>
                Autor: {post.authorName || `Usuario ${post.userId}`}
                </p>
                <p>{post.body}</p>
                <button
                className="btn-eliminar"
                onClick={() => {
                    const confirmar = confirm("¿Está seguro de eliminar esta publicación?");
                
                    if (confirmar) {
                    eliminarPost(post.id);
                    }
                }}
                >
                Eliminar
                </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default GestorPosts;
