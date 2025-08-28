import express from "express";
import {
  getElenco,
  getElencoById,
  createElenco,
  updateElenco,
  deleteElenco,
  getElencoByPelicula
} from "../controllers/elencoController.js";

const router = express.Router();

router.get("/", getElenco);
router.get("/:id", getElencoById);
router.get("/pelicula/:id", getElencoByPelicula);
router.post("/", createElenco);
router.put("/:id", updateElenco);
router.delete("/:id", deleteElenco);

export default router;
