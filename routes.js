const express = require("express");
const router = express.Router();
const { connectDB } = require("./db.js");
const { validateMovie } = require("./validator.js");
const Joi = require("joi");
const Movie = require("./schema.js");
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching movies." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movieFound = await Movie.findById(req.params.id);
    if (!movieFound) {
      return res.status(404).json({ error: "Movie not found." });
    }
    res.json(movieFound);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching movie details." });
  }
});

router.post("/add_movies", async (req, res) => {
  try {
    const validateMovieResult = validateMovie(req.body);
    if (validateMovieResult.error) {
      return res.status(400).json({ error: validateMovieResult.error.message });
    }
    const newMovie = new Movie(req.body);
    const saveMovie = await newMovie.save();
    res.json(saveMovie);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while adding the movie." });
  }
});

router.put("/updatemovie/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMovie);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the movie." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const foundMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!foundMovie) {
      return res.status(404).json({ error: "Movie not found." });
    }
    res.status(204).send();
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the movie." });
  }
});

module.exports = router;
