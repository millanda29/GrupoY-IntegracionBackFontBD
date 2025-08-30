import React from 'react';
import './ActorMovies.css';
import elenco from '../../data/elenco';
import { movies } from '../../data/movies';
import { Link } from 'react-router-dom';

const ActorMovies = ({ id_actor }) => {
  const actorMovies = elenco.filter(item => item.id_actor === id_actor);
  const moviesData = actorMovies.map(actorMovie => {
    const movie = movies.find(movie => movie.id_pelicula === actorMovie.id_pelicula);
    return {
      ...movie,
      personaje: actorMovie.personaje
    };
  });

  return (
    <div className="actor-movies">
      <h3>Películas en las que participó</h3>
      <div className="movies-list">
        {moviesData.map(movie => (
          <Link to={`/movie/${movie.id_pelicula}`} key={movie.id_pelicula} className="movie-member">
            <img src={movie.url_portada} alt={movie.titulo} />
            <div className="movie-member-info">
              <strong>{movie.titulo}</strong>
              <span>{movie.personaje}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ActorMovies;
