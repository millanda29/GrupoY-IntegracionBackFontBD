-- ===========================================
-- CREACIÓN DE BASE DE DATOS
-- ===========================================
CREATE DATABASE catalogo_peliculas;
\c catalogo_peliculas;

-- ===========================================
-- TABLA PELICULAS
-- ===========================================
CREATE TABLE peliculas (
    id_pelicula SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    anio INT NOT NULL CHECK (anio >= 1888), -- Primera película 1888
    genero VARCHAR(100),
    duracion VARCHAR(20),
    descripcion TEXT,
    fecha_estreno DATE,
    director VARCHAR(150),
    musica VARCHAR(150),
    historia VARCHAR(255),
    guion VARCHAR(255),
    url_portada VARCHAR(255)
);

-- ===========================================
-- TABLA ACTORES
-- ===========================================
CREATE TABLE actores (
    id_actor SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL
);

-- ===========================================
-- TABLA RELACIÓN (PELÍCULA - ACTORES)
-- ===========================================
CREATE TABLE elenco (
    id_pelicula INT REFERENCES peliculas(id_pelicula) ON DELETE CASCADE,
    id_actor INT REFERENCES actores(id_actor) ON DELETE CASCADE,
    personaje VARCHAR(150),
    PRIMARY KEY (id_pelicula, id_actor)
);

-- ===========================================
-- INSERTAR UNA PELÍCULA DE EJEMPLO (Pixeles)
-- ===========================================
INSERT INTO peliculas (
    titulo, anio, genero, duracion, descripcion, fecha_estreno,
    director, musica, historia, guion, url_portada
) VALUES (
    'Pixeles',
    2015,
    'Acción/Comedia',
    '1h 45m',
    'Excampeones de juegos de arcade deben jugar una última partida contra alienígenas que imitan videojuegos retro.',
    '2015-07-24',
    'Chris Columbus',
    'Henry Jackman',
    'Tim Herlihy, Patrick Jean',
    'Chris Columbus, Tim Herlihy, Timothy Dowling',
    'https://upload.wikimedia.org/wikipedia/en/2/20/Pixels_2015_film_poster.jpg'
);

-- ===========================================
-- INSERTAR ACTORES (Pixeles)
-- ===========================================
INSERT INTO actores (nombre) VALUES
('Adam Sandler'),
('Peter Dinklage'),
('Kevin James'),
('Michelle Monaghan'),
('Josh Gad'),
('Ashley Benson');

-- ===========================================
-- RELACIONAR ACTORES CON SUS PERSONAJES
-- ===========================================
INSERT INTO elenco (id_pelicula, id_actor, personaje) VALUES
(1, 1, 'Sam Brenner'),
(1, 2, 'Eddie Plant'),
(1, 3, 'William Cooper'),
(1, 4, 'Violet Van Patten'),
(1, 5, 'Ludlow Lamonsoff'),
(1, 6, 'Lady Lisa');
