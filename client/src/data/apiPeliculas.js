const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const URL = `${API_URL}/api/peliculas`;

// Obtener todas las películas
export const getAllMovies = async () => {
  const res = await fetch(URL);
  if (!res.ok) throw new Error('Error al obtener películas');
  return res.json();
};

// Obtener película por ID
export const getMovieById = async (id_pelicula) => {
  const res = await fetch(`${URL}/${id_pelicula}`);
  if (!res.ok) throw new Error('Error al obtener la película');
  return res.json();
};

// Crear nueva película
export const createMovie = async (movie) => {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });
  if (!res.ok) throw new Error('Error al crear la película');
  return res.json();
};

// Actualizar película
export const updateMovie = async (id_pelicula, movie) => {
  const res = await fetch(`${URL}/${id_pelicula}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });
  if (!res.ok) throw new Error('Error al actualizar la película');
  return res.json();
};

// Eliminar película
export const deleteMovie = async (id_pelicula) => {
  const res = await fetch(`${URL}/${id_pelicula}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar la película');
  return res.json();
};
