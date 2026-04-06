import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // 1. Import Framer Motion
import Row from './Row';
import Banner from './Banner';
import Nav from './Nav';
import Login from './Login';
import MyList from './MyList'; 
import ProfileSelection from './ProfileSelection'; 
import requests from './request';

const API_KEY = process.env.REACT_APP_API_KEY;

// 2. Simple animation wrapper for pages
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // 3. Track current path for transitions

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [userProfile, setUserProfile] = useState(() => {
    const savedProfile = localStorage.getItem("activeProfile");
    return savedProfile ? JSON.parse(savedProfile) : {
      name: "Guest",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
    };
  });

  useEffect(() => {
    localStorage.setItem("activeProfile", JSON.stringify(userProfile));
  }, [userProfile]);

  const searchFetchUrl = `/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(searchQuery)}&include_adult=false`;

  const handleSignIn = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true); 
    navigate("/profiles"); 
  };

  return (
    <div className="App">
      {/* 4. AnimatePresence handles the exit/enter timing */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          <Route path="/login" element={
            <PageWrapper>
              <Login onSignIn={handleSignIn} />
            </PageWrapper>
          } />

          <Route 
            path="/profiles" 
            element={
              isLoggedIn ? (
                <PageWrapper>
                  <ProfileSelection setUserProfile={setUserProfile} />
                </PageWrapper>
              ) : (
                <Navigate to="/login" />
              )
            } 
          />

          <Route 
            path="/mylist" 
            element={
              isLoggedIn ? (
                <PageWrapper>
                  <Nav 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} 
                    setIsLoggedIn={setIsLoggedIn}
                    userProfile={userProfile} 
                  />
                  <MyList 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} 
                    setIsLoggedIn={setIsLoggedIn} 
                  />
                </PageWrapper>
              ) : (
                <Navigate to="/login" />
              )
            } 
          />

          <Route 
            path="/home" 
            element={
              isLoggedIn ? (
                <PageWrapper>
                  <Nav 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} 
                    setIsLoggedIn={setIsLoggedIn} 
                    userProfile={userProfile} 
                  />
                  
                  {!searchQuery && <Banner />}
                  
                  {searchQuery ? (
                    <div className="search__results">
                      <Row title={`Search Results for "${searchQuery}"`} fetchUrl={searchFetchUrl} isLargeRow searchQuery={searchQuery} />
                    </div>
                  ) : (
                    <>
                      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
                      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
                      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
                      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
                      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
                      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
                      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
                    </>
                  )}
                </PageWrapper>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;