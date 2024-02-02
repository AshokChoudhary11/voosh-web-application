import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { UnprotectedRoutes } from "./components/UnprotectedRoutes";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { Order } from "./components/Order";
import { UserContext } from "./context";
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("auth-token"));
  return (
    <UserContext.Provider value={{ token, setToken }}>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={
            <UnprotectedRoutes>
              <Login />
            </UnprotectedRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <UnprotectedRoutes>
              <Signup />
            </UnprotectedRoutes>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoutes>
              <Order />
            </ProtectedRoutes>
          }
        />
        <Route path="/" element={<Navigate to="/order" />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </UserContext.Provider>
  );
};

export default App;
