import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
function EditNote() {
  const title=useParams();
  const navigate=useNavigate();
  const [newtitle, setNewtitle] = useState("");
  const [newdesc, setNewdesc] = useState("");
  return (
    <div className="comp">
      <input
        type="text"
        placeholder="Enter New Title"
        name="newtitle"
        id="newtitle"
        value={newtitle}
        onChange={(e) => setNewtitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter New Description"
        name="newdesc"
        id="newdesc"
        value={newdesc}
        onChange={(e) => setNewdesc(e.target.value)}
      />
      <button
        onClick={() => {
          fetch(`http://localhost:3000/editnote/${title}`,{
            method:'POST',
            body:JSON.stringify({
                newtitle:newtitle,
                newdesc:newdesc
            }),
            headers:{
                "content-type":"application/json",
                authorization:"bearer "+localStorage.getItem("token"||"admintoken")
            }
          }).then((res)=>{
            res.json().then((data)=>{
                alert(data.message)
                navigate("/notes")
            })
          })
        }}
      >
        save changes
      </button>
    </div>
  );
}
export default EditNote;
