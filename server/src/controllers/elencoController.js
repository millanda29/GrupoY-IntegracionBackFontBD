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
    if (!elenco) return res.status(404).json({ message: "Elenco not found" });
    res.json(elenco);
  } catch (error) {
    res.status(500).json({ error: "Error getting elenco" });
  }
};

export const createElenco = async (req, res) => {
  try {
    const { id_pelicula, id_actor, personaje } = req.body;
    const nuevo = await elencoService.createElenco({ id_pelicula, id_actor, personaje });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: "Error creating elenco" });
  }
};

export const updateElenco = async (req, res) => {
  try {
    const actualizado = await elencoService.updateElenco(req.params.id, req.body);

    if (!actualizado) {
      return res.status(404).json({ message: "Elenco not found or not active" });
    }

    res.json(actualizado);
  } catch (error) {
    console.error("❌ Error updating elenco:", error.message);
    res.status(400).json({ error: error.message });
  }
};

export const deleteElenco = async (req, res) => {
  try {
    const eliminado = await elencoService.deleteElenco(req.params.id);
    if (!eliminado) return res.status(404).json({ message: "Elenco not found" });
    res.json({ message: "Elenco deleted logically", eliminado });
  } catch (error) {
    res.status(500).json({ error: "Error deleting elenco" });
  }
};
