import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function UserLogin() {
  return (
    <div className="userlogincomp comp flex">
      <Login />
    </div>
  );
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="userlogincomp flex">
      <div className="formbox flex">
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          onClick={() => {
            fetch("http://localhost:3000/login", {
              method: "POST",
              body: JSON.stringify({
                username: username,
                password: password,
              }),
              headers: {
                "content-type": "application/json",
              },
            }).then((res) => {
              res.json().then((data) => {
                if (data.token) {
                  localStorage.setItem("token", data.token);
                  alert("logged in");
                  window.location="/notes"
                } else {
                  alert("error logging in");
                  window.location="/"
                }
              });
            });
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
export default UserLogin;
