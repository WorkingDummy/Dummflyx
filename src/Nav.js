import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';

function Nav({ searchQuery, setSearchQuery, setIsLoggedIn, userProfile }) { 
  const [show, handleShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 
  const navigate = useNavigate();

  const defaultAvatar = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";

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

  const goHome = () => {
    setSearchQuery(""); 
    setMenuOpen(false); 
    navigate("/home");  
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSignOut = () => {
    if (window.confirm("Do you want to sign out?")) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("activeProfile");
      setIsLoggedIn(false);
      setMenuOpen(false); 
      navigate("/login");
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
        onClick={goHome} 
      />

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

      <div className="nav__right">
        <div className="nav__hamburger" onClick={toggleMenu}>
          <img 
            src={userProfile?.image || defaultAvatar} 
            alt="active profile" 
            className="nav__avatarTiny" 
            style={{ width: '30px', height: '30px', borderRadius: '3px', marginRight: '10px', objectFit: 'cover' }}
          />
          <div className="nav__hamburgerLines">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className={`nav__menuMobile ${menuOpen && "nav__menuMobile--open"}`}>
        <div className="nav__menuContent">
          <img
            className="nav__avatarMobile"
            src={userProfile?.image || defaultAvatar} 
            alt={userProfile?.name || "Guest"}
            onClick={() => { navigate("/profiles"); setMenuOpen(false); }}
          />
          <h3 style={{ color: 'white', margin: '10px 0' }}>{userProfile?.name || "Guest"}</h3>
          
          <p onClick={() => { navigate("/profiles"); setMenuOpen(false); }} style={{ fontWeight: 'bold', color: '#e50914', cursor: 'pointer' }}>
            Switch Profile
          </p>
          <p onClick={() => { navigate("/mylist"); setMenuOpen(false); }} style={{ cursor: 'pointer' }}>My List</p>
          
          <div className="nav__menuDivider"></div>
          
          <button className="nav__actionBtn nav__signOutBtnMobile" onClick={handleSignOut}>
            Sign Out
          </button>
          
          <button className="nav__actionBtn nav__closeMenu" onClick={() => setMenuOpen(false)}>
            Close Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default Nav;