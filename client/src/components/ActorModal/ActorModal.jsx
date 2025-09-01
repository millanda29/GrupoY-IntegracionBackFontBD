import React, { useEffect, useState } from 'react';
import './ActorModal.css';

const ActorModal = ({ actor, onClose, onSave }) => {
  const [editedActor, setEditedActor] = useState(null);

  useEffect(() => {
    if (actor) {
      setEditedActor(actor);
    } else {
      setEditedActor({
        nombre: '',
        image: '' // URL de la imagen
      });
    }
  }, [actor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedActor({ ...editedActor, [name]: value });
  };

  const handleSave = () => {
    onSave(editedActor); // No necesitamos archivo, solo la URL
  };

  if (!editedActor) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{actor ? 'Editar Actor' : 'Crear Actor'}</h2>
        <form>
          <div className="form-grid">
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={editedActor.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>URL de la foto:</label>
              <input
                type="text"
                name="image"
                placeholder="https://ejemplo.com/foto.jpg"
                value={editedActor.image}
                onChange={handleChange}
              />
            </div>
          </div>

          {editedActor.image && (
            <div className="form-group full-width">
              <label>Vista previa:</label>
              <img
                src={editedActor.image}
                alt="Vista previa"
                className="image-preview"
              />
            </div>
          )}

          <div className="modal-actions">
            <button type="button" onClick={handleSave}>Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActorModal;
