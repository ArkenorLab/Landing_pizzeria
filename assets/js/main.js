/**
 * PIZZERÍA EXPRESS - PIZZA & FAST FOOD
 * Lógica de Pedidos Express a Domicilio, Categorías, WhatsApp Directo
 * y Realidad Aumentada: Ver Pizza en Tu Mesa con la Cámara
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. CONFIGURACIÓN DEL RESTAURANTE (GENERAL)
  // ==========================================
  const RESTAURANT_CONFIG = {
    name: "Pizzería Express",
    phoneDisplay: "+1 234 567 890",
    whatsappPhone: "1234567890",
    defaultMessage: "¡Hola Pizzería Express! Quisiera hacer un pedido de pizza a domicilio",
    email: "pedidos@pizzeriaexpress.com",
    city: "Tu Ciudad, Colombia",
    socials: {
      instagram: "https://www.instagram.com/pizzeriaexpress",
      tiktok: "https://www.tiktok.com/@pizzeriaexpress",
      website: "https://www.pizzeriaexpress.com"
    }
  };

  function buildWhatsAppUrl(message) {
    const encodedMsg = encodeURIComponent(message || RESTAURANT_CONFIG.defaultMessage);
    return `https://wa.me/${RESTAURANT_CONFIG.whatsappPhone}?text=${encodedMsg}`;
  }

  // ==========================================
  // 2. HEADER STICKY & MENÚ MÓVIL
  // ==========================================
  const mainNavbar = document.getElementById('main-navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
  const navLinks = document.querySelectorAll('.nav-link-item');
  const backToTopBtn = document.getElementById('back-to-top');

  function toggleMobileMenu(forceClose = false) {
    if (!mobileMenu) return;
    const isHidden = mobileMenu.classList.contains('hidden');
    if (forceClose || !isHidden) {
      mobileMenu.classList.add('hidden');
      if (mobileMenuBackdrop) mobileMenuBackdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    } else {
      mobileMenu.classList.remove('hidden');
      if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());
  if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', () => toggleMobileMenu(true));
  navLinks.forEach(link => link.addEventListener('click', () => toggleMobileMenu(true)));

  window.addEventListener('scroll', () => {
    if (mainNavbar) {
      if (window.scrollY > 20) {
        mainNavbar.classList.add('shadow-md', 'bg-white/95');
        mainNavbar.classList.remove('bg-white/80');
      } else {
        mainNavbar.classList.remove('shadow-md', 'bg-white/95');
        mainNavbar.classList.add('bg-white/80');
      }
    }
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ==========================================
  // 3. FILTRO DE CATEGORÍAS DEL MENÚ
  // ==========================================
  const menuTabBtns = document.querySelectorAll('.menu-category-btn');
  const menuItems = document.querySelectorAll('.menu-card-item');

  menuTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      menuTabBtns.forEach(b => {
        b.classList.remove('bg-brandRed', 'text-white', 'shadow-md', 'shadow-brandRed/30');
        b.classList.add('bg-zinc-100', 'text-zinc-600', 'hover:bg-zinc-200');
      });
      btn.classList.add('bg-brandRed', 'text-white', 'shadow-md', 'shadow-brandRed/30');
      btn.classList.remove('bg-zinc-100', 'text-zinc-600', 'hover:bg-zinc-200');

      const targetCategory = btn.getAttribute('data-category');
      menuItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (targetCategory === 'todos' || itemCat === targetCategory) {
          item.classList.remove('hidden');
          item.classList.add('animate-fadeIn');
        } else {
          item.classList.add('hidden');
          item.classList.remove('animate-fadeIn');
        }
      });
    });
  });

  // ==========================================
  // 4. MODAL INTERACTIVO DE PEDIDO RÁPIDO
  // ==========================================
  const orderModal = document.getElementById('order-modal');
  const openOrderBtns = document.querySelectorAll('.open-order-modal-btn');
  const closeOrderBtns = document.querySelectorAll('.close-order-modal-btn');
  const orderForm = document.getElementById('quick-order-form');
  const modalItemName = document.getElementById('modal-item-name');
  const modalItemCategory = document.getElementById('modal-item-category');
  const modalItemPrice = document.getElementById('modal-item-price');

  let currentSelectedDish = "Pizza Especial Express";
  let currentSelectedPrice = "$12.000";

  function openOrderModal(dishName, category, price) {
    if (!orderModal) return;
    currentSelectedDish = dishName || currentSelectedDish;
    currentSelectedPrice = price || currentSelectedPrice;
    if (modalItemName) modalItemName.textContent = currentSelectedDish;
    if (modalItemCategory) modalItemCategory.textContent = category || "Comida Rápida";
    if (modalItemPrice) modalItemPrice.textContent = currentSelectedPrice;
    orderModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeOrderModal() {
    if (!orderModal) return;
    orderModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  openOrderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const dish = btn.getAttribute('data-dish') || "Pizza / Comida Rápida";
      const category = btn.getAttribute('data-category') || "Especialidad";
      const price = btn.getAttribute('data-price') || "";
      openOrderModal(dish, category, price);
    });
  });

  closeOrderBtns.forEach(btn => btn.addEventListener('click', closeOrderModal));

  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) closeOrderModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && orderModal && !orderModal.classList.contains('hidden')) {
      closeOrderModal();
    }
  });

  // Envío del Formulario del Modal a WhatsApp
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const quantity = document.getElementById('order-quantity')?.value || '1';
      const sizeOrStyle = document.getElementById('order-size')?.value || 'Tamaño Estándar';
      const customerName = document.getElementById('order-customer-name')?.value || 'Cliente';
      const customerPhone = document.getElementById('order-customer-phone')?.value || '';
      const address = document.getElementById('order-address')?.value || 'Tu Ciudad';
      const neighborhood = document.getElementById('order-neighborhood')?.value || '';
      const paymentMethod = document.getElementById('order-payment')?.value || 'Efectivo';
      const notes = document.getElementById('order-notes')?.value || 'Sin observaciones';

      const orderMessage = `🍕 *PEDIDO A DOMICILIO - PIZZERÍA EXPRESS*\n\n` +
        `👤 *Cliente:* ${customerName}\n` +
        `📱 *Teléfono:* ${customerPhone}\n` +
        `📍 *Dirección:* ${address} (${neighborhood})\n` +
        `🍽️ *Plato:* ${currentSelectedDish}\n` +
        `📏 *Especificación / Tamaño:* ${sizeOrStyle}\n` +
        `🔢 *Cantidad:* ${quantity}\n` +
        `💵 *Método de Pago:* ${paymentMethod}\n` +
        `📝 *Notas / Salsa:* ${notes}\n\n` +
        `¡Hola Pizzería Express! Por favor confírmenme el tiempo estimado de entrega y el total.`;

      showToast("¡Generando tu pedido para WhatsApp...", "success");
      setTimeout(() => {
        window.open(buildWhatsAppUrl(orderMessage), '_blank');
        closeOrderModal();
        orderForm.reset();
      }, 1000);
    });
  }

  // ==========================================
  // 5. FORMULARIO DE PEDIDO RÁPIDO INLINE
  // ==========================================
  const quickInlineForm = document.getElementById('inline-order-form');
  if (quickInlineForm) {
    quickInlineForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const foodChoice = document.getElementById('inline-dish-select')?.value || 'Pizza Especial Express';
      const address = document.getElementById('inline-address')?.value || 'Tu Ciudad';
      const phone = document.getElementById('inline-phone')?.value || '';
      const notes = document.getElementById('inline-notes')?.value || '';

      const msg = `🍕 *PEDIDO RÁPIDO - PIZZERÍA EXPRESS*\n\n` +
        `🍔 *Antojo:* ${foodChoice}\n` +
        `📍 *Dirección de Entrega:* ${address}\n` +
        `📱 *Contacto:* ${phone}\n` +
        `📝 *Detalles:* ${notes || 'Listo para despachar'}\n\n` +
        `¡Hola Pizzería Express! Quisiera ordenar este pedido a domicilio.`;

      showToast("¡Conectando con la línea de domicilios...", "success");
      setTimeout(() => {
        window.open(buildWhatsAppUrl(msg), '_blank');
        quickInlineForm.reset();
      }, 900);
    });
  }

  // ==========================================
  // 6. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
  // ==========================================
  const faqHeaders = document.querySelectorAll('.faq-header-btn');
  faqHeaders.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isOpen = content.classList.contains('open');

      document.querySelectorAll('.faq-content').forEach(c => {
        c.classList.remove('open');
        c.style.maxHeight = null;
      });
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('open'));

      if (!isOpen) {
        content.classList.add('open');
        content.style.maxHeight = content.scrollHeight + "px";
        if (icon) icon.classList.add('open');
      }
    });
  });

  // ==========================================
  // 7. SISTEMA DE TOAST FEEDBACK
  // ==========================================
  function showToast(message, type = 'info') {
    let container = document.getElementById('toast-notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-notification-container';
      container.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none px-4 max-w-sm w-full';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `p-4 rounded-2xl shadow-xl backdrop-blur-md text-white border flex items-center gap-3 transition-all duration-300 transform translate-y-3 opacity-0 pointer-events-auto bg-zinc-900 border-zinc-700`;
    toast.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-brandRed/20 border border-brandRed text-brandRed flex items-center justify-center shrink-0">
        <i class="fa-solid fa-pizza-slice text-xs"></i>
      </div>
      <p class="text-xs font-semibold leading-tight text-zinc-100">${message}</p>
    `;
    container.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-3', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-3', 'opacity-0');
      setTimeout(() => toast.remove(), 350);
    }, 3000);
  }

  // ==========================================
  // 8. REALIDAD AUMENTADA: PIZZA EN TU MESA (CÁMARA)
  // ==========================================
  const raModal = document.getElementById('ra-modal');
  const raVideo = document.getElementById('ra-video');
  const raCanvas = document.getElementById('ra-canvas');
  const raPizzaOverlay = document.getElementById('ra-pizza-overlay');
  const raPizzaImg = document.getElementById('ra-pizza-img');
  const raPlaceholder = document.getElementById('ra-placeholder');
  const raControls = document.getElementById('ra-controls');
  const raStartBtn = document.getElementById('ra-start-camera');
  const raCaptureBtn = document.getElementById('ra-capture');
  const raDownloadBtn = document.getElementById('ra-download');
  const raCloseBtn = document.getElementById('ra-close-ra-modal');
  const raOpenBtn = document.getElementById('open-ra-btn');
  const raZoomVal = document.getElementById('ra-zoom-val');

  let raStream = null;
  let raScale = 1;
  let raRotation = 0;
  let raIsDragging = false;
  let raStartX = 0;
  let raStartY = 0;
  let raInitialLeft = '50%';
  let raInitialTop = '50%';
  let raCurrentLeft = '50%';
  let raCurrentTop = '50%';

  // Abrir modal RA desde botón de la sección hero
  if (raOpenBtn) {
    raOpenBtn.addEventListener('click', openRACameraModal);
  }

  // Abrir modal RA global (disponible para onclick en HTML)
  window.openRACameraModal = function () {
    if (!raModal) return;
    raModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    resetRAState();
    selectRAPizza('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop', 'Pizza Especial');
  };

  window.selectRAPizza = function (url, name) {
    raPizzaImg.src = url;
    raPizzaImg.alt = `Pizza RA: ${name}`;
    raControls.classList.remove('hidden');
    raCaptureBtn.classList.remove('hidden');
    raDownloadBtn.classList.remove('hidden');
    raStartBtn.classList.remove('hidden');
  };

  function resetRAState() {
    raScale = 1;
    raRotation = 0;
    raCurrentLeft = '50%';
    raCurrentTop = '50%';
    raPizzaOverlay.style.left = '50%';
    raPizzaOverlay.style.top = '50%';
    raPizzaOverlay.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
    raZoomVal.textContent = '100%';
    raPlaceholder.classList.remove('hidden');
    raVideo.classList.add('hidden');
    raCanvas.classList.add('hidden');
    raControls.classList.add('hidden');
    raCaptureBtn.classList.add('hidden');
    raDownloadBtn.classList.add('hidden');
    raStartBtn.classList.remove('hidden');
    stopCamera();
  }

  function stopCamera() {
    if (raStream) {
      raStream.getTracks().forEach(track => track.stop());
      raStream = null;
    }
    if (raVideo.srcObject) {
      raVideo.srcObject = null;
    }
  }

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: 1280, height: 720 },
        audio: false
      });
      raStream = stream;
      raVideo.srcObject = stream;
      await raVideo.play();
      raPlaceholder.classList.add('hidden');
      raVideo.classList.remove('hidden');
      raStartBtn.classList.add('hidden');
      raControls.classList.remove('hidden');
      showToast("Cámara activada. Arrastra la pizza sobre tu mesa.", "success");
    } catch (err) {
      console.error("Error accediendo a la cámara:", err);
      showToast("No se pudo acceder a la cámara. Asegúrate de permitir el acceso y usa HTTPS en producción.", "error");
    }
  }

  if (raStartBtn) {
    raStartBtn.addEventListener('click', startCamera);
  }

  if (raCloseBtn) {
    raCloseBtn.addEventListener('click', closeRACameraModal);
  }

  window.closeRACameraModal = function () {
    if (!raModal) return;
    raModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    stopCamera();
    resetRAState();
  };

  if (raModal) {
    raModal.addEventListener('click', (e) => {
      if (e.target === raModal) closeRACameraModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && raModal && !raModal.classList.contains('hidden')) {
      closeRACameraModal();
    }
  });

  // ==========================================
  // 8.1. CONTROLES DE ARRASTRE, ESCALA Y ROTACIÓN (RA)
  // ==========================================
  function applyPizzaTransform() {
    raPizzaOverlay.style.left = raCurrentLeft;
    raPizzaOverlay.style.top = raCurrentTop;
    raPizzaOverlay.style.transform = `translate(-50%, -50%) scale(${raScale}) rotate(${raRotation}deg)`;
  }

  // Arrastre (mouse)
  raPizzaOverlay.addEventListener('mousedown', (e) => {
    if (!raStream) return;
    raIsDragging = true;
    raStartX = e.clientX;
    raStartY = e.clientY;
    raPizzaOverlay.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!raIsDragging || !raStream) return;
    const dx = e.clientX - raStartX;
    const dy = e.clientY - raStartY;
    const container = document.getElementById('ra-container');
    const rect = container.getBoundingClientRect();

    // Calcular nueva posición relativa al contenedor
    let newLeft = (parseFloat(raCurrentLeft) || 50) + (dx / rect.width) * 100;
    let newTop = (parseFloat(raCurrentTop) || 50) + (dy / rect.height) * 100;

    // Limitar dentro del contenedor
    newLeft = Math.max(10, Math.min(90, newLeft));
    newTop = Math.max(10, Math.min(90, newTop));

    raCurrentLeft = newLeft + '%';
    raCurrentTop = newTop + '%';
    raStartX = e.clientX;
    raStartY = e.clientY;
    applyPizzaTransform();
  });

  window.addEventListener('mouseup', () => {
    raIsDragging = false;
    raPizzaOverlay.style.cursor = 'grab';
  });

  // Arrastre (tacto)
  raPizzaOverlay.addEventListener('touchstart', (e) => {
    if (!raStream) return;
    raIsDragging = true;
    const touch = e.touches[0];
    raStartX = touch.clientX;
    raStartY = touch.clientY;
    raPizzaOverlay.style.cursor = 'grabbing';
  }, { passive: false });

  window.addEventListener('touchmove', (e) => {
    if (!raIsDragging || !raStream) return;
    e.preventDefault();
    const touch = e.touches[0];
    const dx = touch.clientX - raStartX;
    const dy = touch.clientY - raStartY;
    const container = document.getElementById('ra-container');
    const rect = container.getBoundingClientRect();

    let newLeft = (parseFloat(raCurrentLeft) || 50) + (dx / rect.width) * 100;
    let newTop = (parseFloat(raCurrentTop) || 50) + (dy / rect.height) * 100;
    newLeft = Math.max(10, Math.min(90, newLeft));
    newTop = Math.max(10, Math.min(90, newTop));

    raCurrentLeft = newLeft + '%';
    raCurrentTop = newTop + '%';
    raStartX = touch.clientX;
    raStartY = touch.clientY;
    applyPizzaTransform();
  }, { passive: false });

  window.addEventListener('touchend', () => {
    raIsDragging = false;
    raPizzaOverlay.style.cursor = 'grab';
  });

  // Controles de escala
  document.getElementById('ra-zoom-in')?.addEventListener('click', () => {
    if (raScale >= 3) return;
    raScale = Math.min(raScale + 0.25, 3);
    raZoomVal.textContent = Math.round(raScale * 100) + '%';
    applyPizzaTransform();
  });

  document.getElementById('ra-zoom-out')?.addEventListener('click', () => {
    if (raScale <= 0.5) return;
    raScale = Math.max(raScale - 0.25, 0.5);
    raZoomVal.textContent = Math.round(raScale * 100) + '%';
    applyPizzaTransform();
  });

  // Controles de rotación
  document.getElementById('ra-rotate-right')?.addEventListener('click', () => {
    raRotation = (raRotation + 15) % 360;
    applyPizzaTransform();
  });

  document.getElementById('ra-rotate-left')?.addEventListener('click', () => {
    raRotation = (raRotation - 15 + 360) % 360;
    applyPizzaTransform();
  });

  // ==========================================
  // 8.2. CAPTURAR FOTO (CÁMARA + PIZZA SUPERPUESTA)
  // ==========================================
  if (raCaptureBtn) {
    raCaptureBtn.addEventListener('click', () => {
      if (!raStream) return;
      const canvas = raCanvas;
      const ctx = canvas.getContext('2d');
      const video = raVideo;

      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;

      // Dibujar frame de video
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Calcular posición y tamaño de la pizza en el canvas
      const rect = document.getElementById('ra-container').getBoundingClientRect();
      const videoRect = video.getBoundingClientRect();

      // Escala relativa del video en el contenedor
      const scaleX = canvas.width / videoRect.width;
      const scaleY = canvas.height / videoRect.height;

      // Posición de la pizza relativa al video
      const pizzaRect = raPizzaOverlay.getBoundingClientRect();
      const leftPx = (pizzaRect.left - videoRect.left) * scaleX;
      const topPx = (pizzaRect.top - videoRect.top) * scaleY;
      const pizzaWidthPx = pizzaRect.width * scaleX * raScale;
      const pizzaHeightPx = pizzaRect.height * scaleY * raScale;

      ctx.save();
      ctx.translate(leftPx + pizzaWidthPx / 2, topPx + pizzaHeightPx / 2);
      ctx.rotate((raRotation * Math.PI) / 180);
      ctx.drawImage(
        raPizzaImg,
        -pizzaWidthPx / 2,
        -pizzaHeightPx / 2,
        pizzaWidthPx,
        pizzaHeightPx
      );
      ctx.restore();

      raVideo.classList.add('hidden');
      raCanvas.classList.remove('hidden');
      raCaptureBtn.classList.add('hidden');
      raDownloadBtn.classList.remove('hidden');
      raControls.classList.add('hidden');

      showToast("¡Foto capturada! Descarga tu imagen con la pizza en la mesa.", "success");
    });
  }

  if (raDownloadBtn) {
    raDownloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = `pizza-en-tu-mesa-${Date.now()}.png`;
      link.href = raCanvas.toDataURL('image/png');
      link.click();
      showToast("Imagen descargada correctamente.", "success");
    });
  }

  // ==========================================
  // 9. FORMULARIO DE PEDIDO MODAL (quick-order-form ya está arriba)
  // ==========================================

  console.log("🍕 Pizzería Express - Landing Page cargada correctamente. Domicilios: +1 234 567 890");
  console.log("📸 Función RA disponible: Pizza en Tu Mesa con Cámara");

});
