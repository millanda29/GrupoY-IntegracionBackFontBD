const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const URL = `${API_URL}/api/actores`;

// Obtener todos los actores
export const getAllActors = async () => {
  const res = await fetch(URL);
  if (!res.ok) throw new Error('Error al obtener actores');
  return res.json();
};

// Obtener actor por ID
export const getActorById = async (id_actor) => {
  const res = await fetch(`${URL}/${id_actor}`);
  if (!res.ok) throw new Error('Error al obtener el actor');
  return res.json();
};

// Crear nuevo actor
export const createActor = async (actor) => {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(actor),
  });
  if (!res.ok) throw new Error('Error al crear el actor');
  return res.json();
};

// Actualizar actor
export const updateActor = async (id_actor, actor) => {
  const res = await fetch(`${URL}/${id_actor}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(actor),
  });
  if (!res.ok) throw new Error('Error al actualizar el actor');
  return res.json();
};

// Eliminar actor
export const deleteActor = async (id_actor) => {
  const res = await fetch(`${URL}/${id_actor}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar el actor');
  return res.json();
};
