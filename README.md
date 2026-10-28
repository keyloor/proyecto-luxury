# Apartamentos Noir

Aplicación web y móvil para promocionar apartamentos de lujo en Costa Rica. Incluye un catálogo con
búsqueda, filtros y paginación, el detalle de cada apartamento, una lista de favoritos y un
formulario de contacto.

Proyecto #1 del curso IF0009 Desarrollo de Software IV, Universidad de Costa Rica, Sede de
Occidente, II ciclo 2026.

## Integrantes

- Keylor Barrantes
- Sebastián Marín Fernández
- Juan Pablo Jiménez Vargas

## Versión publicada

<https://apartamentos-noir.vercel.app>

## Tecnologías

- Vite
- React y TypeScript
- React Router
- CSS propio
- Capacitor (versión Android)
- Vercel (publicación web)

## Instalación

```bash
git clone https://github.com/keyloor/proyecto-luxury.git
cd proyecto-luxury
npm install
```
## Requisitos

- Node.js 20.19 o superior y npm
- Git
- Android Studio, solo para la versión Android

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo en <http://localhost:5173> |
| `npm run build` | Genera la versión final en `dist/` |
| `npm run preview` | Sirve la carpeta `dist/` para probarla |
| `npx cap sync android` | Copia `dist/` al proyecto Android |
| `npx cap open android` | Abre el proyecto en Android Studio |