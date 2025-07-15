---
applyTo: '**'
---
# GitHub Copilot Instructions for Terminal Portfolio Website

## Project Overview
This is a personal portfolio website with a terminal theme featuring:
- Split-screen layout with animated ID card on the left and functional terminal on the right
- Interactive terminal interface with custom commands
- Swirling/pendulum animation for office ID card
- Responsive design for mobile devices
- Technologies: HTML5, CSS3, JavaScript (vanilla)

## Code Style Guidelines

### HTML Structure
- Use semantic HTML5 elements where appropriate
- Include proper accessibility attributes (ARIA labels, alt text)
- Maintain clean, nested structure with proper indentation
- Use descriptive class names following BEM methodology when possible
- Include meta tags for SEO and viewport configuration

### CSS Conventions
- Use CSS custom properties (variables) for consistent theming
- Implement CSS Grid and Flexbox for layout systems
- Write mobile-first responsive CSS with appropriate breakpoints
- Use consistent naming conventions: kebab-case for classes
- Organize CSS in logical sections with comments
- Prefer CSS transforms and transitions for animations
- Use relative units (rem, em, vw, vh) for scalability

### JavaScript Standards
- Write modern ES6+ JavaScript with proper error handling
- Use const/let instead of var
- Implement proper event handling with delegation where appropriate
- Create modular, reusable code with classes and functions
- Include JSDoc comments for complex functions
- Handle keyboard accessibility (Tab navigation, Enter key)
- Implement proper state management for terminal functionality

## Terminal-Specific Requirements

### Terminal Interface
- Create a realistic terminal appearance with:
  - Monospace font family (Monaco, Menlo, or Consolas)
  - Green text on dark background (#00ff00 on #1a1a1a)
  - Proper terminal header with window controls
  - Blinking cursor animation
  - Command history navigation with arrow keys
  - Tab completion for commands

### Command System
- Implement these essential commands:
  - `help` - Show available commands
  - `about` - Personal information
  - `skills` - Technical skills
  - `projects` - Portfolio projects
  - `contact` - Contact information
  - `experience` - Work experience
  - `education` - Educational background
  - `resume` - Resume download/view
  - `clear` - Clear terminal output
  - `ls` - List directory contents
  - `cd` - Change directory simulation
  - `pwd` - Print working directory
  - `whoami` - Display current user
  - `echo` - Echo text back
  - `cat` - Display file contents
  - `tree` - Show directory structure
  - `theme` - Change terminal theme

### ID Card Animation
- Create a realistic office ID card with:
  - Professional card design with photo placeholder
  - Pendulum/swirling animation using CSS transforms
  - Subtle physics-based movement
  - Chain/lanyard visual effect
  - Proper shadow and lighting effects

## Performance Optimizations
- Minimize DOM manipulation for terminal output
- Implement virtual scrolling for long command histories
- Use CSS animations over JavaScript animations when possible
- Optimize image assets and implement lazy loading
- Limit terminal output lines to prevent memory issues
- Use intersection observer for animation triggers

## Accessibility Requirements
- Ensure keyboard navigation works throughout the site
- Implement proper focus management
- Add skip links for screen readers
- Include proper ARIA labels for interactive elements
- Provide alternative text for all images
- Ensure sufficient color contrast ratios
- Support high contrast mode

## Browser Compatibility
- Support modern browsers (Chrome, Firefox, Safari, Edge)
- Implement progressive enhancement for older browsers
- Test animations on different devices and screen sizes
- Provide fallbacks for CSS features not universally supported

## File Organization
- Keep CSS organized with logical sections and comments
- Separate concerns: HTML structure, CSS styling, JS functionality
- Use consistent file naming conventions
- Include proper meta information in HTML head

## Error Handling
- Implement proper error handling for invalid terminal commands
- Provide user-friendly error messages
- Handle edge cases in terminal input parsing
- Include fallbacks for failed animations or assets

## Testing Considerations
- Test terminal functionality across different browsers
- Verify responsive design on various screen sizes
- Check keyboard navigation and accessibility
- Test animation performance on different devices
- Validate HTML and CSS for proper syntax

## Security Best Practices
- Sanitize any user input in terminal commands
- Avoid inline JavaScript and CSS
- Use proper Content Security Policy headers when deploying
- Ensure no sensitive information is exposed in client-side code

## Deployment Preparation
- Optimize assets for production (minification, compression)
- Configure proper caching headers
- Set up error pages (404, 500)
- Include robots.txt and sitemap.xml
- Test cross-browser compatibility before deployment

## Custom Instructions for AI Assistance
When writing code:
- Always explain complex CSS animations step by step
- Provide complete, working code examples
- Include proper error handling in JavaScript functions
- Suggest performance optimizations when relevant
- Explain browser compatibility considerations
- Provide accessibility improvements where applicable
- Suggest testing strategies for new features

When suggesting improvements:
- Focus on user experience enhancements
- Recommend modern web standards and best practices
- Suggest performance optimizations
- Include accessibility improvements
- Provide responsive design considerations

Remember: This is a showcase portfolio website, so prioritize visual appeal, smooth animations, and professional presentation while maintaining excellent code quality and performance.
