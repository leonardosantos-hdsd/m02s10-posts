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
