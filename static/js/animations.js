// 滚动触发动画 - IntersectionObserver 高性能方案
(function() {
    var observer = null;

    function init() {
        var targets = document.querySelectorAll('.anim');
        if (!targets.length) return;

        observer = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    entries[i].target.classList.add('visible');
                    observer.unobserve(entries[i].target);
                }
            }
        }, {
            threshold: 0.01,
            rootMargin: '0px 0px 0px 0px'
        });

        for (var i = 0; i < targets.length; i++) {
            observer.observe(targets[i]);
        }

        // 安全回退：3秒后强制显示所有未触发的动画元素
        setTimeout(function() {
            var remaining = document.querySelectorAll('.anim:not(.visible)');
            for (var i = 0; i < remaining.length; i++) {
                remaining[i].classList.add('visible');
            }
        }, 3000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
