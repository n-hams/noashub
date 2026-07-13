const _t = {
  pt: {
    'fone.subtitulo':           'Projeto vencedor no concurso da Unhide + Logitech.',
    'project.see':              'VER PROJETO',
    'project.bocarosa.desc':    'Recriação 3D da campanha na collab da Boca Rosa e Adidas.',
    'project.cacaushow.desc':   'Campanha conceitual para portfólio dos Bytes, o snack do torcedor.',
    'project.fr.desc':          'Projetos autorais usando FOOH não são apenas visualmente incríveis; eles são máquinas de retenção.',
    'project.guarana.desc':     'Projeto autoral FOOH das latas comemorativas do Guaraná.',
    'project.mansao.desc':      'Proposta de display para o produto Ressaliv da Super CIMED e Mansão Maromba.',
    'login.password.label':     'Senha',
    'login.submit':             'ENTRAR',
    'login.forgot':             'Esqueceu a senha?',
    'contact.name.label':       'Seu nome',
    'contact.name.placeholder': 'Nome completo',
    'contact.email.label':      'Seu e-mail',
    'contact.msg.label':        'Mensagem',
    'contact.msg.placeholder':  'Como posso te ajudar?',
    'contact.submit':           'ENVIAR',
    'contact.sending':          'ENVIANDO...',
    'contact.success':          'Mensagem enviada! Em breve retorno.',
    'contact.error':            'Erro ao enviar. Tente novamente.',
    'contact.network':          'Erro de conexão. Tente novamente.',
    'about.who.title':          'QUEM SOMOS',
    'about.who.text':           "A Noa's é um hub criativo focado em soluções visuais de alto impacto. Unimos estética e tecnologia para criar experiências com personalidade.",
    'about.what.title':         'O QUE FAZEMOS',
    'about.what.text':          'Conceitos visuais que geram valor.',
    'about.contact.title':      'CONTATO',
    'meta.title':               "Noa's | Apex Concepts - Hub Criativo de 3D, CGI, VFX e IA",
    'meta.description':         "Noa's é um hub criativo que transforma marcas através de 3D, CGI, VFX, FOOH e IA. Criamos conceitos visuais de alto impacto que aumentam engajamento, retenção e vendas para empresas e agências.",
  },
  en: {
    'fone.subtitulo':           'Award-winning project in the Unhide + Logitech competition.',
    'project.see':              'SEE PROJECT',
    'project.bocarosa.desc':    '3D recreation of the Boca Rosa × Adidas collab campaign.',
    'project.cacaushow.desc':   'Conceptual campaign for portfolio: Bytes, the fan snack.',
    'project.fr.desc':          'Original FOOH projects are not just visually stunning — they are retention machines.',
    'project.guarana.desc':     "Original FOOH project for Guaraná's commemorative cans.",
    'project.mansao.desc':      'Display proposal for Ressaliv by Super CIMED and Mansão Maromba.',
    'login.password.label':     'Password',
    'login.submit':             'SIGN IN',
    'login.forgot':             'Forgot your password?',
    'contact.name.label':       'Your name',
    'contact.name.placeholder': 'Full name',
    'contact.email.label':      'Your e-mail',
    'contact.msg.label':        'Message',
    'contact.msg.placeholder':  'How can I help you?',
    'contact.submit':           'SEND',
    'contact.sending':          'SENDING...',
    'contact.success':          "Message sent! I'll get back to you soon.",
    'contact.error':            'Error sending. Please try again.',
    'contact.network':          'Connection error. Please try again.',
    'about.who.title':          'ABOUT US',
    'about.who.text':           "Noa's is a creative hub focused on high-impact visual solutions. We blend aesthetics and technology to create experiences with personality.",
    'about.what.title':         'WHAT WE DO',
    'about.what.text':          'Visual concepts that generate value.',
    'about.contact.title':      'CONTACT',
    'meta.title':               "Noa's | Apex Concepts - Creative Hub for 3D, CGI, VFX & AI",
    'meta.description':         "Noa's is a creative hub that transforms brands through 3D, CGI, VFX, FOOH and AI. We create high-impact visual concepts that boost engagement, retention and sales.",
  }
};

window.i18n = {
  lang: localStorage.getItem('noaslang') || 'pt',

  t(key) {
    return _t[this.lang]?.[key] ?? _t.pt[key] ?? key;
  },

  apply(root) {
    const r = root || document;
    r.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = this.t(el.dataset.i18n);
    });
    r.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = this.t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('[data-i18n-desc]').forEach(card => {
      card.dataset.desc = this.t(card.dataset.i18nDesc);
    });
  },

  setLang(lang) {
    this.lang = lang;
    localStorage.setItem('noaslang', lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-br' : 'en';
    document.title = this.t('meta.title');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = this.t('meta.description');
    this.apply();
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('ativo', btn.dataset.lang === lang);
    });
  },

  init() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => this.setLang(btn.dataset.lang));
    });
    this.setLang(this.lang);
  }
};

window.i18n.init();
