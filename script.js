const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

navToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();


document.querySelectorAll('.before-after').forEach(compare => {
  const range = compare.querySelector('.before-after__range');
  if (!range) return;

  const updateSplit = () => {
    compare.style.setProperty('--split', `${range.value}%`);
  };

  range.addEventListener('input', updateSplit);
  range.addEventListener('change', updateSplit);
  updateSplit();
});
