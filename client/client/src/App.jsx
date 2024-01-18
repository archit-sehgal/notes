import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserSignup from "../components/usersignup";
import Home from "../components/home";
import Nav from "../components/nav";
import UserLogin from "../components/userlogin";
import UserNotes from "../components/usernotes";
import ComposeNotes from "../components/composeNotes";
import AdLogin from "../adminComponents/adlogin";
import AdPortal from "../adminComponents/adportal";
import EditNote from "../components/editNote";
function App() {
  return (
    <Router>
      <div>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {/* User routes */}
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/login" element={<UserLogin/>}/>
          <Route path="/notes" element={<UserNotes/>}/>
          <Route path="/compose" element={<ComposeNotes/>}/>
          <Route path="/editnote/:title" element={<EditNote/>}/>
          {/* Admin routes */}
          <Route path="/adminlogin" element={<AdLogin/>}/>
          <Route path="/adminPortal" element={<AdPortal/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
