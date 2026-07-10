// ============================================================
//  Carrusel de imágenes del inicio (hero)
// ============================================================

// Fotos que rotarán en el carrusel (puedes agregar o quitar libremente)
const imagenesCarrusel = [
  { src: "img/bolitas-frutales.jpg", alt: "Bolitas frutales de colores" },
  { src: "img/frutitas.jpg",         alt: "Frutitas de leche condensada" },
  { src: "img/alfajores.jpg",        alt: "Alfajores rellenos de manjar" },
  { src: "img/bolitas-coco.jpg",     alt: "Bolitas de coco" },
  { src: "img/rosca-encofitada.png", alt: "Roscas encofitadas" },
  { src: "img/caja-grande.jpg",      alt: "Caja grande surtida de dulces" },
];

const track    = document.getElementById("carrusel-track");
const dotsCont  = document.getElementById("carrusel-dots");
const carrusel  = document.getElementById("carrusel");
let indiceActual = 0;
let intervalo;

// 1. Creamos los slides y los puntos indicadores
imagenesCarrusel.forEach((img, i) => {
  const slide = document.createElement("div");
  slide.className = "min-w-full";
  slide.innerHTML = `<img src="${img.src}" alt="${img.alt}"
                          class="w-full h-56 md:h-80 object-cover"
                          onerror="this.onerror=null; this.src='img/placeholder.svg';">`;
  track.appendChild(slide);

  const dot = document.createElement("button");
  dot.className = "w-2.5 h-2.5 rounded-full bg-white/60 hover:bg-white transition";
  dot.setAttribute("aria-label", `Ir a la imagen ${i + 1}`);
  dot.addEventListener("click", () => irA(i));
  dotsCont.appendChild(dot);
});

// 2. Muestra el slide según el índice actual
function actualizar() {
  track.style.transform = `translateX(-${indiceActual * 100}%)`;
  [...dotsCont.children].forEach((d, i) => {
    d.classList.toggle("bg-white", i === indiceActual);
    d.classList.toggle("bg-white/60", i !== indiceActual);
  });
}

function irA(i)      { indiceActual = (i + imagenesCarrusel.length) % imagenesCarrusel.length; actualizar(); }
function siguiente() { irA(indiceActual + 1); }
function anterior()  { irA(indiceActual - 1); }

// 3. Botones de flecha
document.getElementById("carrusel-next").addEventListener("click", siguiente);
document.getElementById("carrusel-prev").addEventListener("click", anterior);

// 4. Avance automático cada 3.5 segundos
function iniciarAuto() { intervalo = setInterval(siguiente, 3500); }
function detenerAuto() { clearInterval(intervalo); }

// Se pausa cuando el usuario pasa el mouse por encima
carrusel.addEventListener("mouseenter", detenerAuto);
carrusel.addEventListener("mouseleave", iniciarAuto);

// 5. Arrancamos
actualizar();
iniciarAuto();
