// Toggle "vídeo com música" / "vídeo narrado": clicar (ou Enter/espaço) troca
// o src do iframe de vídeo logo abaixo, usando os links guardados nos
// data-video-musica / data-video-narrado do próprio botão. Também atualiza a
// legenda (.projeto-video-toggle-legenda), se houver uma entre o botão e o vídeo.
(function () {
    document.querySelectorAll('.projeto-video-toggle').forEach(toggle => {
        let legenda = null;
        let sib = toggle.nextElementSibling;
        while (sib && !sib.classList.contains('projeto-video-wrap')) {
            if (sib.classList.contains('projeto-video-toggle-legenda')) legenda = sib;
            sib = sib.nextElementSibling;
        }
        const wrap = sib;
        if (!wrap) return;
        const iframe = wrap.querySelector('iframe');
        if (!iframe) return;

        const musica = toggle.dataset.videoMusica;
        const narrado = toggle.dataset.videoNarrado;
        if (!musica || !narrado) return;

        function selecionar(narradoAtivo) {
            toggle.classList.toggle('narrado', narradoAtivo);
            toggle.setAttribute('aria-pressed', String(narradoAtivo));
            const base = narradoAtivo ? narrado : musica;
            iframe.src = base + (base.includes('?') ? '&' : '?') + 'autoplay=1';
            if (legenda) {
                const chave = narradoAtivo ? 'video.toggle.legenda.narrado' : 'video.toggle.legenda.musica';
                legenda.dataset.i18n = chave;
                if (window.i18n) legenda.textContent = window.i18n.t(chave);
            }
        }

        toggle.addEventListener('click', () => {
            selecionar(!toggle.classList.contains('narrado'));
        });
        toggle.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selecionar(!toggle.classList.contains('narrado'));
            }
        });
    });
})();
