// Slider de imagens (uma por vez) com setas para avançar/retroceder
(function () {
    document.querySelectorAll('[data-img-slider]').forEach(slider => {
        const slides = slider.querySelectorAll('.img-slider-slide');
        const prev = slider.querySelector('.img-slider-prev');
        const next = slider.querySelector('.img-slider-next');
        if (!slides.length) return;
        let atual = 0;

        function mostrar(i) {
            atual = (i + slides.length) % slides.length;
            slides.forEach((s, idx) => s.classList.toggle('ativo', idx === atual));
        }

        prev?.addEventListener('click', () => mostrar(atual - 1));
        next?.addEventListener('click', () => mostrar(atual + 1));
    });
})();
