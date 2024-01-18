import React from 'react'
import { useState } from 'react';

function UserSignup() {
    const[username,setUsername]=useState("")
    const[password,setPassword]=useState("")
    return (
      <div className='usersignupcomp comp flex'>
        <div className="formbox flex">
          <input type="text"placeholder='Create Username' name="username" id="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
          <input type="password"placeholder='Create Password' name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
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
                  // localStorage.setItem("token",data.token);
                  alert("user signed up!")
                  window.location="/login"
                }
                else{
                  alert("error signing up")
                  window.location=("/")
                }
              })
            })
          }}>signup</button>
        </div>
      </div>
    );
  }

  export default UserSignup;