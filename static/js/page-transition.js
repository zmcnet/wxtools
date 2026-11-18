/* ===== 子导航滚动隐藏/显示 + 页面切换动画 ===== */
(function () {
  'use strict';

  var subNav = document.querySelector('.sub-nav');
  var scrollTimer = null;
  var lastScrollY = 0;

  // ===== 子导航滚动行为 =====
  function handleSubNavScroll() {
    if (!subNav) return;

    var currentScrollY = window.scrollY;

    // 滚动距离 > 10px 则隐藏
    if (Math.abs(currentScrollY - lastScrollY) > 10) {
      subNav.classList.add('sub-nav-hidden');
    }

    lastScrollY = currentScrollY;

    // 清除旧定时器
    if (scrollTimer) clearTimeout(scrollTimer);

    // 停止滚动 400ms 后显示
    scrollTimer = setTimeout(function () {
      subNav.classList.remove('sub-nav-hidden');
    }, 400);
  }

  if (subNav) {
    window.addEventListener('scroll', handleSubNavScroll, { passive: true });
  }

  // ===== 页面切换动画 =====
  // 创建遮罩层
  var overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  document.body.appendChild(overlay);

  function transitionTo(url) {
    overlay.classList.add('active');
    setTimeout(function () {
      window.location.href = url;
    }, 300);
  }

  // 拦截所有同站链接（排除 # 锚点、弹窗、新标签页）
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (!link) return;
    if (link.hasAttribute('target')) return;
    if (link.getAttribute('href') === '#') return;
    if (link.getAttribute('href') === '') return;
    if (link.hostname !== window.location.hostname) return;

    var href = link.getAttribute('href');
    if (href && href.startsWith('#')) return;

    // 如果链接路径与当前相同，不拦截
    var linkPath = link.pathname.replace(/\/$/, '');
    var curPath = window.location.pathname.replace(/\/$/, '');
    if (linkPath === curPath) return;

    e.preventDefault();
    transitionTo(link.href);
  });

  // 回退/前进时淡出遮罩（如果页面加载时遮罩还开着）
  window.addEventListener('pageshow', function () {
    overlay.classList.remove('active');
  });

  // 页面 load 时确保遮罩关闭
  if (document.readyState === 'complete') {
    overlay.classList.remove('active');
  } else {
    window.addEventListener('load', function () {
      overlay.classList.remove('active');
    });
  }
})();