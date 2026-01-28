import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Added FaTimes for close icon
import '../style/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
          <button className="close-menu" onClick={closeMenu} aria-label="Close menu">
            <FaTimes />
          </button>
          <Link to='/' onClick={closeMenu}>All Users</Link>
          <Link to='/create-user' onClick={closeMenu}>Create a new User</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;