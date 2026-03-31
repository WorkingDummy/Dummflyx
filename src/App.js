import './App.css';
import React, { useState } from 'react';
import Row from './Row';
import Banner from './Banner';
import Nav from './Nav';
import requests from './request';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchFetchUrl = `/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(searchQuery)}&include_adult=false`;

  return (
    <div className="App">
      <Nav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {!searchQuery && <Banner />}
      {searchQuery ? (
        <div className="search__results">
          <Row
            title={`Search Results for "${searchQuery}"`}
            fetchUrl={searchFetchUrl}
            isLargeRow
            searchQuery={searchQuery}
          />
          <div className="search__footer">
            <p>End of search results for "{searchQuery}"</p>
          </div>
        </div>
      ) : (
        <>
          <Row
            title="NETFLIX ORIGINALS" 
            fetchUrl={requests.fetchNetflixOriginals}
            isLargeRow
          />
          <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
          <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
          <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
          <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
          <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
          <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
        </>
      )}
    </div>
  );
}

export default App;