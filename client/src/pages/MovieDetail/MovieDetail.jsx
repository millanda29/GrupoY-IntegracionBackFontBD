import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetail.css';
import { movies as allMovies } from '../../data/movies';
import { useModal } from '../../context/ModalContext.jsx';
import MovieModal from '../../components/MovieModal/MovieModal';
import MovieCast from '../../components/MovieCast/MovieCast';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const selectedMovie = allMovies.find((m) => m.id_pelicula === parseInt(id));
    if (selectedMovie) {
      setMovie(selectedMovie);
    } else {
      console.error(`Movie with id ${id} not found`);
      navigate('/'); // Or show a not found component
    }
  }, [id, navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (editedMovie, uploadedFile) => {
    let movieToSave = { ...editedMovie };

    if (uploadedFile) {
      console.log('Simulando subida de imagen:', uploadedFile.name);
      movieToSave.url_portada = URL.createObjectURL(uploadedFile);
      console.log('Datos a guardar en la base de datos:', movieToSave);
    }

    setMovie(movieToSave);
    setIsEditing(false);
    showModal('¡Guardado exitoso!');
  };

  const handleDelete = () => {
    console.log(`Eliminar película con ID: ${id}`);
    // LLamada al api para eliminar la pelicula del backend
    showModal('¡Película eliminada!');
    navigate("/movies");
  };

  if (!movie) {
    return <div>Cargando...</div>;
  }

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
          <div className="movie-detail-actions">
            <button className="edit-button" onClick={handleEdit}>
              Editar
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <MovieCast id_pelicula={movie.id_pelicula} />

      {isEditing && (
        <MovieModal 
          movie={movie}
          onClose={handleCancel}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default MovieDetail;
