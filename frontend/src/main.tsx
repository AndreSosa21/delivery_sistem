import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Delivery System</h1>
      </header>

      <main className="main-content">
        <section className="intro">
          <h2>¡Tu comida favorita a un clic!</h2>
          <p>Rápido, seguro y delicioso 🍔🍕🍣</p>
          <button className="order-btn">Hacer Pedido</button>
        </section>

        <section className="menu">
          <h3>Menú Destacado</h3>
          <div className="menu-grid">
            <div className="menu-card">
              <img src="https://via.placeholder.com/150" alt="Hamburguesa" />
              <h4>Hamburguesa</h4>
              <p>$25.000</p>
            </div>
            <div className="menu-card">
              <img src="https://via.placeholder.com/150" alt="Pizza" />
              <h4>Pizza</h4>
              <p>$32.000</p>
            </div>
            <div className="menu-card">
              <img src="https://via.placeholder.com/150" alt="Sushi" />
              <h4>Sushi</h4>
              <p>$40.000</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2025 Delivery System</p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
