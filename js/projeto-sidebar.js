const PROJETOS = [
    { slug: 'boca-rosa',  titulo: 'Boca Rosa',          thumb: '../animations/gp_01_bocarosa.gif' },
    { slug: 'cacau-show', titulo: 'Cacau Show Bytes',   thumb: '../animations/gp_02_cacaushow.gif' },
    { slug: 'gloss-fran', titulo: 'Gloss Labial Fran',  thumb: '../animations/gp_03_fr.gif' },
    { slug: 'guarana',    titulo: 'Guaraná',            thumb: '../animations/gp_04_guarana.gif' },
    { slug: 'super-leve', titulo: 'Super Leve',         thumb: '../animations/gp_05_mansao.gif' }
];

const ativo = document.body.dataset.projeto;
const sidebar = document.getElementById('projeto-sidebar');

PROJETOS.forEach(p => {
    const item = document.createElement('a');
    item.href = p.slug + '.html';
    item.className = 'projeto-thumb-wrap' + (p.slug === ativo ? ' ativo' : '');
    item.innerHTML = `
        <img src="${p.thumb}" alt="${p.titulo}" class="projeto-thumb">
        <span class="projeto-thumb-label">${p.titulo}</span>
    `;
    sidebar.appendChild(item);
});
