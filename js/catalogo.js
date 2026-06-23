// ============================================================
//  Dulces de Corpus Carmita Garate · Lógica de catálogo + carrito
// ============================================================

// --- CONFIGURA AQUÍ tu número de WhatsApp (con código de país, sin + ni espacios) ---
const WHATSAPP = "593987905064";

// "carrito" guarda lo que el cliente va eligiendo: { producto, cantidad }
const carrito = [];
let productos = []; // lista cargada desde el JSON

// Atajos a elementos de la página
const grid          = document.getElementById("grid-productos");
const contador      = document.getElementById("contador-carrito");
const panel         = document.getElementById("panel-carrito");
const overlay       = document.getElementById("overlay-carrito");
const itemsCarrito  = document.getElementById("items-carrito");
const totalCarrito  = document.getElementById("total-carrito");
const btnWhatsapp   = document.getElementById("pedir-whatsapp");

// ============================================================
// 1. CARGAR LOS PRODUCTOS DESDE EL JSON
// ============================================================
fetch("data/productos.json")
  .then((respuesta) => respuesta.json())
  .then((data) => {
    productos = data;
    dibujarProductos();
  })
  .catch((error) => {
    grid.innerHTML = `<p class="text-center col-span-full text-red-500">
      No se pudo cargar el catálogo. Recuerda abrir el sitio con Live Server. 🙏</p>`;
    console.error("Error cargando productos:", error);
  });

// ============================================================
// 2. DIBUJAR LAS TARJETAS DE PRODUCTOS
// ============================================================
function dibujarProductos() {
  grid.innerHTML = ""; // limpiamos el "Cargando..."

  // Agrupamos los productos por su categoría, manteniendo el orden de aparición
  const categorias = [];
  productos.forEach((p) => {
    const cat = p.categoria || "Otros";
    if (!categorias.includes(cat)) categorias.push(cat);
  });

  // Por cada categoría creamos un subtítulo + su propia rejilla de tarjetas
  categorias.forEach((cat) => {
    const bloque = document.createElement("div");

    const titulo = document.createElement("h4");
    titulo.className = "text-2xl font-bold mb-6 text-center";
    titulo.textContent = cat;
    bloque.appendChild(titulo);

    const rejilla = document.createElement("div");
    rejilla.className = "grid gap-8 sm:grid-cols-2 lg:grid-cols-3";

    productos
      .filter((p) => (p.categoria || "Otros") === cat)
      .forEach((p) => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "bg-white rounded-2xl shadow-md overflow-hidden hover:-translate-y-1 transition";
        tarjeta.innerHTML = `
          <img src="${p.imagen}" alt="${p.nombre}" class="h-48 w-full object-cover"
               onerror="this.onerror=null; this.src='img/placeholder.svg';">
          <div class="p-5">
            <h5 class="text-lg font-bold mb-1">${p.nombre}</h5>
            <p class="text-sm mb-3">${p.descripcion}</p>
            <div class="flex items-center justify-between">
              <span class="text-xl font-bold text-cacao">$${p.precio.toFixed(2)}</span>
              <button data-id="${p.id}"
                      class="btn-agregar bg-lila px-4 py-1.5 rounded-full text-sm font-semibold hover:scale-105 transition">
                Agregar +
              </button>
            </div>
          </div>`;
        rejilla.appendChild(tarjeta);
      });

    bloque.appendChild(rejilla);
    grid.appendChild(bloque);
  });

  // Conectamos cada botón "Agregar"
  document.querySelectorAll(".btn-agregar").forEach((boton) => {
    boton.addEventListener("click", () => agregarAlCarrito(Number(boton.dataset.id)));
  });
}

// ============================================================
// 3. AGREGAR / QUITAR DEL CARRITO
// ============================================================
function agregarAlCarrito(id) {
  const producto = productos.find((p) => p.id === id);
  const enCarrito = carrito.find((item) => item.producto.id === id);

  if (enCarrito) {
    enCarrito.cantidad++;            // ya estaba: sumamos 1
  } else {
    carrito.push({ producto, cantidad: 1 });
  }
  actualizarCarrito();
}

function cambiarCantidad(id, delta) {
  const item = carrito.find((i) => i.producto.id === id);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) {
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);      // si llega a 0, lo quitamos
  }
  actualizarCarrito();
}

// ============================================================
// 4. ACTUALIZAR LO QUE SE VE DEL CARRITO
// ============================================================
function actualizarCarrito() {
  // Contador del icono
  const totalUnidades = carrito.reduce((suma, i) => suma + i.cantidad, 0);
  contador.textContent = totalUnidades;

  // Lista de items dentro del panel
  itemsCarrito.innerHTML = "";
  if (carrito.length === 0) {
    itemsCarrito.innerHTML = `<p class="text-center text-sm mt-8">Tu carrito está vacío 🛒</p>`;
  }

  carrito.forEach((i) => {
    const fila = document.createElement("div");
    fila.className = "bg-white rounded-xl p-3 shadow-sm";
    fila.innerHTML = `
      <div class="flex justify-between items-start">
        <span class="font-semibold text-sm">${i.producto.nombre}</span>
        <span class="font-bold text-sm">$${(i.producto.precio * i.cantidad).toFixed(2)}</span>
      </div>
      <div class="flex items-center gap-3 mt-2">
        <button data-id="${i.producto.id}" data-delta="-1"
                class="btn-cant w-7 h-7 rounded-full bg-rosa font-bold">-</button>
        <span class="text-sm font-semibold">${i.cantidad}</span>
        <button data-id="${i.producto.id}" data-delta="1"
                class="btn-cant w-7 h-7 rounded-full bg-menta font-bold">+</button>
      </div>`;
    itemsCarrito.appendChild(fila);
  });

  // Conectamos los botones + / -
  document.querySelectorAll(".btn-cant").forEach((boton) => {
    boton.addEventListener("click", () =>
      cambiarCantidad(Number(boton.dataset.id), Number(boton.dataset.delta)));
  });

  // Total
  const total = carrito.reduce((suma, i) => suma + i.producto.precio * i.cantidad, 0);
  totalCarrito.textContent = `$${total.toFixed(2)}`;

  // El botón de WhatsApp solo se activa si hay algo
  btnWhatsapp.disabled = carrito.length === 0;
}

// ============================================================
// 5. ABRIR / CERRAR EL PANEL DEL CARRITO
// ============================================================
function abrirCarrito() {
  panel.classList.remove("translate-x-full");
  overlay.classList.remove("hidden");
}
function cerrarCarrito() {
  panel.classList.add("translate-x-full");
  overlay.classList.add("hidden");
}

document.getElementById("btn-carrito").addEventListener("click", abrirCarrito);
document.getElementById("cerrar-carrito").addEventListener("click", cerrarCarrito);
overlay.addEventListener("click", cerrarCarrito);

// ============================================================
// 6. ARMAR EL PEDIDO Y ENVIARLO POR WHATSAPP
// ============================================================
btnWhatsapp.addEventListener("click", () => {
  if (carrito.length === 0) return;

  // Leemos los datos que escribió el cliente
  const nombre    = document.getElementById("cliente-nombre").value.trim();
  const direccion = document.getElementById("cliente-direccion").value.trim();
  const telefono  = document.getElementById("cliente-telefono").value.trim();
  const nota      = document.getElementById("cliente-nota").value.trim();
  const aviso     = document.getElementById("aviso-form");

  // Validamos los datos obligatorios (nombre y dirección)
  if (!nombre || !direccion) {
    aviso.classList.remove("hidden");
    return;
  }
  aviso.classList.add("hidden");

  // Armamos el mensaje con saltos de línea reales (\n)
  let mensaje = "¡Hola Carmita! 🍬 Quiero hacer este pedido:\n\n";
  carrito.forEach((i) => {
    const subtotal = (i.producto.precio * i.cantidad).toFixed(2);
    mensaje += `• ${i.cantidad} x ${i.producto.nombre} — $${subtotal}\n`;
  });
  const total = carrito.reduce((s, i) => s + i.producto.precio * i.cantidad, 0);
  mensaje += `\n*Total: $${total.toFixed(2)}*\n\n`;

  // Datos de entrega del cliente
  mensaje += `👤 *Nombre:* ${nombre}\n`;
  mensaje += `📍 *Dirección:* ${direccion}\n`;
  if (telefono) mensaje += `📞 *Teléfono:* ${telefono}\n`;
  if (nota)     mensaje += `📝 *Nota:* ${nota}\n`;
  mensaje += `\n¿Me confirmas disponibilidad y el total? ¡Gracias! 😊`;

  // encodeURIComponent maneja tildes, espacios y emojis correctamente
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`, "_blank");
});

// Si el cliente empieza a escribir, ocultamos el aviso de error
["cliente-nombre", "cliente-direccion"].forEach((id) => {
  document.getElementById(id).addEventListener("input", () => {
    document.getElementById("aviso-form").classList.add("hidden");
  });
});
