import React, { useState, useEffect } from 'react';
import axios from "./axios";
import './MyList.css';
import './Row.css'; 

const base_url = "https://image.tmdb.org/t/p/original/";
const API_KEY = process.env.REACT_APP_API_KEY;

function MyList({ selectedProfile }) {
  const [myMovies, setMyMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("myList") || "[]");
    setMyMovies(list);
  }, []);

  useEffect(() => {
    if (!selectedMovie) return;

    async function fetchDetails() {
      try {
        let type = selectedMovie.media_type || (selectedMovie.first_air_date ? "tv" : "movie");
        
        const videoReq = await axios.get(`/${type}/${selectedMovie.id}/videos?api_key=${API_KEY}`);
        const video = videoReq.data.results?.find(v => v.type === "Trailer") || videoReq.data.results?.[0];
        setTrailerUrl(video?.key || "");

        if (type === "tv") {
          const epReq = await axios.get(`/tv/${selectedMovie.id}/season/1?api_key=${API_KEY}`);
          setEpisodes(epReq.data.episodes.slice(0, 10));
        } else {
          setEpisodes([]);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    }
    fetchDetails();
  }, [selectedMovie]);

  const removeFromList = (id) => {
    const updatedList = myMovies.filter(movie => movie.id !== id);
    setMyMovies(updatedList);
    localStorage.setItem("myList", JSON.stringify(updatedList));
    setSelectedMovie(null);
    setTrailerUrl("");
  };

  return (
    <div className="myList">
      
      <div className="myList__container">
        <h1>{selectedProfile?.name}'s List</h1>
        
        {myMovies.length > 0 ? (
          <div className="myList__grid">
            {myMovies.map((movie) => (
              <div 
                key={movie.id} 
                className={`myList__item ${selectedMovie?.id === movie.id && "myList__item--active"}`}
                onClick={() => setSelectedMovie(selectedMovie?.id === movie.id ? null : movie)}
              >
                <img 
                  src={`${base_url}${movie.poster_path}`} 
                  alt={movie.title || movie.name} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="myList__empty">
            <p>You haven't added any titles to your list yet.</p>
          </div>
        )}

        {selectedMovie && (
          <div className="row__detailView">
            <div className="row__youtubeContainer">
              {trailerUrl ? (
                <iframe
                  width="100%"
                  height="450"
                  src={`https://www.youtube.com/embed/${trailerUrl}?autoplay=1&mute=0`}
                  title="Movie Trailer"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="row__noTrailer">
                  <img src={`${base_url}${selectedMovie.backdrop_path}`} alt="Backdrop" />
                </div>
              )}
              <button className="row__closeButton" onClick={() => setSelectedMovie(null)}>✖</button>
            </div>

            <div className="row__movieInfo">
              <div className="row__infoHead">
                <h1>{selectedMovie?.title || selectedMovie?.name}</h1>
                <button 
                  className="row__removeBtn" 
                  onClick={() => removeFromList(selectedMovie.id)}
                >
                  Remove from List
                </button>
              </div>
              <p>{selectedMovie?.overview}</p>
              
              {episodes.length > 0 && (
                <div className="row__episodes">
                  <h3>Episodes (Season 1)</h3>
                  {episodes.map(ep => (
                    <div key={ep.id} className="row__episode">
                      <span className="ep__num">{ep.episode_number}</span>
                      <img src={`${base_url}${ep.still_path}`} alt="" />
                      <div className="ep__text">
                        <h4>{ep.name}</h4>
                        <p>{ep.overview?.slice(0, 80)}...</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyList;