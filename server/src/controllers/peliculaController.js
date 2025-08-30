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

export const createPelicula = async (req, res) => {
  try {
    const pelicula = await peliculaService.createPelicula(req.body);
    if (!pelicula) {
      return res.status(400).json({ message: "Error creating movie" });
    }
    res.status(201).json(pelicula);
  } catch (error) {
    res.status(500).json({ error: "Error creating movie" });
  }
};

export const updatePelicula = async (req, res) => {
  try {
    const pelicula = await peliculaService.updatePelicula(req.params.id, req.body);
    if (!pelicula) return res.status(404).json({ message: "Movie not found or no fields provided" });
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

export const activatePelicula = async (req, res) => {
  try {
    const pelicula = await peliculaService.activatePelicula(req.params.id);
    if (!pelicula) return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie activated logically", pelicula });
  } catch (error) {
    res.status(500).json({ error: "Error activating movie" });
  }
};
