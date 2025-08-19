import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'db',            // 👉 usa el nombre del servicio en docker-compose
  port: 3306,            // dentro de docker normalmente es el puerto interno
  user: 'user_delivery',
  password: 'delivery1234',
  database: 'delivery',
});

export default pool;
