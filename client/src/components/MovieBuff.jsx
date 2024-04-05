import React from "react";
import "./MovieBuff.css";
const MovieBuff = () => {
  // Sample movie data
  const movies = [
    {
      title: "Inception",
      director: "Christopher Nolan",
      genres: ["Action", "Adventure", "Sci-Fi"],
      releaseYear: 2010,
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BZjhkYTU2YTgtM2ZkYS00MzJkLWE2ZjAtZjY5MTI4OWE2YmZjXkEyXkFqcGdeQXVyODIwMDI1NjM@._V1_.jpg",
    },
    {
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
      genres: ["Drama"],
      releaseYear: 1994,
      imageUrl: "https://wallpapercave.com/wp/wp4019377.jpg",
    },
    // Add more movie data as needed
  ];

  return (
    <div className="movies-container">
      {movies.map((movie, index) => (
        <div className="movie-card" key={index}>
          <img src={movie.imageUrl} alt={movie.title} />
          <div className="movie-info">
            <h2>{movie.title}</h2>
            <p>
              Director: <a href="#">{movie.director}</a>
            </p>
            <p>Genres: {movie.genres.join(", ")}</p>
            <p>Release Year: {movie.releaseYear}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieBuff;
