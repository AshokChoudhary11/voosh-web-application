// Navbar.js

import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li className="company_name" >Voosh Application</li>
        <span>
          <li className="button" >
            <Link to="/login">Login</Link>
          </li>
          <li className="button" >
            <Link to="/signup">Signup</Link>
          </li>
        </span>
      </ul>
    </nav>
  );
};

export default Navbar;
