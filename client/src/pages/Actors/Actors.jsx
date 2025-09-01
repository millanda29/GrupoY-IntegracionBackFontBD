import React, { useState, useEffect } from 'react';
import ActorCard from '../../components/ActorCard/ActorCard';
import './Actors.css';
import ActorModal from '../../components/ActorModal/ActorModal';
import { useModal } from '../../context/ModalContext';
import { useNavigate } from 'react-router-dom';
import { getAllActors, createActor } from '../../data/apiActor'; // 🔹 Centralizar llamadas API

const Actors = () => {
  const [actorsData, setActorsData] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { showModal } = useModal();
  const navigate = useNavigate();

  // 🔹 Cargar actores desde el backend al montar
  useEffect(() => {
    const fetchActors = async () => {
      try {
        const data = await getAllActors(); // 🔹 Llamada centralizada
        setActorsData(data);
      } catch (error) {
        console.error('Error fetching actors:', error);
        showModal('⚠️ Error al cargar actores');
      }
    };
    fetchActors();
  }, [showModal]);

  // 🔹 Abrir y cerrar modal de creación
  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  // 🔹 Guardar nuevo actor en backend y actualizar estado
  const handleSaveNewActor = async (newActor) => {
    try {
      const createdActor = await createActor(newActor); // 🔹 API centralizada
      setActorsData((prev) => [...prev, createdActor]);
      setIsCreateModalOpen(false);
      showModal('✅ ¡Actor creado con éxito!');
    } catch (error) {
      console.error(error);
      showModal('❌ Error al crear actor');
    }
  };

  // 🔹 Navegar a detalle del actor
  const handleViewMore = (id) => navigate(`/actor/${id}`);

  return (
    <div className="actors-page">
      <h1>🎭 Actores</h1>
      <div className="actors-container">
        {actorsData.map((actor) => (
          <ActorCard
            key={actor.id_actor}
            actor={actor}
            onViewMore={() => handleViewMore(actor.id_actor)}
          />
        ))}
      </div>

      {/* Botón flotante para abrir modal */}
      <button className="fab" onClick={handleOpenCreateModal}>
        +
      </button>

      {/* Modal de creación de actor */}
      {isCreateModalOpen && (
        <ActorModal
          onClose={handleCloseCreateModal}
          onSave={handleSaveNewActor}
        />
      )}
    </div>
  );
};

export default Actors;
