import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </>
    // <div
    //   style={{
    //     display: "flex",
    //     height: "100vh",
    //     width: "100vw",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >

    //       <nav>
    //         <ul>
    //           <li>
    //             <Link to="/login">Login</Link>
    //           </li>
    //           <li>
    //             <Link to="/signup">Signup</Link>
    //           </li>
    //         </ul>
    //       </nav>
    // </div>
  );
};

export default App;
