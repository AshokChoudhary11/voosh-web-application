// LoginForm.js

import React, { useContext, useState } from "react";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const { setToken } = useContext(UserContext);

  const handleLogin = () => {
    // Implement your login logic here
    console.log("Logging in with:", { phoneNumber, password });
    const hashedPassword = btoa(password);
    fetch(`${process.env.REACT_APP_BASE_URL}/login-user`, {
      method: "POST",
      body: JSON.stringify({
        phone: phoneNumber,
        password: hashedPassword,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          localStorage.setItem("auth-token", res.token);
          setToken(res.token);
          navigate("/order");
        }
      })
      .catch((err) => {
        toast.error("Failed to login");
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
            onChange={(e) => setPhoneNumber(parseInt(e.target.value))}
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
