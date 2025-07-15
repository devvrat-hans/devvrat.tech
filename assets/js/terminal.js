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
      uname: this.showSystem.bind(this)
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
    this.container.innerHTML = `
      <div class="terminal">
        <div class="terminal-header">
          <div class="terminal-controls">
            <div class="terminal-control close"></div>
            <div class="terminal-control minimize"></div>
            <div class="terminal-control maximize"></div>
          </div>
          <div class="terminal-title">devvrat@portfolio:~</div>
          <div></div>
        </div>
        <div class="terminal-output" id="terminal-output"></div>
        <div class="terminal-input-container">
          <span class="terminal-prompt">${this.getPrompt()}</span>
          <input type="text" class="terminal-input" id="terminal-input" autocomplete="off" spellcheck="false">
          <span class="terminal-cursor"></span>
        </div>
      </div>
    `;
    
    this.output = document.getElementById('terminal-output');
    this.input = document.getElementById('terminal-input');
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
Welcome to Devvrat's Portfolio Terminal!
Type 'help' to see available commands.

████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
   ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝

`;
    this.addToOutput(welcomeText, 'terminal-info');
  }
  
  // Command implementations
  showHelp() {
    const helpText = `
Available Commands:
  help        - Show this help message
  about       - Learn about me
  skills      - View my technical skills
  projects    - Browse my projects
  contact     - Get my contact information
  experience  - View my work experience
  education   - View my educational background
  resume      - Download/view my resume
  clear       - Clear the terminal
  ls          - List directory contents
  cd          - Change directory
  pwd         - Print working directory
  whoami      - Display current user
  echo        - Echo text back
  cat         - Display file contents
  tree        - Show directory structure
  theme       - Change terminal theme
  date        - Show current date and time
  uname       - Show system information
    `;
    this.addToOutput(helpText, 'terminal-info');
  }
  
  showAbout() {
    const aboutText = `
About Devvrat Hans
==================

I'm a passionate full-stack developer with expertise in modern web technologies.
I love creating innovative solutions and building applications that make a difference.

Specializing in:
• Frontend: React, Vue.js, TypeScript, Modern CSS
• Backend: Node.js, Python, Express, FastAPI
• Databases: PostgreSQL, MongoDB, Redis
• Cloud: AWS, Docker, Kubernetes
• DevOps: CI/CD, Infrastructure as Code

Always learning, always coding! 🚀
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
Featured Projects
=================

1. Portfolio Terminal Website
   ├── Technologies: HTML5, CSS3, Vanilla JS
   ├── Features: Interactive terminal, ID card animation
   └── Repository: https://github.com/devvrat-hans/devvrat.tech

2. E-commerce Platform
   ├── Technologies: React, Node.js, PostgreSQL
   ├── Features: Real-time updates, payment integration
   └── Status: In Development

3. Task Management App
   ├── Technologies: Vue.js, Express, MongoDB
   ├── Features: Kanban boards, team collaboration
   └── Status: Completed

4. Weather Dashboard
   ├── Technologies: TypeScript, React, OpenWeather API
   ├── Features: Real-time weather, forecasts
   └── Repository: https://github.com/devvrat-hans/weather-app

Type 'cat project-name' for detailed information about any project.
    `;
    this.addToOutput(projectsText, 'terminal-success');
  }
  
  showContact() {
    const contactText = `
Contact Information
===================

📧 Email: devvrat.hans@example.com
💼 LinkedIn: https://linkedin.com/in/devvrat-hans
🐙 GitHub: https://github.com/devvrat-hans
🐦 Twitter: @devvrat_hans
📱 Phone: +1 (555) 123-4567
🌐 Website: https://devvrat.tech

Let's connect and build something amazing together! 🚀
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
