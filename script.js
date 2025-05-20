// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Form submission handling with basic validation
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const responseDiv = document.getElementById('response');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  // Reset error messages
  nameError.style.display = 'none';
  emailError.style.display = 'none';
  messageError.style.display = 'none';
  responseDiv.textContent = '';

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;

  if (!name) {
    nameError.style.display = 'block';
    isValid = false;
  }
  if (!email || !emailRegex.test(email)) {
    emailError.style.display = 'block';
    isValid = false;
  }
  if (!message) {
    messageError.style.display = 'block';
    isValid = false;
  }

  if (isValid) {
    responseDiv.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
    responseDiv.style.color = '#16a34a';
    document.getElementById('contactForm').reset();

    // Clear response after 5 seconds
    setTimeout(() => {
      responseDiv.textContent = '';
    }, 5000);
  }
});

// Intersection Observer for fade-in animations
const sections = document.querySelectorAll('.section');
const observerOptions = {
  root: null,
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Stop observing once visible
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

// Highlight active navigation link
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 60) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});