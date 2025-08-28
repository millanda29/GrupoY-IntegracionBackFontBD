import * as peliculaService from "../services/peliculaService.js";

export const getPeliculas = async (req, res) => {
  try {
    const peliculas = await peliculaService.getAllPeliculas();
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ error: "Error getting movies" });
  }
};

export const getPelicula = async (req, res) => {
  try {
    const pelicula = await peliculaService.getPeliculaById(req.params.id);
    if (!pelicula) return res.status(404).json({ message: "Movie not found" });
    res.json(pelicula);
  } catch (error) {
    res.status(500).json({ error: "Error getting movie" });
  }
};

export const updatePeliculaPartial = async (req, res) => {
  try {
    const pelicula = await peliculaService.updatePelicula(req.params.id, req.body);
    if (!pelicula) return res.status(404).json({ message: "Movie not found" });
    res.json(pelicula);
  } catch (error) {
    res.status(500).json({ error: "Error updating movie" });
  }
};

export const updatePeliculaFull = async (req, res) => {
  try {
    const pelicula = await peliculaService.updatePeliculaFull(req.params.id, req.body);
    if (!pelicula) return res.status(404).json({ message: "Movie not found" });
    res.json(pelicula);
  } catch (error) {
    res.status(500).json({ error: "Error updating movie" });
  }
};

export const deletePelicula = async (req, res) => {
  try {
    const pelicula = await peliculaService.deletePelicula(req.params.id);
    if (!pelicula) return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie deleted logically", pelicula });
  } catch (error) {
    res.status(500).json({ error: "Error deleting movie" });
  }
};
