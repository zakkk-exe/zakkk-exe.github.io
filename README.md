# Shattered Coast Roulette 🏝️🎡
If you want to play you must visit: https://zakkk-exe.github.io/
![License: MIT](https://img.shields.io/badge/license-MIT-29C4C4.svg)
![No build step](https://img.shields.io/badge/build-none%20needed-7C83FD.svg)

Un juego de ruleta inspirado en [`pokemon-roulette`](https://github.com/zeroxm/pokemon-roulette) de **zeroxm**, pero adaptado a **Fortnite Battle Royale**, ambientado en **Capítulo 7 · Temporada 3 — Runners** (isla *Shattered Coast*).

En vez de girar para obtener un Pokémon aleatorio, aquí giras la rueda para generar retos de partida:

- 🪂 **Zona de Caída** — un POI real del mapa de esta temporada.
- 🔫 **Arsenal** — un arma nueva o recuperada del loot pool actual.
- ✨ **Vínculo Sprite** — uno de los 10 Sprites de la temporada, con su bonus.
- 🛼 **Movilidad** — un objeto de movimiento de Runners (Seven Sliders, Shock Rocks…).
- 🎯 **Reto Runner** — una regla opcional para hacer la partida más difícil.

El botón **Run Completo** gira las cinco ruedas en secuencia y genera una "Tarjeta de Runner" que puedes copiar y compartir.

No usa frameworks ni build step: es HTML + CSS + JS puro, pensado para abrirse directamente en el navegador o publicarse con GitHub Pages.

## Estructura

```
fortnite-roulette/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml   # despliegue automático a GitHub Pages en cada push a main
├── .gitignore
├── .nojekyll                  # evita que GitHub Pages procese el sitio con Jekyll
├── CONTRIBUTING.md            # guía rápida para proponer cambios
├── LICENSE                    # MIT
├── package.json               # metadatos del proyecto y scripts de servidor local
├── README.md
├── index.html                 # estructura de la página
├── styles.css                 # identidad visual (paleta nocturna + acentos por categoría)
├── data.js                    # contenido de la temporada Runners (POIs, armas, Sprites, movilidad, retos)
└── app.js                     # lógica de la ruleta (SVG generado dinámicamente + animación de giro)
```

## Cómo jugarlo en local

Al ser archivos estáticos, basta con abrir `index.html` en el navegador. Si prefieres servirlo (por ejemplo, para evitar restricciones de `fetch` en algunos navegadores), puedes usar cualquier servidor estático:

```bash
npx serve .
# o
python3 -m http.server 8080
```

## Subirlo a tu propio repositorio de GitHub

```bash
cd fortnite-roulette
git init
git add .
git commit -m "Shattered Coast Roulette — Fortnite Runners edition"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/shattered-coast-roulette.git
git push -u origin main
```

### Publicarlo con GitHub Pages

Este repo ya incluye un workflow (`.github/workflows/deploy-pages.yml`) que despliega el sitio automáticamente en cada `push` a `main`. Solo tienes que activarlo una vez:

1. En el repo, ve a *Settings → Pages*.
2. En "Build and deployment", elige **Source: GitHub Actions**.
3. Haz un `push` a `main` (o dispara el workflow manualmente desde la pestaña *Actions*).
4. En un par de minutos tendrás una URL pública tipo `https://TU-USUARIO.github.io/shattered-coast-roulette/` (igual que `zeroxm.github.io/pokemon-roulette`).

Si prefieres el método clásico sin Actions, también puedes ir a *Settings → Pages* y elegir la rama `main` con carpeta raíz (`/`) como fuente.

## Actualizar el contenido en futuras temporadas

Todo el contenido de la temporada vive en `data.js`, dentro del objeto `CATEGORIES`. Cuando cambie la temporada de Fortnite, solo hay que:

1. Actualizar los arrays `drop`, `arsenal`, `sprite`, `move` y `challenge` con los POIs, armas, Sprites, objetos de movimiento y retos nuevos.
2. Ajustar los colores de acento en `styles.css` si quieres reflejar la nueva estética.

No hace falta tocar `app.js`: la rueda se construye dinámicamente a partir de lo que haya en `data.js`.

## Contribuir

Las contribuciones son bienvenidas — revisa [CONTRIBUTING.md](CONTRIBUTING.md) para ver dónde tocar según el tipo de cambio (nueva temporada, estilos, lógica de la ruleta, etc.).

## Licencia

Código bajo licencia [MIT](LICENSE). Fortnite es marca de Epic Games; este es un fan-project no oficial sin ánimo de lucro.

## Créditos

- Concepto original: [zeroxm/pokemon-roulette](https://github.com/zeroxm/pokemon-roulette).
- Datos de la Temporada Runners recopilados de cobertura pública sobre Fortnite Capítulo 7 · Temporada 3 (junio de 2026).
- Fortnite es marca de Epic Games; este proyecto es un fan-project no oficial sin ánimo de lucro.
