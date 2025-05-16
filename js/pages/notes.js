/**
 * Notes page specific JavaScript
 * Handles functionality specific to the notes page
 */

import DOM from '../utils/dom.js';

const NotesPage = {
    /**
     * Initialize notes page
     */
    init: () => {
        NotesPage.setupCategoryFilter();
        NotesPage.setupTagFilter();
        NotesPage.setupNoteSearch();
    },
    
    /**
     * Setup category filtering
     */
    setupCategoryFilter: () => {
        const categoryLinks = DOM.getAll('.category-list a');
        const noteItems = DOM.getAll('.note-item');
        
        if (categoryLinks.length === 0) return;
        
        categoryLinks.forEach(link => {
            DOM.on(link, 'click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                DOM.removeClass(categoryLinks, 'active');
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Get category value
                const category = link.getAttribute('data-category');
                
                // Filter notes by category
                noteItems.forEach(note => {
                    if (category === 'all') {
                        note.style.display = 'block';
                    } else {
                        const noteCategory = note.getAttribute('data-category');
                        
                        if (noteCategory === category) {
                            note.style.display = 'block';
                        } else {
                            note.style.display = 'none';
                        }
                    }
                });
            });
        });
    },
    
    /**
     * Setup tag filtering
     */
    setupTagFilter: () => {
        const tagLinks = DOM.getAll('.tags-cloud .tag');
        const noteItems = DOM.getAll('.note-item');
        
        if (tagLinks.length === 0) return;
        
        tagLinks.forEach(link => {
            DOM.on(link, 'click', (e) => {
                e.preventDefault();
                
                // Get tag value
                const tag = link.getAttribute('data-tag');
                
                // Filter notes by tag
                noteItems.forEach(note => {
                    const noteTags = note.getAttribute('data-tags')?.split(',') || [];
                    
                    if (noteTags.includes(tag)) {
                        note.style.display = 'block';
                    } else {
                        note.style.display = 'none';
                    }
                });
                
                // Update UI to show active tag
                DOM.get('#active-filter').textContent = `Tag: ${tag}`;
                DOM.get('#clear-filter').style.display = 'inline-block';
            });
        });
        
        // Clear filter button
        const clearFilter = DOM.get('#clear-filter');
        if (clearFilter) {
            DOM.on(clearFilter, 'click', () => {
                noteItems.forEach(note => {
                    note.style.display = 'block';
                });
                
                DOM.get('#active-filter').textContent = '';
                clearFilter.style.display = 'none';
            });
        }
    },
    
    /**
     * Setup note search functionality
     */
    setupNoteSearch: () => {
        const searchInput = DOM.get('#note-search');
        const noteItems = DOM.getAll('.note-item');
        
        if (!searchInput) return;
        
        DOM.on(searchInput, 'input', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            noteItems.forEach(note => {
                const title = note.querySelector('h3')?.textContent.toLowerCase() || '';
                const excerpt = note.querySelector('.note-excerpt')?.textContent.toLowerCase() || '';
                const tags = note.getAttribute('data-tags')?.toLowerCase() || '';
                
                if (title.includes(searchTerm) || 
                    excerpt.includes(searchTerm) || 
                    tags.includes(searchTerm)) {
                    note.style.display = 'block';
                } else {
                    note.style.display = 'none';
                }
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize notes page functionality
    NotesPage.init();
});

export default NotesPage;
