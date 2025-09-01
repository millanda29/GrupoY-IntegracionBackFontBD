import * as actorService from "../services/actorService.js";

export const getActors = async (req, res) => {
  try {
    const actores = await actorService.getAllActors();
    res.json(actores);
  } catch (err) {
    res.status(500).json({ error: "Error getting actors" });
  }
};

export const getActor = async (req, res) => {
  try {
    const actor = await actorService.getActorById(req.params.id);
    if (!actor) return res.status(404).json({ message: "Actor not found" });
    res.json(actor);
  } catch (err) {
    res.status(500).json({ error: "Error getting actor" });
  }
};

export const createActor = async (req, res) => {
  try {
    const { nombre, url_foto } = req.body;
    const actor = await actorService.createActor({ nombre, url_foto });
    if (!actor) return res.status(400).json({ message: "Error creating actor" });
    res.status(201).json(actor);
  } catch (err) {
    res.status(500).json({ error: "Error creating actor" });
  }
};

export const updateActor = async (req, res) => {
  try {
    const actor = await actorService.updateActor(req.params.id, req.body);
    if (!actor) return res.status(404).json({ message: "Actor not found or no fields provided" });
    res.json(actor);
  } catch (err) {
    res.status(500).json({ error: "Error updating actor" });
  }
};

export const deleteActor = async (req, res) => {
  try {
    const actor = await actorService.deleteActor(req.params.id);
    if (!actor) return res.status(404).json({ message: "Actor not found" });
    res.json({ message: "Actor deleted logically", actor });
  } catch (err) {
    res.status(500).json({ error: "Error deleting actor" });
  }
};

export const activateActor = async (req, res) => {
  try {
    const actor = await actorService.activateActor(req.params.id);
    if (!actor) return res.status(404).json({ message: "Actor not found" });
    res.json({ message: "Actor activated logically", actor });
  } catch (err) {
    res.status(500).json({ error: "Error activating actor" });
  }
};
