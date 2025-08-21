import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import "./principal.css";

import Orders from "./Orders/Orders";
import Products from "./Products/Products";
import Users from "./Users/Users";
import Reports from "./Reports/Reports";

// Layout que se mantiene en todas las páginas
function Layout() {
  return (
    <div className="admin-layout">
      <header className="admin-header">
        <h1>Panel de Administración</h1>
        <nav className="admin-buttons">
          <Link to="/" className="admin-btn">🏠 Inicio</Link>
          <Link to="/orders" className="admin-btn">📦 Pedidos</Link>
          <Link to="/products" className="admin-btn">🍔 Productos</Link>
          <Link to="/users" className="admin-btn">👥 Usuarios</Link>
          <Link to="/reports" className="admin-btn">📊 Reportes</Link>
        </nav>
      </header>

      <main className="admin-content">
        <Outlet /> {/* Aquí se cargan las páginas */}
      </main>
    </div>
  );
}

function AdminHome() {
  return (
    <div className="admin-home">
      <h2>Bienvenido 👋</h2>
      <p>Gestiona tu sistema de delivery de manera rápida y sencilla.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/delivery">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AdminHome />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
