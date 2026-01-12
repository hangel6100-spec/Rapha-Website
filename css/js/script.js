/**
 * Fortune 500 Corporate Website - Main JavaScript
 * Professional, modular, production-ready code
 * @version 1.0.0
 */

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Smooth scroll to anchor links
 */
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#0') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
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
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
};

/**
 * Sticky header on scroll
 */
const initStickyHeader = () => {
  const header = document.querySelector('.main-header');
  if (!header) return;

  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 100) {
      header.classList.remove('scrolled');
      header.classList.remove('hidden');
    } else if (currentScroll > lastScroll && currentScroll > 200) {
      // Scrolling down - hide header
      header.classList.add('hidden');
    } else {
      // Scrolling up - show header
      header.classList.remove('hidden');
      header.classList.add('scrolled');
    }

    lastScroll = currentScroll;
  });
};

/**
 * Mobile navigation toggle
 */
const initMobileNav = () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.classList.toggle('nav-open');
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      body.classList.remove('nav-open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      body.classList.remove('nav-open');
    }
  });
};

// ============================================
// IMAGE CAROUSEL/SLIDER
// ============================================

class ImageCarousel {
  constructor(element) {
    this.carousel = element;
    this.slides = element.querySelectorAll('.carousel-slide');
    this.prevBtn = element.querySelector('.carousel-prev');
    this.nextBtn = element.querySelector('.carousel-next');
    this.dotsContainer = element.querySelector('.carousel-dots');
    
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 seconds
    this.isPlaying = true;

    if (this.slides.length > 0) {
      this.init();
    }
  }

  init() {
    // Create dots
    this.createDots();
    
    // Show first slide
    this.showSlide(0);
    
    // Event listeners
    this.prevBtn?.addEventListener('click', () => this.prevSlide());
    this.nextBtn?.addEventListener('click', () => this.nextSlide());
    
    // Pause on hover
    this.carousel.addEventListener('mouseenter', () => this.pause());
    this.carousel.addEventListener('mouseleave', () => this.play());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });

    // Touch/swipe support
    this.initTouchControls();
    
    // Start autoplay
    this.play();
  }

  createDots() {
    if (!this.dotsContainer) return;
    
    this.slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
    });
  }

  showSlide(index) {
    // Remove active class from all slides
    this.slides.forEach(slide => {
      slide.classList.remove('active');
      slide.setAttribute('aria-hidden', 'true');
    });

    // Remove active class from all dots
    const dots = this.dotsContainer?.querySelectorAll('.carousel-dot');
    dots?.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide
    this.currentIndex = index;
    this.slides[this.currentIndex].classList.add('active');
    this.slides[this.currentIndex].setAttribute('aria-hidden', 'false');
    
    // Add active class to current dot
    dots?.[this.currentIndex]?.classList.add('active');
  }

  nextSlide() {
    let nextIndex = this.currentIndex + 1;
    if (nextIndex >= this.slides.length) {
      nextIndex = 0;
    }
    this.showSlide(nextIndex);
  }

  prevSlide() {
    let prevIndex = this.currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = this.slides.length - 1;
    }
    this.showSlide(prevIndex);
  }

  goToSlide(index) {
    this.showSlide(index);
    this.pause();
    this.play();
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.autoPlayInterval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
  }

  pause() {
    this.isPlaying = false;
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  initTouchControls() {
    let touchStartX = 0;
    let touchEndX = 0;

    this.carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        this.nextSlide();
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        this.prevSlide();
      }
    };

    this.handleSwipe = handleSwipe;
  }
}

/**
 * Initialize all carousels on the page
 */
const initCarousels = () => {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => new ImageCarousel(carousel));
};

// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================

class ContactForm {
  constructor(formElement) {
    this.form = formElement;
    this.submitBtn = formElement.querySelector('.submit-btn');
    this.originalBtnText = this.submitBtn?.textContent || 'Send Message';
    
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Real-time validation
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const name = field.name;
    let isValid = true;
    let errorMessage = '';

    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Email validation
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Phone validation (if phone field exists)
    if (name === 'phone' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }

    // Message minimum length
    if (type === 'textarea' && value && value.length < 10) {
      isValid = false;
      errorMessage = 'Message must be at least 10 characters';
    }

    if (!isValid) {
      this.showError(field, errorMessage);
    } else {
      this.clearError(field);
    }

    return isValid;
  }

  showError(field, message) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;

    formGroup.classList.add('error');
    
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.classList.add('error-message');
      formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    field.setAttribute('aria-invalid', 'true');
  }

  clearError(field) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;

    formGroup.classList.remove('error');
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
    field.setAttribute('aria-invalid', 'false');
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    const inputs = this.form.querySelectorAll('input, textarea');
    let isFormValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      this.showFormMessage('Please fix the errors above', 'error');
      return;
    }

    // Disable submit button
    this.submitBtn.disabled = true;
    this.submitBtn.textContent = 'Sending...';

    // Get form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Simulate API call (replace with your actual endpoint)
      await this.submitFormData(data);
      
      this.showFormMessage('Thank you! Your message has been sent successfully.', 'success');
      this.form.reset();
      
    } catch (error) {
      console.error('Form submission error:', error);
      this.showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
      // Re-enable submit button
      this.submitBtn.disabled = false;
      this.submitBtn.textContent = this.originalBtnText;
    }
  }

  async submitFormData(data) {
    // Replace this with your actual form submission logic
    // Options: FormSpree, Netlify Forms, EmailJS, custom backend API, etc.
    
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form data:', data);
        resolve();
      }, 1500);
    });

    // Example with fetch to a backend API:
    /*
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
    */
  }

  showFormMessage(message, type) {
    let messageElement = this.form.querySelector('.form-message');
    
    if (!messageElement) {
      messageElement = document.createElement('div');
      messageElement.classList.add('form-message');
      this.form.appendChild(messageElement);
    }

    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    messageElement.setAttribute('role', 'alert');

    // Auto-hide after 5 seconds
    setTimeout(() => {
      messageElement.classList.add('fade-out');
      setTimeout(() => messageElement.remove(), 300);
    }, 5000);
  }
}

/**
 * Initialize contact form
 */
const initContactForm = () => {
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    new ContactForm(contactForm);
  }
};

// ============================================
// GOOGLE MAP INITIALIZATION
// ============================================

/**
 * Initialize Google Map (if Google Maps API is loaded)
 */
const initGoogleMap = () => {
  const mapElement = document.getElementById('google-map');
  if (!mapElement) return;

  // Check if Google Maps API is loaded
  if (typeof google === 'undefined') {
    console.warn('Google Maps API not loaded');
    return;
  }

  // Default coordinates (replace with your business location)
  const location = {
    lat: 40.7128,
    lng: -74.0060
  };

  const map = new google.maps.Map(mapElement, {
    center: location,
    zoom: 15,
    styles: [
      {
        featureType: 'all',
        elementType: 'geometry',
        stylers: [{ color: '#f5f5f5' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#e9e9e9' }]
      },
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  });

  // Add marker
  const marker = new google.maps.Marker({
    position: location,
    map: map,
    title: 'Our Location',
    animation: google.maps.Animation.DROP
  });

  // Optional: Add info window
  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div style="padding: 10px; font-family: system-ui, sans-serif;">
        <h3 style="margin: 0 0 5px 0; font-size: 16px;">Your Business Name</h3>
        <p style="margin: 0; color: #666; font-size: 14px;">123 Business St, City, State 12345</p>
      </div>
    `
  });

  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
};

// ============================================
// INTERSECTION OBSERVER (Animate on Scroll)
// ============================================

/**
 * Fade-in animation for elements on scroll
 */
const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(element => observer.observe(element));
};

// ============================================
// PRODUCT FILTERS (Optional Enhancement)
// ============================================

/**
 * Filter products by category
 */
const initProductFilters = () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterButtons.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter products
      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
          setTimeout(() => card.classList.add('visible'), 10);
        } else {
          card.classList.remove('visible');
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });
};

// ============================================
// LAZY LOADING IMAGES
// ============================================

/**
 * Lazy load images for performance
 */
const initLazyLoading = () => {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
};

// ============================================
// BACK TO TOP BUTTON
// ============================================

/**
 * Show/hide back to top button
 */
const initBackToTop = () => {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

// ============================================
// PAGE LOAD ANALYTICS
// ============================================

/**
 * Track page performance (optional)
 */
const trackPerformance = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Page load time: ${pageLoadTime}ms`);
      
      // Send to analytics if needed
      // Example: gtag('event', 'timing_complete', { ... });
    });
  }
};

// ============================================
// INITIALIZATION ON DOM READY
// ============================================

/**
 * Initialize all functionality when DOM is ready
 */
const init = () => {
  updateCopyrightYear();
  initSmoothScroll();
  initStickyHeader();
  initMobileNav();
  initCarousels();
  initContactForm();
  initScrollAnimations();
  initProductFilters();
  initLazyLoading();
  initBackToTop();
  trackPerformance();
};

// Run when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Initialize Google Maps when API is ready (if using callback)
window.initMap = initGoogleMap;

// Export for module usage (optional)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ImageCarousel,
    ContactForm,
    initGoogleMap
  };
}
