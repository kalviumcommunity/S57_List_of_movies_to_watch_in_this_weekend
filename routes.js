const express = require("express");
const router = express.Router();
const { validateMovie } = require("./validator.js");
const Joi = require("joi");
const Movie = require("./schema.js");
const person = require("./userSchema.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
    const { error, value } = validateMovie(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    const newMovie = new Movie(value);
    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (err) {
    console.error("Error adding movie:", err);
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

router.get("/users/names", async (req, res) => {
  try {
    const users = await person.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const user = await person.create({
      userName: req.body.userName,
      password: req.body.password,
    });
    res.send(user);
  } catch (err) {
    console.error(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await person.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ error: "Invalid username / password" });
    } else {
      res.status(200).json({ message: "login sucessful" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.clearCookie("password");

  res.status(200).json({ message: "Logout succesful" });
});
router.post("/auth", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = {
      username: username,
      password: password,
    };
    const ACCESS_TOKEN = jwt.sign(user, process.env.ACCESS_TOKEN, {
      expiresIn: "1d",
    });
    res.cookie("token", ACCESS_TOKEN, { maxAge: 365 * 24 * 60 * 60 * 100 });
    res.json({ accessToken: ACCESS_TOKEN });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
