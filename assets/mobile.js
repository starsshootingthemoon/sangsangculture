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

// 협력사/제휴사 로고 로딩
(async function loadPartners() {
  const el = document.getElementById('footerPartners');
  if (!el) return;
  try {
    const res = await fetch(window.location.origin + '/wp-json/wp/v2/partners?per_page=20&_fields=id,title,featured_image_url,partner_link');
    if (!res.ok) return;
    const partners = await res.json();
    if (!partners.length) return;

    el.style.cssText = 'display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap:16px; padding:28px 40px; border-bottom:1px solid rgba(255,255,255,0.12); margin-bottom:20px;';

    partners.forEach(p => {
      if (!p.featured_image_url) return;
      const a = document.createElement('a');
      a.href = p.partner_link || p.link || '#';
      a.target = '_blank';
      a.rel = 'noopener';
      a.title = p.title?.rendered || '';
      a.style.cssText = 'display:inline-flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.08); border-radius:10px; padding:10px 16px; transition:background 0.2s;';
      a.onmouseover = () => a.style.background = 'rgba(255,255,255,0.18)';
      a.onmouseout  = () => a.style.background = 'rgba(255,255,255,0.08)';

      const img = document.createElement('img');
      img.src = p.featured_image_url;
      img.alt = p.title?.rendered || '';
      img.style.cssText = 'height:36px; width:auto; max-width:120px; object-fit:contain; filter:brightness(0) invert(1); opacity:0.75;';

      a.appendChild(img);
      el.appendChild(a);
    });
  } catch (e) {}
})();

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
        <span style="font-size:14px; font-weight:700; color:#95B658;">${name}님, 안녕하세요!</span>
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
  localStorage.removeItem('ss_pw');
  window.location.href = 'index.html';
}
