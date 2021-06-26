
import './App.css';
import React, { useState, useEffect } from 'react'
import MovieList from './components/movie-list'
import MovieDetail from './components/movie-details'
import MovieForm from './components/movie-form'
import {useCookies} from 'react-cookie'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

function App() {

  // eslint-disable-next-line no-unused-vars
  const [token, setToken, deleteToken] = useCookies(['mr-token'])
  const [movies, setMovies]=useState([]);
  const [selectedMovie,setSelectedMovie]=useState(null);
  const [editedMovie,setEditedMovie]=useState(null)

  useEffect(()=>{
    fetch("http://localhost:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Token ${token['mr-token']}`
      }
    })
    .then(resp => resp.json())
    .then(resp => setMovies(resp))
    .catch(error => console.log(error))
  }, [token])

  useEffect(()=>{
    console.log(token);
    if (!token['mr-token']) window.location.href = '/';
}, [token])

  const movieClicked = movie  =>{
    setSelectedMovie(movie);
    setEditedMovie(null);
  }

  const loadMovie =movie =>{
    setSelectedMovie(movie);
    setEditedMovie(null);
  }

  const editClicked =movie =>{
    setEditedMovie(movie);
    setSelectedMovie(null);
  }

  const updatedMovie = movie =>{
    const newMovies = movies.map(
      mov=>{
        if (movie.id === mov.id){
          return movie
        }
        return mov
      }
    )
      setMovies(newMovies)
  }

  const newMovie = () =>{
    setEditedMovie({title: '', description: ''});
    setSelectedMovie(null)
  }

  const newMovieCreated =movie =>{
    const neMovies = [...movies, movie];
    setMovies(neMovies)
  }

  const removeClicked = movie =>{
    const newMovies = movies.filter( mov=>{
      if (mov.id === movie.id){
        return false;
      }
      return true;
    })

    setMovies(newMovies)
  }

  const logoutUser=()=>{
    deleteToken(['mr-token']);
  }

  return (
    <div className="App">
      <header className="App-header">
      <h1>Movie Rater</h1>
      <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser}></FontAwesomeIcon>
      </header>
      <div className="layout">
        <div>
        <MovieList movies={movies} movieClicked={movieClicked} editClicked={editClicked}  removeClicked={removeClicked}/>
        <button onClick={newMovie}>New Movie</button>
        </div>
        <MovieDetail movie={selectedMovie} updateMovie={loadMovie}/>
        { editedMovie? <MovieForm movie={editedMovie} updatedMovie={updatedMovie} newMovieCreated={newMovieCreated}/>: null}
      </div>
    </div>
  );
}

export default App;
