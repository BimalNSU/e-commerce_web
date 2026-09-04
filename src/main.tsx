import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "antd";
import "./shared/socket/socket.init";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/api/query-client";
import "./style.css";
import ThemeProvider from "./app/ThemeProvider";
import AppRoutes from "./app/routes";
import AuthSessionManager from "./modules/auth/AuthSessionManager";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <App>
            <AuthSessionManager />
            <AppRoutes />
          </App>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
