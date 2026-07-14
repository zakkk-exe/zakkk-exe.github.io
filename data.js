// Datos de Fortnite Capítulo 7 · Temporada 3 — "Runners" (isla Shattered Coast)
// Cada categoría alimenta una rueda de la ruleta independiente.

const CATEGORIES = {
  drop: {
    label: "Zona de Caída",
    icon: "🪂",
    color: "#29C4C4",
    items: [
      { name: "Heatwave Harbor", desc: "Puerto industrial con rascacielos; gran densidad de loot para dúos y escuadras." },
      { name: "Calamari Canyon", desc: "Cañón desértico de temática marisco, con el faro de temporadas pasadas todavía en pie." },
      { name: "Frosted Flats", desc: "Ruinas heladas de la fortaleza del Ice King, con heladería y una bóveda secreta." },
      { name: "Cluster Coast", desc: "Costa dedicada al skin Cluster, en el extremo sureste de Shattered Coast." },
      { name: "Sunken Shores", desc: "La reconstrucción más al sur de la antigua Squibbly Shores." },
      { name: "Chopped Shop", desc: "Taller mecánico al oeste, perfecto para acumular metal y ladrillo rápido." },
      { name: "Wonkeeland", desc: "Parque de atracciones reubicado en el extremo este de la isla." },
      { name: "Lifty Lodge", desc: "Estación de esquí entre montañas nevadas, con tirolinas para rotar rápido." },
      { name: "Latte Landing", desc: "El pueblo cafetero regresa, esta vez sin nieve cubriéndolo." },
      { name: "Battlewoods", desc: "Bosque central que alberga el gran Golden Reel Theatre." },
      { name: "Golden Grove", desc: "Base de operaciones de The Seven al este, con un nivel subterráneo secreto." },
      { name: "Sinister Strip", desc: "La antigua Sandy Strip, ahora tomada por el Dark Voyager." },
      { name: "Duck Mansion", desc: "Mansión de temática pato, una de las incorporaciones nuevas del mapa." },
      { name: "FroSDeez", desc: "Heladería cubierta de conos gigantes y esquirlas de hielo." }
    ]
  },

  arsenal: {
    label: "Arsenal",
    icon: "🔫",
    color: "#FF5A3C",
    items: [
      { name: "Extending Focus Shotgun", desc: "Escopeta de largo alcance: el cañón se extiende y cierra el spread en una ráfaga de 3 disparos." },
      { name: "Surgical Burst Rifle", desc: "Fusil de ráfagas, retroceso bajo y caída de daño mínima a distancia." },
      { name: "Chaos Exploder Rifle", desc: "El fusil pesado del Dark Voyager: dispara cubos explosivos, letal contra cobertura." },
      { name: "Lancehead Pistol", desc: "La pistola de John Wick, cargador de 21 balas; al recargar lanzas el cargador como proyectil." },
      { name: "Bank Shot Pistol", desc: "Se incorpora más avanzada la temporada; disparos que rebotan en superficies." },
      { name: "Maven Auto Shotgun", desc: "Escopeta automática de regreso, ideal para presión constante a corta distancia." },
      { name: "Striker Pump Shotgun", desc: "Escopeta de bombeo clásica que vuelve al pool de loot." },
      { name: "Ranger Pistol", desc: "Pistola versátil de precio de loot bajo, buena para el arranque de partida." },
      { name: "Stinger SMG", desc: "Subfusil de alta cadencia, especialista en combate cercano." },
      { name: "Hunting Rifle", desc: "Rifle de un solo disparo de alto daño, perfecto para peleas a distancia." },
      { name: "Chaos Reloader Shotgun", desc: "Escopeta querida y odiada a partes iguales, de vuelta en el meta." }
    ]
  },

  sprite: {
    label: "Vínculo Sprite",
    icon: "✨",
    color: "#7C83FD",
    items: [
      { name: "Earth Sprite", desc: "Posibilidad de encontrar objetos adicionales de mayor rareza al abrir cofres.", color: "#6FBF5B" },
      { name: "Fire Sprite", desc: "Genera una explosión ígnea cuando infliges suficiente daño a un enemigo.", color: "#FF6A3D" },
      { name: "Water Sprite", desc: "Repone escudo, a ti y a tu escuadra cercana, mientras estáis en el agua.", color: "#3DAEFF" },
      { name: "Duck Sprite", desc: "Emotear o tocar un instrumento repone tu escudo.", color: "#FFD23F" },
      { name: "Ghost Sprite", desc: "Otorga camuflaje temporal cada vez que recargas.", color: "#B98EFF" },
      { name: "Demon Sprite", desc: "Absorbe algo de vida y escudo del rival al eliminarlo.", color: "#FF4D6D" },
      { name: "King Sprite", desc: "Tu pico inflige más daño mientras lo llevas equipado.", color: "#F5C518" },
      { name: "Dream Sprite", desc: "Concede un objeto aleatorio en cada nivel, culminando en loot legendario al máximo nivel.", color: "#9B8CFD" },
      { name: "Punk Sprite", desc: "Efecto misterioso: puede que no haga nada… o puede que haga de todo.", color: "#FF3DBB" },
      { name: "Zero Point Sprite", desc: "Genera una Mini Burbuja de Escudo al usar un objeto de curación sobre ti mismo.", color: "#29F6C8" }
    ]
  },

  move: {
    label: "Movilidad",
    icon: "🛼",
    color: "#6C7BFF",
    items: [
      { name: "Seven Sliders", desc: "Deslízate más rápido de lo que corren tus piernas; apunta a mitad de deslizamiento para ralentizar el tiempo antes del impulso final." },
      { name: "Shock Rocks", desc: "Rómpelas para encadenar hasta tres saltos en el aire." },
      { name: "Corte de planeador", desc: "Corta el planeador nada más saltar del autobús para caer en picado y aterrizar antes." },
      { name: "Tirolinas de Lifty Lodge", desc: "Red de tirolinas repartidas por la estación de esquí para rotar sin gastar recursos." },
      { name: "Autobús con ADS", desc: "Apunta durante el trayecto del autobús de batalla para explorar la isla y marcar tu zona de caída." }
    ]
  },

  challenge: {
    label: "Reto Runner",
    icon: "🎯",
    color: "#F5B31B",
    items: [
      { name: "Cero construcción", desc: "Toda la partida sin colocar una sola estructura." },
      { name: "Solo loot común y poco común", desc: "Nada de azul, épico ni legendario en todo el run." },
      { name: "Ruta de tres Sprites", desc: "Debes recoger y vincular al menos tres Sprites distintos antes de la zona seis." },
      { name: "Solo victorias a pico", desc: "Cada eliminación debe cerrarse con el pico." },
      { name: "Rotación obligatoria", desc: "Visita al menos dos zonas de caída nombradas antes de que cierre la primera tormenta." },
      { name: "Cambio de arma forzado", desc: "Tras cada eliminación debes soltar el arma usada y no recogerla de nuevo." },
      { name: "Modo sigiloso", desc: "Evita el combate abierto hasta que queden 25 jugadores o menos." },
      { name: "Solo agachado", desc: "No se permite disparar de pie durante toda la partida." }
    ]
  }
};

const CATEGORY_ORDER = ["drop", "arsenal", "sprite", "move", "challenge"];
