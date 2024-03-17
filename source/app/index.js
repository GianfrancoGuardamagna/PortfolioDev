document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const elemento = document.querySelector('.typewriting');
        if (elemento) {
            elemento.style.borderRight = "transparent";
        }
    }, 3000);
});
