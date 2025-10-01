// Navbar scroll effect & parallax
let ticking = false;
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.remove('transparent');
    navbar.classList.add('solid');
  } else {
    navbar.classList.add('transparent');
    navbar.classList.remove('solid');
  }

  if (!ticking) {
    window.requestAnimationFrame(function () {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      if (hero && scrolled < window.innerHeight) {
        const rate = scrolled * -0.1;
        hero.style.transform = `translateY(${rate}px)`;
      }
      ticking = false;
    });
    ticking = true;
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

// Enhanced smooth scroll functionality for nav links with navbar offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition = target.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
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

// On load animations
window.addEventListener('load', () => {
  // Animate skill tags
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

  // Observe elements for scroll animations
  document.querySelectorAll('.project-card, .experience-item, .skill-category, .about-text').forEach(el => {
    observer.observe(el);
  });

  // Fade out loading screen
  document.body.classList.add('loaded');
});

// Custom scroll for hero section
let isScrolling = false;
let scrollAccumulator = 0;
const scrollThreshold = 50; // Adjust this value for sensitivity

window.addEventListener('wheel', (e) => {
  if (window.innerWidth <= 768 || isScrolling) {
    return;
  }

  const scrollDown = e.deltaY > 0;

  // Check if we are at the top of the page and scrolling down
  if (scrollDown && window.scrollY < 10) {
    e.preventDefault();
    scrollAccumulator += e.deltaY;

    if (scrollAccumulator > scrollThreshold) {
      isScrolling = true;
      scrollAccumulator = 0;

      const nextSection = document.querySelector('#about-skills');
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetY = nextSection.offsetTop - navbarHeight;

      // Smooth scroll to the next section
      const startY = window.scrollY;
      const distance = targetY - startY;
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / 800, 1); // 800ms duration
        const ease = progress < 0.5 ? 8 * progress * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 4) / 2;
        window.scrollTo(0, startY + (distance * ease));
        if (progress < 1) {
          requestAnimationFrame(animation);
        } else {
          isScrolling = false;
        }
      }
      requestAnimationFrame(animation);
    }
  } else {
    scrollAccumulator = 0;
  }
});
