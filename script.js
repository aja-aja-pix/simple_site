
// ===== Theme Toggle Functionality =====
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    body.classList.add(savedTheme);
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    });

    // ===== Mobile Menu Toggle =====
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // ===== Sticky Header =====
    const header = document.getElementById('mainHeader');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        window.scrollY > 100 ? header.classList.add('scrolled') : header.classList.remove('scrolled');

        // Update active nav link based on scroll position
        const scrollPosition = window.scrollY;
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');

                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ===== Smooth Scrolling for Internal Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Features Carousel =====
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    let currentSlide = 0;
    const slideCount = carouselSlides.length;

    // Set up carousel dimensions
    const updateCarousel = () => {
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    // Next and Prev buttons
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateCarousel();
    });

    // Auto-advance carousel
    let carouselInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateCarousel();
    }, 5000);

    // Pause auto-advance on hover
    carouselTrack.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });

    carouselTrack.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateCarousel();
        }, 5000);
    });


    // ===== Gallery Filtering =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    const tabButtons = document.querySelectorAll('.tab-button');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter gallery items
            const category = button.getAttribute('data-category');

            galleryItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ===== Scroll Animation =====
    const specCards = document.querySelectorAll('.spec-card');

    const animateOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;

        specCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;

            if (cardTop < triggerBottom) {
                card.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    // Run once on load to check for visible elements
    animateOnScroll();

    // ===== Price Animation =====
    const fadeInElements = document.querySelectorAll('.fade-in');

    const fadeInOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.9;

        fadeInElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', fadeInOnScroll);
    // Run once on load
    fadeInOnScroll();

    // Initialize
    updateCarousel();
    updateProductView();
});