import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./principal.css";

import Orders from "./Orders/Orders";
import Products from "./Products/Products";
import Users from "./Users/Users";
import Reports from "./Reports/Reports";

function AdminHome() {
  return (
    <div className="admin-home">
      <h1>Panel de Administración</h1>
      <p>Gestiona tu sistema de delivery de manera rápida y sencilla.</p>

      <div className="admin-buttons">
        <Link to="/orders" className="admin-btn">📦 Pedidos</Link>
        <Link to="/products" className="admin-btn">🍔 Productos</Link>
        <Link to="/users" className="admin-btn">👥 Usuarios</Link>
        <Link to="/reports" className="admin-btn">📊 Reportes</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/users" element={<Users />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
