// Tudo que depende do scroll e do canvas
const canvas = document.getElementById("animacao-scroll");
const context = canvas.getContext("2d");
const sessao = document.querySelector('.sessao-animacao');
const restoNome = document.querySelector('.resto-nome'); // pode ser null se logo for SVG
const barraBotoes = document.querySelector('.barra-botoes');

const frameCount = 76;
const images = [];
const currentFrame = index => `animations/Seq__${index.toString().padStart(5, '0')}.png`;

for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

function render(frame) {
    const img = images[frame];
    if (img && img.complete) {
        canvas.width = img.width;
        canvas.height = img.height;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
    }
}

window.addEventListener('scroll', () => {
    const scrollAtual = window.pageYOffset;
    
    // Esconder nome no scroll
    if (scrollAtual > 50) {
        if (restoNome) restoNome.classList.add('escondido');
        barraBotoes.style.opacity = "0.6";
    } else {
        if (restoNome) restoNome.classList.remove('escondido');
        barraBotoes.style.opacity = "1";
    }

    // Girar fone
    if (sessao) {
        const inicio = sessao.offsetTop;
        const altura = sessao.offsetHeight - window.innerHeight;
        let progresso = (scrollAtual - inicio) / altura;
        progresso = Math.max(0, Math.min(1, progresso));
        const frameIndex = Math.floor(progresso * (frameCount - 1));
        render(frameIndex);
    }
});

// Banner rotativo com indicadores de progresso
const banners = document.querySelectorAll('.banner');
const dotsContainer = document.getElementById('banner-dots');
const DURACAO = 10000;
let bannerAtual = 0;
let timer = null;

// Cria os dots
const dots = Array.from(banners).map((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'banner-dot';
    const fill = document.createElement('div');
    fill.className = 'banner-dot-fill';
    dot.appendChild(fill);
    dot.style.setProperty('--dur', DURACAO + 'ms');
    dot.addEventListener('click', () => irPara(i));
    dotsContainer.appendChild(dot);
    return dot;
});

function irPara(index) {
    clearTimeout(timer);
    banners[bannerAtual].classList.remove('ativa');
    dots[bannerAtual].classList.remove('ativo');
    dots[bannerAtual].classList.add('completo');

    bannerAtual = index;
    banners[bannerAtual].classList.add('ativa');

    // Reset todos os dots após o atual
    dots.forEach((d, i) => {
        if (i > bannerAtual) {
            d.classList.remove('ativo', 'completo');
            d.querySelector('.banner-dot-fill').style.animation = 'none';
        }
    });

    // Ativa dot atual com animação reiniciada
    const dot = dots[bannerAtual];
    dot.classList.remove('completo');
    const fill = dot.querySelector('.banner-dot-fill');
    fill.style.animation = 'none';
    void fill.offsetWidth;
    fill.style.animation = '';
    dot.classList.add('ativo');

    timer = setTimeout(() => irPara((bannerAtual + 1) % banners.length), DURACAO);
}

irPara(0);

images[0].onload = () => render(0);