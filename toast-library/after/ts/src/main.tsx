import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ToastProvider } from "./ToastProvider"
import "./styles.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>
)
