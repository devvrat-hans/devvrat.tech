/**
 * Projects page specific JavaScript
 * Handles functionality specific to the projects page
 */

import DOM from '../utils/dom.js';

const ProjectsPage = {
    /**
     * Initialize projects page
     */
    init: () => {
        ProjectsPage.setupFilters();
        ProjectsPage.setupProjectSearch();
    },
    
    /**
     * Setup project filtering functionality
     */
    setupFilters: () => {
        const filterButtons = DOM.getAll('.filter-btn');
        const projects = DOM.getAll('.project-card');
        
        if (filterButtons.length === 0) return;
        
        // Add click events to filter buttons
        filterButtons.forEach(button => {
            DOM.on(button, 'click', () => {
                // Remove active class from all buttons
                DOM.removeClass(filterButtons, 'active');
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filter = button.getAttribute('data-filter');
                
                // Filter projects
                projects.forEach(project => {
                    if (filter === 'all') {
                        project.style.display = 'block';
                    } else {
                        const projectCategory = project.getAttribute('data-category');
                        
                        if (projectCategory === filter) {
                            project.style.display = 'block';
                        } else {
                            project.style.display = 'none';
                        }
                    }
                });
            });
        });
    },
    
    /**
     * Setup project search functionality
     */
    setupProjectSearch: () => {
        const searchInput = DOM.get('#project-search');
        const projects = DOM.getAll('.project-card');
        
        if (!searchInput) return;
        
        DOM.on(searchInput, 'input', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            projects.forEach(project => {
                const title = project.querySelector('h3')?.textContent.toLowerCase() || '';
                const description = project.querySelector('p')?.textContent.toLowerCase() || '';
                const tags = project.getAttribute('data-tags')?.toLowerCase() || '';
                
                if (title.includes(searchTerm) || 
                    description.includes(searchTerm) || 
                    tags.includes(searchTerm)) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize projects page functionality
    ProjectsPage.init();
});

export default ProjectsPage;
