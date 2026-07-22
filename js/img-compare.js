// Comparador de imagens arrastável (antes/depois)
(function () {
    document.querySelectorAll('.img-compare').forEach(el => {
        const slider = el.querySelector('.img-compare-slider');
        if (!slider) return;
        let arrastando = false;

        function atualizar(clientX) {
            const rect = el.getBoundingClientRect();
            let pct = ((clientX - rect.left) / rect.width) * 100;
            pct = Math.max(0, Math.min(100, pct));
            el.style.setProperty('--pos', pct);
            slider.setAttribute('aria-valuenow', Math.round(pct));
        }

        slider.addEventListener('pointerdown', (e) => {
            arrastando = true;
            slider.setPointerCapture(e.pointerId);
            atualizar(e.clientX);
        });
        slider.addEventListener('pointermove', (e) => {
            if (!arrastando) return;
            atualizar(e.clientX);
        });
        slider.addEventListener('pointerup', () => { arrastando = false; });
        slider.addEventListener('pointercancel', () => { arrastando = false; });

        // Teclado: setas esquerda/direita movem o comparador
        slider.addEventListener('keydown', (e) => {
            const atual = parseFloat(getComputedStyle(el).getPropertyValue('--pos')) || 50;
            if (e.key === 'ArrowLeft') {
                el.style.setProperty('--pos', Math.max(0, atual - 5));
                e.preventDefault();
            } else if (e.key === 'ArrowRight') {
                el.style.setProperty('--pos', Math.min(100, atual + 5));
                e.preventDefault();
            }
        });
    });
})();
