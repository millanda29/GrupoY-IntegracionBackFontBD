import React, { useState, useEffect } from 'react';
import './MovieModal.css';

const MovieModal = ({ movie, onClose, onSave }) => {
  const [editedMovie, setEditedMovie] = useState(null);

  useEffect(() => {
    if (movie) {
      setEditedMovie(movie);
    } else {
      setEditedMovie({
        titulo: '',
        anio: '',
        genero: '',
        duracion: '',
        descripcion: '',
        url_portada: '',
        fecha_estreno: '',
        director: '',
        musica: '',
        historia: '',
        guion: ''
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMovie({ ...editedMovie, [name]: value });
  };

  const handleSave = () => {
    onSave(editedMovie);
  };

  if (!editedMovie) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{movie ? 'Editar Película' : 'Crear Película'}</h2>
        <form>
          <div className="form-grid">
            <div className="form-group">
              <label>Título:</label>
              <input type="text" name="titulo" value={editedMovie.titulo} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Año:</label>
              <input type="number" name="anio" value={editedMovie.anio} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Género:</label>
              <input type="text" name="genero" value={editedMovie.genero} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Duración:</label>
              <input type="text" name="duracion" value={editedMovie.duracion} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Fecha de Estreno:</label>
              <input type="date" name="fecha_estreno" value={editedMovie.fecha_estreno} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Director:</label>
              <input type="text" name="director" value={editedMovie.director} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Música:</label>
              <input type="text" name="musica" value={editedMovie.musica} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Historia:</label>
              <input type="text" name="historia" value={editedMovie.historia} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Guión:</label>
              <input type="text" name="guion" value={editedMovie.guion} onChange={handleChange} />
            </div>
          </div>
          
          <div className="form-group full-width">
            <label>Descripción:</label>
            <textarea name="descripcion" value={editedMovie.descripcion} onChange={handleChange}></textarea>
          </div>
          
          <div className="form-group full-width">
            <label>Portada (URL):</label>
            <input 
              type="text" 
              name="url_portada" 
              value={editedMovie.url_portada} 
              onChange={handleChange} 
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {editedMovie.url_portada && (
              <div className="image-preview-container">
                <img src={editedMovie.url_portada} alt="Vista previa" className="image-preview" />
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" onClick={handleSave}>Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieModal;
