/**
 * Mouse parallax effect for hero section
 */
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    const blobs = document.querySelectorAll('.blob');
    const avatar = document.querySelector('.hero-image .avatar');
    
    if (heroSection && blobs.length > 0) {
        heroSection.addEventListener('mousemove', (e) => {
            // Calculate mouse position relative to the center of the section
            const rect = heroSection.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate offset from center as a percentage
            const offsetX = (mouseX - centerX) / centerX;
            const offsetY = (mouseY - centerY) / centerY;
            
            // Move blobs in opposite direction of mouse
            blobs.forEach((blob, index) => {
                const strength = 30 - (index * 5); // Vary strength by blob index
                const x = offsetX * strength;
                const y = offsetY * strength;
                
                // Apply transform with slight delay based on index for natural effect
                blob.style.transition = `transform 0.${index + 1}s ease-out`;
                blob.style.transform = `translate(${-x}px, ${-y}px)`;
            });
            
            // Subtle movement for the avatar
            if (avatar) {
                avatar.style.transition = 'transform 0.3s ease-out';
                avatar.style.transform = `translate(${offsetX * -15}px, ${offsetY * -15}px)`;
            }
        });
        
        // Reset positions when mouse leaves the hero section
        heroSection.addEventListener('mouseleave', () => {
            blobs.forEach(blob => {
                blob.style.transition = 'transform 0.8s ease-out';
                blob.style.transform = 'translate(0, 0)';
            });
            
            if (avatar) {
                avatar.style.transition = 'transform 0.8s ease-out';
                avatar.style.transform = 'translate(0, 0)';
            }
        });
    }
});
