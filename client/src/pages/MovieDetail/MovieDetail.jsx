import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetail.css';
import { useModal } from '../../context/ModalContext.jsx';
import MovieModal from '../../components/MovieModal/MovieModal';
import MovieCast from '../../components/MovieCast/MovieCast';

// 🔹 Importamos funciones de la API
import { getMovieById, updateMovie, deleteMovie } from '../../data/apiPeliculas';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [movie, setMovie] = useState(null);

  // 🔹 Cargar película desde backend
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (error) {
        console.error(error);
        showModal('Película no encontrada');
        navigate('/movies'); // Redirige si no encuentra la película
      }
    };
    fetchMovie();
  }, [id, navigate, showModal]);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  // 🔹 Guardar cambios
  const handleSave = async (editedMovie, uploadedFile) => {
    try {
      const formData = { ...editedMovie };

      if (uploadedFile) {
        formData.url_portada = URL.createObjectURL(uploadedFile); // temporal
      }

      const updatedMovie = await updateMovie(id, formData);
      setMovie(updatedMovie);
      setIsEditing(false);
      showModal('¡Película actualizada exitosamente!');
    } catch (error) {
      console.error(error);
      showModal('Error al actualizar la película');
    }
  };

  // 🔹 Eliminar película
  const handleDelete = async () => {
    try {
      await deleteMovie(id);
      showModal('¡Película eliminada correctamente!');
      navigate('/movies');
    } catch (error) {
      console.error(error);
      showModal('Error al eliminar la película');
    }
  };

  if (!movie) return <div>Cargando...</div>;

  return (
    <div className="movie-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">Regresar</button>

      <div className="movie-detail-card">
        <div className="movie-detail-image">
          <img src={movie.url_portada || '/placeholder-movie.png'} alt={movie.titulo} />
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
            <button className="edit-button" onClick={handleEdit}>Editar</button>
            <button className="delete-button" onClick={handleDelete}>Eliminar</button>
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
