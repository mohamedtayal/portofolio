/**
 * Resume Page JavaScript
 * Theme toggle, animations, skill bars
 */

document.addEventListener('DOMContentLoaded', () => {
    // Theme Management
    const ThemeManager = {
        init() {
            this.toggle = document.getElementById('themeToggle');
            this.html = document.documentElement;
            
            const saved = localStorage.getItem('portfolio-theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(saved || (prefersDark ? 'dark' : 'light'));
            
            if (this.toggle) {
                this.toggle.addEventListener('click', () => this.toggleTheme());
            }
        },
        
        setTheme(theme) {
            this.currentTheme = theme;
            this.html.setAttribute('data-theme', theme);
            localStorage.setItem('portfolio-theme', theme);
        },
        
        toggleTheme() {
            this.setTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
        }
    };
    
    ThemeManager.init();
    
    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Floating shapes
        gsap.utils.toArray('.shape').forEach((shape, i) => {
            gsap.to(shape, {
                y: 'random(-30, 30)',
                x: 'random(-20, 20)',
                duration: 'random(4, 7)',
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: i * 0.3
            });
        });
        
        // Hero animations
        const heroTl = gsap.timeline({ delay: 0.2 });
        heroTl.from('.hero__avatar', { opacity: 0, scale: 0.5, duration: 0.6 })
              .from('.hero__name', { opacity: 0, y: 30, duration: 0.5 }, '-=0.3')
              .from('.hero__title', { opacity: 0, y: 20, duration: 0.4 }, '-=0.2')
              .from('.hero__location', { opacity: 0, y: 20, duration: 0.4 }, '-=0.2')
              .from('.hero__actions .btn', { opacity: 0, y: 20, stagger: 0.1, duration: 0.4 }, '-=0.2')
              .from('.hero__stat', { opacity: 0, y: 20, stagger: 0.1, duration: 0.4 }, '-=0.2');
        
        // Section animations
        gsap.utils.toArray('.section').forEach(section => {
            gsap.from(section, {
                scrollTrigger: { trigger: section, start: 'top 85%' },
                opacity: 0,
                y: 40,
                duration: 0.6
            });
        });
        
        // Timeline items
        gsap.utils.toArray('.timeline__item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: { trigger: item, start: 'top 85%' },
                opacity: 0,
                x: -30,
                duration: 0.5,
                delay: i * 0.1
            });
        });
        
        // Project cards
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 85%' },
                opacity: 0,
                y: 30,
                duration: 0.4,
                delay: i * 0.1
            });
        });
        
        // Skill badges
        gsap.from('.skill-badge', {
            scrollTrigger: { trigger: '.skills-container', start: 'top 85%' },
            opacity: 0,
            scale: 0.8,
            stagger: 0.05,
            duration: 0.3
        });
        
        // Skill bars animation
        gsap.utils.toArray('.skill-bar__fill').forEach(bar => {
            const width = bar.dataset.width;
            gsap.to(bar, {
                scrollTrigger: { trigger: bar, start: 'top 90%' },
                width: width + '%',
                duration: 1,
                ease: 'power2.out'
            });
        });
        
        // Contact links
        gsap.from('.contact-link', {
            scrollTrigger: { trigger: '.contact-links', start: 'top 85%' },
            opacity: 0,
            x: -20,
            stagger: 0.1,
            duration: 0.4
        });
    }
    
    // Download button effect
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = downloadBtn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
            
            downloadBtn.style.position = 'relative';
            downloadBtn.style.overflow = 'hidden';
            downloadBtn.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Trigger print for PDF download
            setTimeout(() => window.print(), 300);
        });
    }
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});