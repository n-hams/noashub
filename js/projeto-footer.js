// Rodapé, balão de contato e janelas flutuantes (login/contato/sobre) nas páginas de projeto
const overlay = document.getElementById('content-overlay');
const dynamicContent = document.getElementById('dynamic-content');
const closeBtn = document.getElementById('close-overlay');

function abrirOverlay(templateId) {
    const tpl = document.getElementById(templateId);
    dynamicContent.innerHTML = tpl.innerHTML;
    if (window.i18n) window.i18n.apply(dynamicContent);
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    dynamicContent.querySelectorAll('.js-fechar').forEach(btn => {
        btn.addEventListener('click', fechar);
    });

    const formContato = dynamicContent.querySelector('#form-contato');
    if (formContato) {
        formContato.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = dynamicContent.querySelector('#contact-submit');
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
}

if (closeBtn) closeBtn.addEventListener('click', fechar);
overlay.addEventListener('click', (e) => { if (e.target === overlay) fechar(); });

const acoes = {
    home:     () => { window.location.href = '../index.html'; },
    projects: () => { window.location.href = 'boca-rosa.html'; },
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

const btnChatFlutuante = document.getElementById('btn-chat-flutuante');
if (btnChatFlutuante) btnChatFlutuante.addEventListener('click', () => abrirOverlay('tpl-contact'));
