// // src/main.jsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// import PostsList from "./components/PostsList.jsx";
// import "./index.css";

// // Semente inicial de posts no localStorage, se vazio
// (function seedIfEmpty() {
//   try {
//     const current = JSON.parse(localStorage.getItem("posts") || "[]");
//     if (Array.isArray(current) && current.length > 0) return;

//     const posts = [
//       {
//         id: 1,
//         titulo: "Inteligência Artificial no Dia a Dia",
//         descricao:
//           "Como a IA está revolucionando serviços e impactando decisões em empresas e governos.",
//         capa: "https://totalip.com.br/wp-content/uploads/2023/08/A-tecnologia-impulsiona-o-futuro-do-Brasil.png",
//         data: "2025-07-15",
//         tipo: "Artigo",
//       },
//       {
//         id: 2,
//         titulo: "5 Tendências Tech para 2026",
//         descricao:
//           "De computação quântica ao metaverso corporativo, conheça o que vem por aí.",
//         capa: "https://totalip.com.br/wp-content/uploads/2023/08/A-tecnologia-impulsiona-o-futuro-do-Brasil.png",
//         data: "2025-07-10",
//         tipo: "Notícia",
//       },
//     ];
//     localStorage.setItem("posts", JSON.stringify(posts));
//   } catch {
//     // ignora erros de parse
//   }
// })();

// const rootElement = document.getElementById("root");
// if (rootElement) {
//   ReactDOM.createRoot(rootElement).render(
//     <React.StrictMode>
//       <PostsList />
//     </React.StrictMode>
//   );
// }

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.tsx";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import PostsList from "./components/PostsList.jsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <PostsList />
  </StrictMode>
);
