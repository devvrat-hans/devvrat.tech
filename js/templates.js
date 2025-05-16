/**
 * Template loader for devvrat.tech
 * This script loads navbar and footer components into all pages
 */

document.addEventListener('DOMContentLoaded', () => {
    // Load the navbar template
    const headerElement = document.querySelector('header');
    if (headerElement) {
        fetch('/templates/shared/navbar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load navbar template');
                }
                return response.text();
            })
            .then(html => {
                headerElement.innerHTML = html;
                // Execute any scripts in the loaded HTML
                const scripts = headerElement.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    document.body.appendChild(newScript);
                    script.remove();
                });
            })
            .catch(error => {
                console.error('Error loading navbar template:', error);
            });
    }

    // Load the footer template
    const footerElement = document.querySelector('footer');
    if (footerElement) {
        fetch('/templates/shared/footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load footer template');
                }
                return response.text();
            })
            .then(html => {
                footerElement.innerHTML = html;
                // Execute any scripts in the loaded HTML
                const scripts = footerElement.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    document.body.appendChild(newScript);
                    script.remove();
                });
            })
            .catch(error => {
                console.error('Error loading footer template:', error);
            });
    }
});
