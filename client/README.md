# ⚛️ Proyecto React + Vite

Este proyecto está construido con **React** y utiliza **Vite** para un desarrollo rápido y moderno.

## 🚀 Requisitos previos
- [Node.js](https://nodejs.org/) v16 o superior
- npm (incluido con Node.js)

## 📦 Instalación de dependencias
Clona el repositorio y entra en la carpeta del cliente:

```bash
cd client
npm install
```

## ▶️ Comandos principales

- **Desarrollo:**
	```bash
	npm run dev
	```
	Abre la app en [http://localhost:5173](http://localhost:5173)

- **Build de producción:**
	```bash
	npm run build
	```

- **Previsualizar build:**
	```bash
	npm run preview
	```

- **Lint:**
	```bash
	npm run lint
	```

## ⚙️ Variables de entorno

Puedes crear un archivo `.env` en la raíz de `client/` para definir variables como:

```
VITE_API_URL=http://localhost:3001
```

Recuerda que las variables deben comenzar con `VITE_` para ser accesibles desde el frontend.

## 📁 Estructura recomendada

- `src/` Código fuente principal
	- `components/` Componentes reutilizables
	- `pages/` Vistas principales
	- `context/` Contextos globales
	- `assets/` Imágenes y recursos

- `public/` Archivos estáticos

## Recomendaciones generales

- Mantén las dependencias actualizadas (`npm outdated`)
- Usa componentes funcionales y hooks
- Aplica buenas prácticas de CSS y estructura
- Revisa los logs en consola para depuración

## ❓ Ayuda

Si tienes problemas, revisa la documentación oficial de [Vite](https://vitejs.dev/) y [React](https://react.dev/).
