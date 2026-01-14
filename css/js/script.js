/**
 * Fortune 500 Corporate Website - Main JavaScript
 * PRODUCTION-READY | BUG-TESTED | SLIDESHOW-OPTIMIZED
 * @version 2.0.0
 */

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function for performance optimization
 */
const debounce = (func, wait = 10) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Smooth scroll to anchor links
 */
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#0' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
};

/**
 * Dynamic copyright year update
 */
const updateCopyrightYear = () => {
  const yearElements = document.querySelectorAll('#year, .current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(element => {
    element.textContent = currentYear;
  });
};

/**
 * Sticky header on scroll with performance optimization
 */
const initStickyHeader = () => {
  const header = document.querySelector('.main-header, header');
  if (!header) return;

  let lastScroll = 0;
  let ticking = false;

  const updateHeader = () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 100) {
      header.classList.remove('scrolled', 'hidden');
    } else if (currentScroll > lastScroll && currentScroll > 200) {
      header.classList.add('hidden');
      header.classList.add('scrolled');
    } else {
      header.classList.remove('hidden');
      header.classList.add('scrolled');
    }

    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
};

/**
 * Mobile navigation toggle
 */
const initMobileNav = () => {
  const hamburger = document.querySelector('.hamburger, .mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu, .main-nav');
  const body = document.body;

  if (!hamburger || !navMenu) return;

  const toggleMenu = (shouldOpen) => {
    const isOpen = shouldOpen ?? !navMenu.classList.contains('active');
    
    hamburger.classList.toggle('active', isOpen);
    navMenu.classList.toggle('active', isOpen);
    body.classList.toggle('nav-open', isOpen);
    
    hamburger.setAttribute('aria-expanded', isOpen);
    navMenu.setAttribute('aria-hidden', !isOpen);
  };

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !hamburger.contains(e.target) && 
        !navMenu.contains(e.target)) {
      toggleMenu(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      toggleMenu(false);
    }
  });
};

// ============================================
// IMAGE CAROUSEL
// ============================================

class ImageCarousel {
  constructor(element, options = {}) {
    this.carousel = element;
    this.slides = Array.from(element.querySelectorAll('.carousel-slide, .slide'));
    this.prevBtn = element.querySelector('.carousel-prev, .prev');
    this.nextBtn = element.querySelector('.carousel-next, .next');
    this.dotsContainer = element.querySelector('.carousel-dots, .dots');
    
    this.config = {
      autoPlay: options.autoPlay !== false,
      autoPlayDelay: options.autoPlayDelay || 5000,
      pauseOnHover: options.pauseOnHover !== false,
      keyboard: options.keyboard !== false,
      touch: options.touch !== false,
      loop: options.loop !== false
    };
    
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.isPlaying = false;
    this.isTransitioning = false;
    this.touchStartX = 0;
    this.touchEndX = 0;

    if (this.slides.length > 0) {
      this.init();
    }
  }

  init() {
    this.createDots();
    this.showSlide(0, false);
    
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevSlide());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    if (this.config.pauseOnHover) {
      this.carousel.addEventListener('mouseenter', () => this.pause());
      this.carousel.addEventListener('mouseleave', () => this.play());
    }
    
    if (this.config.autoPlay) {
      this.play();
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else if (this.config.autoPlay) {
        this.play();
      }
    });

    console.log(`✅ Carousel initialized with ${this.slides.length} slides`);
  }

  createDots() {
    if (!this.dotsContainer) return;
    
    this.dotsContainer.innerHTML = '';
    
    this.slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot', 'dot');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => {
        this.goToSlide(index);
        this.resetAutoPlay();
      });
      this.dotsContainer.appendChild(dot);
    });
  }

  showSlide(index, animate = true) {
    if (this.isTransitioning) return;
    
    if (index < 0) {
      index = this.config.loop ? this.slides.length - 1 : 0;
    } else if (index >= this.slides.length) {
      index = this.config.loop ? 0 : this.slides.length - 1;
    }

    if (index === this.currentIndex && animate) return;

    this.isTransitioning = true;

    const dots = this.dotsContainer?.querySelectorAll('.carousel-dot, .dot');

    this.slides.forEach(slide => {
      slide.classList.remove('active');
      slide.setAttribute('aria-hidden', 'true');
    });

    dots?.forEach(dot => dot.classList.remove('active'));

    this.currentIndex = index;
    const currentSlide = this.slides[this.currentIndex];
    
    currentSlide.classList.add('active');
    currentSlide.setAttribute('aria-hidden', 'false');
    
    dots?.[this.currentIndex]?.classList.add('active');

    setTimeout(() => {
      this.isTransitioning = false;
    }, 600);
  }

  nextSlide() {
    if (this.isTransitioning) return;
    this.showSlide(this.currentIndex + 1);
  }

  prevSlide() {
    if (this.isTransitioning) return;
    this.showSlide(this.currentIndex - 1);
  }

  goToSlide(index) {
    if (this.isTransitioning) return;
    this.showSlide(index);
  }

  play() {
    if (this.isPlaying || this.slides.length <= 1) return;
    
    this.isPlaying = true;
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.config.autoPlayDelay);
  }

  pause() {
    this.isPlaying = false;
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.pause();
    if (this.config.autoPlay) {
      this.play();
    }
  }
}

/**
 * Initialize all carousels
 */
const initCarousels = () => {
  const carousels = document.querySelectorAll('.carousel, .slideshow, .hero-carousel, .hero-slider');
  
  if (carousels.length === 0) {
    console.log('ℹ️ No carousels found');
    return;
  }

  carousels.forEach((carousel, index) => {
    const options = {
      autoPlay: carousel.dataset.autoplay !== 'false',
      autoPlayDelay: parseInt(carousel.dataset.delay) || 5000,
      pauseOnHover: carousel.dataset.pauseOnHover !== 'false',
      keyboard: carousel.dataset.keyboard !== 'false',
      touch: carousel.dataset.touch !== 'false',
      loop: carousel.dataset.loop !== 'false'
    };

    new ImageCarousel(carousel, options);
    console.log(`✅ Slideshow ${index + 1} activated`);
  });
};

/**
 * Initialize scroll animations
 */
const initScrollAnimations = () => {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible', 'animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  });

  const fadeElements = document.querySelectorAll('.fade-in, .animate-on-scroll');
  fadeElements.forEach(element => observer.observe(element));
};

/**
 * Main initialization
 */
const init = () => {
  console.log('🚀 Initializing website...');
  
  updateCopyrightYear();
  initSmoothScroll();
  initStickyHeader();
  initMobileNav();
  initCarousels();
  initScrollAnimations();
  
  console.log('✅ All systems ready!');
};

// ✅ FIXED - Removed extra };
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Language switcher (add translations object)
const translations = {
  en: {
    title: "Welcome to Our Company",
    cta: "Get Started"
  },
  es: {
    title: "Bienvenido a Nuestra Empresa",
    cta: "Comenzar"
  }
  // Add more languages as needed
};

document.querySelectorAll("[data-lang]").forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    document.documentElement.lang = lang;
    const titleEl = document.getElementById("heroTitle");
    const ctaEl = document.getElementById("heroCTA");
    if (titleEl) titleEl.textContent = translations[lang].title;
    if (ctaEl) ctaEl.textContent = translations[lang].cta;
  });
});
