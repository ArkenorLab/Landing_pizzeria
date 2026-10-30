# 🍕 Livorno's - pizza & fast food (Barranquilla)

Landing Page oficial de alta conversión para **Livorno's - pizza & fast food**, optimizada para **pedidos rápidos a domicilio**, **SEO local en Barranquilla**, **Mobile-First**, **Tailwind CSS**, **Font Awesome v6** y **JavaScript vanilla** sin dependencias complejas.

---

## 🎨 Paleta de Colores de la Marca
- **Color Primario (Acento y CTAs):** Rojo Carmesí / Rojo Tomate vibrante (`#E52D35` / hover `#CC1F27`), extraído del letrero exterior iluminado de Livorno's.
- **Color Secundario y Fondos:** Blanco puro (`#FFFFFF`), Beige cálido suave (`#FAFAFA`), y acentos en Negro/Gris noche (`#18181B`) para generar el ambiente del local y un alto contraste visual.
- **Color de Texto:** Gris muy oscuro / Negro (`#18181B`) para máxima legibilidad en smartphones.

---

## 🚀 Características Implementadas

### 1. 🔍 SEO Local & Metadatos Técnicos
- **Metaetiquetas locales configuradas:**
  - `pizzería en Barranquilla`
  - `comida rápida domicilio Barranquilla`
  - `pizzas y salvajadas Livornos`
  - `domicilios pizza cerca de mí`
- **Jerarquía estricta de encabezados:** Un solo H1 canónico:
  > *"Las mejores Pizzas y Comida Rápida de Barranquilla"*
- **Schema.org JSON-LD:** Marcado estructurado gastronómico de `Restaurant` y `FastFoodRestaurant` con geolocalización, horarios, teléfono y valoración de clientes (4.8 estrellas).

### 2. ⚡ Iconografía Profesional Font Awesome 6
- 100% libre de emojis de texto simples en la UI. Clases CDN oficiales:
  - `<i class="fa-solid fa-pizza-slice"></i>`
  - `<i class="fa-solid fa-burger"></i>`
  - `<i class="fa-brands fa-whatsapp"></i>`
  - `<i class="fa-solid fa-motorcycle"></i>`
  - `<i class="fa-solid fa-clock"></i>`
  - `<i class="fa-solid fa-location-dot"></i>`
  - `<i class="fa-solid fa-drumstick-bite"></i>`
  - `<i class="fa-solid fa-fire-flame-curved"></i>`

### 3. 📱 Estructura y Secciones
1. **Header Persistente:** Logotipo "Livorno's" con subtítulo "pizza & fast food", botón directo *"Pide tu Domicilio"* y menú móvil deslizable.
2. **Hero de Impacto:** H1 canónico, subtítulo *"Sabor único, ingredientes frescos y las famosas Salvajadas a la puerta de tu casa"*, CTAs *"Pedir por WhatsApp (318 522 1017)"* y *"Ver Menú Completo"*, más fotografía de pizza artesanal en alta resolución.
3. **Menú Destacado con Filtros Dinámicos:**
   - **Pizzas Artesanales:** Pizza Livorno's Especial, Pizza Carnívora Salvaje.
   - **Comidas Rápidas & Salvajadas:** Famosa Salvajada Livorno's Original (pollo, carne, maíz, queso derretido y papitas), Desgranado Mixto Especial, Hamburguesa Monster Livorno's.
   - **Asados al Carbón:** Parrillada Mixta con patacones y chimichurri.
4. **Información Práctica & Redes Sociales:**
   - Línea directa de Domicilios: `318 522 1017`.
   - Redes sociales integradas: TikTok (`@livornospizza`) e Instagram (`@livornosfastfood`, `@livornospizza`).
   - Sitio de respaldo: `livornos.com`.
   - Zonas de cobertura express en Barranquilla (Norte, Altos del Prado, Riomar, Boston, El Golf, etc.).
5. **Canales de Contacto y Conversión Directa:**
   - Formulario de pedido rápido integrado con pre-llenado hacia WhatsApp.
   - Modal interactivo para personalizar tamaño, cantidad y método de pago (Nequi, Daviplata, Efectivo, Datáfono).
   - **Botón Flotante Animado de WhatsApp:** Esquina inferior derecha con animación de pulso y mensaje exacto:
     > *"¡Hola Livorno's! Quisiera hacer un pedido de pizza / comida rápida a domicilio"*

---

## 🛠️ Cómo Ejecutar Localmente

### Opción 1: Abrir directamente en el navegador
Haz doble clic sobre [**`index.html`**](file:///c:/Users/jorgea-hn/Desktop/LandingPages/livornos-pizza-barranquilla/index.html).

### Opción 2: Servidor Node.js ligero (Puerto 3004)
```bash
node server.js
```
Abre en tu navegador: [http://localhost:3004](http://localhost:3004)

---

## 📁 Estructura del Proyecto
```
livornos-pizza-barranquilla/
├── index.html                   # Landing page completa y autónoma
├── server.js                    # Servidor local Node.js (puerto 3004)
├── README.md                    # Documentación y SEO
└── assets/
    ├── css/
    │   └── styles.css           # Estilos personalizados, glows y scrollbar
    ├── js/
    │   └── main.js              # Lógica de pedidos, modal WhatsApp y categorías
    └── images/
        ├── hero-pizza.jpg       # Fotografía de pizza artesanal con queso derretido
        ├── salvajada.jpg        # Fotografía de la famosa Salvajada de Barranquilla
        └── asados.jpg           # Fotografía de asados mixtos al carbón con patacones
```
