import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axios';
import requests from './request';
import './Banner.css';

function Banner() {
  const [movie, setMovie] = useState([]);
  const [allMovies, setAllMovies] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const results = request.data.results;
      setAllMovies(results);
      
      setMovie(
        results[Math.floor(Math.random() * results.length)]
      );
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (allMovies.length === 0) return;

    const interval = setInterval(() => {
      setMovie(allMovies[Math.floor(Math.random() * allMovies.length)]);
    }, 10000); 

    return () => clearInterval(interval); 
  }, [allMovies]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  // Navigate to the internal /mylist route
  const handleMyListClick = () => {
    navigate("/mylist");
  };

  return (
    <header 
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
          <div className="banner__buttons">
          <button className="banner__button">Play</button>
          
          <button 
            className="banner__button" 
            onClick={handleMyListClick}
          >
            My List
          </button>
        </div>

        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;