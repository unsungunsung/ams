// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (mobileMenuToggle && mainNav) {
  mobileMenuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });
}

// Accordion functionality
const accordionTriggers = document.querySelectorAll('.accordion-trigger');

accordionTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    
    // Close all accordion items
    accordionTriggers.forEach(t => {
      t.setAttribute('aria-expanded', 'false');
      const content = t.nextElementSibling;
      content.style.maxHeight = null;
    });
    
    // Toggle current accordion item
    if (!isExpanded) {
      trigger.setAttribute('aria-expanded', 'true');
      const content = trigger.nextElementSibling;
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (mainNav && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      }
    }
  });
});

// Add scroll animations
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.card, .section-header, .services-image, .strengths-banner, .cta-container');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight * 0.85) {
      element.classList.add('animate-in');
    }
  });
};

// Add animation classes to CSS
const style = document.createElement('style');
style.textContent = `
  .card, .section-header, .services-image, .strengths-banner, .cta-container {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Run on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);