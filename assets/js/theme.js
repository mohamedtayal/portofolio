/**
 * Theme Manager - Dark/Light mode with localStorage persistence
 */
const ThemeManager = {
    STORAGE_KEY: 'portfolio-theme',
    
    init() {
        this.html = document.documentElement;
        this.toggle = document.getElementById('themeToggle');
        
        // Load saved theme or detect system preference
        const saved = localStorage.getItem(this.STORAGE_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = saved || (prefersDark ? 'dark' : 'light');
        
        this.setTheme(theme, false);
        this.bindEvents();
    },
    
    bindEvents() {
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(this.STORAGE_KEY)) {
                this.setTheme(e.matches ? 'dark' : 'light', true);
            }
        });
    },
    
    setTheme(theme, animate = true) {
        this.currentTheme = theme;
        this.html.setAttribute('data-theme', theme);
        localStorage.setItem(this.STORAGE_KEY, theme);
        
        // Animate toggle button
        if (animate && typeof gsap !== 'undefined' && this.toggle) {
            gsap.to(this.toggle, {
                rotation: theme === 'dark' ? 180 : 0,
                duration: 0.4,
                ease: 'power2.out'
            });
        }
    },
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme, true);
    }
};

document.addEventListener('DOMContentLoaded', () => ThemeManager.init());