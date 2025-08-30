import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ActorDetail.css';
import actors from '../../data/actors';
import { useModal } from '../../context/ModalContext.jsx';
import ActorModal from '../../components/ActorModal/ActorModal';
import ActorMovies from '../../components/ActorMovies/ActorMovies';

const ActorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);

  const [actor, setActor] = useState(null);

  useEffect(() => {
    const selectedActor = actors.find((a) => a.id === parseInt(id));
    if (selectedActor) {
      setActor(selectedActor);
    } else {
      console.error(`Actor with id ${id} not found`);
      navigate('/actors'); // Or show a not found component
    }
  }, [id, navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (editedActor) => {
    // Here you would update the static data source
    // For now, just update the state
    setActor(editedActor);
    setIsEditing(false);
    showModal('¡Guardado exitoso!');
  };

  const handleDelete = () => {
    // Here you would update the static data source
    // For now, just navigate away
    showModal('¡Actor eliminado!');
    navigate("/actors");
  };

  if (!actor) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="actor-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        Regresar
      </button>
      <div className="actor-detail-card">
        <div className="actor-detail-image">
          <img src={actor.image} alt={actor.nombre} />
        </div>
        <div className="actor-detail-content">
          <h1>{actor.nombre}</h1>
          <div className="actor-detail-actions">
            <button className="edit-button" onClick={handleEdit}>
              Editar
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <ActorMovies id_actor={actor.id} />

      {isEditing && (
        <ActorModal 
          actor={actor}
          onClose={handleCancel}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ActorDetail;