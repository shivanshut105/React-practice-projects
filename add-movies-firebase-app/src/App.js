import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addMovieHandler = async (movie) => {
    const response = await fetch('https://react-http-16739-default-rtdb.firebaseio.com/movies.json',{
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'applications/json'
      }
    })
    const data = await response.json();
    console.log(data);
  }

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try{
      const response = await fetch("https://react-http-16739-default-rtdb.firebaseio.com/movies.json");
      if(!response.ok){
        throw new Error('Something Went Wrong!');
      }

      const data = await response.json();

      const addedMovies = [];

      for(const key in data){
        addedMovies.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText,
        })
      }
      setMovies(addedMovies);
    }
    catch(error){
      setError(error.message);
    }
    setIsLoading(false);
}, []);

useEffect(()=>{
  fetchMoviesHandler();
}, [fetchMoviesHandler]);

let content = <p>No Movies Found!</p>;

if(movies.length > 0) content = <MoviesList movies={movies} />;

if(error) content = <p>{error}</p>

if(isLoading) content = <p>Loading...</p>;

return (
  <React.Fragment>
    <section>
      <AddMovie onAddMovie={addMovieHandler}/>
    </section>
    <section>
      <button onClick={fetchMoviesHandler}>Fetch Movies</button>
    </section>
    <section>
      {content}
    </section>
  </React.Fragment>
);
}

export default App;
