import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',      // si usas puerto distinto: '127.0.0.1'
  port: 3307,             // ⚠️ si cambiaste el puerto, usa este
  user: 'user_delivery',
  password: 'delivery1234',
  database: 'delivery_db',
});

export default pool;
