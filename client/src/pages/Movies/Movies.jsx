import React from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Movies.css';

const Movies = () => {
  const movies = [
    {
      id_pelicula: 1,
      titulo: 'Movie 1',
      descripcion: 'This is a description for movie 1.',
      url_portada: 'https://via.placeholder.com/300x200',
      genero: 'Action',
      fecha_estreno: '2023-01-01'
    },
    {
      id_pelicula: 2,
      titulo: 'Movie 2',
      descripcion: 'This is a description for movie 2.',
      url_portada: 'https://via.placeholder.com/300x200',
      genero: 'Comedy',
      fecha_estreno: '2023-02-01'
    },
    {
      id_pelicula: 3,
      titulo: 'Movie 3',
      descripcion: 'This is a description for movie 3.',
      url_portada: 'https://via.placeholder.com/300x200',
      genero: 'Drama',
      fecha_estreno: '2023-03-01'
    },
    {
        id_pelicula: 4,
        titulo: 'Movie 4',
        descripcion: 'This is a description for movie 4.',
        url_portada: 'https://via.placeholder.com/300x200',
        genero: 'Thriller',
        fecha_estreno: '2023-04-01'
      },
      {
        id_pelicula: 5,
        titulo: 'Movie 5',
        descripcion: 'This is a description for movie 5.',
        url_portada: 'https://via.placeholder.com/300x200',
        genero: 'Sci-Fi',
        fecha_estreno: '2023-05-01'
      },
      {
        id_pelicula: 6,
        titulo: 'Movie 6',
        descripcion: 'This is a description for movie 6.',
        url_portada: 'https://via.placeholder.com/300x200',
        genero: 'Horror',
        fecha_estreno: '2023-06-01'
      }
  ];

  return (
    <div className="movies-page">
      <h1>Peliculas</h1>
      <div className="movies-container">
        {movies.map(movie => (
          <MovieCard
            key={movie.id_pelicula}
            id_pelicula={movie.id_pelicula}
            titulo={movie.titulo}
            descripcion={movie.descripcion}
            url_portada={movie.url_portada}
            genero={movie.genero}
            fecha_estreno={movie.fecha_estreno}
          />
        ))}
      </div>
    </div>
  );
};

export default Movies;
