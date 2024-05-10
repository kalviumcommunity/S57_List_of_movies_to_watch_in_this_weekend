import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className="logo">
            Movie Buff
          </Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">Popular</Link>
        </li>
        <li>
          <Link to="/movies">Language</Link>
        </li>
        <li>
          <Link to="/actors">Upcoming</Link>
        </li>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
        <li>
          <Link to="/signin">Sign in</Link>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
}

export default Navbar;
{
  /*  */
}
