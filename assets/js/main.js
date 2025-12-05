/**
 * Main Application - Navigation, Projects, Modal, Filters
 */
const App = {
    currentFilter: 'all',
    searchQuery: '',

    init() {
        this.cacheElements();
        this.bindEvents();
        this.renderProjects();
        this.initSmoothScroll();
        this.updateActiveNav();
    },

    cacheElements() {
        this.navbar = document.getElementById('navbar');
        this.navMenu = document.getElementById('navMenu');
        this.navToggle = document.getElementById('navToggle');
        this.projectsGrid = document.getElementById('projectsGrid');
        this.projectSearch = document.getElementById('projectSearch');
        this.projectFilters = document.getElementById('projectFilters');
        this.modal = document.getElementById('projectModal');
        this.modalContent = document.getElementById('modalContent');
        this.modalClose = document.getElementById('modalClose');
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightboxImage');
    },

    bindEvents() {
        // Mobile menu
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
                this.navToggle.classList.toggle('active');
            });
        }

        // Search
        if (this.projectSearch) {
            this.projectSearch.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.filterProjects();
            });
        }

        // Filters
        if (this.projectFilters) {
            this.projectFilters.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-btn')) {
                    this.setFilter(e.target);
                }
            });
        }

        // Modal
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.closeModal());
        }
        if (this.modal) {
            this.modal.querySelector('.modal__backdrop').addEventListener('click', () => this.closeModal());
        }

        // Lightbox
        if (this.lightbox) {
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox || e.target.closest('.lightbox__close')) {
                    this.closeLightbox();
                }
            });
        }

        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.lightbox?.classList.contains('active')) this.closeLightbox();
                else if (this.modal?.classList.contains('active')) this.closeModal();
            }
        });

        // Scroll spy
        window.addEventListener('scroll', () => this.updateActiveNav());

        // Close mobile menu on link click
        document.querySelectorAll('.navbar__link').forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu?.classList.remove('active');
                this.navToggle?.classList.remove('active');
            });
        });
    },

    renderProjects(projects = ProjectsData) {
        if (!this.projectsGrid) return;

        if (projects.length === 0) {
            this.projectsGrid.innerHTML = `
                <div class="projects__empty">
                    <div class="projects__empty-icon">🔍</div>
                    <p>No projects found</p>
                </div>`;
            return;
        }

        this.projectsGrid.innerHTML = projects.map(p => this.createCard(p)).join('');

        // Bind click events
        this.projectsGrid.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                this.openModal(parseInt(card.dataset.id));
            });
        });

        // Animate
        const cards = this.projectsGrid.querySelectorAll('.project-card');
        if (typeof Animations !== 'undefined') {
            Animations.animateProjectCards(cards, this.currentFilter !== 'all' || this.searchQuery !== '');
        }
    },

    createCard(p) {
        const hasImage = p.image && p.image.length > 0;
        return `
            <article class="project-card" data-id="${p.id}" data-category="${p.category}">
                <div class="project-card__img">
                    ${hasImage 
                        ? `<img src="${p.image}" alt="${p.title}" loading="lazy">`
                        : `<div class="project-card__img-placeholder">${p.icon}</div>`
                    }
                    <span class="project-card__category">${p.category}</span>
                </div>
                <div class="project-card__body">
                    <h3 class="project-card__title">${p.title}</h3>
                    <p class="project-card__summary">${p.summary}</p>
                    <div class="project-card__tags">
                        ${p.tags.slice(0, 3).map(t => `<span class="project-card__tag">${t}</span>`).join('')}
                    </div>
                    <div class="project-card__footer">
                        <span class="project-card__link">
                            View Details
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M7 17L17 7M17 7H7M17 7V17"/>
                            </svg>
                        </span>
                    </div>
                </div>
            </article>`;
    },

    setFilter(btn) {
        this.projectFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        this.filterProjects();
    },

    filterProjects() {
        let filtered = ProjectsData;

        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(p => p.category === this.currentFilter);
        }

        if (this.searchQuery) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(this.searchQuery) ||
                p.summary.toLowerCase().includes(this.searchQuery) ||
                p.tags.some(t => t.toLowerCase().includes(this.searchQuery))
            );
        }

        this.renderProjects(filtered);
    },

    openModal(id) {
        const p = ProjectsData.find(x => x.id === id);
        if (!p) return;

        this.modalContent.innerHTML = this.createModalContent(p);
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Bind copy buttons
        this.modalContent.querySelectorAll('.code-block__copy').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.copyCode(btn);
            });
        });

        // Bind image lightbox
        this.modalContent.querySelectorAll('.modal__image').forEach(img => {
            img.addEventListener('click', () => this.openLightbox(img.src));
        });

        if (typeof Animations !== 'undefined') Animations.animateModalOpen(this.modal);
    },

    createModalContent(p) {
        const hasImage = p.image && p.image.length > 0;
        return `
            <div class="modal__header">
                <span class="modal__cat">${p.category}</span>
                <h2 class="modal__title">${p.title}</h2>
                <p class="modal__summary">${p.summary}</p>
            </div>

            ${hasImage ? `<img src="${p.image}" alt="${p.title}" class="modal__image">` : ''}

            <div class="modal__section">
                <h3 class="modal__section-title">Problem Statement</h3>
                <p class="modal__text">${p.problem}</p>
            </div>

            <div class="modal__section">
                <h3 class="modal__section-title">Dataset</h3>
                <ul class="modal__list">
                    <li><strong>Source:</strong> ${p.dataset.source}</li>
                    <li><strong>Size:</strong> ${p.dataset.size}</li>
                    <li><strong>Type:</strong> ${p.dataset.type}</li>
                </ul>
            </div>

            <div class="modal__section">
                <h3 class="modal__section-title">Methods Used</h3>
                <div class="modal__tags">
                    ${p.methods.map(m => `<span class="modal__tag">${m}</span>`).join('')}
                </div>
            </div>

            <div class="modal__section">
                <h3 class="modal__section-title">Preprocessing</h3>
                <ul class="modal__list">
                    ${p.preprocessing.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>

            <div class="modal__section">
                <h3 class="modal__section-title">Evaluation Metrics</h3>
                <div class="modal__metrics">
                    ${Object.entries(p.metrics).map(([k, v]) => `
                        <div class="modal__metric">
                            <div class="modal__metric-value">${v.value}</div>
                            <div class="modal__metric-label">${this.formatLabel(k)}</div>
                            ${v.note ? `<div class="modal__metric-note">${v.note}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="modal__section">
                <h3 class="modal__section-title">Lessons Learned</h3>
                <ul class="modal__list">
                    ${p.lessons.map(l => `<li>${l}</li>`).join('')}
                </ul>
            </div>

            <div class="modal__section">
                <h3 class="modal__section-title">Future Work</h3>
                <ul class="modal__list">
                    ${p.futureWork.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>

            <div class="modal__section">
                <h3 class="modal__section-title">Reproducibility</h3>
                <p class="modal__text"><strong>Environment:</strong> ${p.reproducibility.environment}</p>
                <p class="modal__text"><strong>Data Path:</strong> <code>${p.reproducibility.dataPath}</code></p>
                <div class="code-block">
                    <div class="code-block__header">
                        <span class="code-block__lang">bash</span>
                        <button class="code-block__copy">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2"/>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                            </svg>
                            <span>Copy</span>
                        </button>
                    </div>
                    <pre><code>${p.reproducibility.commands.join('\n')}</code></pre>
                </div>
            </div>

            <div class="modal__section">
                <h3 class="modal__section-title">Tags</h3>
                <div class="modal__tags">
                    ${p.tags.map(t => `<span class="modal__tag">#${t}</span>`).join('')}
                </div>
            </div>

            <div class="modal__actions">
                <a href="${p.repoUrl}" target="_blank" class="btn btn--primary">
                    <span>View Repository</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                </a>
            </div>`;
    },

    formatLabel(key) {
        const labels = {
            accuracy: 'Accuracy', precision: 'Precision', recall: 'Recall',
            f1Score: 'F1 Score', auc: 'AUC-ROC', silhouette: 'Silhouette',
            inertia: 'Inertia', clusters: 'Clusters', visualizations: 'Visualizations',
            insights: 'Insights', countries: 'Countries', rules: 'Rules',
            avgLift: 'Avg Lift', avgConfidence: 'Confidence', rmse: 'RMSE',
            mae: 'MAE', r2: 'R² Score'
        };
        return labels[key] || key;
    },

    closeModal() {
        if (typeof Animations !== 'undefined') {
            Animations.animateModalClose(this.modal);
        } else {
            this.modal.classList.remove('active');
        }
        document.body.style.overflow = '';
    },

    openLightbox(src) {
        this.lightboxImage.src = src;
        this.lightbox.classList.add('active');
        if (typeof Animations !== 'undefined') Animations.animateLightboxOpen(this.lightbox);
    },

    closeLightbox() {
        if (typeof Animations !== 'undefined') {
            Animations.animateLightboxClose(this.lightbox);
        } else {
            this.lightbox.classList.remove('active');
        }
    },

    copyCode(btn) {
        const code = btn.closest('.code-block').querySelector('code').textContent;
        navigator.clipboard.writeText(code).then(() => {
            btn.classList.add('copied');
            btn.querySelector('span').textContent = 'Copied!';
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.querySelector('span').textContent = 'Copy';
            }, 2000);
        });
    },

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(a.getAttribute('href'));
                if (target) {
                    const offset = this.navbar?.offsetHeight || 80;
                    window.scrollTo({
                        top: target.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const links = document.querySelectorAll('.navbar__link');
        let current = '';

        sections.forEach(s => {
            if (window.pageYOffset >= s.offsetTop - 100) {
                current = s.id;
            }
        });

        links.forEach(l => {
            l.classList.remove('active');
            if (l.getAttribute('href') === `#${current}`) {
                l.classList.add('active');
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
    FAQ.init();
    Certificates.init();
});

/**
 * FAQ Accordion
 */
const FAQ = {
    init() {
        const items = document.querySelectorAll('.faq__item');
        items.forEach(item => {
            const question = item.querySelector('.faq__question');
            question.addEventListener('click', () => this.toggle(item, items));
        });
    },
    
    toggle(item, allItems) {
        const isActive = item.classList.contains('active');
        
        // Close all items
        allItems.forEach(i => i.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    }
};

/**
 * Certificates Handler
 */
const Certificates = {
    // List of PDF certificates from the project folder
    certificates: [
        { file: "Certificate _ EYouth Business.pdf", title: "EYouth Business Certificate", desc: "Professional business training completion" },
        { file: "Certificate _ EYouth Business 2.pdf", title: "EYouth Business Certificate II", desc: "Advanced business skills certification" },
        { file: "Certificate _ EYouth Business 22.pdf", title: "EYouth Business Certificate III", desc: "Business excellence program" },
        { file: "Certificate _ EYouth Business 3.pdf", title: "EYouth Business Certificate IV", desc: "Leadership and management training" },
        { file: "Certificate _ EYouth Business 33.pdf", title: "EYouth Business Certificate V", desc: "Strategic business development" },
        { file: "Certificate _ EYouth Business 4.pdf", title: "EYouth Business Certificate VI", desc: "Professional development program" },
        { file: "Certificate _ EYouth Business 44.pdf", title: "EYouth Business Certificate VII", desc: "Business analytics certification" },
        { file: "Certificate _ EYouth Business landscape.pdf", title: "EYouth Business Landscape", desc: "Comprehensive business overview" },
        { file: "Certificate _ EYouth Business landscape_1.pdf", title: "EYouth Business Landscape II", desc: "Extended business program" },
        { file: "Course_Certificate_Ar.pdf", title: "Course Certificate (Arabic)", desc: "Arabic language course completion" },
        { file: "Course_Certificate_Ar (1).pdf", title: "Course Certificate (Arabic) II", desc: "Advanced Arabic course" },
        { file: "Course_Certificate_En.pdf", title: "Course Certificate (English)", desc: "English language course completion" },
        { file: "Course_Certificate_En (1).pdf", title: "Course Certificate (English) II", desc: "Advanced English course" }
    ],
    
    init() {
        this.grid = document.getElementById('certificatesGrid');
        this.modal = document.getElementById('pdfModal');
        this.modalTitle = document.getElementById('pdfModalTitle');
        this.pdfViewer = document.getElementById('pdfViewer');
        this.modalClose = document.getElementById('pdfModalClose');
        
        if (this.grid) {
            this.render();
            this.bindEvents();
        }
    },
    
    render() {
        this.grid.innerHTML = this.certificates.map(cert => this.createCard(cert)).join('');
    },
    
    createCard(cert) {
        return `
            <div class="cert-card" data-file="${cert.file}">
                <div class="cert-card__preview">
                    <div class="cert-card__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                            <polyline points="10 9 9 9 8 9"/>
                        </svg>
                    </div>
                </div>
                <div class="cert-card__body">
                    <div class="cert-card__badge">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="8" r="6"/>
                            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                        </svg>
                        Certificate
                    </div>
                    <h4 class="cert-card__title">${cert.title}</h4>
                    <p class="cert-card__desc">${cert.desc}</p>
                    <div class="cert-card__actions">
                        <button class="cert-card__btn cert-card__btn--view" data-action="view">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                            View
                        </button>
                        <a href="${cert.file}" download class="cert-card__btn cert-card__btn--download">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            Download
                        </a>
                    </div>
                </div>
            </div>`;
    },
    
    bindEvents() {
        // View buttons
        this.grid.addEventListener('click', (e) => {
            const viewBtn = e.target.closest('[data-action="view"]');
            if (viewBtn) {
                const card = viewBtn.closest('.cert-card');
                const file = card.dataset.file;
                const title = card.querySelector('.cert-card__title').textContent;
                this.openModal(file, title);
            }
        });
        
        // Close modal
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.closeModal());
        }
        
        if (this.modal) {
            this.modal.querySelector('.pdf-modal__backdrop').addEventListener('click', () => this.closeModal());
        }
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
                this.closeModal();
            }
        });
    },
    
    openModal(file, title) {
        this.modalTitle.textContent = title;
        this.pdfViewer.src = file;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        if (typeof gsap !== 'undefined') {
            gsap.to(this.modal, { opacity: 1, visibility: 'visible', duration: 0.3 });
            gsap.to(this.modal.querySelector('.pdf-modal__box'), { scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' });
        }
    },
    
    closeModal() {
        if (typeof gsap !== 'undefined') {
            gsap.to(this.modal.querySelector('.pdf-modal__box'), { scale: 0.9, y: 30, duration: 0.2 });
            gsap.to(this.modal, { 
                opacity: 0, 
                duration: 0.2, 
                onComplete: () => {
                    this.modal.classList.remove('active');
                    this.pdfViewer.src = '';
                }
            });
        } else {
            this.modal.classList.remove('active');
            this.pdfViewer.src = '';
        }
        document.body.style.overflow = '';
    }
};