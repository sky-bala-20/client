import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Hamburger icon (three dots/lines)
import '../style/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">
        <h1 className="company-name">MY USER</h1>
      </div>
      <div className="navbar-links">
        <Link to='/'>All Users</Link> &nbsp; &nbsp;
        <Link to='/create-user'>Create a new User</Link>
      </div>
      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        <FaBars />
      </button>
      {isMenuOpen && (
        <div className="dropdown-menu">
          <Link to='/' onClick={toggleMenu}>All Users</Link>
          <Link to='/create-user' onClick={toggleMenu}>Create a new User</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;