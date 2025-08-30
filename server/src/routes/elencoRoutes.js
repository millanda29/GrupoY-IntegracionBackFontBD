import express from "express";
import {
  getElenco,
  getElencoById,
  createElenco,
  updateElenco,
  deleteElenco,
  getElencoByPelicula,
  activateElenco
} from "../controllers/elencoController.js";

const router = express.Router();

router.get("/", getElenco);
router.get("/:id", getElencoById);
router.get("/pelicula/:id", getElencoByPelicula);
router.post("/", createElenco);
router.put("/:id", updateElenco); // actualización parcial
router.delete("/:id", deleteElenco);
router.put("/activate/:id", activateElenco);

export default router;
