import React, { useState, useEffect, useRef } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow, searchQuery }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [hoverTimer, setHoverTimer] = useState(null); // Timer for hover delay
  const rowRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results || []);
        return request;
      } catch (error) {
        console.error("Error fetching data:", error);
        setMovies([]);
      }
    }
    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    const el = rowRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);

  const filteredMovies = movies.filter((movie) => {
    if (!searchQuery) return true;
    const name = (movie?.name || movie?.title || movie?.original_name || "").toLowerCase();
    return name.includes(searchQuery.toLowerCase());
  });

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  // --- Dynamic YouTube Hover Logic ---
  const handleMouseEnter = (movie) => {
    // Wait 600ms before searching YouTube to avoid spamming API while scrolling
    const timer = setTimeout(() => {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          if (url) {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
          }
        })
        .catch((error) => console.log("Trailer search error:", error));
    }, 600);
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    if (hoverTimer) clearTimeout(hoverTimer); // Cancel search if mouse moves away quickly
    setTrailerUrl(""); // Close trailer
  };

  if (searchQuery && filteredMovies.length === 0) return null;

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters" ref={rowRef}>
        {filteredMovies.map((movie) => (
          <img
            key={movie.id}
            onMouseEnter={() => handleMouseEnter(movie)}
            onMouseLeave={handleMouseLeave}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      
      <div className={`row__youtube ${trailerUrl ? "row__youtube--active" : ""}`}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;