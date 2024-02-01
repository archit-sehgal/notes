import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function UserNotes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const fetchNotes = () => {
    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  };

  useEffect(() => {
    fetchNotes();
    const intervalId = setInterval(fetchNotes, 5000);
    return () => clearInterval(intervalId);
  }, []);

  if (localStorage.getItem("token") && notes != "") {
    return (
      <div className="usernotes flex comp">
        {notes.map((note) => (
          <div key={note._id} className="notebox">
            <p>
              <b>TITLE: </b>
              {note.title}
            </p>
            <p>
              <b>DESC: </b>
              {note.desc}
            </p>
            <a className="iconbtn edit" onClick={()=>{
              navigate(`/editnote/${note.title}`)
            }}>
              <i class="icon fa-regular fa-pen-to-square"></i>
            </a>
            <a
              className="iconbtn delete"
              onClick={() => {
                fetch(`http://localhost:3000/delnote/${note.title}`, {
                  method: "DELETE",
                  headers: {
                    "content-type": "application/json",
                    authorization:
                      "bearer " + localStorage.getItem("token" || "admintoken"),
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
              <i class="icon fa-solid fa-trash-can"></i>
            </a>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="usernotes comp " style={{ color: "red" }}>
        No notes found!
        <br />
        <Link
          to={"/compose"}
          style={{
            color: "lightgreen",
            backgroundColor: "black",
            textDecoration: "none",
            padding: "3px",
            fontSize: ".7rem",
            borderRadius: "4px",
          }}
        >
          Create a new note
        </Link>
      </div>
    );
  }
}

export default UserNotes;
