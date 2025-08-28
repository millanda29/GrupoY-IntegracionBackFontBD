import { pool } from '../db.js';
import Actor from '../models/actorModel.js';

export const getAllActors = async () => {
  const result = await pool.query('SELECT * FROM actores WHERE status = TRUE ORDER BY id_actor');
  return result.rows.map(row => new Actor(row));
};

export const getActorById = async (id) => {
  const result = await pool.query('SELECT * FROM actores WHERE id_actor = $1 AND status = TRUE', [id]);
  if (result.rows.length === 0) return null;
  return new Actor(result.rows[0]);
};

export const createActor = async (nombre) => {
  const result = await pool.query(
    'INSERT INTO actores (nombre) VALUES ($1) RETURNING *',
    [nombre]
  );
  return new Actor(result.rows[0]);
};

export const updateActor = async (id, nombre) => {
  const result = await pool.query(
    'UPDATE actores SET nombre = $1 WHERE id_actor = $2 AND status = TRUE RETURNING *',
    [nombre, id]
  );
  if (result.rows.length === 0) return null;
  return new Actor(result.rows[0]);
};

export const deleteActor = async (id) => {
  const result = await pool.query(
    'UPDATE actores SET status = FALSE WHERE id_actor = $1 RETURNING *',
    [id]
  );
  if (result.rows.length === 0) return null;
  return new Actor(result.rows[0]);
};
