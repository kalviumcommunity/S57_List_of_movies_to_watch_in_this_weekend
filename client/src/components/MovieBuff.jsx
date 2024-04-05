import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MovieBuff.css";
import Navbar from "./Navbar";

function MovieBuff() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="movie-buff-container">
      <Navbar />
      <Link to="/create">Add Movie+</Link>
      <h1>List of Movies to Watch in this WeekEnd</h1>
      <Link id="add" className="button-3d-hover" to="/create">
        Add new movie
      </Link>
      <div className="movie-container">
        {movies.map((movie, index) => (
          <div key={index} className="movie-card">
            <img
              src={movie.Image_url}
              alt={movie.Movie_Title}
              className="movie-image"
            />
            <div className="movie-details">
              <h2 className="movie-title">{movie.Movie_Title}</h2>
              <p className="movie-info">Director: {movie.Director}</p>
              <p className="movie-info">
                Release Year: {movie["Release Year"]}
              </p>
              <p className="movie-info">Genre: {movie.Genre}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieBuff;
