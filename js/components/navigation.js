/**
 * Navigation Component
 * Handles navbar functionality including mobile navigation and active state
 */

import DOM from '../utils/dom.js';

const Navigation = {
    /**
     * Initialize navigation functionality
     */
    init: () => {
        Navigation.setupMobileNav();
        Navigation.highlightCurrentPage();
    },
    
    /**
     * Setup mobile navigation toggle
     */
    setupMobileNav: () => {
        const burger = DOM.get('.burger');
        const nav = DOM.get('.nav-links');
        const navLinks = DOM.getAll('.nav-links li');
        
        if (!burger) return;
        
        DOM.on(burger, 'click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Update ARIA attributes
            const isExpanded = burger.getAttribute('aria-expanded') === 'true';
            burger.setAttribute('aria-expanded', !isExpanded);
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger Animation
            burger.classList.toggle('toggle');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('nav-active') && 
                !nav.contains(e.target) && 
                !burger.contains(e.target)) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                burger.setAttribute('aria-expanded', 'false');
                
                navLinks.forEach((link) => {
                    link.style.animation = '';
                });
            }
        });
        
        // Support keyboard navigation
        const navItems = DOM.getAll('.nav-links a, .theme-toggle');
        navItems.forEach(item => {
            DOM.on(item, 'keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click();
                }
            });
        });
    },
    
    /**
     * Highlight current page in navigation
     */
    highlightCurrentPage: () => {
        const currentPath = window.location.pathname;
        const pageName = currentPath.split('/').pop();
        
        // Get all nav links
        const navLinks = DOM.getAll('.nav-links a');
        
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.setAttribute('aria-current', 'false');
        });
        
        // Add active class to current page link
        if (pageName === '' || pageName === 'index.html') {
            const homeLink = DOM.get('#nav-home');
            if (homeLink) {
                homeLink.classList.add('active');
                homeLink.setAttribute('aria-current', 'page');
            }
        } else if (pageName === 'projects.html') {
            const projectsLink = DOM.get('#nav-projects');
            if (projectsLink) {
                projectsLink.classList.add('active');
                projectsLink.setAttribute('aria-current', 'page');
            }
        } else if (pageName === 'notes.html') {
            const notesLink = DOM.get('#nav-notes');
            if (notesLink) {
                notesLink.classList.add('active');
                notesLink.setAttribute('aria-current', 'page');
            }
        } else if (pageName === 'about.html') {
            const aboutLink = DOM.get('#nav-about');
            if (aboutLink) {
                aboutLink.classList.add('active');
                aboutLink.setAttribute('aria-current', 'page');
            }
        }
    }
};

export default Navigation;
