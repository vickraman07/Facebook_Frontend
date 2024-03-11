import React from 'react';
import { Link } from 'react-router-dom';
import logo from './facebook-logo (1).jpg';
import './App.css';

function Navbar() {

    const linkStyle = {
        color: 'white', 
        textDecoration: 'none',
      };
  return (
    <nav className="navbar">
        <div id="logo">
          <img src={logo} alt="Facebook Logo" className="logo" />
        </div>
      <ul>
        <li>
          <Link to="/" style={linkStyle}>Home</Link>
        </li>
        <li>
          <Link to="/uploadpost" style={linkStyle}>Upload Post</Link>
        </li>
        <li>
          <Link to="/editpost" style={linkStyle}>Edit Post</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;