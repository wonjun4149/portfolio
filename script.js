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

// Enhanced smooth scroll functionality for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
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

window.addEventListener('load', () => {
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

  document.querySelectorAll('.project-card, .experience-item, .skill-category, .about-text').forEach(el => {
    observer.observe(el);
  });
});

// Simplified parallax effect
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  
  if (hero && scrolled < window.innerHeight) {
    const rate = scrolled * -0.1; // 더 부드러운 패럴랙스
    hero.style.transform = `translateY(${rate}px)`;
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, { passive: true });

// Loading screen fade out
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Enhanced scroll snap - CSS로 처리하지만 추가적인 안정성을 위한 보조 코드
let scrollTimer = null;
window.addEventListener('scroll', () => {
  if (scrollTimer !== null) {
    clearTimeout(scrollTimer);
  }
  
  scrollTimer = setTimeout(() => {
    // 스크롤이 멈춘 후 현재 섹션을 확인하고 미세 조정
    const sections = document.querySelectorAll('.hero, .about-skills, .projects');
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionTop = scrollY + rect.top;
      const distanceFromTop = Math.abs(scrollY - sectionTop);
      
      // 섹션의 30% 이내에 있으면 정확히 맞춤
      if (distanceFromTop < windowHeight * 0.3 && distanceFromTop > 10) {
        section.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    });
  }, 150);
}, { passive: true });