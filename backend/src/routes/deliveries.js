import express from 'express';
const route_deliveries = express.Router();
import pool from "../../database/connection.js"; 

// Función para validar strings
function string_validation(...fields) {
  return fields.every(item => typeof item === 'string');
}

// Función para validar ints
function int_validation(...fields) {
  return fields.every(num => Number.isInteger(num));
}

// ✅ GET all deliveries
route_deliveries.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT d.id, u.username, d.item, d.quantity, d.price, d.address
       FROM deliveries d
       JOIN users u ON d.user_id = u.id`
    );
    res.json(rows);
  } catch (error) {
    console.error(" Error GET /deliveries:", error);
    res.status(500).json({ error: 'Internal server error, could not GET deliveries' });
  }
});

// ✅ POST delivery
route_deliveries.post('/', async (req, res) => {
  try {
    const { username, item, quantity, price, address } = req.body;

    // Validación campos
    if (!username || !item || !quantity || !price || !address) {
      return res.status(400).json({ error: 'JSON incomplete' });
    }

    if (!string_validation(username, item, address) || !int_validation(quantity, price)) {
      return res.status(400).json({ error: 'type of data invalid' });
    }

    // Buscar usuario
    const [user] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
    if (user.length === 0) {
      return res.status(400).json({ message: "username does not exist" });
    }

    const user_id = user[0].id;

    // Insertar en DB
    const [result] = await pool.query(
      'INSERT INTO deliveries (user_id, item, quantity, price, address) VALUES (?, ?, ?, ?, ?)',
      [user_id, item, quantity, price, address]
    );

    return res.json({ 
      message: "Delivery added", 
      delivery: { id: result.insertId, username, item, quantity, price, address }
    });

  } catch (error) {
    console.error(" Error POST /deliveries:", error);
    res.status(500).json({ error: 'Internal server error, could not POST delivery' });
  }
});

// ✅ PUT delivery
route_deliveries.put('/:id', async (req, res) => {
  try {
    const deliveryId = parseInt(req.params.id);
    const { username, item, quantity, price, address } = req.body;

    if (!username || !item || !quantity || !price || !address) {
      return res.status(400).json({ error: 'JSON incomplete' });
    }

    if (!string_validation(username, item, address) || !int_validation(quantity, price)) {
      return res.status(400).json({ error: 'type of data invalid' });
    }

    // Buscar usuario
    const [user] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
    if (user.length === 0) {
      return res.status(400).json({ message: "username does not exist" });
    }

    const user_id = user[0].id;

    // Verificar que exista delivery
    const [existing] = await pool.query('SELECT * FROM deliveries WHERE id = ?', [deliveryId]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    // Actualizar
    await pool.query(
      'UPDATE deliveries SET user_id = ?, item = ?, quantity = ?, price = ?, address = ? WHERE id = ?',
      [user_id, item, quantity, price, address, deliveryId]
    );

    return res.json({ message: "Delivery updated", delivery: { id: deliveryId, username, item, quantity, price, address } });

  } catch (error) {
    console.error("Error PUT /deliveries:", error);
    res.status(500).json({ error: 'Internal server error, could not PUT delivery' });
  }
});

// DELETE delivery
route_deliveries.delete('/:id', async (req, res) => {
  try {
    const deliveryId = parseInt(req.params.id);

    // Verificar que exista
    const [existing] = await pool.query('SELECT * FROM deliveries WHERE id = ?', [deliveryId]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    await pool.query('DELETE FROM deliveries WHERE id = ?', [deliveryId]);

    return res.json({ message: "Delivery deleted", delivery: existing[0] });
  } catch (error) {
    console.error("Error DELETE /deliveries:", error);
    res.status(500).json({ error: 'Internal server error, could not DELETE delivery' });
  }
});

export default route_deliveries;
