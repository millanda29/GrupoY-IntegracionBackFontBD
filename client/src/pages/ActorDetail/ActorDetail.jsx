import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ActorDetail.css';
import { useModal } from '../../context/ModalContext.jsx';
import ActorModal from '../../components/ActorModal/ActorModal';
import ActorMovies from '../../components/ActorMovies/ActorMovies';
import { getActorById, updateActor, deleteActor } from '../../data/apiActor'; // 🔹 Centralizar API

const ActorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [actor, setActor] = useState(null);

  // 🔹 Obtener actor desde backend al montar
  useEffect(() => {
    const fetchActor = async () => {
      try {
        const data = await getActorById(id); // 🔹 Llamada API centralizada
        setActor(data);
      } catch (error) {
        console.error(error);
        showModal('⚠️ Actor no encontrado');
        navigate('/actors');
      }
    };
    fetchActor();
  }, [id, navigate, showModal]);

  // 🔹 Abrir / cerrar modal de edición
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  // 🔹 Guardar cambios en backend
  const handleSave = async (editedActor) => {
    try {
      const updatedActor = await updateActor(id, editedActor); // 🔹 API centralizada
      setActor(updatedActor);
      setIsEditing(false);
      showModal('✅ ¡Guardado exitoso!');
    } catch (error) {
      console.error(error);
      showModal('❌ Error al guardar actor');
    }
  };

  // 🔹 Eliminar actor (lógico)
  const handleDelete = async () => {
    try {
      await deleteActor(id); // 🔹 API centralizada
      showModal('🗑️ ¡Actor eliminado!');
      navigate('/actors');
    } catch (error) {
      console.error(error);
      showModal('❌ Error al eliminar actor');
    }
  };

  if (!actor) return <div>Cargando...</div>;

  return (
    <div className="actor-detail-container">
      {/* Botón de regreso */}
      <button onClick={() => navigate(-1)} className="back-button">
        ⬅️ Regresar
      </button>

      {/* Tarjeta de detalle */}
      <div className="actor-detail-card">
        <div className="actor-detail-image">
          <img src={actor.url_foto || '/default-actor.png'} alt={actor.nombre} />
        </div>
        <div className="actor-detail-content">
          <h1>{actor.nombre}</h1>
          <div className="actor-detail-actions">
            <button className="edit-button" onClick={handleEdit}>
              ✏️ Editar
            </button>
            <button className="delete-button" onClick={handleDelete}>
              🗑️ Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* Películas relacionadas */}
      <ActorMovies id_actor={actor.id_actor} />

      {/* Modal de edición */}
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
