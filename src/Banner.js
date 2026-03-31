import React, { useState, useEffect } from 'react';
import axios from './axios';
import requests from './request';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import './Banner.css';

function Banner() {
  const [movie, setMovie] = useState(null);
  const [allMovies, setAllMovies] = useState([]);
  const [trailerId, setTrailerId] = useState("");
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const results = request.data.results;
      setAllMovies(results);
      setMovie(results[Math.floor(Math.random() * results.length)]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (allMovies.length === 0) return;

    const interval = setInterval(() => {
      const randomMovie = allMovies[Math.floor(Math.random() * allMovies.length)];
      setMovie(randomMovie);
      setTrailerId(""); 
      setIsMuted(true);
    }, 15000); 

    return () => clearInterval(interval); 
  }, [allMovies]);

  useEffect(() => {
    if (movie) {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          if (url) {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerId(urlParams.get("v"));
          }
        })
        .catch((error) => console.log("Banner Trailer Error:", error));
    }
  }, [movie]);

  const handlePlay = () => {
    setIsMuted(!isMuted);
  };

  const handleMyList = () => {
    alert(`${movie?.title || movie?.name} has been added to your list!`);
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      mute: isMuted ? 1 : 0,
      loop: 1,
    },
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      {trailerId && (
        <div className="banner__videoContainer">
          <YouTube 
            videoId={trailerId} 
            opts={opts} 
            className="banner__video"
          />
        </div>
      )}

      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button" onClick={handlePlay}>
            {isMuted ? "Play (Unmute)" : "Mute"}
          </button>
          <button className="banner__button" onClick={handleMyList}>
            My List
          </button>
        </div>
        <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;