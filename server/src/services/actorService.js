import { pool } from '../db.js';
import Actor from '../models/actorModel.js';

// Obtener todos los actores activos
export const getAllActors = async () => {
  const result = await pool.query('SELECT * FROM actores WHERE status = TRUE ORDER BY id_actor');
  return result.rows.map(row => new Actor(row));
};

// Obtener un actor por ID
export const getActorById = async (id) => {
  const result = await pool.query('SELECT * FROM actores WHERE id_actor = $1 AND status = TRUE', [id]);
  if (result.rows.length === 0) return null;
  return new Actor(result.rows[0]);
};

// Crear actor con nombre y foto
export const createActor = async ({ nombre, url_foto }) => {
  const result = await pool.query(
    'INSERT INTO actores (nombre, url_foto) VALUES ($1, $2) RETURNING *',
    [nombre, url_foto]
  );
  return new Actor(result.rows[0]);
};

// Actualizar actor (nombre o url_foto)
export const updateActor = async (id, campos) => {
  if (Object.keys(campos).length === 0) return null;

  // 🔹 Lista de campos permitidos
  const validFields = ['nombre', 'url_foto', 'status'];

  const setClauses = [];
  const values = [];
  let index = 1;

  for (const [key, value] of Object.entries(campos)) {
    if (!validFields.includes(key)) {
      throw new Error(`Invalid field: ${key}`);
    }
    setClauses.push(`${key} = $${index}`);
    values.push(value);
    index++;
  }

  values.push(id);

  const query = `
    UPDATE actores
    SET ${setClauses.join(', ')}
    WHERE id_actor = $${index} AND status = TRUE
    RETURNING *;
  `;

  const result = await pool.query(query, values);
  if (result.rows.length === 0) return null;
  return new Actor(result.rows[0]);
};

// Eliminación lógica
export const deleteActor = async (id) => {
  const result = await pool.query(
    'UPDATE actores SET status = FALSE WHERE id_actor = $1 RETURNING *',
    [id]
  );
  if (result.rows.length === 0) return null;
  return new Actor(result.rows[0]);
};

// Reactivar actor
export const activateActor = async (id) => {
  const result = await pool.query(
    'UPDATE actores SET status = TRUE WHERE id_actor = $1 RETURNING *',
    [id]
  );
  if (result.rows.length === 0) return null;
  return new Actor(result.rows[0]);
};
