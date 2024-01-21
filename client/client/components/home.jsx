import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function Home() {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  });
  const btn = {
    color: "lightblue",
    backgroundColor: "black",
    textDecoration: "none",
    padding: "3px",
    fontSize: "1rem",
    borderRadius: "4px",
  };
  if(!token) {
    return (
      <div className="homecomp comp ">
        <h1>Create and Save Notes📝</h1>
        <div className="btnbox flex" style={{ gap: "10px" }}>
          <Link to={"/signup"} style={btn}>
            Signup <i class="fa-solid fa-right-to-bracket"></i>
          </Link>
          <br />
          <Link to={"/login"} style={btn}>
            Login <i class="fa-solid fa-right-to-bracket"></i>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="homecomp comp ">
        <h1>Create and Save Notes📝</h1>
      </div>
    );
  }
}
export default Home;
