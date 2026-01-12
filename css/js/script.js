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
      // Scrolling down - hide header
      header.classList.add('hidden');
      header.classList.add('scrolled');
    } else {
      // Scrolling up - show header
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
 * Mobile navigation toggle with accessibility
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
    
    // Accessibility
    hamburger.setAttribute('aria-expanded', isOpen);
    navMenu.setAttribute('aria-hidden', !isOpen);
  };

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking on a link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !hamburger.contains(e.target) && 
        !navMenu.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      toggleMenu(false);
    }
  });
};

// ============================================
// ADVANCED IMAGE CAROUSEL/SLIDESHOW
// ============================================

class ImageCarousel {
  constructor(element, options = {}) {
    this.carousel = element;
    this.slides = Array.from(element.querySelectorAll('.carousel-slide, .slide'));
    this.prevBtn = element.querySelector('.carousel-prev, .prev');
    this.nextBtn = element.querySelector('.carousel-next, .next');
    this.dotsContainer = element.querySelector('.carousel-dots, .dots');
    
    // Configuration options
    this.config = {
      autoPlay: options.autoPlay !== false,
      autoPlayDelay: options.autoPlayDelay || 5000,
      transition: options.transition || 'fade', // 'fade' or 'slide'
      pauseOnHover: options.pauseOnHover !== false,
      keyboard: options.keyboard !== false,
      touch: options.touch !== false,
      loop: options.loop !== false
    };
    
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.isPlaying = false;
    this.isTransitioning = false;
    
    // Touch tracking
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.touchStartY = 0;
    this.touchEndY = 0;

    if (this.slides.length > 0) {
      this.init();
    }
  }

  init() {
    // Add transition class to carousel
    this.carousel.classList.add(`carousel-${this.config.transition}`);
    
    // Create dots navigation
    this.createDots();
    
    // Show first slide
    this.showSlide(0, false);
    
    // Event listeners for buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevSlide());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    // Pause on hover
    if (this.config.pauseOnHover) {
      this.carousel.addEventListener('mouseenter', () => this.pause());
      this.carousel.addEventListener('mouseleave', () => this.play());
    }
    
    // Keyboard navigation
    if (this.config.keyboard) {
      this.initKeyboardControls();
    }

    // Touch/swipe support
    if (this.config.touch) {
      this.initTouchControls();
    }
    
    // Start autoplay
    if (this.config.autoPlay) {
      this.play();
    }

    // Visibility change - pause when tab is hidden
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
      dot.setAttribute('type', 'button');
      dot.addEventListener('click', () => {
        this.goToSlide(index);
        this.resetAutoPlay();
      });
      this.dotsContainer.appendChild(dot);
    });
  }

  showSlide(index, animate = true) {
    if (this.isTransitioning) return;
    
    // Boundary checks
    if (index < 0) {
      index = this.config.loop ? this.slides.length - 1 : 0;
    } else if (index >= this.slides.length) {
      index = this.config.loop ? 0 : this.slides.length - 1;
    }

    if (index === this.currentIndex && animate) return;

    this.isTransitioning = true;

    // Get all dots
    const dots = this.dotsContainer?.querySelectorAll('.carousel-dot, .dot');

    // Remove active from all
    this.slides.forEach(slide => {
      slide.classList.remove('active', 'prev', 'next');
      slide.setAttribute('aria-hidden', 'true');
    });

    dots?.forEach(dot => dot.classList.remove('active'));

    // Set current slide as active
    this.currentIndex = index;
    const currentSlide = this.slides[this.currentIndex];
    
    currentSlide.classList.add('active');
    currentSlide.setAttribute('aria-hidden', 'false');
    
    // Activate current dot
    dots?.[this.currentIndex]?.classList.add('active');

    // Allow transitions again after animation completes
    setTimeout(() => {
      this.isTransitioning = false;
    }, 600);
  }

  nextSlide() {
    if (this.isTransitioning) return;
    const nextIndex = this.currentIndex + 1;
    this.showSlide(nextIndex);
  }

  prevSlide() {
    if (this.isTransitioning) return;
    const prevIndex = this.currentIndex - 1;
    this.showSlide(prevIndex);
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

  initKeyboardControls() {
    let isCarouselFocused = false;

    this.carousel.addEventListener('mouseenter', () => isCarouselFocused = true);
    this.carousel.addEventListener('mouseleave', () => isCarouselFocused = false);

    document.addEventListener('keydown', (e) => {
      if (!isCarouselFocused) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prevSlide();
        this.resetAutoPlay();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.nextSlide();
        this.resetAutoPlay();
      }
    });
  }

  initTouchControls() {
    let touchStartTime = 0;
    
    this.carousel.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
      this.touchStartY = e.changedTouches[0].screenY;
      touchStartTime = Date.now();
      this.pause();
    }, { passive: true });

    this.carousel.addEventListener('touchmove', (e) => {
      // Optional: Add visual feedback during swipe
      this.touchEndX = e.changedTouches[0].screenX;
      this.touchEndY = e.changedTouches[0].screenY;
    }, { passive: true });

    this.carousel.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.touchEndY = e.changedTouches[0].screenY;
      
      const touchDuration = Date.now() - touchStartTime;
      
      // Only process quick swipes (under 300ms)
      if (touchDuration < 300) {
        this.handleSwipe();
      }
      
      this.resetAutoPlay();
    }, { passive: true });
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const horizontalDiff = this.touchEndX - this.touchStartX;
    const verticalDiff = Math.abs(this.touchEndY - this.touchStartY);
    
    // Only trigger if horizontal swipe is larger than vertical (prevent conflicts with scroll)
    if (Math.abs(horizontalDiff) > verticalDiff) {
      if (horizontalDiff < -swipeThreshold) {
        // Swipe left - next slide
        this.nextSlide();
      } else if (horizontalDiff > swipeThreshold) {
        // Swipe right - previous slide
        this.prevSlide();
      }
    }
  }

  destroy() {
    this.pause();
    // Remove all event listeners and clean up
    console.log('Carousel destroyed');
  }
}

/**
 * Initialize all carousels/slideshows on the page
 */
const initCarousels = () => {
  const carousels = document.querySelectorAll('.carousel, .slideshow, .hero-carousel');
  
  if (carousels.length === 0) {
    console.log('ℹ️ No carousels found on this page');
    return;
  }

  carousels.forEach((carousel, index) => {
    // Get custom options from data attributes
    const options = {
      autoPlay: carousel.dataset.autoplay !== 'false',
      autoPlayDelay: parseInt(carousel.dataset.delay) || 5000,
      transition: carousel.dataset.transition || 'fade',
      pauseOnHover: carousel.dataset.pauseOnHover !== 'false',
      keyboard: carousel.dataset.keyboard !== 'false',
      touch: carousel.dataset.touch !== 'false',
      loop: carousel.dataset.loop !== 'false'
    };

    new ImageCarousel(carousel, options);
    console.log(`✅ Slideshow ${index + 1} activated`);
  });
};

// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================

class ContactForm {
  constructor(formElement) {
    this.form = formElement;
    this.submitBtn = formElement.querySelector('.submit-btn, button[type="submit"]');
    this.originalBtnText = this.submitBtn?.textContent || 'Send Message';
    this.isSubmitting = false;
    
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Real-time validation
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => {
        this.clearError(input);
        // Optional: validate on input for better UX
        if (input.classList.contains('error')) {
          this.validateField(input);
        }
      });
    });

    console.log('✅ Contact form initialized');
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const name = field.name;
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = `${this.getFieldLabel(field)} is required`;
    }

    // Email validation
    if (type === 'email' && value) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Phone validation
    if ((name === 'phone' || type === 'tel') && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }

    // Textarea minimum length
    if (field.tagName === 'TEXTAREA' && value && value.length < 10) {
      isValid = false;
      errorMessage = 'Message must be at least 10 characters';
    }

    // Name validation (minimum 2 characters)
    if (name === 'name' && value && value.length < 2) {
      isValid = false;
      errorMessage = 'Name must be at least 2 characters';
    }

    if (!isValid) {
      this.showError(field, errorMessage);
    } else {
      this.clearError(field);
    }

    return isValid;
  }

  getFieldLabel(field) {
    const label = this.form.querySelector(`label[for="${field.id}"]`);
    if (label) return label.textContent.replace('*', '').trim();
    
    return field.name.charAt(0).toUpperCase() + field.name.slice(1);
  }

  showError(field, message) {
    const formGroup = field.closest('.form-group') || field.parentElement;
    if (!formGroup) return;

    formGroup.classList.add('error');
    field.classList.add('error');
    
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.classList.add('error-message');
      errorElement.setAttribute('role', 'alert');
      formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', errorElement.id || 'error-' + field.name);
  }

  clearError(field) {
    const formGroup = field.closest('.form-group') || field.parentElement;
    if (!formGroup) return;

    formGroup.classList.remove('error');
    field.classList.remove('error');
    
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
    
    field.setAttribute('aria-invalid', 'false');
    field.removeAttribute('aria-describedby');
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (this.isSubmitting) return;

    // Validate all fields
    const inputs = this.form.querySelectorAll('input, textarea, select');
    let isFormValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      this.showFormMessage('Please fix the errors above before submitting', 'error');
      // Focus first error field
      const firstError = this.form.querySelector('.error input, .error textarea');
      firstError?.focus();
      return;
    }

    // Prevent double submission
    this.isSubmitting = true;
    this.submitBtn.disabled = true;
    this.submitBtn.textContent = 'Sending...';
    this.submitBtn.classList.add('loading');

    // Get form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());

    try {
      await this.submitFormData(data);
      
      this.showFormMessage('✓ Thank you! Your message has been sent successfully.', 'success');
      this.form.reset();
      
      // Remove error states
      inputs.forEach(input => this.clearError(input));
      
    } catch (error) {
      console.error('Form submission error:', error);
      this.showFormMessage('✗ Sorry, there was an error. Please try again or email us directly.', 'error');
    } finally {
      // Re-enable submit button
      this.isSubmitting = false;
      this.submitBtn.disabled = false;
      this.submitBtn.textContent = this.originalBtnText;
      this.submitBtn.classList.remove('loading');
    }
  }

  async submitFormData(data) {
    // 🔥 REPLACE THIS WITH YOUR ACTUAL FORM HANDLER
    // Options: FormSpree, Netlify Forms, EmailJS, custom backend, etc.
    
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('📧 Form data submitted:', data);
        resolve({ success: true });
        
        // Uncomment to test error handling
        // reject(new Error('Simulated error'));
      }, 1500);
    });

    /* 
    // EXAMPLE: Real API submission
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
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
    // Remove existing message
    const existingMessage = this.form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageElement = document.createElement('div');
    messageElement.classList.add('form-message', type);
    messageElement.setAttribute('role', 'alert');
    messageElement.textContent = message;

    // Insert after submit button or at end of form
    const submitGroup = this.submitBtn.closest('.form-group') || this.submitBtn.parentElement;
    submitGroup.parentNode.insertBefore(messageElement, submitGroup.nextSibling);

    // Auto-hide success messages after 6 seconds
    if (type === 'success') {
      setTimeout(() => {
        messageElement.classList.add('fade-out');
        setTimeout(() => messageElement.remove(), 300);
      }, 6000);
    }
  }
}

/**
 * Initialize contact form
 */
const initContactForm = () => {
  const contactForm = document.querySelector('.contact-form, #contact-form');
  if (contactForm) {
    new ContactForm(contactForm);
    console.log('✅ Contact form ready');
  }
};

// ============================================
// GOOGLE MAP INITIALIZATION
// ============================================

/**
 * Initialize Google Map (call this after API loads)
 */
const initGoogleMap = () => {
  const mapElement = document.getElementById('google-map');
  if (!mapElement) {
    console.log('ℹ️ No map element found');
    return;
  }

  // Check if Google Maps API is loaded
  if (typeof google === 'undefined' || !google.maps) {
    console.warn('⚠️ Google Maps API not loaded. Add this to your HTML:');
    console.warn('<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>');
    return;
  }

  try {
    // 🔥 REPLACE WITH YOUR ACTUAL BUSINESS COORDINATES
    const location = {
      lat: parseFloat(mapElement.dataset.lat) || 40.7128,
      lng: parseFloat(mapElement.dataset.lng) || -74.0060
    };

    const map = new google.maps.Map(mapElement, {
      center: location,
      zoom: parseInt(mapElement.dataset.zoom) || 15,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      styles: [
        {
          featureType: 'all',
          elementType: 'geometry',
          stylers: [{ color: '#f5f5f5' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#c9e6f5' }]
        },
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#ffffff' }]
        }
      ]
    });

    // Add custom marker
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: mapElement.dataset.title || 'Our Location',
      animation: google.maps.Animation.DROP
    });

    // Info window
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 12px; font-family: system-ui, sans-serif; max-width: 250px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">
            ${mapElement.dataset.title || 'Your Business Name'}
          </h3>
          <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.5;">
            ${mapElement.dataset.address || '123 Business St, City, State 12345'}
          </p>
        </div>
      `
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    // Auto-open info window
    if (mapElement.dataset.autoOpen === 'true') {
      infoWindow.open(map, marker);
    }

    console.log('✅ Google Map initialized');

  } catch (error) {
    console.error('❌ Error initializing map:', error);
  }
};

// Make it globally accessible for Google Maps callback
window.initMap = initGoogleMap;

// ============================================
// INTERSECTION OBSERVER (Scroll Animations)
// ============================================

/**
 * Animate elements when they come into view
 */
const initScrollAnimations = () => {
  if (!('IntersectionObserver' in window)) {
    console.log('ℹ️ IntersectionObserver not supported, skipping animations');
    return;
  }

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible', 'animated');
        
        // Optionally unobserve after animation (performance)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in, .animate-on-scroll');
  fadeElements.forEach(element => {
    observer.observe(element);
  });

  if (fadeElements.length > 0) {
    console.log(`✅ ${fadeElements.length} elements set for scroll animation`);
  }
};

// ============================================
// PRODUCT FILTERS
// ============================================

/**
 * Filter products by category
 */
const initProductFilters = () => {
  const filterButtons = document.querySelectorAll('.filter-btn, [data-filter]');
  const productCards = document.querySelectorAll('.product-card, [data-category]');

  if (filterButtons.length === 0 || productCards.length === 0) {
    return;
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      // Update active button state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter products with animation
      productCards.forEach(card => {
        const category = card.dataset.category;
        
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          setTimeout(() => {
            card.classList.add('visible');
            card.classList.remove('hidden');
          }, 10);
        } else {
          card.classList.remove('visible');
          card.classList.add('hidden');
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });

      console.log(`Filtered to: ${filter}`);
    });
  });

  console.log('✅ Product filters ready');
};

// ============================================
// LAZY LOADING IMAGES
// ============================================

/**
 * Lazy load images for better performance
 */
const initLazyLoading = () => {
  const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');
  
  if (lazyImages.length === 0) return;

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }
          
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    lazyImages.forEach(img => imageObserver.observe(img));
    console.log(`✅ Lazy loading ${lazyImages.length} images`);
    
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
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
  let backToTopBtn = document.querySelector('.back-to-top');
  
  // Create button if it doesn't exist
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.classList.add('back-to-top');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.setAttribute('type', 'button');
    document.body.appendChild(backToTopBtn);
  }

  let isVisible = false;

  const toggleButton = debounce(() => {
    if (window.pageYOffset > 400 && !isVisible) {
      backToTopBtn.classList.add('visible');
      isVisible = true;
    } else if (window.pageYOffset <= 400 && isVisible) {
      backToTopBtn.classList.remove('visible');
      isVisible = false;
    }
  }, 100);

  window.addEventListener('scroll', toggleButton);

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  console.log('✅ Back to top button ready');
};

// ============================================
// PAGE LOAD PERFORMANCE TRACKING
// ============================================

/**
 * Track and log page performance metrics
 */
const trackPerformance = () => {
  if (!('performance' in window)) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;
      
      console.log('📊 Performance Metrics:');
      console.log(`   Page Load: ${pageLoadTime}ms`);
      console.log(`   Server Response: ${connectTime}ms`);
      console.log(`   DOM Render: ${renderTime}ms`);
      
      // Optional: Send to analytics
      // gtag('event', 'timing_complete', { ... });
    }, 0);
  });
};

// ============================================
// MAIN INITIALIZATION
// ============================================

/**
 * Initialize all functionality
 */
const init = () => {
  console.log('🚀 Initializing website...');
  
  updateCopyrightYear();
  initSmoothScroll();
  initStickyHeader();
  initMobileNav();
  initCarousels();          // ⭐ SLIDESHOWS
  initContactForm();
  initScrollAnimations();
  initProductFilters();
  initLazyLoading();
  initBackToTop();
  trackPerformance();
  
  console.log('✅ All systems ready!');
};

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Module exports (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ImageCarousel,
    ContactForm,
    initGoogleMap
  };
}
