import express from 'express';
import {
  getActors,
  getActor,
  createActor,
  updateActor,
  deleteActor
} from '../controllers/actorController.js';

const router = express.Router();

router.get('/', getActors);
router.get('/:id', getActor);
router.post('/', createActor);
router.put('/:id', updateActor);
router.delete('/:id', deleteActor);

export default router;
