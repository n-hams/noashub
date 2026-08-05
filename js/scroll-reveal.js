// Anima fileiras de imagens (opacidade + movimento) ao rolar até elas
(function () {
    const grupos = document.querySelectorAll('.scroll-fade');
    if (!grupos.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    grupos.forEach(g => observer.observe(g));
})();
