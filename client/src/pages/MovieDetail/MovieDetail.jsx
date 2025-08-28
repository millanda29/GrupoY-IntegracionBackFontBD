import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = {
    id_pelicula: id,
    titulo: 'Pixeles',
    anio: 2015,
    genero: 'Acción/Comedia',
    duracion: '1h 45m',
    descripcion: 'Excampeones de juegos de arcade deben jugar una última partida contra alienígenas que imitan videojuegos retro.',
    fecha_estreno: '2015-07-24',
    director: 'Chris Columbus',
    musica: 'Henry Jackman',
    historia: 'Tim Herlihy, Patrick Jean',
    guion: 'Chris Columbus, Tim Herlihy, Timothy Dowling',
    url_portada: 'https://upload.wikimedia.org/wikipedia/en/2/20/Pixels_2015_film_poster.jpg'
  };

  return (
    <div className="movie-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        Regresar
      </button>
      <div className="movie-detail-card">
        <div className="movie-detail-image">
          <img src={movie.url_portada} alt={movie.titulo} />
        </div>
        <div className="movie-detail-content">
          <h1>{movie.titulo}</h1>
          <p><strong>Año:</strong> {movie.anio}</p>
          <p><strong>Género:</strong> {movie.genero}</p>
          <p><strong>Duración:</strong> {movie.duracion}</p>
          <p><strong>Fecha de Estreno:</strong> {movie.fecha_estreno}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Música:</strong> {movie.musica}</p>
          <p><strong>Historia:</strong> {movie.historia}</p>
          <p><strong>Guión:</strong> {movie.guion}</p>
          <p><strong>Descripción:</strong> {movie.descripcion}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
