document.addEventListener('DOMContentLoaded', () => {
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
