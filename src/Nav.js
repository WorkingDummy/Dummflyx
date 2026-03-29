import React, { useState, useEffect } from 'react';
import './Nav.css';

function Nav({ user }) { 
  const [show, handleShow] = useState(false);

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
      <a href="https://www.facebook.com/markmasayda.cerdena" target="_blank" rel="noopener noreferrer">
  <img
    className="nav__avatar"
    src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
    alt="Facebook Profile"
  />
</a>
    </div>
  );
}

export default Nav;