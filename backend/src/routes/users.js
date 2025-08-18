import express from 'express';
const route_users = express.Router();
import pool from "../../database/connection.js";

// Función para validar si todos los inputs son strings
function string_validation(username, email, phone, address) {
  let data = [username, email, phone, address];
  return data.every(item => typeof item === 'string');
}

// GET  users
route_users.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error("Error GET /users:", error);
    res.status(500).json({ error: 'Internal server error, could not GET users from database' });
  }
});

// POST user
route_users.post('/', async (req, res) => {
  try {
    const { username, email, phone, address } = req.body;

    // Validar campos obligatorios
    if (!username || !email || !phone || !address) {
      return res.status(400).json({ error: 'JSON incomplete' });
    }

    // Validar tipos
    if (!string_validation(username, email, phone, address)) {
      return res.status(400).json({ error: 'type of data invalid' });
    }

    // Validar que username o email no existan
    const [existing] = await pool.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: "username or email already in use" });
    }

    // Insertar en DB
    const [result] = await pool.query(
      'INSERT INTO users (username, email, phone, address) VALUES (?, ?, ?, ?)',
      [username, email, phone, address]
    );

    const new_user = { id: result.insertId, username, email, phone, address };
    return res.status(201).json(new_user);

  } catch (error) {
    console.error("Error POST /users:", error);
    res.status(500).json({ error: 'Internal server error, could not POST user' });
  }
});

//  PUT user
route_users.put('/:id', async (req, res) => {
  try {
    const { username, email, phone, address } = req.body;
    const id = parseInt(req.params.id);

    if (!username || !email || !phone || !address) {
      return res.status(400).json({ error: 'JSON incomplete' });
    }

    if (!string_validation(username, email, phone, address)) {
      return res.status(400).json({ error: 'type of data invalid' });
    }

    // Verificar si existe
    const [existing] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Actualizar
    await pool.query(
      'UPDATE users SET username = ?, email = ?, phone = ?, address = ? WHERE id = ?',
      [username, email, phone, address, id]
    );

    return res.json({ id, username, email, phone, address });
  } catch (error) {
    console.error("Error PUT /users:", error);
    res.status(500).json({ error: 'Internal server error, could not UPDATE user' });
  }
});

// DELETE user
route_users.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Verificar si existe
    const [existing] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Eliminar
    await pool.query('DELETE FROM users WHERE id = ?', [id]);

    return res.json({ message: "User deleted", user: existing[0] });
  } catch (error) {
    console.error("Error DELETE /users:", error);
    res.status(500).json({ error: 'Internal server error, could not DELETE user' });
  }
});

export default route_users;
