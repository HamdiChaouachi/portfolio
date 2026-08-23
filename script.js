/* ==========================================
   PORTFOLIO - SCRIPT.JS
   ========================================== */

// 1. LIGHTBOX (AGRANDISSEMENT DES IMAGES)
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  if (lb && lbImg) {
    lbImg.src = src;
    lb.classList.add('open');
  }
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.classList.remove('open');
  }
}

// Fermeture de la lightbox avec la touche Échap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});


// 2. NAVIGATION DANS LES ALBUMS PHOTOS (P01) ET ALBUMS MIXTES PHOTO+VIDÉO (P03)
function albumNav(btn, direction) {
  const card = btn.closest('.album');
  if (!card) return;

  const dots = card.querySelectorAll('.album-dots .dot');

  // Cas album mixte (photo + vidéos), ex: P03
  if (card.classList.contains('mixed-media')) {
    const items = JSON.parse(card.dataset.items);
    const imgEl = card.querySelector('.album-img');
    const videoEl = card.querySelector('.album-video');
    const sourceEl = videoEl.querySelector('source');

    let currentIndex = parseInt(card.dataset.currentIndex || '0', 10);
    currentIndex = (currentIndex + direction + items.length) % items.length;
    card.dataset.currentIndex = currentIndex;

    const item = items[currentIndex];

    // Toujours mettre en pause/reset la vidéo avant de changer de média
    videoEl.pause();
    videoEl.currentTime = 0;

    if (item.type === 'image') {
      imgEl.src = item.src;
      imgEl.style.display = '';
      videoEl.style.display = 'none';
    } else if (item.type === 'video') {
      sourceEl.src = item.src;
      if (item.poster) videoEl.poster = item.poster;
      videoEl.load();
      videoEl.style.display = '';
      imgEl.style.display = 'none';
    }

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
    return;
  }

  // Cas album photo classique (P01)
  const images = card.dataset.images.split(',');
  const imgEl = card.querySelector('.album-img');

  let currentIndex = images.findIndex(url => imgEl.src.includes(url.trim()));
  if (currentIndex === -1) currentIndex = 0;

  currentIndex = (currentIndex + direction + images.length) % images.length;

  imgEl.src = images[currentIndex].trim();

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentIndex);
  });
}


// 3. ANIMATION AU DÉFILEMENT (SCROLL REVEAL)
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});


// 4. SECOURS AUTOMATIQUE POUR IMAGES MANQUANTES (FALLBACK SVG)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.onerror = null;
      this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23161616"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%232ecc82" font-family="monospace" font-size="13">[IMAGE_INTROUVABLE]</text></svg>';
    });
  });
});