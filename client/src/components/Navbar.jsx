import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
// Navbar.jsx
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");

  return (
    <div className="navbar">
      <h1 className="navbar-logo" onClick={() => navigate("/")}>
        IMAIJIN
      </h1>

      {path[1] === "post" ? (
        <button
          className="navbar-btn"
          onClick={() => navigate("/")}
        >
          <i class="fa-solid fa-compass"></i> Explore posts
        </button>
      ) : (
        <button
          className="navbar-btn"
          onClick={() => navigate("/post")}
        >
          <i class="fa-notdog fa-solid fa-plus"></i> Create new post
        </button>
      )}
    </div>
  );
};

export default Navbar;
