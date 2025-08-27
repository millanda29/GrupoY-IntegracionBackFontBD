import express from 'express';
import cors from 'cors';
import actoresRoutes from './routes/actores.js';
import peliculasRoutes from './routes/peliculas.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/actores', actoresRoutes);
app.use('/api/peliculas', peliculasRoutes);

export default app;
