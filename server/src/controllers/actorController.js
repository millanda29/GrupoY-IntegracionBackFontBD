import * as actorService from '../services/actorService.js';

export const getActors = async (req, res) => {
  try {
    const actores = await actorService.getAllActors();
    res.json(actores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getActor = async (req, res) => {
  try {
    const actor = await actorService.getActorById(req.params.id);
    if (!actor) return res.status(404).json({ message: 'Actor not found' });
    res.json(actor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createActor = async (req, res) => {
  try {
    const actor = await actorService.createActor(req.body.nombre);
    res.status(201).json(actor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateActor = async (req, res) => {
  try {
    const actor = await actorService.updateActor(req.params.id, req.body.nombre);
    if (!actor) return res.status(404).json({ message: 'Actor not found or deleted' });
    res.json(actor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteActor = async (req, res) => {
  try {
    const actor = await actorService.deleteActor(req.params.id);
    if (!actor) return res.status(404).json({ message: 'Actor not found' });
    res.json({ message: 'Actor deleted logically', actor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
