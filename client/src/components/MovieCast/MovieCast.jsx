import React, { useEffect, useState } from 'react';
import './MovieCast.css';
import { Link } from 'react-router-dom';

const MovieCast = ({ id_pelicula }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        // Obtener elenco de la película
        const responseElenco = await fetch(`http://localhost:4000/api/elenco/pelicula/${id_pelicula}`);
        if (!responseElenco.ok) throw new Error('Error fetching cast');
        const elencoData = await responseElenco.json();

        // Obtener datos de todos los actores necesarios
        const actorIds = elencoData.map(e => e.id_actor);
        const actorPromises = actorIds.map(id =>
          fetch(`http://localhost:4000/api/actores/${id}`).then(res => res.json())
        );
        const actorsData = await Promise.all(actorPromises);

        // Combinar datos del actor con el personaje
        const castCombined = elencoData.map(elenco => {
          const actor = actorsData.find(a => a.id_actor === elenco.id_actor);
          return {
            ...elenco,
            actor
          };
        });

        setCast(castCombined);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCast();
  }, [id_pelicula]);

  return (
    <div className="movie-cast">
      <h3>Elenco</h3>
      <div className="cast-list">
        {cast.map(member => (
          <Link
            to={`/actor/${member.id_actor}`}
            key={member.id_elenco}
            className="cast-member"
          >
            <img
              src={member.url_personaje || member.actor?.url_foto || '/placeholder-actor.png'}
              alt={member.actor?.nombre || 'Actor'}
            />
            <div className="cast-member-info">
              <strong>{member.actor?.nombre || 'Desconocido'}</strong>
              <span>{member.personaje}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieCast;
