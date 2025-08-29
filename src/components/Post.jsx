// src/components/Post.jsx
export default function Post({
  id,
  tipo,
  titulo,
  descricao,
  data,
  capa,
  onOpen,
  handleDelete, // <- nova prop
}) {
  const onClickOpen = (e) => {
    e.preventDefault();
    onOpen?.(id);
  };

  const onClickDelete = (e) => {
    e.preventDefault();
    handleDelete?.(id);
  };

  return (
    <article className="post-card" data-id={id}>
      {/* Capa opcional */}
      {capa && (
        <a href="#" className="post-cover" onClick={onClickOpen}>
          <img
            src={capa}
            alt=""
            onError={(e) => (e.currentTarget.style.display = "none")}
            loading="lazy"
          />
          {tipo && <span className="post-badge">{tipo}</span>}
        </a>
      )}

      <div className="post-body">
        <header className="post-header">
          {!capa && tipo && <span className="post-badge">{tipo}</span>}
          <p className="post-meta">{data || "—"}</p>
        </header>

        <h3 className="post-title">{titulo || "— sem título —"}</h3>
        {descricao && <p className="post-desc">{descricao}</p>}

        <div className="post-actions">
          <a href="#" className="btn ghost" onClick={onClickOpen}>
            Ver detalhes
          </a>
          <a href="#" className="btn danger" onClick={onClickDelete}>
            Excluir
          </a>
        </div>
      </div>
    </article>
  );
}
