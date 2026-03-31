import React, { useState, useEffect, useRef } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";

const base_url = "https://image.tmdb.org/t/p/original/";
const API_KEY = process.env.REACT_APP_API_KEY; 

function Row({ title, fetchUrl, isLargeRow, searchQuery }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [hoverTimer, setHoverTimer] = useState(null);
  const [leaveTimer, setLeaveTimer] = useState(null); 
  const rowRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (fetchUrl.includes("query=") && !searchQuery) return;
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [fetchUrl, searchQuery]);

  const handleMouseEnter = (movie) => {
    if (leaveTimer) {
      clearTimeout(leaveTimer);
      setLeaveTimer(null);
    }
    if (hoverTimer) clearTimeout(hoverTimer);

    const timer = setTimeout(async () => {
      try {
        let type = movie.media_type || (movie.first_air_date ? "tv" : "movie");
        const request = await axios.get(`/${type}/${movie.id}/videos?api_key=${API_KEY}`);
        
        const video = request.data.results?.find(v => v.site === "YouTube" && v.type === "Trailer") || 
                      request.data.results?.find(v => v.site === "YouTube" && v.type === "Teaser") ||
                      request.data.results?.[0];

        if (video) setTrailerUrl(video.key);
      } catch (error) {
        console.error("TMDB Video Fetch Error:", error);
      }
    }, 1000); 
    
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
    const timer = setTimeout(() => {
      setTrailerUrl(""); 
    }, 800); 
    setLeaveTimer(timer);
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters" ref={rowRef}>
        {movies.map((movie) => (
          movie.poster_path && (
            <img
              key={movie.id}
              onMouseEnter={() => handleMouseEnter(movie)}
              onMouseLeave={handleMouseLeave}
              className="row__poster row__posterLarge"
              src={`${base_url}${movie.poster_path}`}
              alt={movie.name || movie.title}
            />
          )
        ))}
      </div>
      
      <div className={`row__youtube ${trailerUrl ? "row__youtube--active" : ""}`}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;