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
    anio INT NOT NULL CHECK (anio >= 1888),
    genero VARCHAR(100),
    duracion VARCHAR(20),
    descripcion TEXT,
    fecha_estreno DATE,
    director VARCHAR(150),
    musica VARCHAR(150),
    historia VARCHAR(255),
    guion VARCHAR(255),
    url_portada VARCHAR(255),
    status BOOLEAN DEFAULT TRUE
);

-- ===========================================
-- TABLA ACTORES
-- ===========================================
CREATE TABLE actores (
    id_actor SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    url_foto VARCHAR(255),
    status BOOLEAN DEFAULT TRUE
);

-- ===========================================
-- TABLA ELENCO
-- ===========================================
CREATE TABLE elenco (
    id_elenco SERIAL PRIMARY KEY,
    id_pelicula INT NOT NULL REFERENCES peliculas(id_pelicula),
    id_actor INT NOT NULL REFERENCES actores(id_actor),
    personaje VARCHAR(150),
    url_personaje VARCHAR(255),
    status BOOLEAN DEFAULT TRUE,
    UNIQUE (id_pelicula, id_actor)
);

-- ===========================================
-- INSERTAR PELÍCULAS
-- ===========================================
INSERT INTO peliculas (titulo, anio, genero, duracion, descripcion, fecha_estreno, director, musica, historia, guion, url_portada) VALUES
('Pixeles', 2015, 'Acción/Comedia', '1h 45m', 'Excampeones de juegos de arcade deben jugar una última partida contra alienígenas que imitan videojuegos retro.', '2015-07-24', 'Chris Columbus', 'Henry Jackman', 'Tim Herlihy, Patrick Jean', 'Chris Columbus, Tim Herlihy, Timothy Dowling', 'https://upload.wikimedia.org/wikipedia/en/f/f0/PixelsOfficialPoster.jpg'),
('Inception', 2010, 'Ciencia Ficción/Acción', '2h 28m', 'Un ladrón que roba secretos corporativos a través de los sueños recibe una misión especial.', '2010-07-16', 'Christopher Nolan', 'Hans Zimmer', 'Christopher Nolan', 'Christopher Nolan', 'https://m.media-amazon.com/images/I/51zUbui+gbL._AC_SY450_.jpg'),
('The Matrix', 1999, 'Ciencia Ficción/Acción', '2h 16m', 'Un hacker descubre la verdad sobre su realidad y lidera la rebelión contra las máquinas.', '1999-03-31', 'Lana Wachowski, Lilly Wachowski', 'Don Davis', 'Lana Wachowski, Lilly Wachowski', 'Lana Wachowski, Lilly Wachowski', 'https://upload.wikimedia.org/wikipedia/en/d/db/The_Matrix.png'),
('Matrix Resurrections', 2021, 'Ciencia Ficción/Acción', '2h 28m', 'En un mundo donde la línea entre realidad y simulación se desdibuja, Neo debe enfrentar nuevas amenazas.', '2021-12-22', 'Lana Wachowski', 'Johnny Klimek, Tom Tykwer', 'Lana Wachowski', 'Lana Wachowski', 'https://pics.filmaffinity.com/the_matrix_resurrections-864937945-mmed.jpg');

-- ===========================================
-- INSERTAR ACTORES
-- ===========================================
INSERT INTO actores (nombre, url_foto) VALUES
('Adam Sandler', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Adam_Sandler_at_Berlinale_2024.jpg/330px-Adam_Sandler_at_Berlinale_2024.jpg'),
('Peter Dinklage', 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcT_0AtK87SsdLACp5myoPcAcG3DNzeUqAjOlFGUk0BXL4JNIIvwzUC2le1SuKm7l_Nd1jQqK1Pz4aFDbFpvso6-nE67sLcyGuzSDYFPpGJQZzp9C5M'),
('Kevin James', 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQdW-CZ5qsHKgA8u8BUH5Yx9XDqGzQqGcbvWVXeHMQW3PI8u0qvGaJmoynRXusocXifZpyLWW9P2PitpYBDkXKxxE47EaDTpmRMWc8tasWiYSiagXE'),
('Michelle Monaghan', 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTn45vkdGjBiXmFF2q6Woo-5run7FT5v7Mdd4QxwqBCFUMyRCHQSW3Si_A9glL4Xu4zg9RAk8Ge-OrxS6OozvzT1WucFmJ1x5J2w8fH-zkNPgdXVnw'),
('Josh Gad', 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcR2iEAqi-JoYuql46g28rh22ACIdALMieeZdOiIosVcYHDozB2NbLZV7QDrFIGfElON6OahglQB5NU_36tJnnBK0YWokRCdjkVVql5m3yXILwb-rvM'),
('Ashley Benson', 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRl7BIOS0DQYncYcN7DRjvhaHIGA5nD2mXoncmvMD8kXYGCG2Wcue4oK-m6Y7VEJrvWtr3blZr3F-aysBG-Nca3n4bz8SHVF9Da_QlCg7zyjommSm4'),
('Leonardo DiCaprio', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Reunião_com_o_ator_norte-americano_Keanu_Reeves_%2846806576944%29_%28cropped%29.jpg/1024px-Reunião_com_o_ator_norte-americano_Keanu_Reeves_%2846806576944%29_%28cropped%29.jpg'),
('Joseph Gordon-Levitt', 'https://upload.wikimedia.org/wikipedia/en/7/7a/MatrixTrinity.jpg'),
('Elliot Page', 'https://cdn.britannica.com/41/249341-050-E5F7039C/Actor-Elliot-Page-2022.jpg'),
('Tom Hardy', 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTNYq1P5uUFeWlC8PmRRcDwc-5PzXFKgYVpxpdiqKV2sST7dq45ifeR6gp93eGfDNq0-eJRZVjJdtMSzJ7ZeV98G29VUfyCiQXP46sN9LqcPj-7mjg'),
('Ken Watanabe', 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQeJLkZXRNqsBNcJeHsPT5RAOvAp-LWh9lt-r8ObJejtKlo5u4nDs722rp_XGIi86B8j9HHflSdE_2B9dV9kmPAtyZ1Qj-ra92FHc93YZDXWh8_s7k'),
('Cillian Murphy', 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR_o63zzxnpXNb5LIi3cH7Xc6vZ3VMy75oDF3xX6Xkfgv6_FwWYOLRYX-0ZUkjMcPz9MmucudeAijVrFuQC5JYYLaHn0FSJTVI7QcR37l61y5uQ_XU'),
('Keanu Reeves', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Reunião_com_o_ator_norte-americano_Keanu_Reeves_%2846806576944%29_%28cropped%29.jpg/1024px-Reunião_com_o_ator_norte-americano_Keanu_Reeves_%2846806576944%29_%28cropped%29.jpg'),
('Laurence Fishburne', 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSz1uUPcPPcOenllFXohNwijJe1VDRL5H62lvunx0vUXYiJ64U40fGoznNnGOKXsY0-zB4my_XgnqV4V2WtsNOmQoK892w-7wCftiEp0PxGYexXHoo'),
('Carrie-Anne Moss', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Carrie-Anne_Moss_May_2016.jpg/500px-Carrie-Anne_Moss_May_2016.jpg'),
('Hugo Weaving', 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTO_cAeRtRMr8gCwR-oxFm16Pzpwp9tNB3nP63N-4LbJqhLayLxYVSV4t1JdDoCqlEy_k6z57EAz4iXLDb8u0yz3-7TIOId4TdUn3Cm_rTtyK9psx');

-- ===========================================
-- INSERTAR ELENCO
-- ===========================================
INSERT INTO elenco (id_pelicula, id_actor, personaje, url_personaje) VALUES
-- Pixeles
(1, 1, 'Sam Brenner', 'https://assets.mycast.io/characters/ludlow-lamonsoff-1555456-normal.jpg?1614738176'),
(1, 2, 'Eddie Plant', 'https://i.pinimg.com/736x/d7/18/20/d718208edb1fc6f454036155293703c5.jpg'),
(1, 3, 'William Cooper', 'https://satireandentertainment.wordpress.com/wp-content/uploads/2015/08/f031c86e3d446168628a9775c73dea4dd782472013d79353dd7c543f4dd1fe34-1.jpeg'),
(1, 4, 'Violet Van Patten', 'http://www.thebackseatdriverreviews.com/wp-content/uploads/2017/04/pix2.jpg'),
(1, 5, 'Ludlow Lamonsoff', 'https://assets.mycast.io/characters/ludlow-lamonsoff-1555456-normal.jpg?1614738176'),
(1, 6, 'Lady Lisa', 'https://static0.moviewebimages.com/wordpress/wp-content/uploads/article/2D502bMZJ4irbSFuwwmcnaTAQmXxWC.jpg?q=50&fit=crop&w=1100&h=618&dpr=1.5'),
-- Inception
(2, 7, 'Dom Cobb', 'https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/2800/Dom-Cobb.Inception.webp'),
(2, 8, 'Arthur', 'https://openpsychometrics.org/tests/characters/test-resources/pics/I/2.jpg'),
(2, 9, 'Ariadne', 'https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/2800/Ariadne-Inception.webp'),
(2, 10, 'Eames', 'https://64.media.tumblr.com/545f00ccf3d3fd1bf465da38e83d8194/f16563cd7d8987c3-df/s1280x1920/9a64a143f1fea5cfe17bacead352f5d4bff7192c.jpg'),
(2, 11, 'Saito', 'https://static0.srcdn.com/wordpress/wp-content/uploads/2020/06/Inception-Saito-Three.jpg?q=50&fit=crop&w=825&dpr=1.5'),
(2, 12, 'Robert Fischer', 'https://carboncostume.com/wordpress/wp-content/uploads/2020/04/robert-michael-fischer-from-inception.jpg'),
-- The Matrix
(3, 13, 'Neo', 'https://upload.wikimedia.org/wikipedia/en/c/c6/NeoTheMatrix.jpg'),
(3, 14, 'Morpheus', 'https://upload.wikimedia.org/wikipedia/en/a/ab/Morpheus.jpg'),
(3, 15, 'Trinity', 'https://upload.wikimedia.org/wikipedia/en/7/7a/MatrixTrinity.jpg'),
(3, 16, 'Agent Smith', 'https://upload.wikimedia.org/wikipedia/en/1/1f/Agent_Smith_%28The_Matrix_series_character%29.jpg');
