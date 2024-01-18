import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ComposeNotes() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleClick = () => {
    fetch("http://localhost:3000/compose", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        desc: desc,
      }),
      headers: {
        "content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        navigate("/notes");
      });
    });
  };

  return (
    <div className="composenotes comp flex">
      <input
        name="title"
        placeholder="Enter Title of Note"
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        name="desc"
        type="text"
        placeholder="Enter Description"
        id="desc"
        value={desc}
        onChange={(e) => {
          setDesc(e.target.value);
        }}
      />
      <button
        onClick={() => {
          handleClick();
        }}
      >
        Compose
      </button>
    </div>
  );
}
export default ComposeNotes;
