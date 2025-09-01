const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const URL = `${API_URL}/api/elenco`;

// Obtener todo el elenco
export const getAllElenco = async () => {
  const res = await fetch(URL);
  if (!res.ok) throw new Error('Error al obtener el elenco');
  return res.json();
};

// Obtener un registro de elenco por ID
export const getElencoById = async (id_elenco) => {
  const res = await fetch(`${URL}/${id_elenco}`);
  if (!res.ok) throw new Error('Error al obtener el registro de elenco');
  return res.json();
};

// Obtener elenco de una película específica
export const getElencoByMovie = async (id_pelicula) => {
  const res = await fetch(`${URL}/pelicula/${id_pelicula}`);
  if (!res.ok) throw new Error('Error al obtener elenco de la película');
  return res.json();
};

// Crear un nuevo registro de elenco
export const createElenco = async (elenco) => {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(elenco),
  });
  if (!res.ok) throw new Error('Error al crear el registro de elenco');
  return res.json();
};

// Actualizar un registro de elenco
export const updateElenco = async (id_elenco, elenco) => {
  const res = await fetch(`${URL}/${id_elenco}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(elenco),
  });
  if (!res.ok) throw new Error('Error al actualizar el registro de elenco');
  return res.json();
};

// Eliminar un registro de elenco
export const deleteElenco = async (id_elenco) => {
  const res = await fetch(`${URL}/${id_elenco}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar el registro de elenco');
  return res.json();
};
