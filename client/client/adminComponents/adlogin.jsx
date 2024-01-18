import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function AdLogin() {
  const navigate = useNavigate();
  const [adminid, setAdminid] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="comp">
      <h1>Admin Login</h1>
      <div className="adminlogin_form">
        <input
          type="text"
          name="adminid"
          id="adminid"
          value={adminid}
          onChange={(e) => setAdminid(e.target.value)}
        />
        <input
          type="text"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => {
            fetch("http://localhost:3000/adminlogin", {
              method: "POST",
              body: JSON.stringify({
                adminid: adminid,
                password: password,
              }),
              headers: {
                "content-type": "application/json",
              },
            }).then((res) => {
              res.json().then((data) => {
                if (data.token) {
                  localStorage.setItem("admintoken", data.token);
                  alert("logged in");
                  navigate("/adminportal");
                } else {
                  alert("wrong credentials!!! Try again");
                  window.location = "/adminlogin";
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
export default AdLogin;
