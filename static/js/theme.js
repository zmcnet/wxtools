// 主题切换 + 移动端菜单
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;

    // === 主题切换 ===
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
        localStorage.setItem('theme', theme);
        // 同步所有主题按钮的图标和文字
        updateThemeButtons(theme);
    }

    function updateThemeButtons(theme) {
        var icon = theme === 'dark' ? '☀️' : '🌙';
        var isEn = window.i18n && window.i18n.isEn ? window.i18n.isEn() : false;
        var text = theme === 'dark' ? (isEn ? 'Dark' : '暗色') : (isEn ? 'Light' : '亮色');
        if (themeToggle) {
            themeToggle.querySelector('.theme-icon').textContent = icon;
            themeToggle.querySelector('.theme-text').textContent = text;
        }
        if (mobileThemeToggle) {
            mobileThemeToggle.querySelector('.theme-icon').textContent = icon;
            mobileThemeToggle.querySelector('.theme-text').textContent = text;
        }
    }

    // 初始化主题
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            var current = body.classList.contains('dark-mode') ? 'dark' : 'light';
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', function() {
            var current = body.classList.contains('dark-mode') ? 'dark' : 'light';
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // === 移动端侧滑菜单 ===
    var hamburgerBtn = document.getElementById('hamburger-btn');
    var mobileMenu = document.getElementById('mobile-menu');
    var menuOverlay = document.getElementById('menu-overlay');
    var mobileMenuClose = document.getElementById('mobile-menu-close');

    function openMenu() {
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.style.overflow = '';
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMenu);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
});
