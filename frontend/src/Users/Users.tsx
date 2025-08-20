import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  address: string;
}

const UserTable: React.FC<{
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}> = ({ users, onEdit, onDelete }) => {
  return (
    <table className="users-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.username}</td>
            <td>{u.email}</td>
            <td>{u.phone}</td>
            <td>{u.address}</td>
            <td>
              <button className="btn edit" onClick={() => onEdit(u)}>Editar</button>
              <button className="btn delete" onClick={() => onDelete(u.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({ username: "", email: "", phone: "", address: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get<User[]>("http://localhost:3000/api/users");
      setUsers(res.data);
    } catch (err) {
      setError("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.phone || !form.address) {
      return alert("Todos los campos son obligatorios");
    }

    try {
      if (editingId) {
        await axios.put('http://localhost:3000/api/users/${editingId}', form);
      } else {
        await axios.post("http://localhost:3000/api/users", form);
      }
      setForm({ username: "", email: "", phone: "", address: "" });
      setEditingId(null);
      fetchUsers();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error al guardar usuario");
    }
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setForm({ username: user.username, email: user.email, phone: user.phone, address: user.address });
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;
    try {
      await axios.delete('http://localhost:3000/api/users/${id}');
      fetchUsers();
    } catch {
      alert("No se pudo eliminar el usuario");
    }
  };

  return (
    <div className="page">
      {/* Header */}
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

      <main>
        <h2>Usuarios</h2>

        {/* Formulario */}
        <div className="form-container">
          <input placeholder="Nombre" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
          <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Teléfono" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          <input placeholder="Dirección" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          <button onClick={handleSubmit} className="btn submit">{editingId ? "Actualizar" : "Agregar"}</button>
          {editingId && (
            <button onClick={() => { setEditingId(null); setForm({ username: "", email: "", phone: "", address: "" }); }} className="btn cancel">Cancelar</button>
          )}
        </div>

        {loading && <p>Cargando usuarios...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />}
      </main>
    </div>
  );
};

export default Users;