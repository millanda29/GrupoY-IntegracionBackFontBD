import React, { useEffect, useState } from 'react';
import './ActorMovies.css';
import { Link } from 'react-router-dom';

const ActorMovies = ({ id_actor }) => {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    const fetchActorMovies = async () => {
      try {
        // Obtener elenco donde participe el actor
        const responseElenco = await fetch(`http://localhost:4000/api/elenco`);
        if (!responseElenco.ok) throw new Error('Error fetching elenco');
        const elencoData = await responseElenco.json();

        // Filtrar solo los registros de este actor
        const actorMovies = elencoData.filter(e => e.id_actor === id_actor);

        // Obtener detalles de cada película
        const moviesPromises = actorMovies.map(async (actorMovie) => {
          const responseMovie = await fetch(`http://localhost:4000/api/peliculas/${actorMovie.id_pelicula}`);
          if (!responseMovie.ok) throw new Error('Error fetching movie');
          const movieData = await responseMovie.json();
          return {
            ...movieData,
            personaje: actorMovie.personaje,
            url_personaje: actorMovie.url_personaje // si quieres mostrar imagen del personaje
          };
        });

        const moviesResult = await Promise.all(moviesPromises);
        setMoviesData(moviesResult);

      } catch (error) {
        console.error(error);
      }
    };

    fetchActorMovies();
  }, [id_actor]);

  if (moviesData.length === 0) {
    return <p>Este actor no tiene películas registradas.</p>;
  }

  return (
    <div className="actor-movies">
      <h3>Películas en las que participó</h3>
      <div className="movies-list">
        {moviesData.map(movie => (
          <Link
            to={`/movie/${movie.id_pelicula}`}
            key={movie.id_pelicula}
            className="movie-member"
          >
            <img src={movie.url_portada || '/placeholder-movie.png'} alt={movie.titulo} />
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
