const PROJETOS = [
    { slug: 'boca-rosa',  titulo: 'Boca Rosa',          thumb: '../animations/mp4_01_bocarosa.mp4' },
    { slug: 'cacau-show', titulo: 'Cacau Show Bytes',   thumb: '../animations/mp4_02_cacaushow.mp4' },
    { slug: 'gloss-fran', titulo: 'Gloss Labial Fran',  thumb: '../animations/mp4_03_fr.mp4' },
    { slug: 'guarana',    titulo: 'Black Friday Honda Civic', thumb: '../animations/mp4_01_HondaBlackCivic2.mp4' },
    { slug: 'super-leve', titulo: 'Hydragel Oil Control', thumb: '../animations/mp4_01_creamyhydragel.mp4' },
    { slug: 'guarana-renner', titulo: 'Lojas Renner e Guaraná Antarctica', thumb: '../animations/mp4_04_guaranaerenner.mp4' }
];

const ativo = document.body.dataset.projeto;
const sidebar = document.getElementById('projeto-sidebar');
const outrosMobileLista = document.getElementById('projeto-outros-mobile-lista');

function criarThumb(p) {
    const item = document.createElement('a');
    item.href = p.slug + '.html';
    item.className = 'projeto-thumb-wrap' + (p.slug === ativo ? ' ativo' : '');
    item.innerHTML = `
        <video src="${p.thumb}" class="projeto-thumb" autoplay loop muted playsinline></video>
        <span class="projeto-thumb-label">${p.titulo}</span>
    `;
    return item;
}

PROJETOS.forEach(p => {
    sidebar.appendChild(criarThumb(p));
    if (outrosMobileLista) outrosMobileLista.appendChild(criarThumb(p));
});
