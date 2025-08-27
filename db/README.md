# 📌 CRUD en PostgreSQL (con eliminación lógica)

En este esquema, las tablas tienen un campo `status BOOLEAN` que define si el registro está **activo (TRUE)** o **eliminado lógicamente (FALSE)**.  
De esta forma, nunca borramos físicamente los datos.

---

### 1. 🔹 CREATE (Agregar película y elenco)

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

-- Insertar actores
INSERT INTO actores (nombre) VALUES ('Leonardo DiCaprio'), ('Joseph Gordon-Levitt');

-- Relacionar actores con personajes
INSERT INTO elenco (id_pelicula, id_actor, personaje)
VALUES
(2, 7, 'Dom Cobb'),
(2, 8, 'Arthur');
````

---

### 2. 🔹 READ (Consultar solo registros activos)

```sql
-- Todas las películas activas
SELECT * FROM peliculas WHERE status = TRUE;

-- Película con su elenco activo
SELECT p.titulo, p.anio, p.genero, p.duracion, p.director, 
       a.nombre AS actor, e.personaje
FROM peliculas p
JOIN elenco e ON p.id_pelicula = e.id_pelicula
JOIN actores a ON e.id_actor = a.id_actor
WHERE p.id_pelicula = 1
  AND p.status = TRUE
  AND a.status = TRUE
  AND e.status = TRUE;
```

---

### 3. 🔹 UPDATE (Actualizar datos de una película)

```sql
-- Cambiar duración y género de "Pixeles"
UPDATE peliculas
SET duracion = '2h 00m', genero = 'Acción/Comedia/Ciencia Ficción'
WHERE id_pelicula = 1
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
