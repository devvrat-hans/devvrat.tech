/**
 * Home page specific JavaScript
 * Handles functionality specific to the home page
 */

import DOM from '../utils/dom.js';

const HomePage = {
    /**
     * Initialize home page
     */
    init: () => {
        HomePage.setupFeaturedProjects();
        HomePage.setupRecentNotes();
    },
    
    /**
     * Setup featured projects interaction
     */
    setupFeaturedProjects: () => {
        // Handle project card interactions or animations if needed
        const projectCards = DOM.getAll('.project-card');
        
        projectCards.forEach(card => {
            DOM.on(card, 'mouseenter', () => {
                // Optional: Add hover effect or animation
            });
        });
    },
    
    /**
     * Setup recent notes interaction
     */
    setupRecentNotes: () => {
        // Handle note card interactions or filters if needed
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize home page functionality
    HomePage.init();
});

export default HomePage;
