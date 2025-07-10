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

// Enhanced smooth scroll functionality for nav links with navbar offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
      // Calculate navbar height for offset
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      
      // Get target position
      const targetPosition = target.offsetTop - navbarHeight;
      
      // Temporarily disable scroll-snap for smooth navigation
      const main = document.querySelector('main');
      if (main) {
        main.style.scrollSnapType = 'none';
      }
      
      // Smooth scroll to target
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Re-enable scroll-snap after scroll completion
      setTimeout(() => {
        if (main && window.innerWidth > 768) {
          main.style.scrollSnapType = 'y mandatory';
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

// Enhanced scroll snap with page navigation
let scrollTimer = null;
let lastScrollY = 0;
let scrollDirection = 0;

// 페이지 간 자동 이동을 위한 변수들
let wheelDelta = 0;
let wheelTimer = null;
let isNavigating = false;

window.addEventListener('scroll', () => {
  if (window.innerWidth <= 768) {
    return;
  }

  // 스크롤 방향 감지
  const currentScrollY = window.scrollY;
  scrollDirection = currentScrollY > lastScrollY ? 1 : -1;
  lastScrollY = currentScrollY;

  if (scrollTimer !== null) {
    clearTimeout(scrollTimer);
  }
  
  scrollTimer = setTimeout(() => {
    // Footer 영역 확실하게 체크
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const footer = document.querySelector('.footer');
    const footerHeight = footer ? footer.offsetHeight : 100;
    
    const isInFooterArea = (scrollY + windowHeight) >= (documentHeight - footerHeight - 100);
    
    if (isInFooterArea || isNavigating) {
      return;
    }
    
    const sections = document.querySelectorAll('.hero, .about-skills, .projects');
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    let targetSection = null;
    let minDistance = Infinity;
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionTop = scrollY + rect.top - navbarHeight;
      const sectionCenter = sectionTop + (rect.height / 2);
      const viewportCenter = scrollY + (windowHeight / 2);
      
      const distanceFromCenter = Math.abs(viewportCenter - sectionCenter);
      
      if (distanceFromCenter < minDistance) {
        minDistance = distanceFromCenter;
        targetSection = section;
      }
    });
    
    if (targetSection) {
      const rect = targetSection.getBoundingClientRect();
      const sectionTop = scrollY + rect.top - navbarHeight;
      const distanceFromTop = Math.abs(scrollY - sectionTop);
      
      if (distanceFromTop < windowHeight * 0.35 && distanceFromTop > 25) {
        const startY = scrollY;
        const targetY = sectionTop;
        const distance = targetY - startY;
        const duration = Math.min(500, Math.abs(distance) * 1.0); // 더 빠르게
        
        smoothScrollTo(targetY, duration);
      }
    }
  }, 120); // 더 빠른 반응
}, { passive: true });

// 휠 이벤트로 페이지 간 자동 이동 감지 - 더 민감하게
window.addEventListener('wheel', (e) => {
  if (window.innerWidth <= 768 || isNavigating) {
    return;
  }

  // Footer 영역에서는 페이지 이동 비활성화
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY;
  const footer = document.querySelector('.footer');
  const footerHeight = footer ? footer.offsetHeight : 100;
  const isInFooterArea = (scrollY + windowHeight) >= (documentHeight - footerHeight - 100);
  
  if (isInFooterArea) {
    return;
  }

  // 휠 델타 누적
  wheelDelta += e.deltaY;
  
  if (wheelTimer) {
    clearTimeout(wheelTimer);
  }

  wheelTimer = setTimeout(() => {
    // 현재 어느 섹션에 있는지 확인
    const currentSection = getCurrentSection();
    if (!currentSection) return;

    const sectionRect = currentSection.getBoundingClientRect();
    const sectionHeight = sectionRect.height;
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    // 더 민감한 감지: 섹션 상단 30% 영역에 있고 위로 스크롤 시 이전 페이지로
    if (sectionRect.top > -navbarHeight - (sectionHeight * 0.3) && wheelDelta < -120) {
      navigateToPreviousSection(currentSection);
    }
    // 더 민감한 감지: 섹션 하단 30% 영역에 있고 아래로 스크롤 시 다음 페이지로
    else if (sectionRect.bottom < windowHeight + (sectionHeight * 0.3) && wheelDelta > 120) {
      navigateToNextSection(currentSection);
    }

    wheelDelta = 0;
  }, 100); // 더 빠른 반응
}, { passive: true });

// 현재 섹션 확인 함수
function getCurrentSection() {
  const sections = document.querySelectorAll('.hero, .about-skills, .projects');
  const windowHeight = window.innerHeight;
  
  for (let section of sections) {
    const rect = section.getBoundingClientRect();
    // 섹션이 화면 중앙에 50% 이상 보이면 현재 섹션으로 간주
    if (rect.top < windowHeight * 0.5 && rect.bottom > windowHeight * 0.5) {
      return section;
    }
  }
  return null;
}

// 이전 섹션으로 이동
function navigateToPreviousSection(currentSection) {
  const sections = Array.from(document.querySelectorAll('.hero, .about-skills, .projects'));
  const currentIndex = sections.indexOf(currentSection);
  
  if (currentIndex > 0) {
    const previousSection = sections[currentIndex - 1];
    isNavigating = true;
    
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const targetY = previousSection.offsetTop - navbarHeight;
    
    smoothScrollTo(targetY, 600, () => {
      setTimeout(() => {
        isNavigating = false;
      }, 300); // 더 빠른 해제
    });
  }
}

// 다음 섹션으로 이동
function navigateToNextSection(currentSection) {
  const sections = Array.from(document.querySelectorAll('.hero, .about-skills, .projects'));
  const currentIndex = sections.indexOf(currentSection);
  
  if (currentIndex < sections.length - 1) {
    const nextSection = sections[currentIndex + 1];
    isNavigating = true;
    
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const targetY = nextSection.offsetTop - navbarHeight;
    
    smoothScrollTo(targetY, 600, () => {
      setTimeout(() => {
        isNavigating = false;
      }, 300); // 더 빠른 해제
    });
  }
}

// 커스텀 부드러운 스크롤 함수 - 더 빠른 시작
function smoothScrollTo(targetY, duration = 600, callback = null) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // easeInOutQuart - 더 빠른 시작과 끝
    const ease = progress < 0.5 
      ? 8 * progress * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 4) / 2;
    
    window.scrollTo(0, startY + (distance * ease));
    
    if (progress < 1) {
      requestAnimationFrame(animation);
    } else if (callback) {
      callback();
    }
  }
  
  requestAnimationFrame(animation);
}