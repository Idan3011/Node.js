import express from "express";
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updatedMovie,
  deleteMovie,
  getMovieByTitle
} from "../controllers/movieControllers.js";
getAllMovies;
const router = express.Router();

router.get("/", getAllMovies);

router.get("/:id", getMovieById);

router.get("/:title", getMovieByTitle)

router.post("/", createMovie);

router.put("/:id", updatedMovie);

router.delete("/:id", deleteMovie);

export default router;
