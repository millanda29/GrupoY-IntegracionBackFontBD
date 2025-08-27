import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// ======================================
// GET todos los actores activos
// ======================================
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM actores WHERE status = TRUE ORDER BY id_actor');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================================
// GET actor por ID
// ======================================
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM actores WHERE id_actor = $1 AND status = TRUE', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Actor no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================================
// POST - Crear nuevo actor
// ======================================
router.post('/', async (req, res) => {
  const { nombre } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO actores (nombre) VALUES ($1) RETURNING *',
      [nombre]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================================
// PUT - Actualizar actor
// ======================================
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const result = await pool.query(
      'UPDATE actores SET nombre = $1 WHERE id_actor = $2 AND status = TRUE RETURNING *',
      [nombre, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Actor no encontrado o eliminado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================================
// DELETE lógico - marcar actor como inactivo
// ======================================
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE actores SET status = FALSE WHERE id_actor = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Actor no encontrado' });
    res.json({ message: 'Actor eliminado lógicamente', actor: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
