  // day/night theme toggle
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  const hour = new Date().getHours();
  const initial = saved || ((hour >= 7 && hour < 18) ? 'light' : 'dark');
  if(initial === 'light'){ root.setAttribute('data-theme','light'); }
  themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if(isLight){
      root.removeAttribute('data-theme');
      localStorage.setItem('theme','dark');
    } else {
      root.setAttribute('data-theme','light');
      localStorage.setItem('theme','light');
    }
  });

  // mobile nav toggle
  const burger = document.getElementById('burger');
  const navlinks = document.getElementById('navlinks');
  burger.addEventListener('click', () => navlinks.classList.toggle('open'));
  navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navlinks.classList.remove('open')));

  // animate skill bars when visible
  const bars = document.querySelectorAll('.bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        el.style.width = el.dataset.w + '%';
        barObserver.unobserve(el);
      }
    });
  }, {threshold:0.4});
  bars.forEach(b => barObserver.observe(b));

  // project filter
  const pfBtns = document.querySelectorAll('.pf-btn');
  const cards = document.querySelectorAll('.proj-card');
  pfBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pfBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.cat === filter) ? 'flex' : 'none';
      });
    });
  });

  // lightbox for gallery
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  document.querySelectorAll('.g-item img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('open');
    });
  });
  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.classList.remove('open'); });

  // header shadow on scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10 ? '0 2px 10px rgba(0,0,0,.05)' : 'none';
  });
