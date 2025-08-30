import React, { useState, useEffect } from 'react';
import './ActorModal.css';

const ActorModal = ({ actor, onClose, onSave }) => {
  const [editedActor, setEditedActor] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    if (actor) {
      setEditedActor(actor);
    } else {
      setEditedActor({
        nombre: '',
        image: ''
      });
    }
  }, [actor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedActor({ ...editedActor, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setEditedActor({ ...editedActor, image: URL.createObjectURL(file) });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      setEditedActor({ ...editedActor, image: URL.createObjectURL(file) });
    }
  };

  const handleSave = () => {
    onSave(editedActor, uploadedFile);
  };

  if (!editedActor) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{actor ? 'Editar Actor' : 'Crear Actor'}</h2>
        <form>
          <div className="form-grid">
            <div className="form-group">
              <label>Nombre:</label>
              <input type="text" name="nombre" value={editedActor.nombre} onChange={handleChange} />
            </div>
          </div>
          
          <div className="form-group full-width">
            <label>Foto:</label>
            <div 
              className="drop-zone" 
              onDrop={handleDrop} 
              onDragOver={handleDragOver}
              onClick={() => document.getElementById('file-input').click()}
            >
              {editedActor.image ? (
                <img src={editedActor.image} alt="Vista previa" className="image-preview" />
              ) : (
                <p>Arrastra una imagen aquí o haz clic para seleccionar</p>
              )}
              <input 
                type="file" 
                id="file-input"
                style={{ display: 'none' }} 
                onChange={handleFileChange} 
                accept="image/*"
              />
            </div>
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

export default ActorModal;
