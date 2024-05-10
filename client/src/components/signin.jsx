import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        userName: userName,
        password: password,
      });

      if (response.status === 200) {
        const { accessToken, userId } = response.data;
        console.log(response.data);
        const currentDate = new Date();
        const nextYear = new Date(currentDate);
        nextYear.setUTCFullYear(nextYear.getUTCFullYear() + 1);
        const expires = nextYear.toUTCString();
        document.cookie = `accessToken=${accessToken};expires=${expires};path=/;`;
        localStorage.setItem("user", userId);
        console.log("Login successful");
        navigate("/");
      } else {
        console.log("Login error");
        // Handle login error here
      }
    } catch (err) {
      console.error(err);
      // Handle fetch error here
    }
  };

  return (
    <div className="loginbody">
      <form onSubmit={handleSubmit} className="login-field">
        <h2 id="signup">Log in</h2>
        <p className="para">
          Log in to contribute by adding more satellite info!
        </p>

        <div>
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div id="ask-sign">
          Don't have an account?{" "}
          <Link to="/signup" id="ask-signin">
            Sign up
          </Link>
        </div>
        <button type="submit" id="submit">
          Log in
        </button>
      </form>
      <Link to="/" className="backtohome-btn">
        ← Back to home
      </Link>
    </div>
  );
}

export default Login;
