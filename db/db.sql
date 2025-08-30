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
-- TABLA ACTORES (mejorada con url_foto)
-- ===========================================
CREATE TABLE actores (
    id_actor SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    url_foto VARCHAR(255),               -- URL foto del actor
    status BOOLEAN DEFAULT TRUE
);

-- ===========================================
-- TABLA ELENCO (mejorada con url_personaje)
-- ===========================================
CREATE TABLE elenco (
    id_elenco SERIAL PRIMARY KEY,         
    id_pelicula INT NOT NULL REFERENCES peliculas(id_pelicula),
    id_actor INT NOT NULL REFERENCES actores(id_actor),
    personaje VARCHAR(150),
    url_personaje VARCHAR(255),          -- URL imagen/referencia del personaje
    status BOOLEAN DEFAULT TRUE,
    UNIQUE (id_pelicula, id_actor)       -- Evita duplicados de mismo actor en la misma película
);

-- ===========================================
-- INSERTAR PELÍCULA: Pixeles
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
-- ACTORES: Pixeles
-- ===========================================
INSERT INTO actores (nombre, url_foto) VALUES
('Adam Sandler', 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Adam_Sandler_2017.jpg'),
('Peter Dinklage', 'https://upload.wikimedia.org/wikipedia/commons/6/68/Peter_Dinklage_by_Gage_Skidmore.jpg'),
('Kevin James', 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Kevin_James_2011.jpg'),
('Michelle Monaghan', 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Michelle_Monaghan_2013.jpg'),
('Josh Gad', 'https://upload.wikimedia.org/wikipedia/commons/1/18/Josh_Gad_by_Gage_Skidmore.jpg'),
('Ashley Benson', 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Ashley_Benson_at_PaleyFest_2014.jpg');

-- ===========================================
-- ELENCO: Pixeles
-- ===========================================
INSERT INTO elenco (id_pelicula, id_actor, personaje, url_personaje) VALUES
(1, 1, 'Sam Brenner', 'https://static.wikia.nocookie.net/pixels/images/3/3c/Sam_Brenner.jpg'),
(1, 2, 'Eddie Plant', 'https://static.wikia.nocookie.net/pixels/images/4/41/Eddie_Plant.jpg'),
(1, 3, 'William Cooper', 'https://static.wikia.nocookie.net/pixels/images/5/55/President_Cooper.jpg'),
(1, 4, 'Violet Van Patten', 'https://static.wikia.nocookie.net/pixels/images/6/60/Violet.jpg'),
(1, 5, 'Ludlow Lamonsoff', 'https://static.wikia.nocookie.net/pixels/images/1/11/Ludlow.jpg'),
(1, 6, 'Lady Lisa', 'https://static.wikia.nocookie.net/pixels/images/0/0e/Lady_Lisa.jpg');

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
-- ACTORES: Inception
-- ===========================================
INSERT INTO actores (nombre, url_foto) VALUES
('Leonardo DiCaprio', 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Leonardo_DiCaprio_66ème_Festival_de_Venise_%28Mostra%29.jpg'),
('Joseph Gordon-Levitt', 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Joseph_Gordon-Levitt_2013.jpg'),
('Elliot Page', 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Elliot_Page_2021.jpg'),
('Tom Hardy', 'https://upload.wikimedia.org/wikipedia/commons/6/60/Tom_Hardy_Cannes_2015.jpg'),
('Ken Watanabe', 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Ken_Watanabe_2019.jpg'),
('Cillian Murphy', 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Cillian_Murphy-2014.jpg');

-- ===========================================
-- ELENCO: Inception
-- ===========================================
INSERT INTO elenco (id_pelicula, id_actor, personaje, url_personaje) VALUES
(2, 7, 'Dom Cobb', 'https://static.wikia.nocookie.net/inception/images/1/1e/DomCobb.jpg'),
(2, 8, 'Arthur', 'https://static.wikia.nocookie.net/inception/images/d/db/ArthurInception.jpg'),
(2, 9, 'Ariadne', 'https://static.wikia.nocookie.net/inception/images/6/6c/Ariadne.png'),
(2, 10, 'Eames', 'https://static.wikia.nocookie.net/inception/images/2/2a/EamesInception.jpg'),
(2, 11, 'Saito', 'https://static.wikia.nocookie.net/inception/images/0/0f/Saito.jpg'),
(2, 12, 'Robert Fischer', 'https://static.wikia.nocookie.net/inception/images/b/bc/RobertFischer.jpg');

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
-- ACTORES: The Matrix
-- ===========================================
INSERT INTO actores (nombre, url_foto) VALUES
('Keanu Reeves', 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Keanu_Reeves_2013.jpg'),
('Laurence Fishburne', 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Laurence_Fishburne_2017.jpg'),
('Carrie-Anne Moss', 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Carrie-Anne_Moss_2017.jpg'),
('Hugo Weaving', 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Hugo_Weaving_2014.jpg');

-- ===========================================
-- ELENCO: The Matrix
-- ===========================================
INSERT INTO elenco (id_pelicula, id_actor, personaje, url_personaje) VALUES
(3, 13, 'Neo', 'https://static.wikia.nocookie.net/matrix/images/6/6c/Neo.jpg'),
(3, 14, 'Morpheus', 'https://static.wikia.nocookie.net/matrix/images/2/20/Morpheus.jpg'),
(3, 15, 'Trinity', 'https://static.wikia.nocookie.net/matrix/images/e/e0/Trinity.jpg'),
(3, 16, 'Agent Smith', 'https://static.wikia.nocookie.net/matrix/images/7/7e/Agent_Smith.jpg');
