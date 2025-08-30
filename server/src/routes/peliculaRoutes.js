import express from "express";
import {
  getPeliculas,
  getPelicula,
  updatePeliculaPartial,
  updatePeliculaFull,
  deletePelicula,
  activatePelicula,
  createPelicula
} from "../controllers/peliculaController.js";

const router = express.Router();

router.get("/", getPeliculas);
router.get("/:id", getPelicula);
router.post("/", createPelicula);
router.put("/:id", updatePeliculaFull);
router.patch("/:id", updatePeliculaPartial); // actualización parcial
router.delete("/:id", deletePelicula);
router.put("/activate/:id", activatePelicula);

export default router;
