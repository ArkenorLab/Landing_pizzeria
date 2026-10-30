/**
 * LIVORNO'S - PIZZA & FAST FOOD (BARRANQUILLA)
 * Lógica de Pedidos Express a Domicilio, Categorías y WhatsApp Directo
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. CONFIGURACIÓN DEL RESTAURANTE
  // ==========================================
  const RESTAURANT_CONFIG = {
    name: "Livorno's - pizza & fast food",
    phoneDisplay: "318 522 1017",
    whatsappPhone: "573185221017",
    defaultMessage: "¡Hola Livorno's! Quisiera hacer un pedido de pizza / comida rápida a domicilio",
    email: "pedidos@livornos.com",
    city: "Barranquilla, Colombia",
    socials: {
      tiktok: "https://www.tiktok.com/@livornospizza",
      instagram: "https://www.instagram.com/livornosfastfood",
      instagramPizza: "https://www.instagram.com/livornospizza",
      website: "https://www.livornos.com"
    }
  };

  // Helper para construir enlaces directos de WhatsApp
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

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());
  }

  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.addEventListener('click', () => toggleMobileMenu(true));
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(true));
  });

  // Detección de scroll
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
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 3. FILTRO DE CATEGORÍAS DEL MENÚ
  // ==========================================
  const menuTabBtns = document.querySelectorAll('.menu-category-btn');
  const menuItems = document.querySelectorAll('.menu-card-item');

  menuTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Desactivar todos los botones
      menuTabBtns.forEach(b => {
        b.classList.remove('bg-brandRed', 'text-white', 'shadow-md', 'shadow-brandRed/30');
        b.classList.add('bg-zinc-100', 'text-zinc-600', 'hover:bg-zinc-200');
      });

      // Activar botón seleccionado
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

  let currentSelectedDish = "Salvajada Livorno's Original";
  let currentSelectedPrice = "$32.000";

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

  closeOrderBtns.forEach(btn => {
    btn.addEventListener('click', closeOrderModal);
  });

  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) {
        closeOrderModal();
      }
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
      const address = document.getElementById('order-address')?.value || 'Barranquilla';
      const neighborhood = document.getElementById('order-neighborhood')?.value || '';
      const paymentMethod = document.getElementById('order-payment')?.value || 'Efectivo';
      const notes = document.getElementById('order-notes')?.value || 'Sin observaciones';

      const orderMessage = `🍕 *PEDIDO A DOMICILIO - LIVORNO'S PIZZA & FAST FOOD*\n\n` +
        `👤 *Cliente:* ${customerName}\n` +
        `📱 *Teléfono:* ${customerPhone}\n` +
        `📍 *Dirección:* ${address} (${neighborhood})\n` +
        `🍽️ *Plato:* ${currentSelectedDish}\n` +
        `📏 *Especificación / Tamaño:* ${sizeOrStyle}\n` +
        `🔢 *Cantidad:* ${quantity}\n` +
        `💵 *Método de Pago:* ${paymentMethod}\n` +
        `📝 *Notas / Salsa:* ${notes}\n\n` +
        `¡Hola Livorno's! Por favor confírmenme el tiempo estimado de entrega y el total.`;

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
      const foodChoice = document.getElementById('inline-dish-select')?.value || 'Pizza Livorno Especial';
      const address = document.getElementById('inline-address')?.value || 'Barranquilla';
      const phone = document.getElementById('inline-phone')?.value || '';
      const notes = document.getElementById('inline-notes')?.value || '';

      const msg = `🍕 *PEDIDO RÁPIDO - LIVORNO'S BARRANQUILLA*\n\n` +
        `🍔 *Antojo:* ${foodChoice}\n` +
        `📍 *Dirección de Entrega:* ${address}\n` +
        `📱 *Contacto:* ${phone}\n` +
        `📝 *Detalles:* ${notes || 'Listo para despachar'}\n\n` +
        `¡Hola Livorno's! Quisiera ordenar este pedido a domicilio.`;

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

      // Cerrar otros
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

  console.log("🍕 Livorno's - pizza & fast food Landing Page cargada correctamente. Domicilios: 318 522 1017");
});
