/**
 * Terminal functionality for the portfolio website
 * Handles command processing, terminal UI, and interactive features
 */

class Terminal {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.output = null;
    this.input = null;
    this.commandHistory = [];
    this.historyIndex = -1;
    this.currentDirectory = '/home/devvrat';
    this.user = 'devvrat';
    this.hostname = 'portfolio';
    
    this.commands = {
      help: this.showHelp.bind(this),
      about: this.showAbout.bind(this),
      skills: this.showSkills.bind(this),
      projects: this.showProjects.bind(this),
      contact: this.showContact.bind(this),
      experience: this.showExperience.bind(this),
      education: this.showEducation.bind(this),
      resume: this.showResume.bind(this),
      clear: this.clearTerminal.bind(this),
      ls: this.listDirectory.bind(this),
      cd: this.changeDirectory.bind(this),
      pwd: this.printWorkingDirectory.bind(this),
      whoami: this.whoAmI.bind(this),
      echo: this.echo.bind(this),
      cat: this.catFile.bind(this),
      tree: this.showTree.bind(this),
      theme: this.changeTheme.bind(this),
      date: this.showDate.bind(this),
      uname: this.showSystem.bind(this),
      social: this.showSocial.bind(this),
      blog: this.showBlog.bind(this),
      github: this.openGithub.bind(this),
      linkedin: this.openLinkedin.bind(this)
    };
    
    this.init();
  }
  
  init() {
    this.createTerminalStructure();
    this.bindEvents();
    this.displayWelcomeMessage();
    this.focusInput();
  }
  
  createTerminalStructure() {
    this.output = document.getElementById('terminal-output');
    this.input = document.getElementById('terminal-input');
    
    if (!this.output || !this.input) {
      console.error('Terminal elements not found');
      return;
    }
  }
  
  bindEvents() {
    this.input.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'Enter':
          this.processCommand();
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.navigateHistory(-1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.navigateHistory(1);
          break;
        case 'Tab':
          e.preventDefault();
          this.autoComplete();
          break;
      }
    });
    
    // Keep input focused
    this.container.addEventListener('click', () => {
      this.input.focus();
    });
  }
  
  getPrompt() {
    return `${this.user}@${this.hostname}:${this.currentDirectory}$ `;
  }
  
  processCommand() {
    const command = this.input.value.trim();
    if (command) {
      this.commandHistory.push(command);
      this.historyIndex = this.commandHistory.length;
      
      this.addToOutput(`${this.getPrompt()}${command}`, 'terminal-line');
      
      const [cmd, ...args] = command.split(' ');
      
      if (this.commands[cmd]) {
        this.commands[cmd](args);
      } else {
        this.addToOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'terminal-error');
      }
    }
    
    this.input.value = '';
    this.scrollToBottom();
  }
  
  addToOutput(text, className = 'terminal-response') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.innerHTML = text;
    this.output.appendChild(line);
  }
  
  navigateHistory(direction) {
    if (this.commandHistory.length === 0) return;
    
    this.historyIndex += direction;
    
    if (this.historyIndex < 0) {
      this.historyIndex = 0;
    } else if (this.historyIndex >= this.commandHistory.length) {
      this.historyIndex = this.commandHistory.length;
      this.input.value = '';
      return;
    }
    
    this.input.value = this.commandHistory[this.historyIndex] || '';
  }
  
  autoComplete() {
    const partial = this.input.value;
    const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(partial));
    
    if (matches.length === 1) {
      this.input.value = matches[0];
    } else if (matches.length > 1) {
      this.addToOutput(matches.join('  '), 'terminal-info');
    }
  }
  
  scrollToBottom() {
    this.output.scrollTop = this.output.scrollHeight;
  }
  
  focusInput() {
    this.input.focus();
  }
  
  displayWelcomeMessage() {
    const welcomeText = `
🚀 Welcome to Devvrat's Interactive Portfolio Terminal!

████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
   ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝

💡 Ready to explore? Type 'help' to see available commands
🎯 Quick start: Try 'about', 'skills', 'projects', or 'contact'
`;
    this.addToOutput(welcomeText, 'terminal-info');
  }
  
  // Command implementations
  showHelp() {
    const helpText = `
🎯 Available Commands - Your Gateway to My Portfolio
====================================================

🏠 CORE INFORMATION:
   help        - Show this help message (you're here!)
   about       - Discover who I am and what drives me
   skills      - Explore my technical expertise
   projects    - Browse my featured work & achievements
   contact     - Let's connect and build something amazing

📋 PROFESSIONAL DETAILS:
   experience  - My professional journey & roles
   education   - Academic background & certifications
   resume      - Download my latest resume
   social      - Find me on social platforms
   blog        - Read my latest technical insights
   github      - Quick access to my GitHub profile
   linkedin    - Quick access to my LinkedIn profile

🔧 TERMINAL TOOLS:
   clear       - Clean slate (Ctrl+L works too!)
   ls          - List current directory contents
   pwd         - Show current directory path
   cd          - Navigate directories (try: cd ..)
   cat         - Read file contents (try: cat about.txt)
   tree        - Visualize directory structure
   whoami      - Display current user
   echo        - Echo text back to terminal

🎨 SYSTEM & FUN:
   date        - Current date and time
   uname       - System information
   theme       - Change terminal theme (green|blue|purple)

💡 PRO TIPS:
   • Use ↑↓ arrow keys to navigate command history
   • Press Tab for command auto-completion
   • Type any command above to explore my portfolio!
   
🚀 Ready to dive in? Start with 'about' or 'projects'!
    `;
    this.addToOutput(helpText, 'terminal-info');
  }
  
  showAbout() {
    const aboutText = `
About Devvrat Hans
==================

🚀 Passionate Full-Stack Developer & Problem Solver

I'm a dedicated software engineer with a passion for creating innovative 
solutions and building applications that make a real difference. 

💻 What I Do:
• Design and develop scalable web applications
• Build modern, responsive user interfaces
• Architect robust backend systems
• Optimize performance and user experience
• Collaborate with teams to deliver exceptional products

🎯 Core Expertise:
• Frontend: React, Vue.js, TypeScript, Next.js
• Backend: Node.js, Python, Express, FastAPI
• Databases: PostgreSQL, MongoDB, Redis
• Cloud: AWS, Docker, Kubernetes, CI/CD
• Tools: Git, VS Code, Linux/Unix systems

🌟 Always learning, always growing, always coding! 
Ready to build something amazing together? 🚀
    `;
    this.addToOutput(aboutText, 'terminal-success');
  }
  
  showSkills() {
    const skillsText = `
Technical Skills
================

Programming Languages:
├── JavaScript/TypeScript ████████████ 95%
├── Python                ███████████  90%
├── Java                  ████████     80%
├── Go                    ██████       60%
└── Rust                  ████         40%

Frontend Technologies:
├── React/Next.js         ████████████ 95%
├── Vue.js/Nuxt.js        ██████████   85%
├── Angular               ███████      70%
├── CSS/SCSS/Tailwind     ████████████ 95%
└── Web APIs              ████████████ 95%

Backend Technologies:
├── Node.js/Express       ████████████ 95%
├── Python/FastAPI        ██████████   85%
├── PostgreSQL            ███████████  90%
├── MongoDB               █████████    80%
└── Redis                 ████████     75%

DevOps & Cloud:
├── Docker                ██████████   85%
├── AWS                   █████████    80%
├── Kubernetes            ███████      65%
├── CI/CD                 █████████    80%
└── Linux/Unix            ███████████  90%
    `;
    this.addToOutput(skillsText, 'terminal-success');
  }
  
  showProjects() {
    const projectsText = `
🚀 Featured Projects Portfolio
==============================

1. 🎯 Interactive Terminal Portfolio (This Site!)
   ├─ Tech: HTML5, CSS3, Vanilla JavaScript
   ├─ Features: 
   │  ├─ Real-time command processing
   │  ├─ Animated ID card with physics
   │  ├─ Responsive design & accessibility
   │  └─ Matrix rain effects
   └─ Repository: https://github.com/devvrat-hans/devvrat.tech

2. 🛒 Modern E-commerce Platform
   ├─ Tech: React, Node.js, PostgreSQL, Stripe
   ├─ Features:
   │  ├─ Real-time inventory updates
   │  ├─ Secure payment processing
   │  ├─ Admin dashboard & analytics
   │  └─ Mobile-first design
   └─ Status: ✅ Production Ready

3. 📊 Task Management Dashboard
   ├─ Tech: Vue.js, Express, MongoDB, Socket.io
   ├─ Features:
   │  ├─ Kanban boards & drag-drop
   │  ├─ Real-time team collaboration
   │  ├─ Time tracking & reporting
   │  └─ Email notifications
   └─ Status: ✅ Live & Used by 500+ teams

4. 🌤️ Weather Intelligence App
   ├─ Tech: TypeScript, React Native, OpenWeather API
   ├─ Features:
   │  ├─ AI-powered forecasts
   │  ├─ Location-based alerts
   │  ├─ Offline data caching
   │  └─ Beautiful data visualizations
   └─ Repository: https://github.com/devvrat-hans/weather-app

💡 Want to see more? Type 'github' or visit my portfolio!
Each project showcases different aspects of modern development.
    `;
    this.addToOutput(projectsText, 'terminal-success');
  }
  
  showContact() {
    const contactText = `
Let's Connect & Build Something Amazing! 🚀
==========================================

📧 Email: devvrat.hans@example.com
   └─ Best way to reach me - I respond within 24 hours

💼 Professional Profiles:
   ├─ LinkedIn: https://linkedin.com/in/devvrat-hans
   ├─ GitHub: https://github.com/devvrat-hans
   └─ Portfolio: https://devvrat.tech

🐦 Social Media:
   └─ Twitter: @devvrat_hans

� Location: Available for remote work worldwide
⏰ Timezone: Flexible - I adapt to your schedule

💬 Let's discuss your next project!
   Whether it's a startup MVP, enterprise solution, 
   or just an idea you want to bring to life.

🤝 I'm always excited to collaborate with passionate
   teams and individuals who want to create something
   extraordinary together!
    `;
    this.addToOutput(contactText, 'terminal-success');
  }
  
  showExperience() {
    const experienceText = `
Work Experience
===============

Senior Full Stack Developer | TechCorp Inc.
├── Duration: 2022 - Present
├── Technologies: React, Node.js, AWS, PostgreSQL
├── Achievements:
│   ├── Led team of 5 developers
│   ├── Improved app performance by 40%
│   └── Implemented microservices architecture
└── Location: San Francisco, CA

Full Stack Developer | StartupXYZ
├── Duration: 2020 - 2022
├── Technologies: Vue.js, Python, Docker, MongoDB
├── Achievements:
│   ├── Built MVP from scratch
│   ├── Scaled to 10k+ users
│   └── Reduced server costs by 30%
└── Location: Remote

Junior Developer | WebSolutions Ltd.
├── Duration: 2019 - 2020
├── Technologies: JavaScript, PHP, MySQL
├── Achievements:
│   ├── Developed 15+ client websites
│   ├── Improved code review process
│   └── Mentored 2 junior developers
└── Location: New York, NY
    `;
    this.addToOutput(experienceText, 'terminal-success');
  }
  
  showEducation() {
    const educationText = `
Education
=========

Master of Science in Computer Science
├── University: Stanford University
├── Duration: 2017 - 2019
├── GPA: 3.8/4.0
├── Focus: Software Engineering, AI/ML
└── Thesis: "Optimizing Web Application Performance"

Bachelor of Technology in Computer Engineering
├── University: Indian Institute of Technology
├── Duration: 2013 - 2017
├── GPA: 3.7/4.0
├── Activities: Programming Club President
└── Projects: Mobile app development, Web frameworks

Certifications:
├── AWS Solutions Architect Professional
├── Google Cloud Professional Developer
├── MongoDB Certified Developer
└── Kubernetes Administrator (CKA)
    `;
    this.addToOutput(educationText, 'terminal-success');
  }
  
  showResume() {
    const resumeText = `
Resume Download
===============

📄 PDF Resume: <a href="/assets/resume.pdf" target="_blank" style="color: #74c0fc;">Download Resume</a>
📊 Interactive Resume: Type 'experience' and 'education' for detailed view
🔗 LinkedIn Profile: <a href="https://linkedin.com/in/devvrat-hans" target="_blank" style="color: #74c0fc;">View on LinkedIn</a>

Last Updated: July 2025
    `;
    this.addToOutput(resumeText, 'terminal-info');
  }
  
  clearTerminal() {
    this.output.innerHTML = '';
  }
  
  listDirectory() {
    const files = `
drwxr-xr-x  5 devvrat devvrat  160 Jul 15 12:30 .
drwxr-xr-x  3 root    root     96  Jul 15 12:00 ..
-rw-r--r--  1 devvrat devvrat 1024 Jul 15 12:30 about.txt
-rw-r--r--  1 devvrat devvrat 2048 Jul 15 12:30 skills.json
-rw-r--r--  1 devvrat devvrat 3072 Jul 15 12:30 projects.md
drwxr-xr-x  2 devvrat devvrat  64  Jul 15 12:30 experience/
drwxr-xr-x  2 devvrat devvrat  64  Jul 15 12:30 education/
-rw-r--r--  1 devvrat devvrat 1536 Jul 15 12:30 contact.txt
-rw-r--r--  1 devvrat devvrat 4096 Jul 15 12:30 resume.pdf
    `;
    this.addToOutput(files, 'terminal-response');
  }
  
  changeDirectory(args) {
    const dir = args[0] || '~';
    if (dir === '~' || dir === '/home/devvrat') {
      this.currentDirectory = '/home/devvrat';
    } else if (dir === '..') {
      const parts = this.currentDirectory.split('/');
      parts.pop();
      this.currentDirectory = parts.join('/') || '/';
    } else {
      this.currentDirectory = `${this.currentDirectory}/${dir}`.replace('//', '/');
    }
    // Update prompt in terminal title
    document.querySelector('.terminal-title').textContent = `devvrat@portfolio:${this.currentDirectory}`;
  }
  
  printWorkingDirectory() {
    this.addToOutput(this.currentDirectory, 'terminal-response');
  }
  
  whoAmI() {
    this.addToOutput('devvrat', 'terminal-response');
  }
  
  echo(args) {
    this.addToOutput(args.join(' '), 'terminal-response');
  }
  
  catFile(args) {
    const filename = args[0];
    if (!filename) {
      this.addToOutput('Usage: cat <filename>', 'terminal-error');
      return;
    }
    
    const fileContents = {
      'about.txt': 'Passionate full-stack developer with 5+ years of experience...',
      'contact.txt': 'Email: devvrat.hans@example.com\nPhone: +1 (555) 123-4567',
      'skills.json': '{\n  "languages": ["JavaScript", "Python", "Java"],\n  "frameworks": ["React", "Vue.js", "Node.js"]\n}'
    };
    
    if (fileContents[filename]) {
      this.addToOutput(fileContents[filename], 'terminal-response');
    } else {
      this.addToOutput(`cat: ${filename}: No such file or directory`, 'terminal-error');
    }
  }
  
  showTree() {
    const treeStructure = `
/home/devvrat/
├── about.txt
├── skills.json
├── projects.md
├── contact.txt
├── resume.pdf
├── experience/
│   ├── techcorp.md
│   ├── startupxyz.md
│   └── websolutions.md
└── education/
    ├── stanford.md
    ├── iit.md
    └── certifications.md
    `;
    this.addToOutput(treeStructure, 'terminal-info');
  }
  
  changeTheme(args) {
    const theme = args[0];
    const validThemes = ['green', 'blue', 'purple', 'amber'];
    
    if (!theme) {
      this.addToOutput(`Available themes: ${validThemes.join(', ')}`, 'terminal-info');
      return;
    }
    
    if (validThemes.includes(theme)) {
      // Theme switching logic would go here
      this.addToOutput(`Theme changed to: ${theme}`, 'terminal-success');
    } else {
      this.addToOutput(`Invalid theme: ${theme}`, 'terminal-error');
    }
  }
  
  showDate() {
    const now = new Date();
    this.addToOutput(now.toString(), 'terminal-response');
  }
  
  showSystem() {
    const systemInfo = `
DevvratOS 2.0.1 (Portfolio Terminal)
Kernel: JavaScript ES2024
Architecture: x86_64
Uptime: Always online
Shell: /bin/portfolio-shell
    `;
    this.addToOutput(systemInfo, 'terminal-info');
  }
  
  showSocial() {
    const socialText = `
Social Media & Links
====================

🐙 GitHub
├── URL: https://github.com/devvrat-hans
├── Repositories: 25+ public repos
└── Contributions: 500+ commits this year

💼 LinkedIn
├── URL: https://linkedin.com/in/devvrat-hans
├── Connections: 1,000+
└── Posts: Regular tech updates

🐦 Twitter
├── Handle: @devvrat_hans
├── Followers: 500+
└── Content: Web dev tips & tricks

📺 YouTube (Coming Soon)
├── Channel: DevvratCodes
├── Content: Coding tutorials
└── Status: Launching soon!

🌐 Personal Blog
├── URL: https://devvrat.tech/blog
├── Posts: Tech insights & tutorials
└── Updated: Weekly
    `;
    this.addToOutput(socialText, 'terminal-success');
  }

  showBlog() {
    const blogText = `
Latest Blog Posts
=================

1. "Building a Terminal-Themed Portfolio"
   ├── Date: July 10, 2025
   ├── Tags: CSS, JavaScript, Animation
   └── Read: https://devvrat.tech/blog/terminal-portfolio

2. "Modern JavaScript Best Practices"
   ├── Date: July 5, 2025
   ├── Tags: JavaScript, ES2024, Performance
   └── Read: https://devvrat.tech/blog/js-best-practices

3. "Full-Stack Development in 2025"
   ├── Date: June 28, 2025
   ├── Tags: Full-Stack, React, Node.js
   └── Read: https://devvrat.tech/blog/fullstack-2025

4. "Deploying with Docker & Kubernetes"
   ├── Date: June 20, 2025
   ├── Tags: DevOps, Docker, K8s
   └── Read: https://devvrat.tech/blog/docker-k8s

Type 'cat blog-<number>' to read a post excerpt.
    `;
    this.addToOutput(blogText, 'terminal-success');
  }

  openGithub() {
    this.addToOutput('🚀 Opening GitHub profile...', 'terminal-info');
    setTimeout(() => {
      window.open('https://github.com/devvrat-hans', '_blank');
      this.addToOutput('✅ GitHub profile opened in new tab!', 'terminal-success');
    }, 500);
  }

  openLinkedin() {
    this.addToOutput('💼 Opening LinkedIn profile...', 'terminal-info');
    setTimeout(() => {
      window.open('https://linkedin.com/in/devvrat-hans', '_blank');
      this.addToOutput('✅ LinkedIn profile opened in new tab!', 'terminal-success');
    }, 500);
  }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('terminal-container')) {
    window.portfolioTerminal = new Terminal('terminal-container');
  }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Terminal;
}
