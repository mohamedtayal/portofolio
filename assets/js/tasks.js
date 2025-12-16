const TaskManager = {
    tasks: [],
    filter: 'all',
    search: '',
    storageKey: 'taskManagerTasks',

    init() {
        this.form = document.getElementById('taskForm');
        this.list = document.getElementById('taskList');
        this.filters = document.getElementById('taskFilters');
        this.searchInput = document.getElementById('taskSearch');
        this.stats = document.getElementById('taskStats');
        this.progress = document.getElementById('taskProgress');

        if (!this.form || !this.list) return;

        this.load();
        this.bindEvents();
        this.render();
    },

    load() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            this.tasks = JSON.parse(stored);
        } else {
            this.tasks = [
                { id: crypto.randomUUID(), title: 'Review portfolio content', priority: 'high', due: '', completed: false },
                { id: crypto.randomUUID(), title: 'Polish data mining case study', priority: 'medium', due: '', completed: true },
                { id: crypto.randomUUID(), title: 'Plan next learning sprint', priority: 'low', due: '', completed: false }
            ];
            this.save();
        }
    },

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    },

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = this.form.title.value.trim();
            const priority = this.form.priority.value;
            const due = this.form.due.value;

            if (!title) return;
            this.addTask({ title, priority, due });
            this.form.reset();
            this.form.title.focus();
        });

        this.filters?.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-filter]');
            if (!btn) return;

            this.filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            this.filter = btn.dataset.filter;
            this.render();
        });

        this.searchInput?.addEventListener('input', (e) => {
            this.search = e.target.value.toLowerCase();
            this.render();
        });

        this.list.addEventListener('click', (e) => {
            const toggle = e.target.closest('[data-action="toggle"]');
            const remove = e.target.closest('[data-action="delete"]');

            if (toggle) {
                this.toggleTask(toggle.dataset.id);
            } else if (remove) {
                this.deleteTask(remove.dataset.id);
            }
        });
    },

    addTask({ title, priority, due }) {
        this.tasks.unshift({
            id: crypto.randomUUID(),
            title,
            priority,
            due,
            completed: false,
            createdAt: new Date().toISOString()
        });
        this.save();
        this.render();
    },

    toggleTask(id) {
        this.tasks = this.tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
        this.save();
        this.render();
    },

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.save();
        this.render();
    },

    filteredTasks() {
        return this.tasks.filter(task => {
            const matchesFilter = this.filter === 'all'
                ? true
                : this.filter === 'done'
                    ? task.completed
                    : !task.completed;

            const matchesSearch = !this.search
                || task.title.toLowerCase().includes(this.search);

            return matchesFilter && matchesSearch;
        });
    },

    render() {
        const tasks = this.filteredTasks();

        if (tasks.length === 0) {
            this.list.innerHTML = `
                <div class="tasks__empty" role="status">
                    <div class="tasks__empty-icon">📋</div>
                    <p>No tasks yet. Add your first task to get started.</p>
                </div>`;
        } else {
            this.list.innerHTML = tasks.map(task => this.createTaskCard(task)).join('');
        }

        this.updateStats();
    },

    updateStats() {
        const total = this.tasks.length;
        const done = this.tasks.filter(t => t.completed).length;
        const active = total - done;
        const completion = total === 0 ? 0 : Math.round((done / total) * 100);

        this.stats?.querySelector('[data-stat="active"]').textContent = active;
        this.stats?.querySelector('[data-stat="done"]').textContent = done;

        if (this.progress) {
            this.progress.style.width = `${completion}%`;
            this.progress.setAttribute('aria-valuenow', completion);
        }
    },

    createTaskCard(task) {
        const priorityLabels = { high: 'High', medium: 'Medium', low: 'Low' };
        const dueLabel = task.due ? `Due ${this.formatDate(task.due)}` : 'No due date';

        return `
            <article class="task-card ${task.completed ? 'task-card--done' : ''}" role="listitem">
                <label class="task-card__check">
                    <input type="checkbox" data-action="toggle" data-id="${task.id}" ${task.completed ? 'checked' : ''} aria-label="Mark task as ${task.completed ? 'incomplete' : 'complete'}">
                    <span></span>
                </label>
                <div class="task-card__content">
                    <div class="task-card__title">${task.title}</div>
                    <div class="task-card__meta">
                        <span class="task-card__badge task-card__badge--${task.priority}">${priorityLabels[task.priority]}</span>
                        <span class="task-card__due">${dueLabel}</span>
                    </div>
                </div>
                <button class="task-card__delete" type="button" data-action="delete" data-id="${task.id}" aria-label="Delete task">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </button>
            </article>`;
    },

    formatDate(value) {
        const date = new Date(value);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
};

// Initialize task manager
window.addEventListener('DOMContentLoaded', () => TaskManager.init());
