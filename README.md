# Apartamentos Noir

Aplicación web y móvil para promocionar apartamentos de lujo en Costa Rica. Incluye un catálogo con
búsqueda, filtros y paginación, el detalle de cada apartamento, una lista de favoritos y un
formulario de contacto.

El detalle incluye un mapa de referencia de la zona con OpenStreetMap. Las ubicaciones son
aproximadas; no representan direcciones exactas de los apartamentos. El mapa requiere internet.

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

- Node.js 22.12 o superior y npm
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

## Ejecutar en Android

Después de instalar las dependencias, generar la web y copiarla al proyecto Android:

```bash
npm run build
npx cap sync android
npx cap open android
```

En Android Studio, seleccionar un emulador o dispositivo conectado y ejecutar la aplicación.
Después de cambiar la web, repetir la compilación y la sincronización antes de volver a ejecutarla.

## Evidencia de Android

Capturas de la versión probada en Android antes del último ajuste visual de la web.

| Pantalla | Captura |
|---|---|
| Inicio | [Ver inicio](evidencias/android/01-inicio.png) |
| Catálogo filtrado | [Ver catálogo](evidencias/android/02-catalogo.png) |
| Detalle del apartamento | [Ver detalle](evidencias/android/03-detalle.png) |
| Menú abierto | [Ver menú](evidencias/android/04-menu.png) |
| Favoritos | [Ver favoritos](evidencias/android/05-favoritos.png) |
| Validación del contacto | [Ver validación](evidencias/android/06-contacto.png) |
