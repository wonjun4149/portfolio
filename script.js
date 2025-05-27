// Navbar scroll effect with enhanced blur
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.remove('transparent');
    navbar.classList.add('solid');
  } else {
    navbar.classList.add('transparent');
    navbar.classList.remove('solid');
  }
});

// Calculate and display age
window.addEventListener('DOMContentLoaded', () => {
  const birthDate = new Date(2001, 9, 21); // October 21, 2001
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  const ageElement = document.getElementById("age");
  if (ageElement) {
    ageElement.innerText = "만 " + age + "세";
  }
});

// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add fade-in animation
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.transition = 'opacity 0.3s ease';
      modal.style.opacity = '1';
    }, 10);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (event.target === modal) {
      const modalId = modal.id;
      closeModal(modalId);
    }
  });
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const visibleModal = document.querySelector('.modal[style*="block"]');
    if (visibleModal) {
      closeModal(visibleModal.id);
    }
  }
});

// Smooth scrolling for navigation links with better handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
      // Temporarily disable scroll snap for smooth navigation
      document.documentElement.style.scrollSnapType = 'none';
      
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Re-enable scroll snap after navigation
      setTimeout(() => {
        const scrollPosition = window.scrollY;
        const aboutSkillsSection = document.getElementById('about-skills');
        const aboutSkillsBottom = aboutSkillsSection.offsetTop + aboutSkillsSection.offsetHeight;
        
        if (scrollPosition < aboutSkillsBottom - window.innerHeight * 0.5) {
          document.documentElement.style.scrollSnapType = 'y mandatory';
        }
      }, 1000);
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe elements for animation when page loads
window.addEventListener('load', () => {
  // Animate skill items with stagger (simplified)
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
      item.style.transition = 'all 0.5s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, index * 50);
  });

  // Observe other elements
  document.querySelectorAll('.project-card, .experience-item, .skill-category, .about-text').forEach(el => {
    observer.observe(el);
  });
});

// Add CSS for animate-in class
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Enhanced scroll behavior - disable snap from projects section
document.addEventListener('DOMContentLoaded', function() {
  const aboutSkillsSection = document.getElementById('about-skills');
  const projectsSection = document.getElementById('projects');
  
  function handleScroll() {
    const scrollPosition = window.scrollY;
    const aboutSkillsBottom = aboutSkillsSection.offsetTop + aboutSkillsSection.offsetHeight;
    
    // Disable scroll snap when reaching projects section
    if (scrollPosition >= aboutSkillsBottom - window.innerHeight * 0.5) {
      document.documentElement.style.scrollSnapType = 'none';
    } else {
      document.documentElement.style.scrollSnapType = 'y mandatory';
    }
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Also disable on resize to maintain consistency
  window.addEventListener('resize', handleScroll, { passive: true });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  
  if (hero && scrolled < window.innerHeight) {
    const rate = scrolled * -0.3;
    hero.style.transform = `translateY(${rate}px)`;
  }
}, { passive: true });

// Mobile menu toggle (for future enhancement)
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('mobile-active');
}

// Add loading screen fade out
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
  // Any heavy scroll calculations can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler, { passive: true });