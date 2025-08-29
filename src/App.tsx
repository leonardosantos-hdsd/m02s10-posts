// src/App.tsx
import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* =======================
   Regras / helpers
======================= */
const httpRegex = /^https?:\/\//i;

const startOfToday = (() => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
})();

const strToDate = (s: string) => {
  // "YYYY-MM-DD" -> Date local sem hora
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
};

const POSTS_CHANGED = "posts:changed";

/* =======================
   Tipos e LocalStorage
======================= */
type Post = {
  id: string;
  titulo: string;
  descricao: string;
  imagemUrl: string;
  categoria: string;
  dataPublicacao: string; // yyyy-mm-dd
  createdAt: string; // ISO
};

const STORAGE_KEY = "m02s10_posts";

function readPosts(): Post[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Post[]) : [];
  } catch {
    return [];
  }
}
function writePosts(posts: Post[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}
function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/* =======================
   Validação
======================= */
type Errors = {
  titulo?: string;
  descricao?: string;
  imagemUrl?: string;
  categoria?: string;
  dataPublicacao?: string;
};

function validateOne(name: keyof Errors, value: string): string | undefined {
  switch (name) {
    case "titulo":
      return value.trim() ? undefined : "Informe um título.";
    case "descricao":
      return value.trim() ? undefined : "Informe uma descrição.";
    case "imagemUrl":
      if (!value.trim()) return "Cole a URL da imagem de capa.";
      if (!httpRegex.test(value))
        return "A URL deve começar com http:// ou https://";
      return undefined;
    case "categoria":
      return value ? undefined : "Selecione uma categoria.";
    case "dataPublicacao": {
      if (!value) return "Escolha uma data de publicação.";
      const d = strToDate(value);
      if (isNaN(+d)) return "Data inválida.";
      if (d < startOfToday) return "Use hoje ou uma data futura.";
      return undefined;
    }
    default:
      return undefined;
  }
}

export default function App() {
  /* Campos do formulário */
  const [titulo, setTitulo] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [imagemUrl, setImagemUrl] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");
  const [dataPublicacao, setDataPublicacao] = useState<string>("");

  /* Erros dos campos */
  const [errors, setErrors] = useState<Errors>({});

  /* Contador de posts no localStorage (inicia lendo do storage) */
  const [totalPosts, setTotalPosts] = useState<number>(
    () => readPosts().length
  );

  /* Reage a mudanças de localStorage vindas de OUTRAS abas */
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) {
        try {
          setTotalPosts(JSON.parse(e.newValue || "[]").length);
        } catch {
          setTotalPosts(0);
        }
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  function validateAll(): Errors {
    const e: Errors = {};
    e.titulo = validateOne("titulo", titulo);
    e.descricao = validateOne("descricao", descricao);
    e.imagemUrl = validateOne("imagemUrl", imagemUrl);
    e.categoria = validateOne("categoria", categoria);
    e.dataPublicacao = validateOne("dataPublicacao", dataPublicacao);

    // remove chaves undefined para facilitar o Object.keys
    Object.keys(e).forEach(
      (k) =>
        (e as Errors)[k as keyof Errors] === undefined &&
        delete (e as Errors)[k as keyof Errors]
    );
    return e;
  }

  function onBlur(name: keyof Errors, value: string) {
    setErrors((prev) => ({ ...prev, [name]: validateOne(name, value) }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const ve = validateAll();
    setErrors(ve);

    if (Object.keys(ve).length) {
      toast.error("Corrija os campos destacados.");
      return;
    }

    // Monta o post e salva no localStorage
    const novo: Post = {
      id: uid(),
      titulo,
      descricao,
      imagemUrl,
      categoria,
      dataPublicacao,
      createdAt: new Date().toISOString(),
    };

    const atual = readPosts();
    const atualizado = [...atual, novo];
    writePosts(atualizado);
    setTotalPosts(atualizado.length); // atualiza contador imediatamente

    // window.dispatchEvent(new Event("posts:changed"));
    window.dispatchEvent(
      new CustomEvent(POSTS_CHANGED, { detail: { total: atualizado.length } })
    );

    toast.success("Post salvo no navegador (localStorage)!");

    // Limpa o formulário (opcional)
    setTitulo("");
    setDescricao("");
    setImagemUrl("");
    setCategoria("");
    setDataPublicacao("");
    setErrors({});
  }

  const capaValida = httpRegex.test(imagemUrl);

  return (
    <main className="page">
      <h1>Criar Post</h1>
      <p className="muted" aria-live="polite">
        Total de posts: {totalPosts}
      </p>

      <form className="form" onSubmit={handleSubmit} noValidate>
        {/* Título */}
        <div className="field">
          <label htmlFor="titulo">Título do post</label>
          <input
            id="titulo"
            name="titulo"
            type="text"
            placeholder="Ex.: Energia Solar no meu condomínio"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            onBlur={(e) => onBlur("titulo", e.target.value)}
            aria-invalid={!!errors.titulo}
            className={errors.titulo ? "error" : undefined}
            required
          />
          {errors.titulo && (
            <small className="error-msg">{errors.titulo}</small>
          )}
        </div>

        {/* Descrição */}
        <div className="field">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            rows={6}
            placeholder="Escreva um resumo do conteúdo do seu post…"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            onBlur={(e) => onBlur("descricao", e.target.value)}
            aria-invalid={!!errors.descricao}
            className={errors.descricao ? "error" : undefined}
            required
          />
          {errors.descricao && (
            <small className="error-msg">{errors.descricao}</small>
          )}
        </div>

        {/* URL da capa */}
        <div className="field">
          <label htmlFor="imagemUrl">URL da imagem de capa</label>
          <input
            id="imagemUrl"
            name="imagemUrl"
            type="url"
            inputMode="url"
            placeholder="https://exemplo.com/imagem.jpg"
            value={imagemUrl}
            onChange={(e) => setImagemUrl(e.target.value)}
            onBlur={(e) => onBlur("imagemUrl", e.target.value)}
            aria-invalid={errors.imagemUrl ? "true" : "false"}
            className={errors.imagemUrl ? "error" : undefined}
            required
          />
          {errors.imagemUrl && (
            <small className="error-msg">{errors.imagemUrl}</small>
          )}
        </div>

        {/* Data de publicação */}
        <div className="field">
          <label htmlFor="dataPublicacao">Data de publicação</label>
          <input
            id="dataPublicacao"
            name="dataPublicacao"
            type="date"
            value={dataPublicacao}
            onChange={(e) => setDataPublicacao(e.target.value)}
            onBlur={(e) => onBlur("dataPublicacao", e.target.value)}
            aria-invalid={!!errors.dataPublicacao}
            className={errors.dataPublicacao ? "error" : undefined}
            required
          />
          {errors.dataPublicacao && (
            <small className="error-msg">{errors.dataPublicacao}</small>
          )}
        </div>

        {/* Categoria */}
        <div className="field">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            name="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            onBlur={(e) => onBlur("categoria", e.target.value)}
            aria-invalid={!!errors.categoria}
            className={errors.categoria ? "error" : undefined}
            required
          >
            <option value="">Selecione...</option>
            <option value="Artigo">Artigo</option>
            <option value="Notícia">Notícia</option>
            <option value="Tutorial">Tutorial</option>
            <option value="Entrevista">Entrevista</option>
          </select>
          {errors.categoria && (
            <small className="error-msg">{errors.categoria}</small>
          )}
        </div>

        <div className="actions">
          <button type="submit">Salvar rascunho</button>
        </div>
      </form>

      {/* Pré-visualização */}
      <section className="preview" aria-live="polite">
        <h2>Preview</h2>

        {capaValida && (
          <img
            className="preview-cover"
            src={imagemUrl}
            alt="Capa do post"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        )}

        <h3>{titulo || "— sem título —"}</h3>
        <p>{descricao || "— sem descrição —"}</p>
        {categoria && (
          <p>
            <strong>Categoria:</strong> {categoria}
          </p>
        )}
        {dataPublicacao && (
          <p className="muted">Publicação: {dataPublicacao}</p>
        )}
      </section>

      <ToastContainer position="top-right" theme="dark" />
    </main>
  );
}
