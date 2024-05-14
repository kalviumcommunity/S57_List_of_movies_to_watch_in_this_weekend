import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MovieBuff.css";

function Create() {
  const [Movie_Title, setMovieTitle] = useState("");
  const [Director, setDirector] = useState("");
  const [Image_url, setImageUrl] = useState("");
  const [Release_Year, setReleaseYear] = useState("");
  const [Genre, setGenre] = useState("");
  const [Rating, setRating] = useState("");
  const [updated_User, setUpdated_User] = useState("");
  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    const username = getCookie("userName");
    setUpdated_User(username);
  }, [getCookie]);

  const submit = (e) => {
    e.preventDefault();
    useEffect(() => {
      const cookieValue = getCurrentCookieValue();
      if (cookieValue) {
        setUserName(cookieValue);
      }
    }, []);

    function getCurrentCookieValue() {
      const cookie = document.cookie;
      if (!cookie) {
        return null;
      }
      return cookie.split(";")[0].split("=")[1];
    }
    axios
      .post("http://localhost:3000/api/add_movies", {
        Director,
        Release_Year,
        Genre,
        Rating,
        Image_url,
        Movie_Title,
        updated_User: userName,
      })
      .then(() => {
        navigate("/movies");
      })
      .catch((err) => {
        console.error("Error adding movie:", err);
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={submit} className="create-form">
          <div>
            <label>Movie Title</label>
            <input
              type="text"
              value={Movie_Title}
              onChange={(e) => setMovieTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Director</label>
            <input
              type="text"
              value={Director}
              onChange={(e) => setDirector(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Image Url</label>
            <input
              type="text"
              value={Image_url}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Release Year</label>
            <input
              type="text"
              value={Release_Year}
              onChange={(e) => setReleaseYear(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Genre</label>
            <input
              type="text"
              value={Genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Rating</label>
            <input
              type="text"
              value={Rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
