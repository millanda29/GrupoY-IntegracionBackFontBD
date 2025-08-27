import express from "express";
import { pool } from "../db.js";

const router = express.Router();

//  Crear película
router.post("/", async (req, res) => {
  try {
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
      `INSERT INTO peliculas 
      (titulo, anio, genero, duracion, descripcion, fecha_estreno, director, musica, historia, guion, url_portada) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [titulo, anio, genero, duracion, descripcion, fecha_estreno, director, musica, historia, guion, url_portada]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error al crear:", error.message);
    res.status(500).json({ error: "Error al crear película" });
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
