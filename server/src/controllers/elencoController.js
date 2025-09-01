import * as elencoService from "../services/elencoService.js";

export const getElenco = async (req, res) => {
  try {
    const elenco = await elencoService.getAllElenco();
    res.json(elenco);
  } catch (error) {
    res.status(500).json({ error: "Error getting elenco" });
  }
};

export const getElencoById = async (req, res) => {
  try {
    const elenco = await elencoService.getElencoById(req.params.id);
    if (!elenco) return res.status(404).json({ message: "Elenco not found" });
    res.json(elenco);
  } catch (error) {
    res.status(500).json({ error: "Error getting elenco" });
  }
};

export const getElencoByPelicula = async (req, res) => {
  try {
    const elenco = await elencoService.getElencoByPelicula(req.params.id);
    if (!elenco || elenco.length === 0) return res.status(404).json({ message: "Elenco not found" });
    res.json(elenco);
  } catch (error) {
    res.status(500).json({ error: "Error getting elenco" });
  }
};

export const createElenco = async (req, res) => {
  try {
    const { id_pelicula, id_actor, personaje } = req.body;
    const elenco = await elencoService.createElenco({ id_pelicula, id_actor, personaje });
    res.status(201).json(elenco);
  } catch (error) {
    res.status(500).json({ error: "Error creating elenco" });
  }
};

export const updateElenco = async (req, res) => {
  try {
    const elenco = await elencoService.updateElenco(req.params.id, req.body);
    if (!elenco) return res.status(404).json({ message: "Elenco not found or not active" });
    res.json(elenco);
  } catch (error) {
    console.error("❌ Error updating elenco:", error.message);
    res.status(400).json({ error: error.message });
  }
};

export const deleteElenco = async (req, res) => {
  try {
    const elenco = await elencoService.deleteElenco(req.params.id);
    if (!elenco) return res.status(404).json({ message: "Elenco not found" });
    res.json({ message: "Elenco deleted logically", elenco });
  } catch (error) {
    res.status(500).json({ error: "Error deleting elenco" });
  }
};

export const activateElenco = async (req, res) => {
  try {
    const elenco = await elencoService.activateElenco(req.params.id);
    if (!elenco) return res.status(404).json({ message: "Elenco not found" });
    res.json({ message: "Elenco activated logically", elenco });
  } catch (error) {
    res.status(500).json({ error: "Error activating elenco" });
  }
};
