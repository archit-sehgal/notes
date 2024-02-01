import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const [admintoken, setAdmintoken] = useState("");
  useEffect(() => {
    setKey(localStorage.getItem("token"));
    setAdmintoken(localStorage.getItem("admintoken"));
  });
  setInterval(() => {
    setKey(localStorage.getItem("token"));
    setAdmintoken(localStorage.getItem("admintoken"));
  }, 1000);
  if (!admintoken) {
    if (key) {
      return (
        <div className="nav flex">
          <Link to={"/"} className="links">
            HOME
          </Link>
          <Link to={"/notes"} className="links">
            NOTES
          </Link>
          <Link className="links">
            <Link
              className="links"
              onClick={() => {
                localStorage.removeItem("token");
                window.location = "/";
              }}
            >
              LOGOUT
            </Link>
          </Link>
          <Link to={"/compose"} className="links">
            COMPOSE
          </Link>
        </div>
      );
    } else {
      return (
        <div className="nav flex">
          <Link to={"/"} className="links">
            HOME
          </Link>
          <Link to={"/signup"} className="links">
            SIGNUP
          </Link>
          <Link to={"/login"} className="links">
            LOGIN
          </Link>
        </div>
      );
    }
  } else {
    return (
      <div className="nav flex">
        <button
          onClick={() => {
            localStorage.removeItem("admintoken");
            navigate("/");
          }}
        >
          LOGOUT
        </button>
      </div>
    );
  }
}
export default Nav;
