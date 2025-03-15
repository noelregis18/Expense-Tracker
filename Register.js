import React, { useEffect, useState } from 'react';
import "./Register.css";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";




function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    await axios.post("http://localhost:8080/api/v1/register", user)
    alert("Registration Successfully Done!");

    navigate("/login")
    setUser({
      name: "",
      email: "",
      password: "",
      cPassword: ""
    })
  }
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate('/')
    }
  }, [navigate])

  return (
    <div className='register'>
      <div className='register-container'>
        <div className='app-name-logo'>
          <h1>Money<span>Tracker</span></h1>
        </div>
        <div className='input-box'>
          <form onSubmit={handleSubmit}>
            <TextField onChange={handleInputChange} name="name" value={user.name} type="text" className='name' id="name" label="Name" variant="standard" />
            <TextField onChange={handleInputChange} name="email" value={user.email} type="email" className='name' id="email" label="Email" variant="standard" />
            <TextField onChange={handleInputChange} name="password" value={user.password} type="password" className='name' id="password" label="Password" variant="standard" />
            <TextField onChange={handleInputChange} name="cPassword" value={user.cPassword} type="password" className='name' id="cpassword" label="Confirm Password" variant="standard" />
            <p>Already have an account <span><Link to="/login">Login</Link></span></p>
            <Button className='reg-btn' id="sendsignup" name="sendsignup" type="submit" variant="contained">Signup</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register