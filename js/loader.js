const overlay       = document.getElementById('content-overlay');
const dynamicContent = document.getElementById('dynamic-content');
const closeBtn      = document.getElementById('close-overlay');

const logoLink = document.querySelector('.logo-link');

function abrirOverlay(templateId) {
    const tpl = document.getElementById(templateId);
    dynamicContent.innerHTML = '';
    dynamicContent.innerHTML = tpl.innerHTML;
    if (window.i18n) window.i18n.apply(dynamicContent);
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (templateId === 'tpl-about' && logoLink) logoLink.style.display = 'none';

    // X interno da janela-flutuante
    dynamicContent.querySelectorAll('.js-fechar').forEach(btn => {
        btn.addEventListener('click', fechar);
    });

    // Liga o form de contato se estiver presente
    const formContato = dynamicContent.querySelector('#form-contato');
    if (formContato) {
        formContato.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn  = dynamicContent.querySelector('#contact-submit');
            const feed = dynamicContent.querySelector('#contact-feedback');

            btn.disabled = true;
            btn.textContent = window.i18n ? window.i18n.t('contact.sending') : 'ENVIANDO...';

            fetch('https://formspree.io/f/mrewpzdr', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(formContato)
            })
            .then(res => {
                if (res.ok) {
                    feed.textContent = window.i18n ? window.i18n.t('contact.success') : 'Mensagem enviada! Em breve retorno.';
                    formContato.reset();
                } else {
                    feed.textContent = window.i18n ? window.i18n.t('contact.error') : 'Erro ao enviar. Tente novamente.';
                }
            })
            .catch(() => {
                feed.textContent = window.i18n ? window.i18n.t('contact.network') : 'Erro de conexão. Tente novamente.';
            })
            .finally(() => {
                btn.disabled = false;
                btn.textContent = window.i18n ? window.i18n.t('contact.submit') : 'ENVIAR';
            });
        });
    }
}

function fechar() {
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
    dynamicContent.innerHTML = '';
    if (logoLink) logoLink.style.display = '';
}

// --- BOTÕES ---
document.getElementById('btn-nav-home').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('btn-projects').addEventListener('click', () => {
    document.getElementById('projects-section').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('btn-contact').addEventListener('click', () => abrirOverlay('tpl-contact'));
document.getElementById('btn-about').addEventListener('click',   () => abrirOverlay('tpl-about'));
document.getElementById('btn-login').addEventListener('click',   () => abrirOverlay('tpl-login'));

// --- FECHAR ---
if (closeBtn) closeBtn.addEventListener('click', fechar);
overlay.addEventListener('click', (e) => { if (e.target === overlay) fechar(); });

// --- CLIQUE NA LOGO (Voltar ao topo) ---
document.getElementById('btn-home').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- MODAL VIMEO ---
const videoOverlay = document.getElementById('video-overlay');
const videoIframe  = document.getElementById('video-iframe');
const videoTitulo  = document.getElementById('video-titulo');
const videoDesc    = document.getElementById('video-desc');
const closeVideo   = document.getElementById('close-video');

function abrirVideo(card) {
    const id    = card.dataset.vimeo;
    const titulo = card.dataset.titulo  || '';
    const desc   = card.dataset.desc    || '';

    videoTitulo.textContent = titulo;
    videoDesc.textContent   = desc;
    videoIframe.src = 'https://player.vimeo.com/video/' + id + '?autoplay=1&color=d76234&title=0&byline=0&portrait=0';
    videoOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function fecharVideo() {
    videoOverlay.style.display = 'none';
    videoIframe.src = '';
    document.body.style.overflow = 'auto';
}

document.querySelectorAll('.projeto-card').forEach(card => {
    card.addEventListener('click', () => abrirVideo(card));
});

closeVideo.addEventListener('click', fecharVideo);
videoOverlay.addEventListener('click', (e) => { if (e.target === videoOverlay) fecharVideo(); });

// --- ANIMAÇÃO DO TÍTULO DO FONE (dispara ao entrar na tela) ---
const foneTitulo = document.querySelector('.fone-titulo');
if (foneTitulo) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                foneTitulo.classList.remove('visivel');
                void foneTitulo.offsetWidth;
                foneTitulo.classList.add('visivel');
            } else {
                foneTitulo.classList.remove('visivel');
            }
        });
    }, { threshold: 0.8 });
    observer.observe(foneTitulo);
}

// --- RELÓGIO ---
(function () {
    const el = document.getElementById('relogio');
    if (!el) return;

    function atualizar() {
        const agora = new Date();
        const tz = 'America/Sao_Paulo';

        const partes = new Intl.DateTimeFormat('pt-BR', {
            weekday: 'long',
            month:   'long',
            timeZone: tz
        }).formatToParts(agora);

        const diaSemana = partes.find(p => p.type === 'weekday').value;
        const mes       = partes.find(p => p.type === 'month').value;

        const hora = new Intl.DateTimeFormat('pt-BR', {
            hour:   '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: tz
        }).format(agora);

        const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
        el.textContent = `${cap(diaSemana)}, ${mes}, Brasil - ${hora}`;
    }

    atualizar();
    setInterval(atualizar, 1000);
})();

// --- BOTÕES DO RODAPÉ ---
const acoes = {
    home:     () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    projects: () => document.getElementById('projects-section').scrollIntoView({ behavior: 'smooth' }),
    contact:  () => abrirOverlay('tpl-contact'),
    about:    () => abrirOverlay('tpl-about'),
    login:    () => abrirOverlay('tpl-login'),
};
document.querySelectorAll('.rodape-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const acao = btn.dataset.acao;
        if (acoes[acao]) acoes[acao]();
    });
});
