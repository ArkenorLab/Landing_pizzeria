# 🍕 Pizzería Express - Pizza & Fast Food

Landing Page de alta conversión para una **pizzería general**, optimizada para **pedidos rápidos a domicilio**, **Mobile-First**, **Tailwind CSS**, **Font Awesome v6**, **JavaScript vanilla** y una función de **Realidad Aumentada (RA)** para ver pizzas en la mesa usando la cámara del dispositivo.

---

## 🎨 Paleta de Colores

* **Color Primario / Acento:** Rojo Carmesí vibrante (`#E52D35` y hover `#CC1F27`) para llamadas a la acción (CTA), insignias y elementos interactivos.
* **Color de Fondo Principal:** Beige suave / Crema cálido (`#FAFAFA` y `#F7F3EC`) con acentos en tonos pasteles (`#FFECEE`, `#FFF5F6`).
* **Color de Texto y Estructura:** Gris oscuro / Negro (`#18181B`, `#3F3F46`, `#2E221B`) para una lectura cálida y con alto contraste accesible.

---

## 📁 Estructura del Proyecto

```text
├── index.html               # Estructura semántica, metadatos y componentes principales
├── README.md                # Documentación técnica y guía de personalización
├── .gitignore               # Exclusiones estándar de Git
├── .dockerignore            # Archivos ignorados para Docker
├── Dockerfile               # Despliegue con nginx:alpine
├── server.js                # Servidor local Node.js (puerto 3004)
└── assets/
    ├── css/
    │   └── styles.css       # Estilos, efectos de interacción y estilos RA
    ├── js/
    │   └── main.js          # Lógica de pedidos, modal WhatsApp, categorías y RA con cámara
    └── images/
        └── (imágenes de pizzas cargadas desde Unsplash)
```

---

## 🌟 Características Técnicas & de Experiencia de Usuario (UI/UX)

### 1. Secciones Principales

1. **Header Flotante:** Barra de navegación accesible, enlaces rápidos y llamada directa a domicilio por WhatsApp.
2. **Hero de Impacto:** Encabezado de alto impacto visual con H1 canónico, subtítulo, CTAs (WhatsApp y Ver Menú), pilares de confianza y fotografía de pizza artesanal.
3. **Tarjeta Flotante de RA:** Acceso rápido a la función "Pizza en Tu Mesa (Realidad Aumentada)" desde el hero.
4. **Menú Destacado con Filtros Dinámicos:**
   - Filtros instantáneos en JavaScript: **Todo el Menú**, **Pizzas Artesanales**, **Combos Familiares**, **Comida Rápida**.
   - Tarjetas informativas con fotografía, precio, ingredientes y botón de pedido.
5. **Realidad Aumentada - Pizza en Tu Mesa:**
   - Acceso a la cámara del dispositivo mediante `navigator.mediaDevices.getUserMedia`.
   - Superposición de imagen de pizza sobre el feed de cámara en tiempo real.
   - Controles para **arrastrar**, **escalar** y **rotar** la pizza sobre la mesa.
   - Botón para **tomar foto** y **descargar** la imagen con la pizza superpuesta.
   - Todo se procesa localmente en el navegador; no se suben imágenes a servidores externos.
6. **Combos Familiares:** Combos para pareja, familia grande y fiesta.
7. **Información Práctica & Contacto:** Línea directa, cobertura de delivery, horarios y redes sociales.
8. **Formulario de Pedido Rápido:** Integración directa con WhatsApp para domicilios.
9. **Modal Interactivo de Pedido:** Personaliza cantidad, tamaño, método de pago y observaciones.
10. **Botón Flotante Animado de WhatsApp:** Esquina inferior derecha con animación de pulso.
11. **Preguntas Frecuentes (FAQ):** Acordeón con preguntas comunes sobre entrega, pagos y RA.
12. **Diseño Responsive:** Adaptable a móviles, tablets y escritorio con touch targets mínimos de 44×44px.

---

## 📸 Cómo Funciona la Realidad Aumentada (RA)

La función RA permite al usuario:

1. Hacer clic en **"Activar Cámara y Ver Pizza en 3D"** (botón en el hero o en la sección RA).
2. Elegir una pizza del catálogo (Pizza Especial, Pepperoni, Vegetariana, Cuatro Quesos).
3. Conceder permiso de cámara al navegador.
4. Colocar la imagen de la pizza sobre la mesa capturada por la cámara.
5. Arrastrar, escalar y rotar la pizza para visualizarla en su entorno.
6. Tomar una foto y descargarla para compartir o decidir el pedido.

> **Nota:** En producción se recomienda servir el sitio por **HTTPS** ya que el acceso a la cámara (`getUserMedia`) requiere contexto seguro en la mayoría de navegadores modernos.

---

## 🐶 Cómo Personalizar la Lista de Menú

Edita el archivo `index.html` y modifica los artículos `<article class="menu-card-item">` dentro de la sección `#menu-destacado`. Cada uno tiene atributos `data-dish`, `data-category` y `data-price` que se consumen automáticamente por `main.js`.

---

## 💻 Ejecución Local

1. Puedes abrir directamente el archivo `index.html` en tu navegador preferido.
2. O iniciar un servidor local:
   ```bash
   node server.js
   ```
   Abre en tu navegador: `http://localhost:3004`

3. O construir y ejecutar con Docker:
   ```bash
   docker build -t pizzeria-express .
   docker run -p 80:80 pizzeria-express
   ```

---

## 🐳 Despliegue con Docker

El proyecto incluye un `Dockerfile` basado en `nginx:alpine` que sirve los archivos estáticos. Ideal para desplegar en cualquier servidor con Docker.

```bash
docker build -t pizzeria-express .
docker run -d -p 80:80 --name pizzeria-express pizzeria-express
```

---

## 📦 Requisitos para RA en Producción

* **HTTPS obligatorio:** El acceso a la cámara del navegador requiere contexto seguro.
* **Permisos de cámara:** El usuario debe conceder permiso al sitio.
* **Dispositivos compatibles:** Funciona en móviles (iOS/Android) y escritorio con cámara web.
