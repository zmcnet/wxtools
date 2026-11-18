// 幻灯片 - 支持多个实例
document.addEventListener('DOMContentLoaded', function() {
    var slideshows = document.querySelectorAll('[data-slideshow]');

    slideshows.forEach(function(container) {
        var slides = container.querySelectorAll('.slide');
        var dots = container.querySelectorAll('.dot');
        var prevBtn = container.querySelector('.slide-prev');
        var nextBtn = container.querySelector('.slide-next');
        var current = 0;
        var total = slides.length;
        var timer = null;

        function showSlide(index) {
            slides[current].classList.remove('active');
            dots[current].classList.remove('active');
            current = (index + total) % total;
            slides[current].classList.add('active');
            dots[current].classList.add('active');
        }

        function nextSlide() {
            showSlide(current + 1);
        }

        function prevSlide() {
            showSlide(current - 1);
        }

        function startAuto() {
            stopAuto();
            timer = setInterval(nextSlide, 3000);
        }

        function stopAuto() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
                startAuto();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
                startAuto();
            });
        }

        dots.forEach(function(dot, i) {
            dot.addEventListener('click', function() {
                showSlide(i);
                startAuto();
            });
        });

        startAuto();
    });
});
