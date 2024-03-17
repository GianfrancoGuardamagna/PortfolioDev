document.addEventListener("DOMContentLoaded", function () {
    setTimeout(()=>{
        gsap.to('#technologies_text', {
        duration: 2.5,
        ease: "sine.in",
        y: 280,
    });
}, 3000)
    
});