import express from "express";
import {
  getPeliculas,
  getPelicula,
  updatePelicula,
  deletePelicula,
  activatePelicula,
  createPelicula
} from "../controllers/peliculaController.js";

const router = express.Router();

router.get("/", getPeliculas);
router.get("/:id", getPelicula);
router.post("/", createPelicula);
router.put("/:id", updatePelicula); // actualización parcial
router.delete("/:id", deletePelicula);
router.put("/activate/:id", activatePelicula);

export default router;
