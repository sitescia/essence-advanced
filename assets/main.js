// main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Reveal
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    heroTl.to(".reveal-text", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.2,
        delay: 0.5
    })
    .to(".reveal-image", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5
    }, "-=1.2");

    // Navbar scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('py-2', 'bg-white/95', 'shadow-md');
            header.classList.remove('py-4', 'bg-[#FAF9F6]/80');
        } else {
            header.classList.add('py-4', 'bg-[#FAF9F6]/80');
            header.classList.remove('py-2', 'bg-white/95', 'shadow-md');
        }
    });
});

