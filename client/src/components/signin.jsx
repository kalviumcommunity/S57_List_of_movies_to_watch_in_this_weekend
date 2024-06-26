import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: userName, password: password }),
      });
      const feedback = await response.json();
      if (response.status === 200) {
        const { accessToken, userId } = feedback;
        console.log(feedback);
        const currentDate = new Date();
        const nextYear = new Date(currentDate);
        nextYear.setUTCFullYear(nextYear.getUTCFullYear() + 1);
        const expires = nextYear.toUTCString();
        document.cookie = `accessToken=${accessToken};expires=${expires};path=/`;
        document.cookie = `userName=${userName};expires=${expires};path=/`;
        document.cookie = `userId=${userId};expires=${expires};path=/`; // Set userId in cookies
        localStorage.setItem("user", userId);
        console.log("Login successful");
        alert("Login successful");
        navigate("/movies");
      } else {
        console.log("Login error");
        alert("Login error");
      }
    } catch (err) {
      alert("The password or username is incorrect Try again");
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
