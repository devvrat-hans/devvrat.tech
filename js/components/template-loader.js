/**
 * Template Loader
 * Loads shared components like navbar and footer
 */

import DOM from '../utils/dom.js';

const TemplateLoader = {
    /**
     * Initialize template loader
     */
    init: () => {
        TemplateLoader.loadNavbar();
        TemplateLoader.loadFooter();
    },
    
    /**
     * Load navbar template
     */
    loadNavbar: async () => {
        const headerElement = DOM.get('header');
        if (!headerElement) return;
        
        try {
            const response = await fetch('/templates/shared/navbar.html');
            
            if (!response.ok) {
                throw new Error('Failed to load navbar template');
            }
            
            const html = await response.text();
            headerElement.innerHTML = html;
            
            // Execute any scripts in the loaded HTML
            const scripts = headerElement.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                
                // Copy attributes
                Array.from(script.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                
                // Set script content
                newScript.appendChild(document.createTextNode(script.innerHTML));
                
                // Replace old script with new one
                script.parentNode.replaceChild(newScript, script);
            });
            
            // Dispatch event when navbar is loaded
            document.dispatchEvent(new CustomEvent('navbarLoaded'));
        } catch (error) {
            console.error('Error loading navbar:', error);
        }
    },
    
    /**
     * Load footer template
     */
    loadFooter: async () => {
        const footerElement = DOM.get('footer');
        if (!footerElement) return;
        
        try {
            const response = await fetch('/templates/shared/footer.html');
            
            if (!response.ok) {
                throw new Error('Failed to load footer template');
            }
            
            const html = await response.text();
            footerElement.innerHTML = html;
            
            // Execute any scripts in the loaded HTML
            const scripts = footerElement.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                
                // Copy attributes
                Array.from(script.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                
                // Set script content
                newScript.appendChild(document.createTextNode(script.innerHTML));
                
                // Replace old script with new one
                script.parentNode.replaceChild(newScript, script);
            });
            
            // Dispatch event when footer is loaded
            document.dispatchEvent(new CustomEvent('footerLoaded'));
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }
};

export default TemplateLoader;
