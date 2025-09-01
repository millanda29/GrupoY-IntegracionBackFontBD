import React, { useState, useEffect } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Movies.css';
import MovieModal from '../../components/MovieModal/MovieModal';
import { useModal } from '../../context/ModalContext';
import { getAllMovies, createMovie } from '../../data/apiPeliculas'; // 🔹 Usamos las funciones del API

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { showModal } = useModal();

  // 🔹 Cargar películas desde backend usando apiPeliculas.js
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getAllMovies();
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
      // Si hay imagen subida manualmente
      if (uploadedFile) {
        newMovie.url_portada = URL.createObjectURL(uploadedFile);
      }

      const createdMovie = await createMovie(newMovie); // 🔹 Usamos la función del API
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

      {/* Botón para abrir modal de crear */}
      <button className="fab" onClick={handleOpenCreateModal}>+</button>

      {/* Modal de creación */}
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
