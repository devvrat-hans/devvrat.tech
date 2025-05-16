/**
 * DOM Utility Functions
 * Helper functions for DOM manipulation
 */

const DOM = {
    /**
     * Get element by selector
     * @param {string} selector - CSS selector
     * @returns {Element|null} - DOM element or null
     */
    get: (selector) => document.querySelector(selector),
    
    /**
     * Get all elements matching selector
     * @param {string} selector - CSS selector
     * @returns {NodeList} - Collection of DOM elements
     */
    getAll: (selector) => document.querySelectorAll(selector),
    
    /**
     * Create element with attributes and children
     * @param {string} tag - Element tag name
     * @param {Object} attributes - Element attributes
     * @param {Array|string} children - Child elements or text content
     * @returns {Element} - Created DOM element
     */
    create: (tag, attributes = {}, children = []) => {
        const element = document.createElement(tag);
        
        // Set attributes
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'dataset') {
                Object.entries(value).forEach(([dataKey, dataValue]) => {
                    element.dataset[dataKey] = dataValue;
                });
            } else if (key === 'style') {
                Object.entries(value).forEach(([styleKey, styleValue]) => {
                    element.style[styleKey] = styleValue;
                });
            } else if (key === 'text') {
                element.textContent = value;
            } else {
                element.setAttribute(key, value);
            }
        });
        
        // Append children
        if (typeof children === 'string') {
            element.textContent = children;
        } else if (Array.isArray(children)) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    element.appendChild(document.createTextNode(child));
                } else if (child instanceof Node) {
                    element.appendChild(child);
                }
            });
        }
        
        return element;
    },
    
    /**
     * Add event listener to elements
     * @param {string|Element|NodeList} selector - CSS selector, DOM element or NodeList
     * @param {string} event - Event name
     * @param {Function} callback - Event callback
     */
    on: (selector, event, callback) => {
        if (typeof selector === 'string') {
            document.querySelectorAll(selector).forEach(element => {
                element.addEventListener(event, callback);
            });
        } else if (selector instanceof Element) {
            selector.addEventListener(event, callback);
        } else if (selector instanceof NodeList) {
            selector.forEach(element => {
                element.addEventListener(event, callback);
            });
        }
    },
    
    /**
     * Add class to element(s)
     * @param {string|Element|NodeList} selector - CSS selector, DOM element or NodeList
     * @param {string} className - Class to add
     */
    addClass: (selector, className) => {
        if (typeof selector === 'string') {
            document.querySelectorAll(selector).forEach(element => {
                element.classList.add(className);
            });
        } else if (selector instanceof Element) {
            selector.classList.add(className);
        } else if (selector instanceof NodeList) {
            selector.forEach(element => {
                element.classList.add(className);
            });
        }
    },
    
    /**
     * Remove class from element(s)
     * @param {string|Element|NodeList} selector - CSS selector, DOM element or NodeList
     * @param {string} className - Class to remove
     */
    removeClass: (selector, className) => {
        if (typeof selector === 'string') {
            document.querySelectorAll(selector).forEach(element => {
                element.classList.remove(className);
            });
        } else if (selector instanceof Element) {
            selector.classList.remove(className);
        } else if (selector instanceof NodeList) {
            selector.forEach(element => {
                element.classList.remove(className);
            });
        }
    },
    
    /**
     * Toggle class on element(s)
     * @param {string|Element|NodeList} selector - CSS selector, DOM element or NodeList
     * @param {string} className - Class to toggle
     */
    toggleClass: (selector, className) => {
        if (typeof selector === 'string') {
            document.querySelectorAll(selector).forEach(element => {
                element.classList.toggle(className);
            });
        } else if (selector instanceof Element) {
            selector.classList.toggle(className);
        } else if (selector instanceof NodeList) {
            selector.forEach(element => {
                element.classList.toggle(className);
            });
        }
    }
};

export default DOM;
