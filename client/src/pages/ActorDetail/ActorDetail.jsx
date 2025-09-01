import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ActorDetail.css';
import { useModal } from '../../context/ModalContext.jsx';
import ActorModal from '../../components/ActorModal/ActorModal';
import ActorMovies from '../../components/ActorMovies/ActorMovies';

const ActorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [actor, setActor] = useState(null);

  // 🔹 Obtener actor desde backend
  useEffect(() => {
    const fetchActor = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/actores/${id}`);
        if (!response.ok) throw new Error('Actor not found');
        const data = await response.json();
        setActor(data);
      } catch (error) {
        console.error(error);
        showModal('Actor no encontrado');
        navigate('/actors');
      }
    };
    fetchActor();
  }, [id, navigate, showModal]);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  // 🔹 Guardar cambios en backend
  const handleSave = async (editedActor) => {
    try {
      const response = await fetch(`http://localhost:4000/api/actores/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedActor),
      });

      if (!response.ok) throw new Error('Error updating actor');
      const updatedActor = await response.json();
      setActor(updatedActor);
      setIsEditing(false);
      showModal('¡Guardado exitoso!');
    } catch (error) {
      console.error(error);
      showModal('Error al guardar actor');
    }
  };

  // 🔹 Eliminar actor (lógico)
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/actores/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error deleting actor');
      showModal('¡Actor eliminado!');
      navigate('/actors');
    } catch (error) {
      console.error(error);
      showModal('Error al eliminar actor');
    }
  };

  if (!actor) return <div>Cargando...</div>;

  return (
    <div className="actor-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        Regresar
      </button>
      <div className="actor-detail-card">
        <div className="actor-detail-image">
          <img src={actor.url_foto || '/default-actor.png'} alt={actor.nombre} />
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

      <ActorMovies id_actor={actor.id_actor} />

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
