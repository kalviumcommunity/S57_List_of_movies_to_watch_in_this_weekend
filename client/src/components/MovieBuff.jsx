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

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    // Clear all cookies here
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    // Redirect to logout page or login page
    window.location.href = "/"; // Redirect to logout page
    // window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="movie-buff-container">
      <Navbar />
      <h1>List of Movies to Watch in this WeekEnd</h1>
      <Link id="add" className="button-3d-hover" to="/create">
        Add new movie
      </Link>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
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
              <p className="movie-info">Release Year: {movie.Release_Year}</p>
              <p className="movie-info">Genre: {movie.Genre}</p>
              <p className="movie-info">Rating: {movie.Rating}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDelete(movie._id)}
            >
              Delete
            </button>
            <Link className="edit-button" to={`/editMovie/${movie._id}`}>
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieBuff;
