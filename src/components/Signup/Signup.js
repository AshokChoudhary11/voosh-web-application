// Signup.js

import React, { useEffect, useState } from "react";
import "./Signup.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // Hash the password (you may want to use a more secure method)
      const hashedPassword = btoa(password);

      // Create a new user object with the captured data
      const newUser = {
        name,
        phone: phoneNumber,
        password: hashedPassword,
      };

      // Make a POST request to the server with the new user data
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/add-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
      const responseBody = await response.json();
      // Check if the request was successful (status code 2xx)
      if (!responseBody.error) {
        toast.success("Logged in successfully");
        return navigate("/login");
        // You can redirect the user to the login page or perform any other actions
      } else {
        toast.error(responseBody.error);
        // Handle the error appropriately (display a message to the user, etc.)
      }
    } catch (error) {
      toast.error("Logged in Failed");
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h2>Signup</h2>
        <form>
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="phoneNumber" required>
            Phone Number :
          </label>
          <input
            type="number"
            id="phoneNumber"
            value={phoneNumber}
            required={true}
            onChange={(e) => setPhoneNumber(parseInt(e.target.value))}
          />
          <label htmlFor="password" re quired>
            Password :
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleSignup}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
