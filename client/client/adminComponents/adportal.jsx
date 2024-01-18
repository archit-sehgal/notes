import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function AdPortal() {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setKey(localStorage.getItem("admintoken"));
    setUsers(users);
    setNotes(notes);
  });
  if (key) {
    return (
      <div className="comp ">
        <h1>ADMIN PORTAL</h1>
        <div className="flex">
          <div className="users_list">
            <button
              onClick={() => {
                setUsers([]);
                fetch("http://localhost:3000/allusers", {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                    authorization:
                      "bearer " + localStorage.getItem("admintoken"),
                  },
                }).then((res) => {
                  res.json().then((data) => {
                    setUsers(data.users);
                  });
                });
              }}
            >
              get users list
            </button>
            <p>
              {users.map((user) => (
                <div key={user._id} className="">
                  <p>
                    <b>USERNAME:</b>
                    {user.username}
                  </p>
                  <button
                    className="deletebtn"
                    onClick={() => {
                      fetch(`http://localhost:3000/deluser/${user.username}`, {
                        method: "DELETE",
                        headers: {
                          "content-type": "application/json",
                          authorization:
                            "bearer " + localStorage.getItem("admintoken"),
                        },
                      }).then((res) => {
                        res.json().then((data) => {
                          alert(data.message);
                          setUsers((prevUsers) =>
                            prevUsers.filter((u) => u._id !== user._id)
                          );
                          
                        });
                      });
                    }}
                  >
                    Delete user
                  </button>
                </div>
              ))}
            </p>
          </div>
          <div className="notes_list">
            <button
              onClick={() => {
                setNotes([]);
                fetch("http://localhost:3000/allnotes", {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                    authorization:
                      "bearer " + localStorage.getItem("admintoken"),
                  },
                }).then((res) => {
                  res.json().then((data) => {
                    setNotes(data.notes);
                    console.log(notes);
                  });
                });
              }}
            >
              get notes list
            </button>
            <p>
              {notes.map((note) => (
                <div key={note._id} className="">
                  <p>
                    <b>TITLE:</b>
                    {note.title}
                  </p>
                  <p>
                    <b>DESC:</b>
                    {note.desc}
                  </p>
                  <p>
                    <b>USERID:</b>
                    {note.userid}
                  </p>
                  <button
                    className="deletebtn"
                    onClick={() => {
                      fetch(`http://localhost:3000/delnote/${note.title}`, {
                        method: "DELETE",
                        headers: {
                          "content-type": "application/json",
                          authorization:
                            "bearer " + localStorage.getItem("admintoken"),
                        },
                      }).then((res) => {
                        res.json().then((data) => {
                          alert(data.message);
                          setNotes((prevNotes) =>
                            prevNotes.filter((n) => n._id !== note._id)
                          );
                        });
                      });
                    }}
                  >
                    Delete note
                  </button>
                </div>
              ))}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="comp">
        <h1>Access Denied</h1>
        <p>Kindly login as Admin</p>
        <Link
          to={"/adminlogin"}
          style={{ color: "red", textDecoration: "none" }}
        >
          LOGIN HERE
        </Link>
      </div>
    );
  }
}
export default AdPortal;
