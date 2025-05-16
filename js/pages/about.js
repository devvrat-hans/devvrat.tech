/**
 * About page specific JavaScript
 * Handles functionality specific to the about page
 */

import DOM from '../utils/dom.js';

const AboutPage = {
    /**
     * Initialize about page
     */
    init: () => {
        AboutPage.animateSkills();
        AboutPage.setupContactForm();
    },
    
    /**
     * Animate skills bars
     */
    animateSkills: () => {
        const skillBars = DOM.getAll('.skill-progress');
        
        if (skillBars.length === 0) return;
        
        // Check if element is in viewport
        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };
        
        // Animate skill bar when it comes into view
        const animateSkillsIfVisible = () => {
            skillBars.forEach(bar => {
                if (isInViewport(bar) && !bar.classList.contains('animated')) {
                    // Get skill level percentage
                    const skillLevel = bar.getAttribute('data-level') || '0';
                    
                    // Animate width
                    bar.style.width = '0%';
                    bar.classList.add('animated');
                    
                    setTimeout(() => {
                        bar.style.width = `${skillLevel}%`;
                        bar.style.transition = 'width 1s ease-out';
                    }, 100);
                }
            });
        };
        
        // Run on page load
        animateSkillsIfVisible();
        
        // Run on scroll
        window.addEventListener('scroll', animateSkillsIfVisible);
    },
    
    /**
     * Setup contact form validation and submission
     */
    setupContactForm: () => {
        const contactForm = DOM.get('#contact-form');
        
        if (!contactForm) return;
        
        DOM.on(contactForm, 'submit', (e) => {
            e.preventDefault();
            
            // Validate form
            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const message = contactForm.querySelector('#message').value.trim();
            
            // Simple validation
            if (name === '' || email === '' || message === '') {
                alert('Please fill out all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Send form data
            // In a real implementation, this would send data to a backend
            
            // Show success message
            const formWrapper = contactForm.closest('.form-wrapper');
            formWrapper.innerHTML = `
                <div class="success-message">
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. I'll get back to you soon.</p>
                </div>
            `;
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize about page functionality
    AboutPage.init();
});

export default AboutPage;
