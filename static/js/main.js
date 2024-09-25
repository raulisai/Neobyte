import { init as init3D } from './3d_elements.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize 3D elements
    init3D();

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
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Floating elements parallax effect
    gsap.utils.toArray('.floating-element').forEach((element, index) => {
        const depth = index * 0.2 + 0.5; // Creates a depth effect
        gsap.to(element, {
            y: () => -ScrollTrigger.maxScroll(window) * depth,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true
            }
        });

        // Add subtle rotation to floating elements
        gsap.to(element, {
            rotation: Math.random() * 360,
            duration: gsap.utils.random(20, 60),
            repeat: -1,
            ease: 'none'
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
    const heroContent = gsap.timeline({
        scrollTrigger: {
            trigger: '#hero',
            start: 'top center',
            end: 'center center',
            scrub: 1
        }
    });

    heroContent
        .from('#hero h1', { opacity: 0, y: 50, duration: 0.5 })
        .from('#hero p', { opacity: 0, y: 50, duration: 0.5 }, '-=0.3')
        .from('#hero button', { opacity: 0, y: 50, duration: 0.5 }, '-=0.3');

    // Features section animations with parallax
    gsap.from('.feature-card', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#features',
            start: 'top center+=100',
            end: 'center center',
            scrub: 1
        }
    });

    // Recommendations section animations with parallax
    gsap.from('.recommendation-card', {
        opacity: 0,
        x: -50,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#recommendations',
            start: 'top center+=100',
            end: 'center center',
            scrub: 1
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            gsap.to(window, {duration: 1, scrollTo: target, ease: 'power2.inOut'});
        });
    });

    // Function to fetch and update recommendations
    function fetchRecommendations() {
        fetch('/api/recommendations')
            .then(response => response.json())
            .then(data => {
                const recommendationsContainer = document.querySelector('#recommendations .grid');
                recommendationsContainer.innerHTML = '';
                data.forEach(recommendation => {
                    const card = document.createElement('div');
                    card.className = 'recommendation-card';
                    card.innerHTML = `
                        <h3 class="text-xl font-semibold mb-2">${recommendation.title}</h3>
                        <p>${recommendation.description}</p>
                    `;
                    recommendationsContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Error fetching recommendations:', error));
    }

    // Fetch recommendations on page load
    fetchRecommendations();

    // Add event listener for refresh button
    const refreshButton = document.getElementById('refresh-recommendations');
    if (refreshButton) {
        refreshButton.addEventListener('click', fetchRecommendations);
    }
});
