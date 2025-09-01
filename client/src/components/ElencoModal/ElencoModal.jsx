import React, { useEffect, useState } from 'react';
import './ElencoModal.css';
import { getAllActors } from '../../data/apiActor';

const ElencoModal = ({ member, onClose, onSave, id_pelicula }) => {
  const [editedMember, setEditedMember] = useState({
    id_actor: '',
    personaje: '',
    url_personaje: '',
    id_pelicula
  });
  const [actors, setActors] = useState([]);

  // 🔹 Cargar actores y actualizar estado al abrir modal
  useEffect(() => {
    const fetchActors = async () => {
      try {
        const data = await getAllActors();
        setActors(data.filter(a => a.status)); // solo activos
      } catch (error) {
        console.error('Error al cargar actores:', error);
      }
    };
    fetchActors();

    if (member) {
      setEditedMember(member);
    } else {
      setEditedMember({
        id_actor: '',
        personaje: '',
        url_personaje: '',
        id_pelicula
      });
    }
  }, [member, id_pelicula]);

  // 🔹 Manejo de cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMember(prev => ({ ...prev, [name]: value }));
  };

  // 🔹 Guardar miembro
  const handleSave = () => {
    if (!editedMember.id_actor || !editedMember.personaje) {
      alert('Debe seleccionar un actor y escribir un personaje');
      return;
    }
    onSave(editedMember);
  };

  if (!editedMember) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{member ? 'Editar miembro del elenco' : 'Agregar miembro al elenco'}</h2>
        <form>
          <div className="form-grid">
            <div className="form-group">
              <label>Actor:</label>
              <select
                name="id_actor"
                value={editedMember.id_actor}
                onChange={handleChange}
              >
                <option value="">Selecciona un actor</option>
                {actors.map(actor => (
                  <option key={actor.id_actor} value={actor.id_actor}>
                    {actor.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Personaje:</label>
              <input
                type="text"
                name="personaje"
                value={editedMember.personaje}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>URL de la imagen del personaje:</label>
              <input
                type="text"
                name="url_personaje"
                value={editedMember.url_personaje}
                onChange={handleChange}
                placeholder="https://..."
              />
              {editedMember.url_personaje && (
                <img
                  class="image-preview"
                  src={editedMember.url_personaje}
                  alt={editedMember.personaje}
                />
              )}
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

export default ElencoModal;
