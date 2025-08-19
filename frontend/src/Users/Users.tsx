import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css"; // 👈 importa estilos

interface User {
  id: number;
  name: string;
  email: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<User[]>("http://localhost:3000/users") // backend
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error al cargar usuarios");
        setLoading(false);
      });
  }, []);

  return (
    <div className="page">
      {/* Header de navegación */}
      <header className="header">
        <h1 className="logo">Delivery System</h1>
        <nav>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/users">Usuarios</a></li>
            <li><a href="/orders">Pedidos</a></li>
            <li><a href="/restaurants">Restaurantes</a></li>
          </ul>
        </nav>
      </header>

      {/* Contenido principal */}
      <main>
        <h2>Lista de Usuarios</h2>

        {loading && <p>Cargando usuarios...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default Users;
