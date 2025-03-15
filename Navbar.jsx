import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaUserTie } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setLoginUser(user)
    }
  }, [])
  const logout = async () => {
    await localStorage.clear();
    navigate("/login");
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/#">Money Tracker</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ bsScrollHeight: 100 }}>
            
          </ul>
          <FaUserTie style={{color:"white",fontSize:"1.5rem",marginRight: "0.5rem" }} />
          <p style={{ color: "#fff", paddingTop: "1rem", marginRight: "2rem" }}>{loginUser && loginUser.name}</p>
          <button onClick={logout} type="button" class="btn btn-primary">Logout</button>
        </div>
      </div>
    </nav >

  )
}

export default Navbar