const express = require("express");
const router = express.Router();
const { connectDB } = require("./db.js");
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
  const newMovie = new Movie({
    MovieId: req.params.id,
    Director: req.body.Director,
    Release_Year: req.body.Release_Year,
    Genre: req.body.Genre,
    Rating: req.body.Rating,
    Image_url: req.body.Image_url,
    Movie_Title: req.body.Movie_Title,
  });
  try {
    const savedMovie = await newMovie.save();
    res.json(savedMovie); // 201 status code for resource creation
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while adding a new movie." });
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
