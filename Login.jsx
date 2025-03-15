import React, { useEffect, useState } from 'react';
import "./Register.css";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
 
function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:8080/api/v1/login", user);
    alert("Logged in Successfully!");
    localStorage.setItem('user', JSON.stringify({ ...data.user, password: "" }))
    navigate("/")
    setUser({
      email: "",
      password: "",

    })
  }
  useEffect(()=>{
    if(localStorage.getItem("user")){
      navigate('/')
    }
  },[navigate])


  return (
    <div className='register'>
      <div className='register-container'>
        <div className='app-name-logo'>
          <h1>Money<span>Tracker</span></h1>
        </div>
        <div className='input-box'>
          <form onSubmit={handleSubmit}>
            <TextField onChange={handleInputChange} name="email" value={user.email} type="email" className='name' id="email" label="Email" variant="standard" />
            <TextField onChange={handleInputChange} name="password" value={user.password} type="password" className='name' id="password" label="Password" variant="standard" />
            <p>Don't have an account <span><Link to="/register">Signup</Link></span></p>
            <Button className='reg-btn' id="sendsignup" name="sendsignup" type="submit" variant="contained">Login</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login