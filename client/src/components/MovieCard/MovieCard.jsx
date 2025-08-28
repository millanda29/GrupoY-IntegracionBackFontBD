import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({
  id_pelicula,
  titulo = 'Título de la película',
  descripcion = 'Descripción de la película',
  url_portada = 'https://via.placeholder.com/150',
  fecha_estreno = 'Fecha de estreno',
  genero = 'Género'
}) => {

  return (
    <div className="movie-card">
      <div className="movie-card-image-container">
        <img src={url_portada} alt={titulo} className="movie-card-image" />
      </div>
      <div className="movie-card-content">
        <h3 className="movie-card-title">{titulo}</h3>
        <p className="movie-card-description">{descripcion}</p>
        <p className="movie-card-info"><strong>Género:</strong> {genero}</p>
        <p className="movie-card-info"><strong>Estreno:</strong> {fecha_estreno}</p>
        <Link to={`/movie/${id_pelicula}`} className="movie-card-button">
          Más información
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
