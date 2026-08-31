// Album (galerie photo à plusieurs images)
function albumNav(btn, dir) {
  const card = btn.closest('.album');
  const images = card.dataset.images.split(',');
  const img = card.querySelector('.album-img');
  const dots = card.querySelectorAll('.dot');
  let idx = images.indexOf(img.getAttribute('src'));
  idx = (idx + dir + images.length) % images.length;
  img.setAttribute('src', images[idx]);
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

// Lightbox (zoom photo)
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src = src;
  lb.classList.add('open');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

// Formulaire de contact -> ouvre le client email avec les champs pré-remplis
function sendContactForm(e) {
  e.preventDefault();
  const name = document.getElementById('cf-name').value;
  const email = document.getElementById('cf-email').value;
  const subject = document.getElementById('cf-subject').value || 'Contact depuis le portfolio';
  const message = document.getElementById('cf-message').value;
  const body = `Nom: ${name}\nEmail: ${email}\n\n${message}`;
  const mailto = `mailto:hamdi.chaouachi@etudiant-enit.utm.tn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
  return false;
}

// Animation d'apparition au scroll
const els = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  els.forEach(el => io.observe(el));
} else {
  els.forEach(el => el.classList.add('in'));
}

// Mise en surbrillance du lien de navigation actif selon la section visible
const navLinks = document.querySelectorAll('.nav-links a');
const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

function updateActiveNav() {
  let currentId = sections[0] ? sections[0].id : null;
  const scrollPos = window.scrollY + 110;
  sections.forEach(sec => {
    if (sec.offsetTop <= scrollPos) currentId = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();
