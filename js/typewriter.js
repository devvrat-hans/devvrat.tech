/**
 * Improved typewriter animation for hero section
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get all typewriter elements
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(el => {
        if (el.dataset.words) {
            const words = JSON.parse(el.dataset.words);
            let currentWordIndex = 0;
            let currentCharIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100; // milliseconds per character
            
            // Create a span for the text content to avoid CSS pseudo-element issues
            const textSpan = document.createElement('span');
            textSpan.className = 'typewriter-text';
            el.appendChild(textSpan);
            
            function typeEffect() {
                const currentWord = words[currentWordIndex];
                
                if (isDeleting) {
                    // Deleting text
                    textSpan.textContent = currentWord.substring(0, currentCharIndex - 1);
                    currentCharIndex--;
                    typingSpeed = 50; // Faster deletion
                } else {
                    // Typing text
                    textSpan.textContent = currentWord.substring(0, currentCharIndex + 1);
                    currentCharIndex++;
                    typingSpeed = 100; // Normal typing speed
                }
                
                // Check if word is complete
                if (!isDeleting && currentCharIndex === currentWord.length) {
                    // Pause at end of word
                    typingSpeed = 1500;
                    isDeleting = true;
                } else if (isDeleting && currentCharIndex === 0) {
                    isDeleting = false;
                    
                    // Move to next word
                    currentWordIndex = (currentWordIndex + 1) % words.length;
                    
                    // Pause before typing next word
                    typingSpeed = 500;
                }
                
                // Continue the animation loop
                setTimeout(typeEffect, typingSpeed);
            }
            
            // Start the typing animation
            setTimeout(typeEffect, 1000);
            
            // Adjust cursor position based on text content
            const resizeObserver = new ResizeObserver(() => {
                // Make sure cursor stays aligned with text
                if (textSpan.textContent && textSpan.textContent.length > 0) {
                    // The cursor is handled by CSS but we keep the element's position correct
                    el.style.minWidth = textSpan.offsetWidth + 'px';
                }
            });
            
            // Observe the text span for size changes
            resizeObserver.observe(textSpan);
        }
    });
});
