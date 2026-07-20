// Expandir/retrair imagens dos projetos em tela cheia
(function () {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = '<button class="lightbox-close" aria-label="Fechar">&times;</button><img class="lightbox-img" alt="">';
    document.body.appendChild(overlay);

    const imgEl = overlay.querySelector('.lightbox-img');
    const closeBtn = overlay.querySelector('.lightbox-close');

    function abrir(src, alt) {
        imgEl.src = src;
        imgEl.alt = alt || '';
        overlay.classList.add('ativo');
        document.body.classList.add('lightbox-aberto');
    }

    function fechar() {
        overlay.classList.remove('ativo');
        document.body.classList.remove('lightbox-aberto');
    }

    document.querySelectorAll('.projeto-img').forEach(img => {
        img.classList.add('projeto-img-expansivel');
        img.addEventListener('click', () => abrir(img.src, img.alt));
    });

    closeBtn.addEventListener('click', fechar);
    overlay.addEventListener('click', e => { if (e.target === overlay) fechar(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') fechar(); });
})();
