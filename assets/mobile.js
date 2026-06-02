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

// 로그인 상태에 따라 네브바 업데이트
(function updateAuthNav() {
  const raw = localStorage.getItem('ss_user');
  if (!raw) return;

  try {
    const user = JSON.parse(raw);
    const name = user.name || user.username || '회원';

    const linkStyle = 'font-size:14px; font-weight:500; color:#9FA0A0; text-decoration:none;';
    const divStyle  = 'color:#ddd;';

    // 데스크톱 네브바
    const authEl = document.querySelector('.navbar__auth');
    if (authEl) {
      authEl.innerHTML = `
        <span style="font-size:14px; font-weight:700; color:#95B658;">${name}님!</span>
        <span style="${divStyle}">|</span>
        <a href="mypage.html" style="${linkStyle}">마이페이지</a>
        <span style="${divStyle}">|</span>
        <a href="#" onclick="logout(event)" style="${linkStyle}">로그아웃</a>
      `;
    }

    // 모바일 네브바
    const mobileAuth = document.querySelector('.mobile-nav__auth');
    if (mobileAuth) {
      mobileAuth.innerHTML = `
        <span style="font-size:15px; font-weight:700; color:#95B658;">${name}님!</span>
        <div class="auth-divider"></div>
        <a href="mypage.html" style="${linkStyle}">마이페이지</a>
        <div class="auth-divider"></div>
        <a href="#" onclick="logout(event)" style="${linkStyle}">로그아웃</a>
      `;
    }
  } catch (e) {}
})();

function logout(e) {
  e.preventDefault();
  localStorage.removeItem('ss_user');
  window.location.href = 'index.html';
}
