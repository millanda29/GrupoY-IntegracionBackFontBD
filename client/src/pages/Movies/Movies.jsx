import React, { useState, useEffect } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Movies.css';
import MovieModal from '../../components/MovieModal/MovieModal';
import { useModal } from '../../context/ModalContext';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { showModal } = useModal();

  // 🔹 Cargar películas desde backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/peliculas');
        if (!response.ok) throw new Error('Error fetching movies');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error(error);
        showModal('Error al cargar películas');
      }
    };
    fetchMovies();
  }, [showModal]);

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  // 🔹 Guardar nueva película en backend
  const handleSaveNewMovie = async (newMovie, uploadedFile) => {
    try {
      if (uploadedFile) {
        // Si quieres, aquí se podría implementar subida real de archivos
        newMovie.url_portada = URL.createObjectURL(uploadedFile);
      }

      const response = await fetch('http://localhost:4000/api/peliculas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) throw new Error('Error creating movie');
      const createdMovie = await response.json();
      setMovies([...movies, createdMovie]);
      setIsCreateModalOpen(false);
      showModal('¡Película creada con éxito!');
    } catch (error) {
      console.error(error);
      showModal('Error al crear película');
    }
  };

  return (
    <div className="movies-page">
      <h1>Películas</h1>
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
