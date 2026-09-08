// Formulário de contato embutido no fim da página de projeto — mesma
// configuração (Formspree) e mesmas mensagens do contato padrão do
// site, só que enviado direto da página em vez da janela flutuante.
(function () {
    const form = document.getElementById('form-contato-projeto');
    if (!form) return;

    const btn  = document.getElementById('contato-projeto-submit');
    const feed = document.getElementById('contato-projeto-feedback');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        btn.disabled = true;
        btn.textContent = window.i18n ? window.i18n.t('contact.sending') : 'ENVIANDO...';

        fetch('https://formspree.io/f/mrewpzdr', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form)
        })
        .then(res => {
            if (res.ok) {
                feed.textContent = window.i18n ? window.i18n.t('contact.success') : 'Mensagem enviada! Em breve retorno.';
                form.reset();
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
})();
