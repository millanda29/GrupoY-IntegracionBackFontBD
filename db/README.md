# 📌 CRUD en PostgreSQL (con eliminación lógica + imágenes)

En este esquema:

* Todas las tablas tienen un campo `status BOOLEAN` que define si el registro está **activo (TRUE)** o **eliminado lógicamente (FALSE)**.
* Nunca se eliminan físicamente los datos.
* Además, ahora tenemos campos para imágenes:

  * `actores.url_foto` → Foto del actor.
  * `elenco.url_personaje` → Imagen/referencia del personaje.

---

### 1. 🔹 CREATE (Agregar película, actores y elenco)

```sql
-- Insertar nueva película
INSERT INTO peliculas (titulo, anio, genero, duracion, descripcion, fecha_estreno, director, musica, historia, guion, url_portada)
VALUES (
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

-- Insertar actores con foto
INSERT INTO actores (nombre, url_foto) VALUES
('Leonardo DiCaprio', 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Leonardo_DiCaprio_66ème_Festival_de_Venise_%28Mostra%29.jpg'),
('Joseph Gordon-Levitt', 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Joseph_Gordon-Levitt_2013.jpg');

-- Relacionar actores con personajes (con imagen del personaje)
INSERT INTO elenco (id_pelicula, id_actor, personaje, url_personaje)
VALUES
(2, 7, 'Dom Cobb', 'https://static.wikia.nocookie.net/inception/images/1/1e/DomCobb.jpg'),
(2, 8, 'Arthur',   'https://static.wikia.nocookie.net/inception/images/d/db/ArthurInception.jpg');
```

---

### 2. 🔹 READ (Consultar solo registros activos con fotos)

```sql
-- Todas las películas activas
SELECT * FROM peliculas WHERE status = TRUE;

-- Película con elenco activo (incluye foto de actor y personaje)
SELECT p.titulo, p.anio, p.genero, p.duracion, p.director,
       a.nombre AS actor, a.url_foto,
       e.personaje, e.url_personaje
FROM peliculas p
JOIN elenco e ON p.id_pelicula = e.id_pelicula
JOIN actores a ON e.id_actor = a.id_actor
WHERE p.id_pelicula = 2
  AND p.status = TRUE
  AND a.status = TRUE
  AND e.status = TRUE;
```

---

### 3. 🔹 UPDATE (Actualizar datos de una película o imagen)

```sql
-- Cambiar duración y género de "Pixeles"
UPDATE peliculas
SET duracion = '2h 00m', genero = 'Acción/Comedia/Ciencia Ficción'
WHERE id_pelicula = 1
  AND status = TRUE;

-- Cambiar la foto de un actor
UPDATE actores
SET url_foto = 'https://new-image-url.com/actor.jpg'
WHERE id_actor = 7
  AND status = TRUE;

-- Cambiar imagen de un personaje
UPDATE elenco
SET url_personaje = 'https://new-image-url.com/personaje.jpg'
WHERE id_pelicula = 2 AND id_actor = 7
  AND status = TRUE;
```

---

### 4. 🔹 DELETE lógico (marcar como inactivo)

```sql
-- Eliminar lógicamente una película
UPDATE peliculas
SET status = FALSE
WHERE id_pelicula = 2;

-- Eliminar lógicamente un actor
UPDATE actores
SET status = FALSE
WHERE id_actor = 7;

-- Eliminar lógicamente una relación de elenco
UPDATE elenco
SET status = FALSE
WHERE id_pelicula = 2 AND id_actor = 7;
```
