// Navbar.js

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../../context";

const Navbar = () => {
  const { token, setToken } = useContext(UserContext);
  return (
    <nav>
      <ul>
        <li className="company_name">Voosh Application</li>
        <span>
          {!token ? (
            <>
              <li className="button">
                <Link to="/login">Login</Link>
              </li>
              <li className="button">
                <Link to="/signup">Signup</Link>
              </li>
            </>
          ) : (
            <li className="button">
              <Link
                to="/login"
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  setToken();
                }}
              >
                Logout
              </Link>
            </li>
          )}
        </span>
      </ul>
    </nav>
  );
};

export default Navbar;
