import { pool } from "../db.js";
import Pelicula from "../models/peliculaModel.js";

export const getAllPeliculas = async () => {
  const result = await pool.query("SELECT * FROM peliculas WHERE status = true ORDER BY id_pelicula ASC");
  return result.rows.map(row => new Pelicula(row));
};

export const getPeliculaById = async (id) => {
  const result = await pool.query("SELECT * FROM peliculas WHERE id_pelicula = $1 AND status = true", [id]);
  if (result.rows.length === 0) return null;
  return new Pelicula(result.rows[0]);
};

export const createPelicula = async (data) => {
  const {
    titulo,
    anio,
    genero,
    duracion,
    descripcion,
    fecha_estreno,
    director,
    musica,
    historia,
    guion,
    url_portada
  } = data;

  const result = await pool.query(
    `INSERT INTO peliculas (titulo, anio, genero, duracion, descripcion, fecha_estreno, director, musica, historia, guion, url_portada)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *`,
    [titulo, anio, genero, duracion, descripcion, fecha_estreno, director, musica, historia, guion, url_portada]
  );

  if (result.rows.length === 0) return null;
  return new Pelicula(result.rows[0]);
};

export const updatePelicula = async (id, data) => {
  // Construcción dinámica para campos parciales
  const setClauses = [];
  const values = [];
  let index = 1;

  for (const [key, value] of Object.entries(data)) {
    setClauses.push(`${key} = $${index}`);
    values.push(value);
    index++;
  }

  values.push(id);

  const query = `
    UPDATE peliculas 
    SET ${setClauses.join(", ")} 
    WHERE id_pelicula = $${index}
    RETURNING *;
  `;

  const result = await pool.query(query, values);
  if (result.rows.length === 0) return null;
  return new Pelicula(result.rows[0]);
};

export const updatePeliculaFull = async (id, data) => {
  const {
    titulo,
    anio,
    genero,
    duracion,
    descripcion,
    fecha_estreno,
    director,
    musica,
    historia,
    guion,
    url_portada
  } = data;

  const result = await pool.query(
    `UPDATE peliculas SET 
      titulo=$1, anio=$2, genero=$3, duracion=$4, descripcion=$5, fecha_estreno=$6, 
      director=$7, musica=$8, historia=$9, guion=$10, url_portada=$11
      WHERE id_pelicula=$12 RETURNING *`,
    [titulo, anio, genero, duracion, descripcion, fecha_estreno, director, musica, historia, guion, url_portada, id]
  );

  if (result.rows.length === 0) return null;
  return new Pelicula(result.rows[0]);
};

export const deletePelicula = async (id) => {
  const result = await pool.query(
    "UPDATE peliculas SET status=false WHERE id_pelicula=$1 RETURNING *",
    [id]
  );
  if (result.rows.length === 0) return null;
  return new Pelicula(result.rows[0]);
};

export const activatePelicula = async (id) => {
  const result = await pool.query(
    "UPDATE peliculas SET status=true WHERE id_pelicula=$1 RETURNING *",
    [id]
  );
  if (result.rows.length === 0) return null;
  return new Pelicula(result.rows[0]);
};