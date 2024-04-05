import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./MovieBuff.css";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Director, setDirector] = useState("");
  const [Release_Year, setReleaseYear] = useState("");
  const [Genre, setGenre] = useState("");
  const [Rating, setRating] = useState("");
  const [Image_url, setImageUrl] = useState("");
  const [Movie_Title, setTitle] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/${id}`)
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        setTitle(data.Movie_Title);
        setDirector(data.Director);
        setImageUrl(data.Image_url);
        setReleaseYear(data.Release_Year);
        setGenre(data.Genre);
        setRating(data.Rating);
      })
      .catch((err) => console.log(err));
  }, []);

  const update = (e) => {
    e.preventDefault(); // Ensure id is valid
    axios
      .put(`http://localhost:3000/api/updatemovie/` + id, {
        Director,
        Release_Year,
        Genre,
        Rating,
        Image_url,
        Movie_Title,
      })
      .then((result) => {
        console.log(result);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="add-movie">
      <h1 id="title1">Edit Existing Movie</h1>
      <div>
        <form onSubmit={update}>
          <div className="add-movie-title">
            <label htmlFor="">Movie Title:</label>
            <input
              type="text"
              placeholder="eg. Interstellar"
              id=""
              onChange={(e) => setTitle(e.target.value)}
              value={Movie_Title}
            />
          </div>
          <div className="add-movie-director">
            <label htmlFor="">Director:</label>
            <input
              type="text"
              placeholder="eg. Christopher Nolan"
              id=""
              onChange={(e) => setDirector(e.target.value)}
              value={Director}
            />
          </div>
          <div className="add-movie-rating">
            <label htmlFor="">Rating</label>
            <input
              type="text"
              placeholder="eg. Christopher Nolan"
              id=""
              onChange={(e) => setRating(e.target.value)}
              value={Rating}
            />
          </div>
          <div className="add-movie-image">
            <label htmlFor="">Image URL:</label>
            <input
              type="text"
              placeholder="eg. https://example.com/image.jpg"
              id=""
              onChange={(e) => setImageUrl(e.target.value)}
              value={Image_url}
            />
          </div>
          <div className="add-movie-release">
            <label htmlFor="">Release Year:</label>
            <input
              type="text"
              placeholder="eg. 2014"
              id=""
              onChange={(e) => setReleaseYear(e.target.value)}
              value={Release_Year}
            />
          </div>
          <div className="add-movie-genre">
            <label htmlFor="">Genre:</label>
            <input
              type="text"
              placeholder="eg. Science Fiction"
              id=""
              onChange={(e) => setGenre(e.target.value)}
              value={Genre}
            />
          </div>
          <button type="submit" className="submit-btn">
            Update
          </button>
        </form>
        <Link to="/movies" className="back-button">
          ← Back
        </Link>
      </div>
    </div>
  );
}

export default Edit;
