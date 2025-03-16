import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { ToastProvider } from "./ToastProvider.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>
)
