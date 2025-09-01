import React, { useEffect, useState } from 'react';
import './MovieCast.css';
import { Link } from 'react-router-dom';
import { useModal } from '../../context/ModalContext.jsx';

// 🔹 API functions
import { 
  getElencoByMovie, 
  createElenco, 
  updateElenco, 
  deleteElenco
} from '../../data/apiElenco';
import { getActorById } from '../../data/apiActor';

// 🔹 Modal para crear/editar elenco
import ElencoModal from '../../components/ElencoModal/ElencoModal';

const MovieCast = ({ id_pelicula }) => {
  const [cast, setCast] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const { showModal } = useModal();

  // 🔹 Cargar elenco
  useEffect(() => {
    const fetchCast = async () => {
      try {
        const elencoData = await getElencoByMovie(id_pelicula);
        const actorsData = await Promise.all(
          elencoData.map(e => getActorById(e.id_actor))
        );
        const castCombined = elencoData.map(elenco => {
          const actor = actorsData.find(a => a.id_actor === elenco.id_actor);
          return { ...elenco, actor };
        });
        setCast(castCombined);
      } catch (error) {
        console.error('Error al cargar elenco:', error);
      }
    };
    if (id_pelicula) fetchCast();
  }, [id_pelicula]);

  // 🔹 Crear o editar miembro de elenco
  const handleSave = async (member) => {
    try {
      let savedMember;
      if (member.id_elenco) {
        savedMember = await updateElenco(member.id_elenco, member);
      } else {
        savedMember = await createElenco(member);
      }
      setCast(prev => {
        const exists = prev.find(c => c.id_elenco === savedMember.id_elenco);
        if (exists) {
          return prev.map(c => c.id_elenco === savedMember.id_elenco ? { ...c, ...savedMember } : c);
        }
        return [...prev, savedMember];
      });
      setIsModalOpen(false);
      showModal('¡Operación exitosa!');
    } catch (error) {
      console.error(error);
      showModal('Error al guardar miembro del elenco');
    }
  };

  // 🔹 Eliminar miembro (lógico)
  const handleDelete = async (id_elenco) => {
    try {
      await deleteElenco(id_elenco);
      setCast(prev => prev.map(c => c.id_elenco === id_elenco ? { ...c, status: false } : c));
      showModal('¡Miembro eliminado!');
    } catch (error) {
      console.error(error);
      showModal('Error al eliminar miembro del elenco');
    }
  };

  return (
    <div className="movie-cast">
      <h3>Elenco</h3>
      <button 
        className="add-actor"
        onClick={() => { setEditingMember(null); setIsModalOpen(true); }}
      >
        Agregar Actor
      </button>
      <div className="cast-list">
        {cast.map(member => (
          <div key={member.id_elenco} className="cast-member">
            <Link to={`/actor/${member.id_actor}`}>
              <img
                src={member.url_personaje || member.actor?.url_foto || '/placeholder-actor.png'}
                alt={member.actor?.nombre || 'Actor'}
              />
            </Link>
            <div className="cast-member-info">
              <strong>{member.actor?.nombre || 'Desconocido'}</strong>
              <span>{member.personaje}</span>
            </div>
            <div className="cast-actions">
              <button onClick={() => { setEditingMember(member); setIsModalOpen(true); }}>Editar</button>
              <button onClick={() => handleDelete(member.id_elenco)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ElencoModal
          member={editingMember}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          id_pelicula={id_pelicula}
        />
      )}
    </div>
  );
};

export default MovieCast;
