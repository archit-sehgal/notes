import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  return (
    <div>
      <Form />
    </div>
  );
}

function Form() {
  const[username,setUsername]=useState("")
  const[password,setPassword]=useState("")
  return (
    <div>
      <div className="formbox flex">
        <input type="text" name="username" id="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button type="submit" onClick={()=>{
          fetch("http://localhost:3000/signup",{
            method:'POST',
            body:JSON.stringify({
              username:username,
              password:password
            }),
            headers:{
              "content-type": "application/json",
            },
          }).then((res)=>{
            res.json().then((data)=>{
              if(data.token){
                localStorage.setItem("token",data.token);
                alert("logged in")
              }
              else{
                alert("error signing up")
                window.location("/")
              }
            })
          })
        }}>signup</button>
      </div>
    </div>
  );
}
export default App;
