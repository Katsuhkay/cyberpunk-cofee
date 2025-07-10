document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnToggleMenu');
    const menu = document.getElementById('menu');

    btn.addEventListener('click', (e) => {
        e.preventDefault();

        const abrindo = !menu.classList.contains('aberto');
        menu.classList.toggle('aberto');

        btn.textContent = abrindo ? 'Esconder Cardápio' : 'Ver Cardápio';

        if (abrindo) {
            // Espera a transição do menu antes de rolar
            setTimeout(() => {
                menu.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500); // deve ser igual à transição do SCSS
        }
    });
});
