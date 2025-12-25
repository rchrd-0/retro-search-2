import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TanstackQueryProvider } from "@/integrations/tanstack-query/root-provider";
import App from "./App.tsx";

// biome-ignore lint/style/noNonNullAssertion: entry point, guaranteed
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackQueryProvider>
      <App />
    </TanstackQueryProvider>
  </StrictMode>,
);
