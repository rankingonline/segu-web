document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle Logic
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.desktop-nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling issues
            nav.classList.toggle('active');
            menuBtn.classList.toggle('active');

            const isExpanded = nav.classList.contains('active');
            menuBtn.setAttribute('aria-expanded', isExpanded);

            // Lock body scroll when menu is open
            document.body.style.overflow = isExpanded ? 'hidden' : '';
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav && nav.classList.contains('active') && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    // Mobile Dropdown Toggle
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger, .chevron');
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const isMobile = window.matchMedia('(max-width: 1024px)').matches;

            if (isMobile) {
                e.preventDefault(); // Always prevent default on mobile
                e.stopPropagation();

                const parent = trigger.closest('.dropdown-item');

                if (parent) {
                    // Close other open dropdowns (optional, but good UX)
                    document.querySelectorAll('.dropdown-item.active').forEach(item => {
                        if (item !== parent) item.classList.remove('active');
                    });

                    parent.classList.toggle('active');
                }
            }
        });
    });

    // Fade-in animation for service cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.service-detail-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });

    // Helper to add class on intersection
    document.addEventListener('scroll', () => {
        cards.forEach(card => {
            if (card.classList.contains('visible')) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Expectation Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const content = item.querySelector('.accordion-content');
                const isActive = item.classList.contains('active');

                // Close other open items (Exclusive Accordion)
                document.querySelectorAll('.accordion-item.active').forEach(activeItem => {
                    if (activeItem !== item) {
                        activeItem.classList.remove('active');
                        activeItem.querySelector('.accordion-content').style.maxHeight = null;
                        activeItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle clicked item
                if (isActive) {
                    item.classList.remove('active');
                    content.style.maxHeight = null;
                    header.setAttribute('aria-expanded', 'false');
                } else {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                    header.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }
});
