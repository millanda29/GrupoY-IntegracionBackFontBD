import React, { useState, useEffect } from 'react';
import ActorCard from '../../components/ActorCard/ActorCard';
import './Actors.css';
import ActorModal from '../../components/ActorModal/ActorModal';
import { useModal } from '../../context/ModalContext';
import { useNavigate } from 'react-router-dom';

const Actors = () => {
  const [actorsData, setActorsData] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { showModal } = useModal();
  const navigate = useNavigate();

  // 🔹 Cargar actores desde el backend
  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/actores');
        const data = await response.json();
        setActorsData(data);
      } catch (error) {
        console.error('Error fetching actors:', error);
        showModal('Error al cargar actores');
      }
    };
    fetchActors();
  }, []);

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  // 🔹 Guardar nuevo actor en backend y actualizar estado
  const handleSaveNewActor = async (newActor) => {
    try {
      const response = await fetch('http://localhost:4000/api/actores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newActor),
      });

      if (!response.ok) throw new Error('Error creating actor');

      const createdActor = await response.json();
      setActorsData([...actorsData, createdActor]);
      setIsCreateModalOpen(false);
      showModal('¡Actor creado con éxito!');
    } catch (error) {
      console.error(error);
      showModal('Error al crear actor');
    }
  };

  const handleViewMore = (id) => navigate(`/actor/${id}`);

  return (
    <div className="actors-page">
      <h1>Actores</h1>
      <div className="actors-container">
        {actorsData.map(actor => (
          <ActorCard
            key={actor.id_actor}
            actor={actor}
            onViewMore={() => handleViewMore(actor.id_actor)}
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
