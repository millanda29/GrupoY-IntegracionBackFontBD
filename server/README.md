# 🎬 Proyecto GrupoY - Integración Backend/Frontend/BD

Este proyecto implementa un servidor **Node.js + Express** con conexión a **PostgreSQL** para manejar un catálogo de películas.

## 🚀 Tecnologías
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://www.npmjs.com/package/cors)

## 📦 Instalación

Clona el repositorio y entra a la carpeta del servidor:

```bash
cd GrupoY-IntegracionBackFontBD/server
npm install
````

## ⚙️ Variables de entorno

Crea un archivo `.env` en `server/` con tus credenciales de PostgreSQL:

```
PORT=4000
PGHOST=localhost
PGUSER=postgres
PGPASSWORD=tu_password
PGDATABASE=catalogo_peliculas
PGPORT=5432
```

## ▶️ Ejecutar el servidor

```bash
npm start
```

El servidor se iniciará en:

```
http://localhost:4000
```

## 📂 Estructura completa

```
server/
├── .gitignore
├── package.json
├── README.md
├── API.md
└── src/
	├── app.js
	├── db.js
	├── server.js
	├── controllers/
	│   ├── actorController.js
	│   ├── elencoController.js
	│   └── peliculaController.js
	├── models/
	│   ├── actorModel.js
	│   ├── elencoModel.js
	│   └── peliculaModel.js
	├── routes/
	│   ├── actorRoutes.js
	│   ├── elencoRoutes.js
	│   └── peliculaRoutes.js
	└── services/
		├── actorService.js
		├── elencoService.js
		└── peliculaService.js
```