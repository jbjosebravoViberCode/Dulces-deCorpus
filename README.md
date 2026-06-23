# 🍬 Dulces de Corpus · Carmita Garate

Página y app web para la venta de dulces tradicionales de Corpus Christi.
Tienda familiar artesanal en Cuenca, Ecuador.

![estado](https://img.shields.io/badge/estado-en%20l%C3%ADnea-success)

## ✨ Características

- 🎨 Diseño moderno en tonos **pastel** con Tailwind CSS
- 🛒 **Carrito de compras** funcional
- 💬 **Pedido automático por WhatsApp** (arma el mensaje solo)
- 📱 Totalmente **responsive** (se ve bien en celular y computadora)
- 📂 Catálogo editable desde un archivo **JSON** (sin tocar código)

## 🗂️ Estructura del proyecto

```
dulces-carmita-garate/
├── index.html          → Página principal
├── css/estilos.css     → Estilos propios
├── js/catalogo.js      → Carrito + WhatsApp + carga del catálogo
├── data/productos.json → Lista de dulces (¡edita aquí precios y productos!)
├── img/                → Imágenes de los dulces
└── README.md
```

## 💻 Cómo correrlo localmente

> ⚠️ No basta con doble clic en `index.html` (el navegador bloquea la lectura del JSON).
> Necesitas un mini-servidor:

**Opción fácil (VS Code):**
1. Abre la carpeta en VS Code.
2. Instala la extensión **Live Server**.
3. Clic derecho en `index.html` → **Open with Live Server**.

**Opción con Python:**
```bash
python -m http.server 8000
# Abre http://localhost:8000
```

## ✏️ Cómo editar los productos

Abre `data/productos.json` y cambia nombre, precio, descripción o imagen.
¡No necesitas tocar nada de código!

## ⚙️ Cómo personalizar el WhatsApp

En `js/catalogo.js`, línea de arriba, cambia el número:
```js
const WHATSAPP = "593991234567"; // tu número con código de país, sin + ni espacios
```

## 🚀 Cómo publicarlo gratis (GitHub Pages)

1. Sube el proyecto a un repositorio en GitHub.
2. Ve a **Settings → Pages**.
3. En *Branch* elige `main` y carpeta `/ (root)` → **Save**.
4. Tu web estará en: `https://TU-USUARIO.github.io/dulces-carmita-garate/`

---

Hecho con 🩷 por la familia Garate · 2026
