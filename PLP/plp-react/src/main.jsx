import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles.css";
import App from './App.jsx'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer position="top-right" autoclose={2000} />
  </StrictMode>,
)
