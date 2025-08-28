import express from 'express';
import cors from 'cors';
import actoresRoutes from './routes/actorRoutes.js';
import peliculasRoutes from './routes/peliculaRoutes.js';
import elencoRoutes from './routes/elencoRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/actores', actoresRoutes);
app.use('/api/peliculas', peliculasRoutes);
app.use('/api/elenco', elencoRoutes);

export default app;
