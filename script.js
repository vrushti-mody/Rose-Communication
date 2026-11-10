(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('open', !expanded);
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('open');
    }));
  }

  const carousel = document.querySelector('.review-carousel');
  const slides = [...document.querySelectorAll('.review-slide')];
  const dots = [...document.querySelectorAll('.carousel-dots .dot')];
  let current = 0;
  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === current);
      slide.setAttribute('aria-hidden', String(i !== current));
      slide.querySelectorAll('a').forEach((link) => { link.tabIndex = i === current ? 0 : -1; });
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
      if (i === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };
  if (carousel && slides.length) {
    showSlide(0);
    document.querySelector('.carousel-btn.prev')?.addEventListener('click', () => showSlide(current - 1));
    document.querySelector('.carousel-btn.next')?.addEventListener('click', () => showSlide(current + 1));
    dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
    // Rotates only while the panel is not in use; controls remain available by keyboard.
    let timer = window.setInterval(() => {
      if (!carousel.matches(':hover') && !carousel.contains(document.activeElement) && document.visibilityState === 'visible') showSlide(current + 1);
    }, 7000);
    carousel.addEventListener('focusin', () => window.clearInterval(timer));
    carousel.addEventListener('mouseenter', () => window.clearInterval(timer));
    const resume = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => {
        if (!carousel.matches(':hover') && !carousel.contains(document.activeElement) && document.visibilityState === 'visible') showSlide(current + 1);
      }, 7000);
    };
    carousel.addEventListener('focusout', (event) => { if (!carousel.contains(event.relatedTarget)) resume(); });
    carousel.addEventListener('mouseleave', resume);
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
