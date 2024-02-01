// Signup.js

import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      // Hash the password (you may want to use a more secure method)
      const hashedPassword = btoa(password);

      // Create a new user object with the captured data
      const newUser = {
        name,
        phoneNumber,
        password: hashedPassword,
      };

      // Make a POST request to the server with the new user data
      const response = await fetch("https://your-api-url/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log("User registered successfully!");
        // You can redirect the user to the login page or perform any other actions
      } else {
        console.error("Error registering user:", response.statusText);
        // Handle the error appropriately (display a message to the user, etc.)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
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

        <button type="button" onClick={handleSignup}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
