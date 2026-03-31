import React, { useState, useEffect } from 'react';
import './Nav.css';

function Nav({ user, searchQuery, setSearchQuery }) { 
  const [show, handleShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const transitionNavBar = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };

    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
      />

      <div className="nav__right">
        <div className={`nav__search ${showSearch && "nav__search--active"}`}>
          <button 
            className="nav__searchBtn" 
            onClick={() => setShowSearch(!showSearch)}
          >
            🔍
          </button>
          
        
          <input 
            type="text" 
            placeholder="Titles, people, genres" 
            className="nav__input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <a href="https://www.facebook.com/markmasayda.cerdena" target="_blank" rel="noopener noreferrer">
          <img
            className="nav__avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
            alt="Facebook Profile"
          />
        </a>
      </div>
    </div>
  );
}

export default Nav;