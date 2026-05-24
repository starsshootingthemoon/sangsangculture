// SangSang Culture — 모바일 햄버거 메뉴

function toggleMenu() {
  const nav = document.getElementById('mobileNav');
  const overlay = document.getElementById('mobileOverlay');
  const btn = document.querySelector('.navbar__hamburger');
  const isOpen = nav.classList.contains('open');

  if (isOpen) {
    closeMenu();
  } else {
    nav.classList.add('open');
    overlay.classList.add('open');
    btn.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeMenu() {
  const nav = document.getElementById('mobileNav');
  const overlay = document.getElementById('mobileOverlay');
  const btn = document.querySelector('.navbar__hamburger');
  nav.classList.remove('open');
  overlay.classList.remove('open');
  btn.classList.remove('open');
  document.body.style.overflow = '';
}

// ESC 키로 닫기
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeMenu();
});
