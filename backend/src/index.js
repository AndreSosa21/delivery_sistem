import express from 'express';
import usersRouter from './routes/users.js';
import deliveriesRouter from './routes/deliveries.js';
import cors from "cors";

const port = process.env.PORT || 3000;
const app = express();

// Middleware for parsing JSON
app.use(express.json());

app.use(cors());  // habilita CORS para todas las rutas

// principal route
app.get("/", (req, res) => {
    res.send("Server is running. Available routes: /users, /deliveries");
});

// users routes
app.use('/users', usersRouter);
// deliveries routes
app.use('/deliveries', deliveriesRouter);

// validation route not found

app.use((req, res, next) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});


// listen server
app.listen(port, () => {
    console.log('Server listening on', port);
});