/**
 * Main JavaScript for the portfolio website
 * Handles loading, animations, and general functionality
 */

class PortfolioApp {
  constructor() {
    this.isLoaded = false;
    this.terminal = null;
    this.init();
  }

  init() {
    this.handleLoading();
    this.initializeTerminal();
    this.bindEvents();
  }

  handleLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      this.isLoaded = true;
      
      // Remove loading screen from DOM after animation
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 2000);
  }

  initializeTerminal() {
    // Wait for terminal.js to load
    document.addEventListener('DOMContentLoaded', () => {
      if (typeof Terminal !== 'undefined') {
        this.terminal = new Terminal('terminal-container');
      }
    });
  }

  bindEvents() {
    // Handle window resize
    window.addEventListener('resize', this.handleResize.bind(this));
    
    // Handle keyboard shortcuts
    document.addEventListener('keydown', this.handleKeyboard.bind(this));
    
    // Handle terminal controls
    this.bindTerminalControls();
  }

  handleResize() {
    // Adjust layout for mobile
    const portfolioContainer = document.querySelector('.portfolio-container');
    if (window.innerWidth <= 768) {
      portfolioContainer.classList.add('mobile-layout');
    } else {
      portfolioContainer.classList.remove('mobile-layout');
    }
  }

  handleKeyboard(e) {
    // Global keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch(e.key) {
        case 'k':
          e.preventDefault();
          this.clearTerminal();
          break;
        case 'l':
          e.preventDefault();
          this.focusTerminal();
          break;
      }
    }
  }

  bindTerminalControls() {
    const closeBtn = document.querySelector('.terminal-control.close');
    const minimizeBtn = document.querySelector('.terminal-control.minimize');
    const maximizeBtn = document.querySelector('.terminal-control.maximize');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.showCloseConfirmation();
      });
    }

    if (minimizeBtn) {
      minimizeBtn.addEventListener('click', () => {
        this.minimizeTerminal();
      });
    }

    if (maximizeBtn) {
      maximizeBtn.addEventListener('click', () => {
        this.maximizeTerminal();
      });
    }
  }

  clearTerminal() {
    if (this.terminal) {
      this.terminal.clearTerminal();
    }
  }

  focusTerminal() {
    const terminalInput = document.getElementById('terminal-input');
    if (terminalInput) {
      terminalInput.focus();
    }
  }

  showCloseConfirmation() {
    const output = `
      <div class="terminal-line warning">
        <span class="terminal-prompt">system:</span>
        <span>Are you sure you want to close the terminal? This will end your session.</span>
      </div>
      <div class="terminal-line">
        <span class="terminal-prompt">system:</span>
        <span>Type 'exit' to confirm or any other key to cancel.</span>
      </div>
    `;
    
    if (this.terminal) {
      this.terminal.addOutput(output);
    }
  }

  minimizeTerminal() {
    const terminalWrapper = document.querySelector('.terminal-wrapper');
    terminalWrapper.classList.toggle('minimized');
  }

  maximizeTerminal() {
    const terminalWrapper = document.querySelector('.terminal-wrapper');
    terminalWrapper.classList.toggle('maximized');
  }

  // Matrix rain effect removed as per user request
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new PortfolioApp();
});

// Export for other modules
window.PortfolioApp = PortfolioApp;
