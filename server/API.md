# 🎥 API de Gestión de Películas

**Host base:**

```
http://localhost:4000
```

---

## 📌 Descripción

Esta API permite gestionar un catálogo de películas, actores y el elenco de personajes de cada película.
Cuenta con **eliminación lógica** mediante el campo `status` (TRUE = activo, FALSE = eliminado).
Nunca se borran físicamente los registros, lo que permite reactivar los datos si es necesario.

---

## 📌 Recursos principales

* 🎬 **Películas** → CRUD de películas con información completa, incluyendo portada.
* 🎭 **Actores** → CRUD de actores con foto opcional.
* 🎭🎬 **Elenco** → Relación entre películas y actores, con nombre de personaje y URL opcional de personaje.

---

# 🎬 Películas

### 1. Crear una película

**POST** `/api/peliculas`

**Request:**

```json
{
  "titulo": "Destino final",
  "anio": 2000,
  "genero": "Terror/Fantasía",
  "duracion": "1h 38m",
  "descripcion": "Tras la premonición de un compañero de clase, varios jóvenes enfrentan un horrible final en medio de un accidente aéreo.",
  "fecha_estreno": "2000-03-17",
  "director": "James Wong",
  "musica": null,
  "historia": "Jeffrey Reddick",
  "guion": null,
  "url_portada": null
}
```

**Response 201:**

```json
{
  "id_pelicula": 4,
  "titulo": "Destino final",
  "anio": 2000,
  "genero": "Terror/Fantasía",
  "duracion": "1h 38m",
  "descripcion": "Tras la premonición de un compañero de clase, varios jóvenes enfrentan un horrible final en medio de un accidente aéreo.",
  "fecha_estreno": "2000-03-17T05:00:00.000Z",
  "director": "James Wong",
  "musica": null,
  "historia": "Jeffrey Reddick",
  "guion": null,
  "url_portada": null,
  "status": true
}
```

---

### 2. Obtener todas las películas

**GET** `/api/peliculas`

**Response:**

```json
[
  {
    "id_pelicula": 1,
    "titulo": "Pixeles",
    "anio": 2015,
    "genero": "Acción/Comedia",
    "duracion": "1h 45m",
    "descripcion": "Excampeones de juegos de arcade deben jugar una última partida contra alienígenas que imitan videojuegos retro.",
    "fecha_estreno": "2015-07-24T05:00:00.000Z",
    "director": "Chris Columbus",
    "musica": "Henry Jackman",
    "historia": "Tim Herlihy, Patrick Jean",
    "guion": "Chris Columbus, Tim Herlihy, Timothy Dowling",
    "url_portada": "https://upload.wikimedia.org/wikipedia/en/2/20/Pixels_2015_film_poster.jpg",
    "status": true
  }
]
```

---

### 3. Obtener película por ID

**GET** `/api/peliculas/{id}`

**Response 200:**

```json
{
  "id_pelicula": 1,
  "titulo": "Pixeles",
  "anio": 2015,
  "genero": "Acción/Comedia",
  "duracion": "1h 45m",
  "descripcion": "Excampeones de juegos de arcade deben jugar una última partida contra alienígenas que imitan videojuegos retro.",
  "fecha_estreno": "2015-07-24T05:00:00.000Z",
  "director": "Chris Columbus",
  "musica": "Henry Jackman",
  "historia": "Tim Herlihy, Patrick Jean",
  "guion": "Chris Columbus, Tim Herlihy, Timothy Dowling",
  "url_portada": "https://upload.wikimedia.org/wikipedia/en/2/20/Pixels_2015_film_poster.jpg",
  "status": true
}
```

---

### 4. Actualizar película (parcial)

**PUT** `/api/peliculas/{id}`

**Request ejemplo:**

```json
{
  "anio": 2016,
  "duracion": "2h 00m"
}
```

**Response 200:**

```json
{
  "id_pelicula": 1,
  "titulo": "Pixeles",
  "anio": 2016,
  "genero": "Acción/Comedia",
  "duracion": "2h 00m",
  "descripcion": "Excampeones de juegos de arcade deben jugar una última partida contra alienígenas que imitan videojuegos retro.",
  "fecha_estreno": "2015-07-24T05:00:00.000Z",
  "director": "Chris Columbus",
  "musica": "Henry Jackman",
  "historia": "Tim Herlihy, Patrick Jean",
  "guion": "Chris Columbus, Tim Herlihy, Timothy Dowling",
  "url_portada": "https://upload.wikimedia.org/wikipedia/en/2/20/Pixels_2015_film_poster.jpg",
  "status": true
}
```

---

### 5. Eliminar película (lógico)

**DELETE** `/api/peliculas/{id}`

```json
{
  "message": "Película eliminada correctamente",
  "pelicula": {
    "id_pelicula": 1,
    "status": false
  }
}
```

---

### 6. Activar película

**PUT** `/api/peliculas/activate/{id}`

```json
{
  "message": "Película activada correctamente",
  "pelicula": {
    "id_pelicula": 1,
    "status": true
  }
}
```

---

# 🎭 Actores

### 1. Crear actor

**POST** `/api/actores`

```json
{
  "nombre": "Isaac Llanda",
  "url_foto": null
}
```

**Response 201:**

```json
{
  "id_actor": 17,
  "nombre": "Isaac Llanda",
  "url_foto": null,
  "status": true
}
```

---

### 2. Obtener todos los actores

**GET** `/api/actores`

---

### 3. Obtener actor por ID

**GET** `/api/actores/{id}`

---

### 4. Actualizar actor

**PUT** `/api/actores/{id}`

```json
{
  "nombre": "Isaac Llanda 2",
  "url_foto": "https://example.com/foto.jpg"
}
```

---

### 5. Eliminar actor (lógico)

**DELETE** `/api/actores/{id}`

```json
{
  "message": "Actor deleted logically",
  "actor": {
    "id_actor": 17,
    "nombre": "Isaac Llanda 2",
    "url_foto": "https://example.com/foto.jpg",
    "status": false
  }
}
```

---

### 6. Activar actor (lógico)

**PUT** `/api/actores/activate/{id}`

```json
{
  "message": "Actor activated logically",
  "actor": {
    "id_actor": 17,
    "status": true
  }
}
```

---

# 🎭🎬 Elenco

### 1. Obtener todo el elenco

**GET** `/api/elenco`

---

### 2. Obtener elenco por ID

**GET** `/api/elenco/{id}`

---

### 3. Obtener elenco por película

**GET** `/api/elenco/pelicula/{id_pelicula}`

---

### 4. Crear registro de elenco

**POST** `/api/elenco`

```json
{
  "id_pelicula": 2,
  "id_actor": 8,
  "personaje": "Sam Brenner",
  "url_personaje": "https://example.com/personaje.jpg"
}
```

---

### 5. Actualizar registro de elenco (parcial)

**PUT** `/api/elenco/{id}`

```json
{
  "personaje": "Sam Brenner Updated",
  "url_personaje": "https://example.com/nuevo_personaje.jpg"
}
```

---

### 6. Eliminar registro de elenco (lógico)

**DELETE** `/api/elenco/{id}`

```json
{
  "message": "Elenco deleted logically",
  "elenco": {
    "id_elenco": 17,
    "id_pelicula": 2,
    "id_actor": 8,
    "personaje": "Sam Brenner Updated",
    "url_personaje": "https://example.com/nuevo_personaje.jpg",
    "status": false
  }
}
```

---

### 7. Activar registro de elenco (lógico)

**PUT** `/api/elenco/activate/{id}`

```json
{
  "message": "Elenco activated logically",
  "elenco": {
    "id_elenco": 17,
    "id_pelicula": 2,
    "id_actor": 8,
    "personaje": "Sam Brenner Updated",
    "url_personaje": "https://example.com/nuevo_personaje.jpg",
    "status": true
  }
}
```

---

✅ **Notas importantes:**

1. Todos los registros cuentan con **status booleano** (`true` = activo, `false` = eliminado lógicamente).
2. Para reactivar un registro eliminado, usar el endpoint `/activate/{id}`.
3. Los campos `url_portada`, `url_foto` y `url_personaje` son opcionales.
4. La actualización parcial permite enviar solo los campos que se quieren modificar.

---
