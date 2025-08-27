import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Actualizar película (solo campos enviados)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const campos = req.body;

    if (Object.keys(campos).length === 0) {
      return res.status(400).json({ message: "No se enviaron campos para actualizar" });
    }

    const setClauses = [];
    const values = [];
    let index = 1;

    for (const [key, value] of Object.entries(campos)) {
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

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error al actualizar:", error.message);
    res.status(500).json({ error: "Error al actualizar película" });
  }
});

// Obtener todas las películas
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM peliculas WHERE status = true ORDER BY id_pelicula ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al listar:", error.message);
    res.status(500).json({ error: "Error al obtener películas" });
  }
});

// Obtener película por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM peliculas WHERE id_pelicula = $1 AND status = true", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error al buscar:", error.message);
    res.status(500).json({ error: "Error al obtener película" });
  }
});

// Actualizar película
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
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
      url_portada,
    } = req.body;

    const result = await pool.query(
      `UPDATE peliculas SET 
      titulo=$1, anio=$2, genero=$3, duracion=$4, descripcion=$5, fecha_estreno=$6, 
      director=$7, musica=$8, historia=$9, guion=$10, url_portada=$11
      WHERE id_pelicula=$12 RETURNING *`,
      [titulo, anio, genero, duracion, descripcion, fecha_estreno, director, musica, historia, guion, url_portada, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error al actualizar:", error.message);
    res.status(500).json({ error: "Error al actualizar película" });
  }
});

// Eliminar película (lógico)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "UPDATE peliculas SET status=false WHERE id_pelicula=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.json({ message: "Película eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar:", error.message);
    res.status(500).json({ error: "Error al eliminar película" });
  }
});

export default router;
