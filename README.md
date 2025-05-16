# devvrat.tech Personal Website

This repository contains the source code for my personal website at [devvrat.tech](https://devvrat.tech).

## Project Structure

```
.
├── index.html               # Home page
├── projects.html            # Projects and case studies page
├── notes.html               # Knowledge base and technical notes page
├── about.html               # About me, skills, and resume page
├── 404.html                 # 404 error page
├── robots.txt               # Instructions for web crawlers
├── sitemap.xml              # Sitemap for search engines
├── .htaccess                # Server configuration file
├── css/
│   ├── base.css             # Base styles, reset, variables, typography
│   ├── layout.css           # Layout styles for header, footer, etc.
│   ├── main.css             # Main stylesheet (imports all other CSS)
│   ├── styles.css           # Original stylesheet (for reference)
│   ├── components/          # Component-specific styles
│   │   ├── cards.css        # Card component styles
│   │   ├── forms.css        # Form element styles
│   │   └── hero.css         # Hero section and banner styles
│   └── pages/               # Page-specific styles
│       ├── about.css        # About page styles
│       ├── error.css        # 404 page styles
│       ├── home.css         # Home page styles
│       ├── notes.css        # Notes page styles
│       └── projects.css     # Projects page styles
├── js/
│   ├── main.js              # Main JavaScript functionality
│   ├── templates.js         # Template loading functionality
│   ├── components/          # Component-specific functionality
│   │   ├── navigation.js    # Navigation functionality
│   │   ├── template-loader.js # Template loader component
│   │   └── theme-switcher.js # Light/dark mode switcher
│   ├── pages/               # Page-specific functionality
│   │   ├── about.js         # About page functionality
│   │   ├── home.js          # Home page functionality
│   │   ├── notes.js         # Notes page functionality
│   │   └── projects.js      # Projects page functionality
│   └── utils/               # Utility functions
│       └── dom.js           # DOM manipulation utilities 
│   └── templates.js         # Template loading system
├── images/                  # Image assets directory
└── templates/
    └── shared/
        ├── navbar.html      # Reusable navigation component
        └── footer.html      # Reusable footer component
```

## Features

- Responsive design for all device sizes
- Template-based structure for consistent header and footer across pages
- SEO-optimized with appropriate meta tags
- Clean, modern UI with semantic HTML5 elements
- Modular CSS architecture:
  - Base styles for consistent variables and defaults
  - Component-specific CSS for better maintainability
  - Page-specific styles for targeted styling
- Modular JavaScript architecture:
  - ES modules for better code organization
  - Component-based approach for reusable functionality
  - Utility functions for common DOM operations
  - Page-specific JavaScript to reduce unused code
- Project showcase with filtering capability
- Knowledge base with categorization and search functionality
- Detailed about page with skills visualization

## Template System

The website uses a simple JavaScript-based template system to include reusable components (navbar and footer) across all pages. This approach keeps the site DRY (Don't Repeat Yourself) and makes maintenance easier.

### How it works

1. Each page includes a reference to the main JavaScript file as an ES module: `<script type="module" src="js/main.js"></script>`
2. The main.js file imports the TemplateLoader component from `js/components/template-loader.js`
3. Templates are stored in the `templates/shared/` directory
4. The TemplateLoader component uses fetch API to load templates into designated placeholder elements
5. The Navigation component detects the current page and highlights the appropriate navigation item

### Usage

To use the templates in a page:

1. Add empty placeholder elements for the components:
```html
<!-- Header will be loaded from template -->
<header></header>

<!-- Your page content here -->

<!-- Footer will be loaded from template -->
<footer></footer>
```

2. Include the template loader script before the closing body tag:
```html
<script src="js/main.js"></script>
<script src="js/templates.js"></script>
```

## Development

This is a static HTML website, so no build process is required. Simply edit the files in your favorite text editor.

## Modular Architecture

### CSS Organization

The CSS follows a modular architecture:

1. **Base Styles** (`/css/base.css`):
   - CSS reset and normalization
   - CSS variables (colors, fonts, spacing)
   - Typography defaults
   - Common element styles

2. **Layout Styles** (`/css/layout.css`):
   - Header and navigation styles
   - Footer styles
   - Grid and container definitions
   - Responsive layout utilities

3. **Component Styles** (`/css/components/`):
   - Reusable UI components like cards, forms, buttons
   - Each component has its own CSS file for better maintainability

4. **Page-specific Styles** (`/css/pages/`):
   - Styles that only apply to specific pages
   - Organized by page to prevent conflicts and unused CSS

5. **Main CSS** (`/css/main.css`):
   - Imports all other CSS files
   - Controls the order of CSS application
   - Provides a single entry point for all styles

### JavaScript Organization

The JavaScript follows a similar modular approach using ES modules:

1. **Utility Functions** (`/js/utils/`):
   - Reusable helper functions
   - DOM manipulation utilities

2. **Components** (`/js/components/`):
   - Reusable UI component functionality
   - Template loading system
   - Navigation and theme switching

3. **Page-specific JS** (`/js/pages/`):
   - Functionality only needed on specific pages
   - Loaded dynamically based on current page

4. **Main JS** (`/js/main.js`):
   - Entry point for all JavaScript
   - Imports and initializes components
   - Handles page detection and dynamic imports

To test the site locally:

1. Clone the repository
2. Open the project in a code editor
3. Use a local server (e.g., VS Code's Live Server extension) to view the site
   - A local server is required for ES modules and template loading to work correctly

## Deployment

The site can be deployed to any static hosting service:

1. Upload all files to your web server
2. Ensure the server is configured to use the .htaccess file for proper routing and HTTP headers
3. Set up HTTPS for secure access

## License

All rights reserved. This code is not open-source.

## Contact

For any questions, reach out to contact@devvrat.tech
