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
    url_portada VARCHAR(255),
    status BOOLEAN DEFAULT TRUE -- TRUE = activo, FALSE = eliminado lógicamente
);

-- ===========================================
-- TABLA ACTORES
-- ===========================================
CREATE TABLE actores (
    id_actor SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    status BOOLEAN DEFAULT TRUE
);

-- ===========================================
-- TABLA RELACIÓN (PELÍCULA - ACTORES)
-- ===========================================
CREATE TABLE elenco (
    id_elenco SERIAL PRIMARY KEY,             -- PK única para el registro
    id_pelicula INT NOT NULL REFERENCES peliculas(id_pelicula),
    id_actor INT NOT NULL REFERENCES actores(id_actor),
    personaje VARCHAR(150),
    status BOOLEAN DEFAULT TRUE,              -- TRUE = activo, FALSE = eliminado lógicamente
    UNIQUE (id_pelicula, id_actor)           -- Evita duplicados de mismo actor en la misma película
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

-- ===========================================
-- INSERTAR PELÍCULA: Inception
-- ===========================================
INSERT INTO peliculas (
    titulo, anio, genero, duracion, descripcion, fecha_estreno,
    director, musica, historia, guion, url_portada
) VALUES (
    'Inception',
    2010,
    'Ciencia Ficción/Acción',
    '2h 28m',
    'Un ladrón que roba secretos corporativos a través de los sueños recibe una misión especial.',
    '2010-07-16',
    'Christopher Nolan',
    'Hans Zimmer',
    'Christopher Nolan',
    'Christopher Nolan',
    'https://m.media-amazon.com/images/I/51zUbui+gbL._AC_SY450_.jpg'
);

-- ===========================================
-- INSERTAR ACTORES: Inception
-- ===========================================
INSERT INTO actores (nombre) VALUES
('Leonardo DiCaprio'),
('Joseph Gordon-Levitt'),
('Elliot Page'),
('Tom Hardy'),
('Ken Watanabe'),
('Cillian Murphy');

-- ===========================================
-- RELACIONAR ACTORES CON SUS PERSONAJES
-- ===========================================
INSERT INTO elenco (id_pelicula, id_actor, personaje) VALUES
(2, 7, 'Dom Cobb'),
(2, 8, 'Arthur'),
(2, 9, 'Ariadne'),
(2, 10, 'Eames'),
(2, 11, 'Saito'),
(2, 12, 'Robert Fischer');

-- ===========================================
-- INSERTAR PELÍCULA: The Matrix
-- ===========================================
INSERT INTO peliculas (
    titulo, anio, genero, duracion, descripcion, fecha_estreno,
    director, musica, historia, guion, url_portada
) VALUES (
    'The Matrix',
    1999,
    'Ciencia Ficción/Acción',
    '2h 16m',
    'Un hacker descubre la verdad sobre su realidad y lidera la rebelión contra las máquinas.',
    '1999-03-31',
    'Lana Wachowski, Lilly Wachowski',
    'Don Davis',
    'Lana Wachowski, Lilly Wachowski',
    'Lana Wachowski, Lilly Wachowski',
    'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg'
);

-- ===========================================
-- INSERTAR ACTORES: The Matrix
-- ===========================================
INSERT INTO actores (nombre) VALUES
('Keanu Reeves'),
('Laurence Fishburne'),
('Carrie-Anne Moss'),
('Hugo Weaving');

-- ===========================================
-- RELACIONAR ACTORES CON SUS PERSONAJES
-- ===========================================
INSERT INTO elenco (id_pelicula, id_actor, personaje) VALUES
(3, 13, 'Neo'),
(3, 14, 'Morpheus'),
(3, 15, 'Trinity'),
(3, 16, 'Agent Smith');

