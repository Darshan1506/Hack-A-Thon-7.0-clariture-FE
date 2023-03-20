import React from 'react'
import "./Navbar.css"
import { Button } from 'react-bootstrap'
import { useUserAuth } from '../context/UserAuthContext';
import { Navigate } from 'react-router-dom';
const Navbar = () => {
  const { logOut, user } = useUserAuth();
  const handleLogout = async () => {
    try {
      await logOut();
      Navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav class="navbar navbar-custom">
      <a class="navbar-brand">Clariture</a>
    </nav>
    

  )
}

export default Navbar