/**
 * Main JavaScript file for devvrat.tech
 * Author: Devvrat
 * Version: 1.0
 * 
 * This file imports and initializes all shared components
 * and determines which page-specific JS to load
 */

// Import shared components
import TemplateLoader from './components/template-loader.js';
import Navigation from './components/navigation.js';
import ThemeSwitcher from './components/theme-switcher.js';
import DOM from './utils/dom.js';

// Initialize template loader first, then other components
document.addEventListener('DOMContentLoaded', () => {
    // Load templates
    TemplateLoader.init();
    
    // Listen for when navbar is loaded before initializing navigation
    document.addEventListener('navbarLoaded', () => {
        Navigation.init();
        
        // Initialize theme switcher after navbar is loaded (it might contain the toggle)
        ThemeSwitcher.init();
    });
    
    // Project Filtering (for projects.html)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length && projectItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                projectItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Notes Category Filtering (for notes.html)
    const categoryLinks = document.querySelectorAll('.category-list a');
    const noteItems = document.querySelectorAll('.note-item');
    const tagLinks = document.querySelectorAll('.tags-cloud .tag');
    const searchInput = document.getElementById('note-search');
    
    if (categoryLinks.length && noteItems.length) {
        // Category filtering
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                categoryLinks.forEach(catLink => catLink.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');
                
                const filterValue = link.getAttribute('data-category');
                
                noteItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category.includes(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
        
        // Tag filtering
        if (tagLinks.length) {
            tagLinks.forEach(tag => {
                tag.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const filterValue = tag.getAttribute('data-tag');
                    
                    noteItems.forEach(item => {
                        const tags = item.getAttribute('data-tags');
                        
                        if (tags && tags.includes(filterValue)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                    
                    // Update active state in category links
                    categoryLinks.forEach(catLink => catLink.classList.remove('active'));
                });
            });
        }
        
        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const searchValue = searchInput.value.toLowerCase();
                
                noteItems.forEach(item => {
                    const title = item.querySelector('h2').textContent.toLowerCase();
                    const excerpt = item.querySelector('.note-excerpt').textContent.toLowerCase();
                    
                    if (title.includes(searchValue) || excerpt.includes(searchValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }
    }
    
    // Determine which page we're on and load page-specific JS
    const currentPath = window.location.pathname;
    
    // Dynamically import the appropriate page module
    if (currentPath === '/' || currentPath.includes('index.html')) {
        import('./pages/home.js');
    } else if (currentPath.includes('projects')) {
        import('./pages/projects.js');
    } else if (currentPath.includes('notes')) {
        import('./pages/notes.js');
    } else if (currentPath.includes('about')) {
        import('./pages/about.js');
    }
    
    // Setup global UI elements and interactions
    setupGlobalInteractions();
});

/**
 * Set up global interactions that apply to all pages
 */
function setupGlobalInteractions() {
    // Smooth scroll for anchor links
    DOM.on('a[href^="#"]', 'click', (e) => {
        const href = e.currentTarget.getAttribute('href');
        
        // Skip if it's just "#" (probably a toggle button)
        if (href === '#') return;
        
        const targetElement = DOM.get(href);
        
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
    
    // Setup back to top button if it exists
    const backToTopBtn = DOM.get('.back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        // Scroll to top on click
        DOM.on(backToTopBtn, 'click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
