import React, { useState, useEffect, useRef } from "react";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/w500/";
const API_KEY = process.env.REACT_APP_API_KEY;

function Row({ title, fetchUrl, isLargeRow, searchQuery }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]); 
  const rowRef = useRef(null);

  const isSearching = searchQuery && searchQuery.length > 0;

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results || []);
    }
    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    if (selectedMovie && (selectedMovie.first_air_date || selectedMovie.media_type === "tv")) {
      async function fetchEpisodes() {
        try {
          const res = await axios.get(`/tv/${selectedMovie.id}/season/1?api_key=${API_KEY}`);
          setEpisodes(res.data.episodes.slice(0, 10));
        } catch (e) { setEpisodes([]); }
      }
      fetchEpisodes();
    }
  }, [selectedMovie, API_KEY]);

  const handleClick = async (movie) => {
    if (selectedMovie?.id === movie.id) {
      setSelectedMovie(null);
      setTrailerUrl("");
    } else {
      setSelectedMovie(movie);
      let type = movie.media_type || (movie.first_air_date ? "tv" : "movie");
      const res = await axios.get(`/${type}/${movie.id}/videos?api_key=${API_KEY}`);
      const video = res.data.results?.find(v => v.type === "Trailer") || res.data.results?.[0];
      setTrailerUrl(video?.key || "");
    }
  };

  const addToMyList = (movie) => {
    const currentList = JSON.parse(localStorage.getItem("myList") || "[]");
    const isAlreadyAdded = currentList.find(item => item.id === movie.id);
    
    if (!isAlreadyAdded) {
      const newList = [...currentList, movie];
      localStorage.setItem("myList", JSON.stringify(newList));
      alert("Added to My List!");
    } else {
      alert("Already in your list!");
    }
  };

  return (
    <div className={`row ${isSearching && "row__searchMode"}`}>
      {!isSearching && <h2>{title}</h2>}

      <div 
        className={isSearching ? "row__postersGrid" : "row__posters"} 
        ref={rowRef}
      >
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"} ${isSearching && "row__posterGridItem"}`}
            src={movie.poster_path 
              ? `${base_url}${movie.poster_path}` 
              : "https://via.placeholder.com/500x750?text=No+Image+Available"}
            alt={movie.name || movie.title}
          />
        ))}
      </div>

      {selectedMovie && (
        <div className="row__detailView">
          <div className="row__youtubeContainer">
            {trailerUrl ? (
              <iframe 
                width="100%" 
                height="450" 
                src={`https://www.youtube.com/embed/${trailerUrl}?autoplay=1&mute=1`} 
                frameBorder="0" 
                allowFullScreen
                title="YouTube Video"
              ></iframe>
            ) : (
              <div className="row__noTrailer">
                <img src={`${base_url}${selectedMovie.backdrop_path}`} alt="" />
              </div>
            )}
            <button className="row__closeButton" onClick={() => setSelectedMovie(null)}>✖</button>
          </div>

          <div className="row__movieInfo">
            <div className="row__infoHead">
              <h1>{selectedMovie?.title || selectedMovie?.name}</h1>
              <button className="row__addBtn" onClick={() => addToMyList(selectedMovie)}>+ My List</button>
            </div>
            <p>{selectedMovie?.overview}</p>
            
            {episodes.length > 0 && (
              <div className="row__episodes">
                <h3>Episodes (Season 1)</h3>
                {episodes.map(ep => (
                  <div key={ep.id} className="row__episode">
                    <span className="ep__num">{ep.episode_number}</span>
                    {ep.still_path && <img src={`${base_url}${ep.still_path}`} alt="" />}
                    <div className="ep__text">
                      <h4>{ep.name}</h4>
                      <p>{ep.overview ? ep.overview.slice(0, 80) : "No description available"}...</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Row;