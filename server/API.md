# 🎥 API de Gestión de Películas

**Host base:**

```
http://localhost:4000
```

---

## 📌 Recursos principales

* 🎬 **Películas** → CRUD de películas.
* 🎭 **Actores** → CRUD de actores.
* 🎭🎬 **Elenco** → Relación entre películas y actores (personajes).

---

## 🎬 Películas

### 1. Crear una película

**POST** `/api/peliculas`

```json
{
  "titulo": "Destino final",
  "anio": 2000,
  "genero": "Terror/Fantasía",
  "duracion": "1h 38m",
  "descripcion": "Tras la premonición de un compañero de clase, varios jóvenes enfrentan un horrible final en medio de un accidente aéreo.",
  "fecha_estreno": "2000-03-17",
  "director": "James Wong",
  "historia": "Jeffrey Reddick",
  "status": true
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

### 3. Obtener una película por ID

**GET** `/api/peliculas/{id}`

---

### 4. Actualizar película (parcial/total)

**PUT** `/api/peliculas/{id}`

```json
{
  "anio": 2015
}
```

---

### 5. Eliminar película (lógico)

**DELETE** `/api/peliculas/{id}`

```json
{
  "message": "Película eliminada correctamente"
}
```

---

### 6. Activar película

**PUT** `/api/peliculas/activate/{id}`

```json
{
  "message": "Película activada correctamente"
}
```

---

## 🎭 Actores

### 1. Crear un actor

**POST** `/api/actores`

```json
{
  "nombre": "Isaac Llanda",
  "status": true
}
```

**Response:**

```json
{
  "id_actor": 17,
  "nombre": "Isaac Llanda",
  "status": true
}
```

---

### 2. Obtener todos los actores

**GET** `/api/actores`

---

### 3. Obtener un actor por ID

**GET** `/api/actores/{id}`

---

### 4. Actualizar actor

**PUT** `/api/actores/{id}`

```json
{
  "nombre": "Isaac Llanda 2"
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
    "status": false
  }
}
```

---

### 6. Activar actor (lógico)

**PUT** `/api/actores/activate/{id}`

---

## 🎭🎬 Elenco

### 1. Obtener todo el elenco

**GET** `/api/elenco`

---

### 2. Obtener elenco por ID

**GET** `/api/elenco/{id}`

---

### 3. Obtener elenco por película

**GET** `/api/elenco/pelicula/{id_pelicula}`

---

### 4. Crear un registro de elenco

**POST** `/api/elenco`

```json
{
  "id_pelicula": 2,
  "id_actor": 8,
  "personaje": "Sam Brenner"
}
```

---

### 5. Actualizar registro de elenco

**PUT** `/api/elenco/{id}`

```json
{
  "id_pelicula": 1
}
```

---

### 6. Eliminar registro de elenco (lógico)

**DELETE** `/api/elenco/{id}`

```json
{
  "message": "Elenco deleted logically",
  "eliminado": {
    "id_elenco": 17,
    "id_pelicula": 1,
    "id_actor": 17,
    "personaje": "Sam Brenner",
    "status": false
  }
}
```

---

### 7. Activar registro de elenco (lógico)

**PUT** `/api/elenco/activate/{id}`

```json
{
  "message": "Elenco activate logically",
  "eliminado": {
    "id_elenco": 17,
    "id_pelicula": 1,
    "id_actor": 17,
    "personaje": "Sam Brenner",
    "status": true
  }
}
```
