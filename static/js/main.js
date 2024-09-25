document.addEventListener('DOMContentLoaded', () => {
    // GSAP ScrollTrigger setup
    gsap.registerPlugin(ScrollTrigger);

    // Navbar transparency change on scroll
    const navbar = document.getElementById('navbar');
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: { className: 'bg-gray-900', targets: navbar }
    });

    // Hero section parallax effect
    gsap.to('#hero-background', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Floating elements parallax effect
    gsap.utils.toArray('#floating-elements > div').forEach(element => {
        gsap.to(element, {
            y: Math.random() * 100 - 50,
            x: Math.random() * 100 - 50,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    });

    // AI robot parallax effect
    gsap.to('#ai-robot', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 2
        }
    });

    // Hero section content animations
    gsap.from('#hero h1', { 
        opacity: 0, 
        y: 50, 
        duration: 1, 
        scrollTrigger: {
            trigger: '#hero',
            start: 'top center'
        }
    });

    gsap.from('#hero p', { 
        opacity: 0, 
        y: 50, 
        duration: 1, 
        delay: 0.5,
        scrollTrigger: {
            trigger: '#hero',
            start: 'top center'
        }
    });

    gsap.from('#hero button', { 
        opacity: 0, 
        y: 50, 
        duration: 1, 
        delay: 1,
        scrollTrigger: {
            trigger: '#hero',
            start: 'top center'
        }
    });

    // Features section animations with parallax
    gsap.from('.feature-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#features',
            start: 'top center+=100',
            end: 'bottom center',
            scrub: 1
        }
    });

    // Recommendations section animations with parallax
    gsap.from('.recommendation-card', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#recommendations',
            start: 'top center+=100',
            end: 'bottom center',
            scrub: 1
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
