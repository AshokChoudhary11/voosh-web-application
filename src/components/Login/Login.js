// LoginForm.js

import React, { useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../contants";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement your login logic here
    console.log("Logging in with:", { phoneNumber, password });
    fetch(`${BASE_URL}/login-user`, {
      method: "POST",
      body: JSON.stringify({
        phone: phoneNumber,
        password,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }).then((res) => {
      console.log({ res });
    });
  };

  return (
    <div className="page">
      <div className="container">
        <h2>Login</h2>
        <form>
          <label htmlFor="Phone Number">Phone Number:</label>
          <input
            type="number"
            id="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
