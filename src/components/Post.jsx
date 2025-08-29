// // src/components/Post.jsx
// export default function Post({
//   id,
//   titulo = "— sem título —",
//   descricao = "",
//   capa = "",
//   data = "",
//   tipo = "",
//   onOpen, // opcional: callback ao clicar no card/botão
// }) {
//   const handleOpen = (e) => {
//     e.preventDefault();
//     onOpen?.({ id, titulo, descricao, capa, data, tipo });
//   };

//   return (
//     <article className="post-card" data-id={id}>
//       <a
//         href="#"
//         className="post-cover"
//         aria-label={`Abrir post: ${titulo}`}
//         onClick={handleOpen}
//       >
//         {capa ? (
//           <img
//             src={capa}
//             alt=""
//             onError={(e) => (e.currentTarget.style.display = "none")}
//             loading="lazy"
//           />
//         ) : (
//           <div className="post-cover-fallback" aria-hidden="true">
//             IMG
//           </div>
//         )}
//         {tipo && <span className="post-badge">{tipo}</span>}
//       </a>

//       <div className="post-body">
//         <header className="post-header">
//           <h3 className="post-title">{titulo}</h3>
//           <p className="post-meta">{data || "—"}</p>
//         </header>

//         {descricao && <p className="post-desc">{descricao}</p>}

//         <div className="post-actions">
//           <a href="#" className="btn ghost" onClick={handleOpen}>
//             Ver detalhes
//           </a>
//         </div>
//       </div>
//     </article>
//   );
// }

// // src/components/Post.jsx
// import PropTypes from "prop-types";

// export default function Post({ tipo, titulo, descricao, data }) {
//   return (
//     <article className="post-card">
//       <div className="post-body">
//         <header className="post-header">
//           <span className="post-badge">{tipo || "—"}</span>
//           <p className="post-meta">{data || "—"}</p>
//         </header>

//         <h3 className="post-title">{titulo || "— sem título —"}</h3>
//         {descricao && <p className="post-desc">{descricao}</p>}

//         <div className="post-actions">
//           <a href="#" className="btn ghost">
//             Ver detalhes
//           </a>
//         </div>
//       </div>
//     </article>
//   );
// }

// Post.propTypes = {
//   tipo: PropTypes.string,
//   titulo: PropTypes.string,
//   descricao: PropTypes.string,
//   data: PropTypes.string,
// };

// // src/components/Post.jsx
// type PostProps = {
//   tipo?: string;
//   titulo?: string;
//   descricao?: string;
//   data?: string;
//   capa?: string;
//   onOpen?: () => void;
// };

// export default function Post({
//   tipo,
//   titulo,
//   descricao,
//   data,
//   capa,
//   onOpen,
// }: PostProps) {
//   return (
//     <article className="post-card">
//       {/* capa opcional */}
//       {capa && (
//         <a
//           href="#"
//           className="post-cover"
//           onClick={(e) => {
//             e.preventDefault();
//             onOpen?.();
//           }}
//         >
//           <img
//             src={capa}
//             alt=""
//             onError={(e) => (e.currentTarget.style.display = "none")}
//           />
//           {tipo && <span className="post-badge">{tipo}</span>}
//         </a>
//       )}

//       <div className="post-body">
//         <header className="post-header">
//           {/* <span className="post-badge">{tipo || "—"}</span> */}
//           <p className="post-meta">{data || "—"}</p>
//         </header>

//         <h3 className="post-title">{titulo || "— sem título —"}</h3>
//         {descricao && <p className="post-desc">{descricao}</p>}

//         <div className="post-actions">
//           <a
//             href="#"
//             className="btn ghost"
//             onClick={(e) => {
//               e.preventDefault();
//               onOpen?.();
//             }}
//           >
//             Ver detalhes
//             {/* {<span className="post-badge">Ver detalhes</span>} */}
//           </a>
//         </div>
//       </div>
//     </article>
//   );
// }

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
