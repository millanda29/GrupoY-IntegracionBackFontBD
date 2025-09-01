import { pool } from "../db.js";
import Elenco from "../models/elencoModel.js";

// Obtener elenco activo
export const getAllElenco = async () => {
  const result = await pool.query(
    `SELECT e.id_elenco, e.id_pelicula, e.id_actor, e.personaje, e.url_personaje, e.status,
            p.titulo AS pelicula, a.nombre AS actor, a.url_foto
     FROM elenco e
     JOIN peliculas p ON e.id_pelicula = p.id_pelicula
     JOIN actores a ON e.id_actor = a.id_actor
     WHERE e.status = TRUE
     ORDER BY e.id_elenco ASC`
  );
  return result.rows.map(row => new Elenco(row));
};

// Obtener elenco por ID
export const getElencoById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM elenco WHERE id_elenco = $1 AND status = TRUE",
    [id]
  );
  if (result.rows.length === 0) return null;
  return new Elenco(result.rows[0]);
};

// Obtener elenco por película
export const getElencoByPelicula = async (id_pelicula) => {
  const result = await pool.query(
    `SELECT e.id_elenco, e.id_pelicula, e.id_actor, e.personaje, e.url_personaje, e.status,
            p.titulo AS pelicula, a.nombre AS actor, a.url_foto
     FROM elenco e
     JOIN peliculas p ON e.id_pelicula = p.id_pelicula
     JOIN actores a ON e.id_actor = a.id_actor
     WHERE e.status = TRUE AND e.id_pelicula = $1`,
    [id_pelicula]
  );
  return result.rows.map(row => new Elenco(row));
};

// Crear nuevo elenco con foto del personaje
export const createElenco = async ({ id_pelicula, id_actor, personaje, url_personaje }) => {
  const result = await pool.query(
    "INSERT INTO elenco (id_pelicula, id_actor, personaje, url_personaje) VALUES ($1, $2, $3, $4) RETURNING *",
    [id_pelicula, id_actor, personaje, url_personaje]
  );
  return new Elenco(result.rows[0]);
};

// Actualizar elenco
export const updateElenco = async (id, campos) => {
  if (Object.keys(campos).length === 0) return null;

  // 🔹 Lista blanca de campos permitidos en la tabla
  const validFields = ["id_pelicula", "id_actor", "personaje", "url_personaje", "status"];

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
    UPDATE elenco
    SET ${setClauses.join(", ")}
    WHERE id_elenco = $${index} AND status = TRUE
    RETURNING *;
  `;

  const result = await pool.query(query, values);
  if (result.rows.length === 0) return null;
  return new Elenco(result.rows[0]);
};

// Eliminación lógica
export const deleteElenco = async (id) => {
  const result = await pool.query(
    "UPDATE elenco SET status = FALSE WHERE id_elenco = $1 RETURNING *",
    [id]
  );
  if (result.rows.length === 0) return null;
  return new Elenco(result.rows[0]);
};

// Reactivar elenco
export const activateElenco = async (id) => {
  const result = await pool.query(
    "UPDATE elenco SET status = TRUE WHERE id_elenco = $1 RETURNING *",
    [id]
  );
  if (result.rows.length === 0) return null;
  return new Elenco(result.rows[0]);
};
