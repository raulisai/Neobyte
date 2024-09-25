import { init as init3D } from './3d_elements.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded, initializing 3D elements');
    // Initialize 3D elements
    init3D();

    // GSAP ScrollTrigger setup
    gsap.registerPlugin(ScrollTrigger);

    // Navbar transparency and size change on scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            toggleClass: { className: 'scrolled', targets: navbar }
        });
    }

    // Hero section parallax effect
    const heroBackground = document.getElementById('hero-background');
    if (heroBackground) {
        gsap.to(heroBackground, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

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
    const aiRobot = document.getElementById('ai-robot');
    if (aiRobot) {
        gsap.to(aiRobot, {
            y: -100,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 2
            }
        });
    }

    // Hero section content animations
    const heroSection = document.getElementById('hero');
    if (heroSection) {
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
            .from('#hero a', { opacity: 0, y: 50, duration: 0.5 }, '-=0.3');
    }

    // Articles section animations with parallax
    gsap.from('.article-card', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#articles',
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
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    gsap.to(window, {duration: 1, scrollTo: target, ease: 'power2.inOut'});
                }
            }
        });
    });

    // Function to fetch and update recommendations
    function fetchRecommendations() {
        fetch('/api/recommendations')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const recommendationsContainer = document.querySelector('#recommendations .grid');
                if (recommendationsContainer) {
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
                }
            })
            .catch(error => {
                console.error('Error fetching recommendations:', error);
                const recommendationsContainer = document.querySelector('#recommendations .grid');
                if (recommendationsContainer) {
                    recommendationsContainer.innerHTML = '<p>Failed to load recommendations. Please try again later.</p>';
                }
            });
    }

    // Fetch recommendations on page load
    fetchRecommendations();

    // Add event listener for refresh button
    const refreshButton = document.getElementById('refresh-recommendations');
    if (refreshButton) {
        refreshButton.addEventListener('click', fetchRecommendations);
    }

    // Theme toggle functionality
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    if (themeToggleBtn && themeToggleDarkIcon && themeToggleLightIcon) {
        console.log('Theme toggle elements found');

        // Change the icons inside the button based on previous settings
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            themeToggleLightIcon.classList.remove('hidden');
        } else {
            themeToggleDarkIcon.classList.remove('hidden');
        }

        function toggleTheme() {
            console.log('Toggle theme function called');
            // Toggle icons inside button
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');

            // If set via local storage previously
            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    document.documentElement.classList.add('dark-mode');
                    document.documentElement.classList.remove('light-mode');
                    localStorage.setItem('color-theme', 'dark');
                    console.log('Switched to dark mode');
                } else {
                    document.documentElement.classList.add('light-mode');
                    document.documentElement.classList.remove('dark-mode');
                    localStorage.setItem('color-theme', 'light');
                    console.log('Switched to light mode');
                }
            } else {
                // If NOT set via local storage previously
                if (document.documentElement.classList.contains('dark-mode')) {
                    document.documentElement.classList.add('light-mode');
                    document.documentElement.classList.remove('dark-mode');
                    localStorage.setItem('color-theme', 'light');
                    console.log('Switched to light mode');
                } else {
                    document.documentElement.classList.add('dark-mode');
                    document.documentElement.classList.remove('light-mode');
                    localStorage.setItem('color-theme', 'dark');
                    console.log('Switched to dark mode');
                }
            }

            // Update article cards
            const articleCards = document.querySelectorAll('.article-card');
            articleCards.forEach(card => {
                card.classList.toggle('dark:bg-gray-800');
                card.classList.toggle('dark:text-white');
            });
        }

        themeToggleBtn.addEventListener('click', toggleTheme);
        console.log('Theme toggle event listener attached');

        // Set initial theme
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
            console.log('Initial theme set to dark mode');
        } else {
            document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode');
            console.log('Initial theme set to light mode');
        }
    } else {
        console.log('Theme toggle elements not found');
    }
});

console.log('main.js loaded');
