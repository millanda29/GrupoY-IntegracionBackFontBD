import React, { useState } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Movies.css';
import { movies as initialMovies } from '../../data/movies';
import MovieModal from '../../components/MovieModal/MovieModal';
import { useModal } from '../../context/ModalContext';

const Movies = () => {
  const [movies, setMovies] = useState(initialMovies);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { showModal } = useModal();

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleSaveNewMovie = (newMovie, uploadedFile) => {
    console.log('Guardando nueva película:', newMovie);
    if (uploadedFile) {
      console.log('Simulando subida de imagen:', uploadedFile.name);
      newMovie.url_portada = URL.createObjectURL(uploadedFile);
    }
    // Aquí iría la lógica para guardar en la base de datos y obtener el nuevo ID
    const newMovieWithId = { ...newMovie, id_pelicula: movies.length + 1 };
    setMovies([...movies, newMovieWithId]);
    setIsCreateModalOpen(false);
    showModal('¡Película creada con éxito!');
  };

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
      <button className="fab" onClick={handleOpenCreateModal}>+</button>
      {isCreateModalOpen && (
        <MovieModal 
          onClose={handleCloseCreateModal}
          onSave={handleSaveNewMovie}
        />
      )}
    </div>
  );
};

export default Movies;
