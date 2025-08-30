import React from 'react';
import './MovieCast.css';
import elenco from '../../data/elenco';
import actors from '../../data/actors';
import { Link } from 'react-router-dom';

const MovieCast = ({ id_pelicula }) => {
  const cast = elenco.filter(item => item.id_pelicula === id_pelicula);
  const castActors = cast.map(castMember => {
    const actor = actors.find(actor => actor.id === castMember.id_actor);
    return {
      ...actor,
      personaje: castMember.personaje
    };
  });

  return (
    <div className="movie-cast">
      <h3>Elenco</h3>
      <div className="cast-list">
        {castActors.map(actor => (
          <Link to={`/actor/${actor.id}`} key={actor.id} className="cast-member">
            <img src={actor.image} alt={actor.nombre} />
            <div className="cast-member-info">
              <strong>{actor.nombre}</strong>
              <span>{actor.personaje}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieCast;
