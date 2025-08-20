import express from 'express';
import usersRouter from './routes/users.js';
import deliveriesRouter from './routes/deliveries.js';
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const port = process.env.PORT || 3000;
const app = express();

// Necesario para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al frontend compilado dentro de backend/public
const frontendPath = path.join(__dirname, "../public");

// Middleware
app.use(express.json());
app.use(cors());

// ----- Rutas del backend -----
app.use('/api/users', usersRouter);
app.use('/api/deliveries', deliveriesRouter);

// ----- Servir frontend compilado -----
app.use(express.static(frontendPath));

// ----- Catch-all para SPA -----
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Iniciar servidor
app.listen(port, () => {
    console.log('Server listening on', port);
});