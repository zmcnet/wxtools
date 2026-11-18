// ============================================================
// 国际化引擎 - i18n.js (data-en 方案)
// 依赖: config.js (需在之前加载)
// ============================================================

(function () {
  'use strict';

  // 当前语言
  var currentLang = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.lan === 'en') ? 'en' : 'zh_cn';

  // 从 localStorage 读取用户偏好
  var savedLang = localStorage.getItem('wxtools_lang');
  if (savedLang === 'en' || savedLang === 'zh_cn') {
    currentLang = savedLang;
  }

  // 存储元素的原始中文内容
  var originalContents = {};

  // 初始化：保存所有 data-en 元素的原始内容
  function saveOriginals() {
    var els = document.querySelectorAll('[data-en]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.hasAttribute('data-original')) continue;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('data-original', el.placeholder || '');
      } else if (el.tagName === 'TITLE') {
        el.setAttribute('data-original', document.title);
      } else {
        el.setAttribute('data-original', el.innerHTML);
      }
    }
  }

  // 应用语言
  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('wxtools_lang', lang);

    // 保存原始内容（首次）
    saveOriginals();

    var isEn = lang === 'en';
    var els = document.querySelectorAll('[data-en]');

    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var enText = el.getAttribute('data-en');
      if (!enText) continue;
      if (isEn) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = enText;
        } else if (el.tagName === 'TITLE') {
          document.title = enText;
        } else {
          el.innerHTML = enText;
        }
      } else {
        var orig = el.getAttribute('data-original');
        if (orig) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = orig;
          } else if (el.tagName === 'TITLE') {
            document.title = orig;
          } else {
            el.innerHTML = orig;
          }
        }
      }
    }

    // 更新 html lang 属性
    document.documentElement.lang = isEn ? 'en' : 'zh-CN';

    // 更新主题按钮文字（theme.js 动态设置，需要同步）
    var themeToggles = document.querySelectorAll('.theme-toggle .theme-text, .mobile-theme-toggle .theme-text');
    var isDark = document.body.classList.contains('dark-mode');
    for (var k = 0; k < themeToggles.length; k++) {
      var tt = themeToggles[k];
      if (isEn) {
        tt.textContent = isDark ? 'Dark' : 'Light';
      } else {
        tt.textContent = isDark ? '暗色' : '亮色';
      }
    }
    // Also update theme icon (🌙/☀️) based on dark mode
    var themeIcons = document.querySelectorAll('.theme-toggle .theme-icon, .mobile-theme-toggle .theme-icon');
    var iconText = isDark ? '☀️' : '🌙';
    for (var m = 0; m < themeIcons.length; m++) {
      themeIcons[m].textContent = iconText;
    }

    // 触发自定义事件
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang } }));
  }

  // 语言列表（可扩展）
  var langList = [
    { code: 'zh_cn', label: '中文' },
    { code: 'en', label: 'English' }
  ];

  function getLangLabel(code) {
    for (var i = 0; i < langList.length; i++) {
      if (langList[i].code === code) return langList[i].label;
    }
    return code;
  }

  // 创建语言切换下拉
  function createLangSwitcher() {
    var container = document.querySelector('.custom-functions');
    if (!container) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'lang-dropdown';

    var trigger = document.createElement('button');
    trigger.className = 'lang-dropdown-trigger btn-press';
    trigger.setAttribute('aria-label', 'Switch Language');
    trigger.innerHTML = '<span class="lang-icon">&#127760;</span><span class="lang-text" data-en="Language">语言</span><span class="lang-arrow">&#9662;</span>';

    var menu = document.createElement('div');
    menu.className = 'lang-dropdown-menu';

    for (var i = 0; i < langList.length; i++) {
      var item = document.createElement('a');
      item.className = 'lang-dropdown-item' + (langList[i].code === currentLang ? ' lang-active' : '');
      item.href = '#';
      item.setAttribute('data-lang', langList[i].code);
      item.textContent = langList[i].label;
      item.addEventListener('click', function (e) {
        e.preventDefault();
        var code = this.getAttribute('data-lang');
        if (code === currentLang) return;
        switchLang(code, trigger, wrapper);
      });
      menu.appendChild(item);
    }

    wrapper.appendChild(trigger);
    wrapper.appendChild(menu);

    // 手动保存触发器的原始内容（因为它在 saveOriginals 之后创建）
    var langTextEl = trigger.querySelector('.lang-text');
    if (langTextEl) {
      langTextEl.setAttribute('data-original', '语言');
      // 根据当前语言设置初始显示
      if (currentLang === 'en') {
        langTextEl.innerHTML = 'Language';
      }
    }

    // 点击展开/关闭
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      wrapper.classList.toggle('open');
    });

    // 点击外部关闭
    document.addEventListener('click', function (e) {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove('open');
      }
    });

    var themeBtn = container.querySelector('#theme-toggle');
    if (themeBtn) {
      container.insertBefore(wrapper, themeBtn);
    } else {
      container.appendChild(wrapper);
    }

    // 保存引用以便更新
    wrapper._trigger = trigger;
    wrapper._menu = menu;
    window._langWrapper = wrapper;
  }

  function switchLang(newLang, trigger, wrapper) {
    // 更新菜单项 active
    var items = wrapper.querySelectorAll('.lang-dropdown-item');
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove('lang-active');
      if (items[i].getAttribute('data-lang') === newLang) {
        items[i].classList.add('lang-active');
      }
    }

    wrapper.classList.remove('open');

    // 显示加载动画
    var overlay = document.getElementById('lang-loading-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'lang-loading-overlay';
      overlay.className = 'lang-loading-overlay';
      overlay.innerHTML = '<div class="lang-loading-spinner"></div><div class="lang-loading-text" data-en="Loading…">加载中……</div>';
      document.body.appendChild(overlay);
    }
    var textEl = overlay.querySelector('.lang-loading-text');
    if (textEl) {
      textEl.textContent = newLang === 'en' ? 'Loading…' : '加载中……';
    }
    overlay.classList.add('active');

    // 动画展示0.8s后执行切换并淡出
    setTimeout(function () {
      applyLang(newLang);
      overlay.classList.remove('active');
      overlay.classList.add('fade-out');
      setTimeout(function () {
        overlay.classList.remove('fade-out');
      }, 400);
    }, 800);
  }

  // 初始化
  document.addEventListener('DOMContentLoaded', function () {
    saveOriginals();
    createLangSwitcher();
    applyLang(currentLang);
  });

  // 暴露全局接口
  window.i18n = {
    isEn: function () { return currentLang === 'en'; },
    getLang: function () { return currentLang; },
    setLang: applyLang
  };
})();
