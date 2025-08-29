// // src/components/PostsList.jsx

// import { useEffect, useState } from "react";
// import Post from "./Post.jsx";

// function loadPosts() {
//   const rawA = localStorage.getItem("posts");
//   if (rawA) {
//     try {
//       const arr = JSON.parse(rawA);
//       return Array.isArray(arr)
//         ? arr.map((p) => ({
//             id: p.id ?? cryptoRandom(),
//             titulo: p.titulo ?? "",
//             descricao: p.descricao ?? "",
//             capa: p.capa ?? "",
//             data: p.data ?? "",
//             tipo: p.tipo ?? "",
//           }))
//         : [];
//     } catch {
//       /* noop */
//     }
//   }

//   const rawB = localStorage.getItem("m02s10_posts");
//   if (rawB) {
//     try {
//       const arr = JSON.parse(rawB);
//       return Array.isArray(arr)
//         ? arr.map((p) => ({
//             id: p.id ?? cryptoRandom(),
//             titulo: p.titulo ?? "",
//             descricao: p.descricao ?? "",
//             capa: p.imagemUrl ?? "",
//             data: p.dataPublicacao ?? "",
//             tipo: p.categoria ?? "",
//           }))
//         : [];
//     } catch {
//       /* noop */
//     }
//   }

//   return [];
// }

// function cryptoRandom() {
//   return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
// }

// export default function PostsList() {
//   const [posts, setPosts] = useState(() => loadPosts());

//   // Atualiza quando mudar em outra aba
//   useEffect(() => {
//     function onStorage(e) {
//       if (e.key === "posts" || e.key === "m02s10_posts") {
//         setPosts(loadPosts());
//       }
//     }
//     window.addEventListener("storage", onStorage);
//     return () => window.removeEventListener("storage", onStorage);
//   }, []);

//   // Atualiza quando a aba volta ao foco (pega mudanças da própria app/rota anterior)
//   useEffect(() => {
//     function onFocus() {
//       setPosts(loadPosts());
//     }
//     window.addEventListener("focus", onFocus);
//     return () => window.removeEventListener("focus", onFocus);
//   }, []);

//   return (
//     <main className="page">
//       <div className="saved">
//         <div className="saved-head">
//           <h2>Posts</h2>
//           <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//             <span className="muted">Total: {posts.length}</span>
//             <button className="btn ghost" onClick={() => setPosts(loadPosts())}>
//               Atualizar
//             </button>
//           </div>
//         </div>

//         {posts.length === 0 ? (
//           <p className="muted" style={{ marginTop: 12 }}>
//             Nenhum post encontrado no navegador.
//           </p>
//         ) : (
//           //   <ul className="saved-list">
//           //     {posts.map((p) => (
//           //       <li key={p.id} className="saved-item">
//           //         <div className="saved-cover" aria-hidden="true">
//           //           {p.capa ? (
//           //             <img
//           //               src={p.capa}
//           //               alt=""
//           //               onError={(e) => {
//           //                 e.currentTarget.style.display = "none";
//           //               }}
//           //             />
//           //           ) : null}
//           //         </div>

//           //         <div>
//           //           <h3 className="saved-title">{p.titulo}</h3>
//           //           <p className="saved-meta">
//           //             {p.tipo || "—"} • {p.data || "—"}
//           //           </p>
//           //           <p className="saved-desc">{p.descricao}</p>
//           //         </div>

//           //         <div className="saved-actions">
//           //           <a className="btn ghost" href="#">
//           //             Ver detalhes
//           //           </a>
//           //         </div>
//           //       </li>
//           //     ))}
//           //   </ul>

//           <ul className="saved-list">
//             {/* {posts.map((p) => (
//               <li
//                 key={p.id}
//                 className="saved-item"
//                 style={{
//                   padding: 0,
//                   border: "none",
//                   background: "transparent",
//                 }}
//               >
//                 <Post
//                   id={p.id}
//                   titulo={p.titulo}
//                   descricao={p.descricao}
//                   capa={p.capa}
//                   data={p.data}
//                   tipo={p.tipo}
//                   onOpen={() => console.log("abrir post", p.id)}
//                 />
//               </li>
//             ))} */}
//             {posts.map((p) => (
//               <Post
//                 key={p.id}
//                 tipo={p.tipo}
//                 titulo={p.titulo}
//                 descricao={p.descricao}
//                 data={p.data}
//               />
//             ))}
//           </ul>
//         )}
//       </div>
//     </main>
//   );
// }

// // src/components/PostsList.jsx
// import { useEffect, useState } from "react";
// import Post from "./Post.jsx";

// const KEYS = ["posts", "m02s10_posts", "m02s10_posts"];

// function cryptoRandom() {
//   return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
// }

// function readAny() {
//   for (const key of KEYS) {
//     const raw = localStorage.getItem(key);
//     if (!raw) continue;
//     try {
//       const arr = JSON.parse(raw);
//       if (Array.isArray(arr)) return arr;
//     } catch {
//       /* ignore */
//     }
//   }
//   return [];
// }

// function normalize(list) {
//   return list.map((p, i) => ({
//     id: p.id ?? `${cryptoRandom()}-${i}`,
//     titulo: p.titulo ?? "",
//     descricao: p.descricao ?? "",
//     tipo: p.tipo ?? p.categoria ?? "", // M02S10 vs M02S09
//     data: p.data ?? p.dataPublicacao ?? "", // M02S10 vs M02S09
//     // capa: p.capa ?? p.imagemUrl ?? "",            // se quiser usar capa depois
//   }));
// }

// export default function PostsList() {
//   const [posts, setPosts] = useState(() => normalize(readAny()));

//   // Recarrega ao abrir/voltar o foco
//   useEffect(() => {
//     function onFocus() {
//       setPosts(normalize(readAny()));
//     }
//     window.addEventListener("focus", onFocus);
//     return () => window.removeEventListener("focus", onFocus);
//   }, []);

//   // Reage a mudanças do localStorage (outra aba)
//   useEffect(() => {
//     function onStorage(e) {
//       if (e.key && KEYS.includes(e.key)) {
//         setPosts(normalize(readAny()));
//       }
//     }
//     window.addEventListener("storage", onStorage);
//     return () => window.removeEventListener("storage", onStorage);
//   }, []);

//   return (
//     <main className="page">
//       <div className="saved">
//         <div className="saved-head">
//           <h2>Posts</h2>
//           <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//             <span className="muted">Total: {posts.length}</span>
//             <button
//               className="btn ghost"
//               onClick={() => setPosts(normalize(readAny()))}
//             >
//               Atualizar
//             </button>
//           </div>
//         </div>

//         {posts.length === 0 ? (
//           <p className="muted" style={{ marginTop: 12 }}>
//             Nenhum post encontrado no navegador.
//           </p>
//         ) : (
//           <ul className="saved-list">
//             {posts.map((p) => (
//               <li
//                 key={p.id}
//                 className="saved-item"
//                 style={{
//                   padding: 0,
//                   border: "none",
//                   background: "transparent",
//                 }}
//               >
//                 <Post
//                   tipo={p.tipo}
//                   titulo={p.titulo}
//                   descricao={p.descricao}
//                   data={p.data}
//                 />
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </main>
//   );
// }

// //
// // ["posts","m02s10_posts","m02s10_posts"].reduce((acc,k)=> (acc[k]=localStorage.getItem(k), acc), {})

// // src/components/PostsList.jsx
// import { useEffect, useState } from "react";
// import Post from "./Post.jsx";

// // const STORAGE_KEYS = ["posts", "m02s10_posts"]; // tenta as duas

// // function loadRaw() {
// //   for (const k of STORAGE_KEYS) {
// //     const raw = localStorage.getItem(k);
// //     if (!raw) continue;
// //     try {
// //       const arr = JSON.parse(raw);
// //       if (Array.isArray(arr)) return arr;
// //     } catch {
// //       // ignore parsing errors
// //     }
// //   }
// //   return [];
// // }

// // function loadFromStorage() {
// //   const raw = localStorage.getItem("posts");
// //   if (!raw) return [];
// //   try {
// //     const arr = JSON.parse(raw);
// //     if (Array.isArray(arr)) return arr;
// //   } catch {
// //     // ignore parsing errors
// //   }
// //   return [];
// // }

// const POSTS_CHANGED = "posts:changed";

// function loadFromStorage() {
//   // tente nas duas chaves:
//   const a = localStorage.getItem("posts");
//   const b = localStorage.getItem("m02s10_posts");
//   const raw = a ?? b ?? "[]";
//   try {
//     return JSON.parse(raw);
//   } catch {
//     return [];
//   }
// }

// type PostRaw = {
//   id?: string;
//   tipo?: string;
//   categoria?: string;
//   titulo?: string;
//   descricao?: string;
//   data?: string;
//   dataPublicacao?: string;
//   capa?: string;
//   imagemUrl?: string;
// };

// function normalize(arr: PostRaw[]) {
//   return arr.map((p, i) => ({
//     id: p.id ?? `${Date.now()}-${i}`,
//     tipo: p.tipo ?? p.categoria ?? "", // M02S10 vs M02S09
//     titulo: p.titulo ?? "",
//     descricao: p.descricao ?? "",
//     data: p.data ?? p.dataPublicacao ?? "", // M02S10 vs M02S09
//     capa: p.capa ?? p.imagemUrl ?? "",
//   }));
// }

// export default function PostsList() {
//   // const [posts, setPosts] = useState(() => normalize(loadRaw()));
//   // useEffect(() => {
//   //   setPosts(normalize(loadRaw()));
//   // }, []);

//   // const [posts, setPosts] = useState(() => normalize(loadFromStorage()));
//   // useEffect(() => {
//   //   setPosts(normalize(loadFromStorage()));
//   // }, []);

//   // // Atualiza quando o App avisar que houve mudança
//   // useEffect(() => {
//   //   const refresh = () => setPosts(normalize(loadFromStorage()));
//   //   window.addEventListener("posts:changed", refresh);
//   //   window.addEventListener("focus", refresh); // volta ao foco
//   //   window.addEventListener("storage", refresh); // outra aba
//   //   return () => {
//   //     window.removeEventListener("posts:changed", refresh);
//   //     window.removeEventListener("focus", refresh);
//   //     window.removeEventListener("storage", refresh);
//   //   };
//   // }, []);

//   const [posts, setPosts] = useState(() => normalize(loadFromStorage()));

//   useEffect(() => {
//     const refresh = () => setPosts(normalize(loadFromStorage()));

//     // 1) atualiza ao montar
//     refresh();

//     // 2) muda em OUTRAS abas (evento nativo)
//     const onStorage = (onS) => {
//       if (onS.key === "posts" || onS.key === "m02s10_posts") refresh();
//     };
//     window.addEventListener("storage", onStorage);

//     // 3) muda na MESMA aba (evento customizado)
//     window.addEventListener(POSTS_CHANGED, refresh);

//     return () => {
//       window.removeEventListener("storage", onStorage);
//       window.removeEventListener(POSTS_CHANGED, refresh);
//     };
//   }, []);

//   return (
//     <main className="page">
//       <div className="saved">
//         <div className="saved-head">
//           <h2>Posts</h2>
//           <span className="muted">Total: {posts.length}</span>
//         </div>

//         {posts.length === 0 ? (
//           <p className="muted" style={{ marginTop: 12 }}>
//             Nenhum post encontrado.
//           </p>
//         ) : (
//           <ul className="saved-list">
//             {posts.map((p) => (
//               <li
//                 key={p.id}
//                 className="saved-item"
//                 style={{
//                   padding: 0,
//                   border: "none",
//                   background: "transparent",
//                 }}
//               >
//                 <Post
//                   tipo={p.tipo}
//                   titulo={p.titulo}
//                   descricao={p.descricao}
//                   data={p.data}
//                   capa={p.capa}
//                   onOpen={() => console.log("abrir post", p.id)}
//                 />
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </main>
//   );
// }

// // src/components/PostsList.jsx
// import { useEffect, useState } from "react";
// import Post from "./Post.jsx";

// const STORAGE_KEYS = ["posts", "m02s09_posts"];
// const POSTS_CHANGED = "posts:changed";

// /* Lê do localStorage e informa de qual chave veio */
// function loadFromStorage() {
//   for (const key of STORAGE_KEYS) {
//     const raw = localStorage.getItem(key);
//     if (!raw) continue;
//     try {
//       const arr = JSON.parse(raw);
//       if (Array.isArray(arr)) return { arr, key };
//     } catch {
//       /* ignore */
//     }
//   }
//   return { arr: [], key: "posts" };
// }

// /* Normaliza campos e mantém o índice original para fallback de remoção */
// function normalize(arr) {
//   return arr.map((p, i) => ({
//     __idx: i, // índice no array original
//     id: p.id ?? `idx-${i}`, // se não tiver id, ainda conseguimos excluir por índice
//     tipo: p.tipo ?? p.categoria ?? "",
//     titulo: p.titulo ?? "",
//     descricao: p.descricao ?? "",
//     data: p.data ?? p.dataPublicacao ?? "",
//     capa: p.capa ?? p.imagemUrl ?? "",
//   }));
// }

// export default function PostsList() {
//   const initial = loadFromStorage();
//   const [storageKey, setStorageKey] = useState(initial.key);
//   const [posts, setPosts] = useState(() => normalize(initial.arr));

//   const refresh = () => {
//     const { arr, key } = loadFromStorage();
//     setStorageKey(key);
//     setPosts(normalize(arr));
//   };

//   useEffect(() => {
//     // monta
//     refresh();

//     // muda em OUTRAS abas (evento nativo)
//     const onStorage = (e) => {
//       if (STORAGE_KEYS.includes(e.key)) refresh();
//     };
//     window.addEventListener("storage", onStorage);

//     // muda na MESMA aba (evento customizado disparado pelo App ao salvar)
//     const onChanged = () => refresh();
//     window.addEventListener(POSTS_CHANGED, onChanged);

//     // ao voltar o foco (ex.: navegou e voltou)
//     const onFocus = () => refresh();
//     window.addEventListener("focus", onFocus);

//     return () => {
//       window.removeEventListener("storage", onStorage);
//       window.removeEventListener(POSTS_CHANGED, onChanged);
//       window.removeEventListener("focus", onFocus);
//     };
//   }, []);

//   /* ===== EXCLUIR ===== */
//   function handleDelete(id, idx) {
//     try {
//       const raw = localStorage.getItem(storageKey) || "[]";
//       const arr = JSON.parse(raw);

//       // tenta excluir por id; se não existir id no storage, cai no índice
//       let next = Array.isArray(arr)
//         ? arr.filter((p, i) =>
//             p?.id != null ? String(p.id) !== String(id) : i !== idx
//           )
//         : [];

//       localStorage.setItem(storageKey, JSON.stringify(next));
//       setPosts(normalize(next)); // atualiza a lista na tela imediatamente

//       // avisa outras partes da app (ex.: contador no App)
//       window.dispatchEvent(
//         new CustomEvent(POSTS_CHANGED, { detail: { total: next.length } })
//       );
//     } catch (err) {
//       console.error("Falha ao excluir post:", err);
//     }
//   }

//   return (
//     <main className="page">
//       <div className="saved">
//         <div className="saved-head">
//           <h2>Posts</h2>
//           <span className="muted">Total: {posts.length}</span>
//         </div>

//         {posts.length === 0 ? (
//           <p className="muted" style={{ marginTop: 12 }}>
//             Nenhum post encontrado no navegador.
//           </p>
//         ) : (
//           <ul className="saved-list">
//             {posts.map((p) => (
//               <li
//                 key={`${p.id}-${p.__idx}`}
//                 className="saved-item"
//                 style={{
//                   padding: 0,
//                   border: "none",
//                   background: "transparent",
//                 }}
//               >
//                 <Post
//                   id={p.id}
//                   tipo={p.tipo}
//                   titulo={p.titulo}
//                   descricao={p.descricao}
//                   data={p.data}
//                   capa={p.capa}
//                   onOpen={() => console.log("abrir post", p.id)}
//                   handleDelete={() => handleDelete(p.id, p.__idx)} // <- passa id + índice
//                 />
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </main>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import Post from "./Post.jsx";

const STORAGE_KEYS = ["posts", "m02s09_posts"];
const POSTS_CHANGED = "posts:changed";

/* Lê do localStorage e informa de qual chave veio */
function loadFromStorage() {
  for (const key of STORAGE_KEYS) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    try {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return { arr, key };
    } catch {}
  }
  return { arr: [], key: "posts" };
}

/* Normaliza campos e mantém o índice original (fallback de remoção) */
function normalize(arr) {
  return arr.map((p, i) => ({
    __idx: i,
    id: p.id ?? `idx-${i}`,
    tipo: p.tipo ?? p.categoria ?? "",
    titulo: p.titulo ?? "",
    descricao: p.descricao ?? "",
    data: p.data ?? p.dataPublicacao ?? "",
    capa: p.capa ?? p.imagemUrl ?? "",
  }));
}

export default function PostsList() {
  const initial = loadFromStorage();
  const [storageKey, setStorageKey] = useState(initial.key);
  const [posts, setPosts] = useState(() => normalize(initial.arr));

  const refresh = () => {
    const { arr, key } = loadFromStorage();
    setStorageKey(key);
    setPosts(normalize(arr));
  };

  useEffect(() => {
    refresh();

    const onStorage = (e) => {
      if (STORAGE_KEYS.includes(e.key)) refresh();
    };
    const onChanged = () => refresh();
    const onFocus = () => refresh();

    window.addEventListener("storage", onStorage);
    window.addEventListener(POSTS_CHANGED, onChanged);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(POSTS_CHANGED, onChanged);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  /* ===== contador por categoria ===== */
  const counts = useMemo(() => {
    const map = new Map();
    for (const p of posts) {
      const k = (p.tipo || "Outros").trim() || "Outros";
      map.set(k, (map.get(k) || 0) + 1);
    }
    return Array.from(map.entries()).sort((a, b) =>
      a[0].localeCompare(b[0], "pt-BR")
    ); // [ [categoria, total], ... ]
  }, [posts]);

  /* ===== EXCLUIR ===== */
  function handleDelete(id, idx) {
    try {
      const raw = localStorage.getItem(storageKey) || "[]";
      const arr = JSON.parse(raw);
      const next = Array.isArray(arr)
        ? arr.filter((p, i) =>
            p?.id != null ? String(p.id) !== String(id) : i !== idx
          )
        : [];
      localStorage.setItem(storageKey, JSON.stringify(next));
      setPosts(normalize(next));
      window.dispatchEvent(
        new CustomEvent(POSTS_CHANGED, { detail: { total: next.length } })
      );
    } catch (err) {
      console.error("Falha ao excluir post:", err);
    }
  }

  return (
    <main className="page">
      <div className="saved">
        <div className="saved-head">
          <h2>Posts</h2>
          <span className="muted">Total: {posts.length}</span>
        </div>

        {/* ===== contador por categoria (acima da lista) ===== */}
        {counts.length > 0 && (
          <div className="countbar" aria-label="Contagem por categoria">
            {counts.map(([label, n]) => (
              <span key={label} className="count-pill">
                <strong>{label}</strong>
                <span className="count-dot" />
                {n}
              </span>
            ))}
          </div>
        )}

        {posts.length === 0 ? (
          <p className="muted" style={{ marginTop: 12 }}>
            Nenhum post encontrado no navegador.
          </p>
        ) : (
          <ul className="saved-list">
            {posts.map((p) => (
              <li
                key={`${p.id}-${p.__idx}`}
                className="saved-item"
                style={{
                  padding: 0,
                  border: "none",
                  background: "transparent",
                }}
              >
                <Post
                  id={p.id}
                  tipo={p.tipo}
                  titulo={p.titulo}
                  descricao={p.descricao}
                  data={p.data}
                  capa={p.capa}
                  onOpen={() => console.log("abrir post", p.id)}
                  handleDelete={() => handleDelete(p.id, p.__idx)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
