document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const elemento = document.querySelector('.typewriting_aboutMe');
        if (elemento) {
            elemento.style.borderRight = "transparent";
        }
    }, 2350);
});

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        gsap.to("#aboutMe", {
            y: "-200px",
            duration: 1,
            ease: "power2.out"
        });
    }, 2400)
})

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const elemento = document.getElementById('aboutMe_text');
        if (elemento) {
            elemento.classList.replace("hidden", "absolut");
            elemento.style.top = "212px";
            elemento.style.display = "initial";
            elemento.classList.add('slide-in-blurred-top');
        }
    }, 3600)
})