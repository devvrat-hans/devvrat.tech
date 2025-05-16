/**
 * Theme Switcher Component
 * Handles light/dark mode preferences
 */

import DOM from '../utils/dom.js';

const ThemeSwitcher = {
    /**
     * Initialize theme switcher
     */
    init: () => {
        ThemeSwitcher.loadTheme();
        ThemeSwitcher.setupToggle();
        ThemeSwitcher.setupSystemPreferenceListener();
    },
    
    /**
     * Load theme from localStorage or system preference
     */
    loadTheme: () => {
        // Check for saved theme preference or use system preference
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            // Use saved preference
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            // Check for system preference
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
            // Save the initial preference
            localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
        }
        
        // Update button appearance to match current theme
        ThemeSwitcher.updateToggleAppearance();
    },
    
    /**
     * Update the toggle button appearance to match current theme
     */
    updateToggleAppearance: () => {
        const themeToggle = DOM.get('.theme-toggle');
        if (!themeToggle) return;
        
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        // Update button ARIA label based on theme
        themeToggle.setAttribute('aria-label', 
            currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
        );
    },
    
    /**
     * Setup theme toggle button
     */
    setupToggle: () => {
        // Add theme toggle button if it doesn't exist
        if (!DOM.get('.theme-toggle')) {
            return;
        }
        
        // Add event listener to toggle button
        DOM.on('.theme-toggle', 'click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Update theme
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update button appearance
            ThemeSwitcher.updateToggleAppearance();
        });
    },
    
    /**
     * Setup system preference change listener
     */
    setupSystemPreferenceListener: () => {
        // Listen for system preference changes
        if (window.matchMedia) {
            const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Check if the browser supports addEventListener for matchMedia
            if (colorSchemeQuery.addEventListener) {
                colorSchemeQuery.addEventListener('change', (e) => {
                    // Only change theme if user hasn't manually set a preference
                    if (!localStorage.getItem('theme')) {
                        const newTheme = e.matches ? 'dark' : 'light';
                        document.documentElement.setAttribute('data-theme', newTheme);
                        ThemeSwitcher.updateToggleAppearance();
                    }
                });
            }
        }
    }
};

export default ThemeSwitcher;
