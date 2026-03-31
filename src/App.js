import './App.css';
import React, { useState } from 'react';
import Row from './Row';
import Banner from './Banner';
import Nav from './Nav';
import requests from './request';

function App() {
  
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="App">
      <Nav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {!searchQuery && <Banner />}
      
      <Row
        title="NETFLIX ORIGINALS" 
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
        searchQuery={searchQuery}
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} searchQuery={searchQuery} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} searchQuery={searchQuery} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} searchQuery={searchQuery} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} searchQuery={searchQuery} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} searchQuery={searchQuery} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} searchQuery={searchQuery} />
      
      {searchQuery && (
        <div className="search__footer">
          <p>End of search results for "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}

export default App;