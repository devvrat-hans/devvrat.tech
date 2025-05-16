/**
 * Scroll reveal animations
 */
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        // Elements to observe - all sections after the hero section
        const sections = document.querySelectorAll('section:not(.hero)');
        
        // Configure the observer
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                // When section becomes visible
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animate child elements with staggered delay
                    const children = entry.target.querySelectorAll('.animate-child');
                    if (children.length > 0) {
                        children.forEach((child, index) => {
                            setTimeout(() => {
                                child.classList.add('animate-in');
                            }, 100 * index);
                        });
                    }
                    
                    // Stop observing this element once it's animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Start observing each section
        sections.forEach(section => {
            // Add the initial hidden state class
            section.classList.add('reveal-section');
            
            // Initialize child animations if there are elements to animate
            const animateElements = section.querySelectorAll('h2, .projects-grid > *, .view-all');
            animateElements.forEach(el => el.classList.add('animate-child', 'reveal-element'));
            
            // Start observation
            observer.observe(section);
        });
    }
});
