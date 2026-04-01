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

    // Scroll Reveal for Problem Section
    gsap.utils.toArray('.reveal-on-scroll').forEach(element => {
        gsap.fromTo(element, 
            { opacity: 0, y: 30 },
            { 
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                },
                opacity: 1, 
                y: 0, 
                duration: 1.2, 
                ease: "power3.out" 
            }
        );
    });

    gsap.fromTo('.scroll-reveal-card', 
        { opacity: 0, y: 50 },
        {
            scrollTrigger: {
                trigger: '#cards-container',
                start: "top 80%",
            },
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
        }
    );

    // Glass Card Hover Glow Effect
    const handleOnMouseMove = e => {
        const { currentTarget: target } = e;
        const rect = target.getBoundingClientRect(),
              x = e.clientX - rect.left,
              y = e.clientY - rect.top;
        
        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
    }

    for(const card of document.querySelectorAll(".glass-card")) {
        card.onmousemove = e => handleOnMouseMove(e);
    }

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

