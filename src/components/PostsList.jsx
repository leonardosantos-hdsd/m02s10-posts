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
