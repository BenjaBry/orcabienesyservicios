/* ==========================================================================
   ORCA BIENES Y SERVICIOS - LOGICA INTERACTIVA & ANIMACIONES
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Header Pegajoso (Sticky Header)
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar al inicio por si ya hay scroll
    
    // 2. Menú de Navegación Móvil (Hamburger Menu)
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animación del icono (opcional)
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });
        
        // Cerrar menú al hacer click en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }
    
    // 3. Hero Slider Automático (Swire Properties Style)
    const slides = document.querySelectorAll('.hero-slider .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000; // Rotar cada 5 segundos
        
        const nextSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        };
        
        setInterval(nextSlide, slideInterval);
    }
    
    // 4. Filtrado de Propiedades Dinámico (Para index.html y propiedades.html)
    const filterBtn = document.getElementById('filter-btn');
    const filterType = document.getElementById('filter-type');
    const filterLocation = document.getElementById('filter-location');
    const filterStatus = document.getElementById('filter-status');
    const propertyCards = document.querySelectorAll('.property-card');
    
    if (filterBtn) {
        filterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const selectedType = filterType ? filterType.value.toLowerCase() : 'all';
            const selectedLocation = filterLocation ? filterLocation.value.toLowerCase() : 'all';
            const selectedStatus = filterStatus ? filterStatus.value.toLowerCase() : 'all';
            
            let matchCount = 0;
            
            propertyCards.forEach(card => {
                const cardType = card.dataset.type ? card.dataset.type.toLowerCase() : '';
                const cardLocation = card.dataset.location ? card.dataset.location.toLowerCase() : '';
                const cardStatus = card.dataset.status ? card.dataset.status.toLowerCase() : '';
                
                const typeMatch = (selectedType === 'all' || cardType.includes(selectedType));
                const locationMatch = (selectedLocation === 'all' || cardLocation.includes(selectedLocation));
                const statusMatch = (selectedStatus === 'all' || cardStatus.includes(selectedStatus));
                
                if (typeMatch && locationMatch && statusMatch) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                    matchCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Mostrar mensaje si no hay resultados
            const gridContainer = document.querySelector('.properties-grid');
            const noResultsMsg = document.getElementById('no-results-msg');
            
            if (matchCount === 0) {
                if (!noResultsMsg && gridContainer) {
                    const msg = document.createElement('div');
                    msg.id = 'no-results-msg';
                    msg.style.gridColumn = '1 / -1';
                    msg.style.textAlign = 'center';
                    msg.style.padding = '40px 0';
                    msg.style.color = 'var(--text-muted)';
                    msg.innerHTML = '<i class="fas fa-search-minus" style="font-size: 48px; color: var(--secondary); margin-bottom: 16px; display: block;"></i><h3>No se encontraron propiedades</h3><p style="margin-top: 8px;">Prueba ajustando los filtros de búsqueda.</p>';
                    gridContainer.appendChild(msg);
                }
            } else {
                if (noResultsMsg) {
                    noResultsMsg.remove();
                }
            }
        });
    }
    
    // 5. Animación de Aparición al Hacer Scroll (Scroll Reveal Simple)
    const revealElements = document.querySelectorAll('.property-card, .value-card, .info-block, .agent-card, .about-text, .about-img');
    
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Dejar de observar una vez animado
                }
            });
        };
        
        const revealObserver = new IntersectionObserver(revealCallback, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // Se activa un poco antes de entrar completamente
        });
        
        revealElements.forEach(el => {
            // Estilos iniciales para la animación
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            revealObserver.observe(el);
        });
    }
    
    // 6. Configurar comportamiento del formulario de contacto / lead
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name').value;
            const phone = document.getElementById('form-phone').value;
            const message = document.getElementById('form-message').value;
            
            // Crear el mensaje personalizado para WhatsApp
            const customMsg = `Hola ORCA Bienes y Servicios, mi nombre es ${name}. Mi teléfono es ${phone}. Deseo realizar una consulta: ${message}`;
            const whatsappUrl = `https://wa.me/50248973479?text=${encodeURIComponent(customMsg)}`;
            
            // Redirigir a WhatsApp en pestaña nueva
            window.open(whatsappUrl, '_blank');
        });
    }
});

// Definición de animación de aparición para tarjetas filtradas
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;
document.head.appendChild(styleSheet);
