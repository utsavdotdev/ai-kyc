import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Context from "./config/Context";

const clientid = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientid}>
    <BrowserRouter>
      <Context>
        <App />
      </Context>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
