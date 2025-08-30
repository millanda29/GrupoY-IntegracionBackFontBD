import React, { useState } from 'react';
import ActorCard from '../../components/ActorCard/ActorCard';
import './Actors.css';
import actors from '../../data/actors';
import ActorModal from '../../components/ActorModal/ActorModal';
import { useModal } from '../../context/ModalContext';
import { useNavigate } from 'react-router-dom';

const Actors = () => {
  const [actorsData, setActorsData] = useState(actors);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { showModal } = useModal();
  const navigate = useNavigate();

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleSaveNewActor = (newActor) => {
    const newActorWithId = { ...newActor, id: actorsData.length + 1 };
    setActorsData([...actorsData, newActorWithId]);
    setIsCreateModalOpen(false);
    showModal('¡Actor creado con éxito!');
  };
  
  const handleViewMore = (id) => {
    navigate(`/actor/${id}`);
  };

  return (
    <div className="actors-page">
      <h1>Actores</h1>
      <div className="actors-container">
        {actorsData.map(actor => (
          <ActorCard
            key={actor.id}
            actor={actor}
            onViewMore={() => handleViewMore(actor.id)}
          />
        ))}
      </div>
      <button className="fab" onClick={handleOpenCreateModal}>+</button>
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