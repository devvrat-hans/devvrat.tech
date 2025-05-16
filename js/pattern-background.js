/**
 * SVG Pattern Generator for Hero Background
 * Creates a subtle dot pattern background with dynamic color based on theme
 */
document.addEventListener('DOMContentLoaded', function() {
    // Function to create an SVG dot pattern
    function createDotPattern(color, opacity) {
        const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <circle cx="2" cy="2" r="1" fill="${color}" opacity="${opacity}"/>
        </svg>
        `;
        return `url('data:image/svg+xml;base64,${btoa(svg)}')`;
    }
    
    // Function to set the pattern based on theme
    function updatePattern() {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            const dotColor = isDarkMode ? '#ffffff' : '#000000';
            const dotOpacity = isDarkMode ? '0.07' : '0.04';
            
            heroSection.style.backgroundImage = createDotPattern(dotColor, dotOpacity);
            heroSection.style.backgroundSize = '20px 20px';
        }
    }
    
    // Initial pattern setup
    updatePattern();
    
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                updatePattern();
            }
        });
    });
    
    // Start observing theme changes
    observer.observe(document.documentElement, { attributes: true });
});
