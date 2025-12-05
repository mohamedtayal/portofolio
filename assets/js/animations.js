/**
 * GSAP Animations - Scroll triggers, floating shapes, parallax
 */
const Animations = {
    init() {
        gsap.registerPlugin(ScrollTrigger);
        gsap.defaults({ ease: 'power3.out' });
        
        this.initHero();
        this.initScrollAnimations();
        this.initFloatingShapes();
        this.initNavbar();
        this.initParallax();
    },
    
    initHero() {
        const tl = gsap.timeline({ delay: 0.2 });
        
        tl.from('.hero__badge', { opacity: 0, y: 20, duration: 0.6 })
          .from('.hero__title-line', { opacity: 0, y: 40, duration: 0.7, stagger: 0.15 }, '-=0.3')
          .from('.hero__subtitle', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
          .from('.hero__desc', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
          .from('.hero__buttons .btn', { opacity: 0, y: 20, duration: 0.4, stagger: 0.1 }, '-=0.2')
          .from('.hero__stat', { opacity: 0, y: 20, duration: 0.4, stagger: 0.1 }, '-=0.2')
          .from('.hero__card', { opacity: 0, scale: 0.8, duration: 0.6 }, '-=0.4')
          .from('.hero__tag', { opacity: 0, scale: 0.8, duration: 0.4, stagger: 0.1 }, '-=0.3')
          .from('.hero__scroll', { opacity: 0, y: -20, duration: 0.4 }, '-=0.2');
    },
    
    initScrollAnimations() {
        // Section headers
        gsap.utils.toArray('.section-head').forEach(el => {
            gsap.from(el.children, {
                scrollTrigger: { trigger: el, start: 'top 85%' },
                opacity: 0, y: 30, duration: 0.6, stagger: 0.1
            });
        });
        
        // Topic cards
        gsap.utils.toArray('.topic-card').forEach((el, i) => {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 85%' },
                opacity: 0, x: -30, duration: 0.5, delay: i * 0.1
            });
        });
        
        // Skill items
        gsap.from('.skill-item', {
            scrollTrigger: { trigger: '.skills-grid', start: 'top 85%' },
            opacity: 0, scale: 0.8, duration: 0.4, stagger: 0.05
        });
        
        // Easy section header
        gsap.from('.easy-section__header', {
            scrollTrigger: { trigger: '.easy-section', start: 'top 85%' },
            opacity: 0, y: 30, duration: 0.6
        });
        
        // Easy cards
        gsap.utils.toArray('.easy-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 85%' },
                opacity: 0, y: 40, duration: 0.5, delay: i * 0.1
            });
        });
        
        // Why Choose Me - Feature cards (left column)
        gsap.utils.toArray('.why-me__col:first-child .feature-card').forEach((el, i) => {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 85%' },
                opacity: 0, x: -50, duration: 0.6, delay: i * 0.1
            });
        });
        
        // Why Choose Me - Feature cards (right column)
        gsap.utils.toArray('.why-me__col:last-child .feature-card').forEach((el, i) => {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 85%' },
                opacity: 0, x: 50, duration: 0.6, delay: i * 0.1
            });
        });
        
        // Why Choose Me - Center illustration
        gsap.from('.why-me__illustration-card', {
            scrollTrigger: { trigger: '.why-me__illustration', start: 'top 80%' },
            opacity: 0, scale: 0.8, duration: 0.8, ease: 'back.out(1.5)'
        });
        
        gsap.from('.why-me__float', {
            scrollTrigger: { trigger: '.why-me__illustration', start: 'top 80%' },
            opacity: 0, scale: 0, duration: 0.5, stagger: 0.1, delay: 0.3
        });
        
        // Certificate cards
        gsap.utils.toArray('.cert-card').forEach((el, i) => {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 85%' },
                opacity: 0, y: 40, duration: 0.5, delay: i * 0.08
            });
        });
        
        // Contact section
        gsap.from('.subscribe-card', {
            scrollTrigger: { trigger: '.contact__row', start: 'top 85%' },
            opacity: 0, x: -50, duration: 0.6
        });
        
        gsap.from('.question-card', {
            scrollTrigger: { trigger: '.contact__row', start: 'top 85%' },
            opacity: 0, x: 50, duration: 0.6, delay: 0.2
        });
        
        // FAQ items
        gsap.from('.faq__title', {
            scrollTrigger: { trigger: '.faq', start: 'top 85%' },
            opacity: 0, y: 30, duration: 0.5
        });
        
        gsap.from('.faq__item', {
            scrollTrigger: { trigger: '.faq__list', start: 'top 85%' },
            opacity: 0, y: 20, duration: 0.4, stagger: 0.1
        });
    },
    
    initFloatingShapes() {
        gsap.utils.toArray('.shape').forEach((shape, i) => {
            gsap.to(shape, {
                y: `random(-30, 30)`,
                x: `random(-20, 20)`,
                rotation: `random(-15, 15)`,
                duration: `random(4, 8)`,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: i * 0.2
            });
        });
    },
    
    initNavbar() {
        ScrollTrigger.create({
            start: 'top -80',
            onUpdate: (self) => {
                const nav = document.getElementById('navbar');
                if (self.progress > 0) {
                    nav.classList.add('navbar--scrolled');
                } else {
                    nav.classList.remove('navbar--scrolled');
                }
            }
        });
        
        // Logo micro-interaction
        const logoBadge = document.querySelector('.logo-badge');
        if (logoBadge) {
            logoBadge.addEventListener('mouseenter', () => {
                gsap.to('.logo-badge__inner', {
                    rotationY: 10,
                    rotationX: -5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            logoBadge.addEventListener('mouseleave', () => {
                gsap.to('.logo-badge__inner', {
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        }
    },
    
    initParallax() {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / 50;
            const y = (e.clientY - window.innerHeight / 2) / 50;
            
            gsap.to('.hero__glow', { x: x * 2, y: y * 2, duration: 1 });
            gsap.to('.hero__orb', { x: x * 3, y: y * 3, duration: 1.2 });
            gsap.to('.shape', { x: x, y: y, duration: 0.8, stagger: 0.05 });
        });
    },
    
    animateProjectCards(cards, isFiltering = false) {
        if (isFiltering) {
            gsap.fromTo(cards, 
                { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.2)' }
            );
        } else {
            gsap.from(cards, {
                scrollTrigger: { trigger: '#projectsGrid', start: 'top 85%' },
                opacity: 0, y: 40, duration: 0.5, stagger: 0.1
            });
        }
    },
    
    animateModalOpen(modal) {
        gsap.to(modal, { opacity: 1, visibility: 'visible', duration: 0.3 });
        gsap.to(modal.querySelector('.modal__box'), { scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' });
    },
    
    animateModalClose(modal) {
        gsap.to(modal.querySelector('.modal__box'), { scale: 0.9, y: 30, duration: 0.2 });
        gsap.to(modal, { opacity: 0, duration: 0.2, onComplete: () => modal.style.visibility = 'hidden' });
    },
    
    animateLightboxOpen(lb) {
        gsap.to(lb, { opacity: 1, visibility: 'visible', duration: 0.3 });
        gsap.to(lb.querySelector('img'), { scale: 1, duration: 0.4 });
    },
    
    animateLightboxClose(lb) {
        gsap.to(lb.querySelector('img'), { scale: 0.9, duration: 0.2 });
        gsap.to(lb, { opacity: 0, duration: 0.2, onComplete: () => lb.style.visibility = 'hidden' });
    }
};

document.addEventListener('DOMContentLoaded', () => setTimeout(() => Animations.init(), 100));