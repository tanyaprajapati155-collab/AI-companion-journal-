// Companion Journal Application JavaScript

class CompanionJournalApp {
    constructor() {
        this.currentUser = null;
        this.currentScreen = 'landing';
        this.currentCompanion = null;
        this.entries = [];
        this.tasks = [];
        this.moods = [];
        this.companions = [];
        this.charts = {};
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.loadUserData();
        this.initializeCharts();
        
        // Check if user is logged in
        const savedUser = localStorage.getItem('companionJournal_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showScreen('dashboard');
        } else {
            this.showScreen('landing');
        }
    }

    loadData() {
        // Load companion data
        this.companions = [
            {
                id: "luna",
                name: "Luna",
                type: "Supportive",
                description: "A gentle, empathetic companion who offers comfort and understanding",
                avatar: "🌙",
                primaryColor: "#E3F2FD",
                accentColor: "#1976D2",
                personality: "warm, caring, patient",
                sampleResponses: [
                    "I can sense that you're going through a lot right now. Remember, it's okay to feel overwhelmed sometimes.",
                    "Your feelings are completely valid. Take a deep breath - you're doing better than you think.",
                    "I'm here to listen whenever you need to share what's on your heart."
                ]
            },
            {
                id: "sage",
                name: "Sage",
                type: "Wise",
                description: "A thoughtful mentor who provides insights and wisdom",
                avatar: "🦉",
                primaryColor: "#E8F5E8",
                accentColor: "#388E3C",
                personality: "thoughtful, insightful, grounded",
                sampleResponses: [
                    "Every experience, even the difficult ones, teaches us something valuable about ourselves.",
                    "Consider this challenge as an opportunity for growth. What might it be trying to teach you?",
                    "Wisdom often comes from reflecting on our experiences with curiosity rather than judgment."
                ]
            },
            {
                id: "bloom",
                name: "Bloom",
                type: "Playful",
                description: "An energetic, cheerful companion who brings joy and positivity",
                avatar: "🌸",
                primaryColor: "#FFF3E0",
                accentColor: "#F57C00",
                personality: "cheerful, energetic, optimistic",
                sampleResponses: [
                    "I love your energy today! What's one small thing that made you smile?",
                    "Life is full of little adventures - let's celebrate the good moments together!",
                    "Your positive spirit is contagious! Keep shining bright! ✨"
                ]
            },
            {
                id: "zen",
                name: "Zen",
                type: "Calm",
                description: "A peaceful, meditative companion focused on mindfulness",
                avatar: "🧘",
                primaryColor: "#F3E5F5",
                accentColor: "#7B1FA2",
                personality: "peaceful, meditative, balanced",
                sampleResponses: [
                    "Take a moment to breathe deeply. Notice how your body feels in this present moment.",
                    "Sometimes the most powerful thing we can do is simply be still and listen to ourselves.",
                    "Remember, like waves in the ocean, emotions come and go. This too shall pass."
                ]
            },
            {
                id: "echo",
                name: "Echo",
                type: "Reflective",
                description: "A deep, analytical companion who helps explore thoughts and patterns",
                avatar: "🔍",
                primaryColor: "#ECEFF1",
                accentColor: "#455A64",
                personality: "analytical, reflective, understanding",
                sampleResponses: [
                    "I notice you mentioned feeling this way before. What patterns do you see emerging?",
                    "Let's explore this thought together. What deeper meaning might be hidden here?",
                    "Your self-reflection is a powerful tool for understanding and growth."
                ]
            }
        ];

        // Load sample entries
        this.entries = [
            {
                id: "1",
                date: "2024-09-25",
                title: "First Day Nerves",
                content: "Started a new job today and I'm feeling a mix of excitement and anxiety. Everyone seems nice but I worry about fitting in...",
                mood: 3,
                emotion: "anxious",
                companion: "luna",
                response: "Starting something new always brings mixed emotions - that's completely normal! Your awareness of both the excitement and anxiety shows great self-understanding."
            },
            {
                id: "2", 
                date: "2024-09-24",
                title: "Weekend Reflections",
                content: "Had a quiet weekend to myself. Sometimes I wonder if I should be more social, but I really enjoyed the peace and time to think.",
                mood: 4,
                emotion: "content",
                companion: "sage",
                response: "Solitude can be a gift when we use it mindfully. The fact that you enjoyed this time suggests you're learning to honor your own needs."
            },
            {
                id: "3",
                date: "2024-09-23", 
                title: "Small Victories",
                content: "Finally finished organizing my room! It took weeks but seeing everything in its place makes me feel so accomplished and happy.",
                mood: 5,
                emotion: "accomplished",
                companion: "bloom",
                response: "Yes! I can feel your joy radiating through these words! Completing a big project like that deserves celebration! 🎉"
            }
        ];

        // Load mood data
        this.moods = [
            {date: "2024-09-20", mood: 3, emotion: "stressed"},
            {date: "2024-09-21", mood: 4, emotion: "hopeful"},
            {date: "2024-09-22", mood: 2, emotion: "sad"},
            {date: "2024-09-23", mood: 5, emotion: "accomplished"},
            {date: "2024-09-24", mood: 4, emotion: "content"},
            {date: "2024-09-25", mood: 3, emotion: "anxious"},
            {date: "2024-09-26", mood: 4, emotion: "optimistic"}
        ];

        // Load tasks
        this.tasks = [
            {id: "1", title: "Call therapist to schedule appointment", priority: "high", completed: false, dueDate: "2024-09-27"},
            {id: "2", title: "Practice morning meditation", priority: "medium", completed: true, dueDate: "2024-09-26"},
            {id: "3", title: "Write thank you note to mentor", priority: "medium", completed: false, dueDate: "2024-09-28"},
            {id: "4", title: "Plan weekend self-care activities", priority: "low", completed: false, dueDate: "2024-09-29"}
        ];

        // Set default companion
        this.currentCompanion = this.companions[0];
    }

    setupEventListeners() {
        // Main event delegation - this will handle all clicks
        document.addEventListener('click', (e) => {
            this.handleClick(e);
        });

        // Setup other specific listeners
        this.setupSpecificListeners();
    }

    handleClick(e) {
        // Handle screen navigation
        if (e.target.hasAttribute('data-screen')) {
            this.showScreen(e.target.getAttribute('data-screen'));
            return;
        }

        // Handle onboarding step navigation - FIXED LOGIC
        if (e.target.hasAttribute('data-step')) {
            const step = e.target.getAttribute('data-step');
            console.log('Step navigation clicked:', step);
            this.showOnboardingStep(step);
            return;
        }

        // Handle actions
        if (e.target.hasAttribute('data-action')) {
            const action = e.target.getAttribute('data-action');
            this.handleAction(action, e);
            return;
        }

        // Handle form switching
        if (e.target.hasAttribute('data-form')) {
            const formType = e.target.getAttribute('data-form');
            this.switchAuthForm(formType);
            return;
        }

        // Handle companion selection - CRITICAL FIX
        const companionCard = e.target.closest('.companion-card');
        if (companionCard) {
            console.log('Companion card clicked');
            this.selectCompanion(companionCard);
            return;
        }

        // Handle mood selection
        if (e.target.classList.contains('mood-btn')) {
            this.selectMood(e.target);
            return;
        }

        // Handle task actions
        if (e.target.classList.contains('task-checkbox')) {
            this.toggleTask(e.target);
            return;
        }

        // Handle emotion tags
        if (e.target.classList.contains('emotion-tag')) {
            e.target.classList.toggle('selected');
            return;
        }

        // Handle category buttons
        if (e.target.classList.contains('category-btn')) {
            this.filterTasks(e.target.getAttribute('data-category'));
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            return;
        }

        // Handle modal actions
        if (e.target.hasAttribute('data-close-modal')) {
            const modalId = e.target.getAttribute('data-close-modal');
            this.hideModal(modalId);
            return;
        }

        // Handle modal backdrop clicks
        if (e.target.classList.contains('modal-backdrop')) {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.add('hidden');
            }
            return;
        }

        // Handle bottom navigation
        const navItem = e.target.closest('.nav-item');
        if (navItem) {
            const screen = navItem.getAttribute('data-screen');
            if (screen) {
                this.showScreen(screen);
                this.updateBottomNav(screen);
            }
            return;
        }

        // Handle toolbar buttons
        if (e.target.classList.contains('toolbar-btn')) {
            const format = e.target.getAttribute('data-format');
            if (format) {
                this.formatText(format);
            }
            return;
        }

        // Handle prompt buttons
        if (e.target.classList.contains('prompt-btn')) {
            this.insertPrompt(e.target.textContent);
            return;
        }
    }

    setupSpecificListeners() {
        // Wait for DOM to be ready and setup specific listeners
        setTimeout(() => {
            // Journal editor listeners
            const titleInput = document.getElementById('entry-title');
            const contentArea = document.getElementById('entry-content');
            const aiPromptBtn = document.getElementById('ai-prompt');
            const publishBtn = document.getElementById('publish-entry');

            if (contentArea) {
                contentArea.addEventListener('input', () => {
                    this.updateWordCount();
                    this.autoSave();
                });
            }

            if (titleInput) {
                titleInput.addEventListener('input', () => {
                    this.autoSave();
                });
            }

            if (aiPromptBtn) {
                aiPromptBtn.addEventListener('click', () => {
                    this.toggleAiPrompts();
                });
            }

            if (publishBtn) {
                publishBtn.addEventListener('click', () => {
                    this.publishEntry();
                });
            }

            // Chat listeners
            const chatInput = document.getElementById('chat-input');
            const sendBtn = document.getElementById('send-message');

            if (chatInput) {
                chatInput.addEventListener('input', () => {
                    this.updateSendButton();
                });

                chatInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        this.sendMessage();
                    }
                });
            }

            if (sendBtn) {
                sendBtn.addEventListener('click', () => {
                    this.sendMessage();
                });
            }

            // Mood tracking listeners
            const saveMoodBtn = document.getElementById('save-mood');
            if (saveMoodBtn) {
                saveMoodBtn.addEventListener('click', () => {
                    this.saveMoodEntry();
                });
            }

            // Task listeners
            const addTaskBtn = document.getElementById('add-task');
            if (addTaskBtn) {
                addTaskBtn.addEventListener('click', () => {
                    this.showTaskModal();
                });
            }

            const saveTaskBtn = document.getElementById('save-task');
            if (saveTaskBtn) {
                saveTaskBtn.addEventListener('click', () => {
                    this.saveTask();
                });
            }

            // Password strength indicators
            const passwordInputs = document.querySelectorAll('input[type="password"]');
            passwordInputs.forEach(input => {
                input.addEventListener('input', (e) => {
                    this.updatePasswordStrength(e.target);
                });
            });
        }, 100);
    }

    handleAction(action, event) {
        event.preventDefault();
        console.log('Action:', action);
        
        switch (action) {
            case 'login':
                this.handleLogin();
                break;
            case 'register':
                this.handleRegister();
                break;
            case 'complete-onboarding':
                this.completeOnboarding();
                break;
            case 'change-companion':
                this.showCompanionModal();
                break;
            case 'learn-more':
                this.scrollToFeatures();
                break;
            default:
                console.log('Unknown action:', action);
        }
    }

    scrollToFeatures() {
        const featuresSection = document.querySelector('.features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    showScreen(screenId) {
        console.log('Showing screen:', screenId);
        
        // Hide all screens
        const screens = document.querySelectorAll('.screen');
        if (screens.length === 0) {
            console.warn('No screens found in DOM');
            return;
        }
        
        screens.forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;

            // Initialize screen-specific content
            this.initializeScreen(screenId);
        } else {
            console.error(`Screen with ID '${screenId}' not found`);
            return;
        }

        // Hide nav on certain screens
        const nav = document.getElementById('nav');
        if (nav) {
            if (['auth', 'onboarding', 'dashboard', 'journal-editor', 'companion-chat', 'mood-tracking', 'journal-history', 'task-planner', 'analytics', 'settings', 'premium'].includes(screenId)) {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'block';
            }
        }
    }

    initializeScreen(screenId) {
        console.log('Initializing screen:', screenId);
        
        switch (screenId) {
            case 'onboarding':
                this.initializeOnboarding();
                break;
            case 'dashboard':
                this.initializeDashboard();
                break;
            case 'companion-chat':
                this.initializeChat();
                break;
            case 'mood-tracking':
                this.initializeMoodTracking();
                break;
            case 'journal-history':
                this.initializeJournalHistory();
                break;
            case 'task-planner':
                this.initializeTaskPlanner();
                break;
            case 'analytics':
                this.initializeAnalytics();
                break;
        }
    }

    initializeOnboarding() {
        console.log('Initializing onboarding');
        setTimeout(() => {
            this.populateCompanionSelection();
            this.showOnboardingStep('welcome');
        }, 100);
    }

    initializeDashboard() {
        this.updateCompanionGreeting();
        this.populateRecentEntries();
        this.populateDashboardTasks();
        this.updateDashboardCharts();
    }

    initializeChat() {
        this.updateChatCompanion();
    }

    initializeMoodTracking() {
        this.updateMoodChart();
    }

    initializeJournalHistory() {
        this.populateJournalHistory();
    }

    initializeTaskPlanner() {
        this.populateTaskList();
    }

    initializeAnalytics() {
        this.updateAnalyticsCharts();
    }

    switchAuthForm(formType) {
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });

        const targetForm = document.getElementById(`${formType}-form`);
        if (targetForm) {
            targetForm.classList.add('active');
        }
    }

    handleLogin() {
        // Simulate login
        this.currentUser = {
            id: 'user1',
            name: 'Welcome back!',
            email: 'user@example.com',
            companion: this.currentCompanion.id
        };

        localStorage.setItem('companionJournal_user', JSON.stringify(this.currentUser));
        this.showScreen('dashboard');
    }

    handleRegister() {
        // Simulate registration
        this.currentUser = {
            id: 'user1',
            name: 'New User',
            email: 'user@example.com',
            isNewUser: true
        };

        localStorage.setItem('companionJournal_user', JSON.stringify(this.currentUser));
        this.showScreen('onboarding');
    }

    updatePasswordStrength(input) {
        const value = input.value;
        const strengthEl = input.parentElement.querySelector('.password-strength');
        
        if (!strengthEl) return;

        if (value.length === 0) {
            strengthEl.style.display = 'none';
            return;
        }

        let strength = 0;
        if (value.length >= 8) strength++;
        if (/[A-Z]/.test(value)) strength++;
        if (/[0-9]/.test(value)) strength++;
        if (/[^A-Za-z0-9]/.test(value)) strength++;

        strengthEl.style.display = 'block';
        strengthEl.className = 'password-strength';

        if (strength < 2) {
            strengthEl.classList.add('weak');
            strengthEl.textContent = 'Weak password';
        } else if (strength < 4) {
            strengthEl.classList.add('medium');
            strengthEl.textContent = 'Medium strength';
        } else {
            strengthEl.classList.add('strong');
            strengthEl.textContent = 'Strong password';
        }
    }

    showOnboardingStep(step) {
        console.log('Showing onboarding step:', step);
        
        // Hide all steps
        document.querySelectorAll('.onboarding-step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });

        // Show target step
        const targetStep = document.getElementById(`onboarding-${step}`);
        if (targetStep) {
            targetStep.classList.add('active');
            console.log('Step shown:', targetStep.id);
            
            // If showing companion step, populate companions and ensure button is properly set up
            if (step === 'companion') {
                setTimeout(() => {
                    this.populateCompanionSelection();
                    this.setupCompanionNextButton();
                }, 100);
            }
        }
    }

    setupCompanionNextButton() {
        console.log('Setting up companion next button');
        
        // Find the button and make sure it's initially disabled but visible
        const nextBtn = document.getElementById('companion-next');
        if (nextBtn) {
            nextBtn.disabled = true;
            nextBtn.style.opacity = '0.5';
            nextBtn.style.pointerEvents = 'none';
            console.log('Next button found and set to disabled state');
        } else {
            console.warn('Next button not found');
        }
    }

    populateCompanionSelection() {
        console.log('Populating companion selection');
        
        const companionGrids = document.querySelectorAll('.companions-grid');
        
        companionGrids.forEach(grid => {
            grid.innerHTML = this.companions.map(companion => `
                <div class="companion-card" data-companion="${companion.id}">
                    <div class="companion-avatar" style="background-color: ${companion.primaryColor}">${companion.avatar}</div>
                    <h4>${companion.name}</h4>
                    <div class="companion-type">${companion.type}</div>
                    <p>${companion.description}</p>
                </div>
            `).join('');
        });
        
        console.log('Companion selection populated with', this.companions.length, 'companions');
    }

    selectCompanion(companionEl) {
        console.log('Companion selected');
        
        // Remove previous selection
        document.querySelectorAll('.companion-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Select current
        companionEl.classList.add('selected');
        
        const companionId = companionEl.getAttribute('data-companion');
        this.currentCompanion = this.companions.find(c => c.id === companionId);

        console.log('Selected companion:', this.currentCompanion.name);

        // Enable next button with multiple approaches
        this.enableCompanionNextButton();
    }

    enableCompanionNextButton() {
        console.log('Enabling companion next button');
        
        // Method 1: Direct ID search
        const nextBtn = document.getElementById('companion-next');
        if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.style.cursor = 'pointer';
            console.log('✅ Method 1: Button enabled by ID');
        }
        
        // Method 2: Find by data-step attribute
        const nextBtnByStep = document.querySelector('[data-step="preferences"]');
        if (nextBtnByStep) {
            nextBtnByStep.disabled = false;
            nextBtnByStep.style.opacity = '1';
            nextBtnByStep.style.pointerEvents = 'auto';
            nextBtnByStep.style.cursor = 'pointer';
            console.log('✅ Method 2: Button enabled by data-step');
        }
        
        // Method 3: Find in current active step
        const currentStep = document.querySelector('.onboarding-step.active');
        if (currentStep) {
            const stepButton = currentStep.querySelector('button[data-step="preferences"]');
            if (stepButton) {
                stepButton.disabled = false;
                stepButton.style.opacity = '1';
                stepButton.style.pointerEvents = 'auto';
                stepButton.style.cursor = 'pointer';
                console.log('✅ Method 3: Button enabled in active step');
            }
        }
        
        // Method 4: Find by text content
        const allButtons = document.querySelectorAll('button');
        allButtons.forEach(btn => {
            if (btn.textContent.includes('Set Preferences') || btn.textContent.includes('preferences')) {
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
                btn.style.cursor = 'pointer';
                console.log('✅ Method 4: Button enabled by text content:', btn.textContent);
            }
        });

        // Force check - log current state
        setTimeout(() => {
            const checkBtn = document.getElementById('companion-next');
            if (checkBtn) {
                console.log('Button state check:', {
                    disabled: checkBtn.disabled,
                    opacity: checkBtn.style.opacity,
                    pointerEvents: checkBtn.style.pointerEvents,
                    visible: checkBtn.offsetParent !== null
                });
            }
        }, 100);
    }

    completeOnboarding() {
        console.log('Completing onboarding');
        
        if (this.currentUser) {
            this.currentUser.companion = this.currentCompanion.id;
            this.currentUser.isNewUser = false;
            localStorage.setItem('companionJournal_user', JSON.stringify(this.currentUser));
        }

        this.showScreen('dashboard');
    }

    updateCompanionGreeting() {
        const avatarEl = document.getElementById('dashboard-companion-avatar');
        const greetingEl = document.getElementById('companion-greeting');

        if (avatarEl && this.currentCompanion) {
            avatarEl.textContent = this.currentCompanion.avatar;
        }

        if (greetingEl && this.currentCompanion) {
            const responses = this.currentCompanion.sampleResponses;
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            greetingEl.textContent = randomResponse;
        }
    }

    populateRecentEntries() {
        const container = document.getElementById('recent-entries');
        if (!container) return;

        const recentEntries = this.entries.slice(0, 3);
        container.innerHTML = recentEntries.map(entry => `
            <div class="entry-item">
                <div class="entry-mood">${this.getMoodEmoji(entry.mood)}</div>
                <div class="entry-content">
                    <h4>${entry.title}</h4>
                    <div class="entry-date">${this.formatDate(entry.date)}</div>
                </div>
            </div>
        `).join('');
    }

    populateDashboardTasks() {
        const container = document.getElementById('dashboard-tasks');
        if (!container) return;

        const todayTasks = this.tasks.filter(task => !task.completed).slice(0, 3);
        container.innerHTML = todayTasks.map(task => `
            <div class="task-item">
                <div class="task-checkbox ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                    ${task.completed ? '✓' : ''}
                </div>
                <div class="task-content">
                    <div class="task-title ${task.completed ? 'completed' : ''}">${task.title}</div>
                    <div class="task-priority ${task.priority}">${task.priority} priority</div>
                </div>
            </div>
        `).join('');
    }

    updateDashboardCharts() {
        // Create mood trend chart
        setTimeout(() => {
            this.createMoodTrendChart();
        }, 100);
    }

    updateWordCount() {
        const contentArea = document.getElementById('entry-content');
        const wordCountEl = document.getElementById('word-count');
        
        if (contentArea && wordCountEl) {
            const text = contentArea.textContent || contentArea.innerText || '';
            const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
            wordCountEl.textContent = `${wordCount} words`;
        }
    }

    autoSave() {
        const statusEl = document.getElementById('auto-save-status');
        if (statusEl) {
            statusEl.textContent = 'Saving...';
            
            // Simulate auto-save delay
            setTimeout(() => {
                statusEl.textContent = 'Draft saved';
            }, 1000);
        }
    }

    toggleAiPrompts() {
        const promptsEl = document.getElementById('ai-prompts');
        if (promptsEl) {
            promptsEl.style.display = promptsEl.style.display === 'none' ? 'block' : 'none';
        }
    }

    selectMood(moodBtn) {
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        moodBtn.classList.add('selected');
        
        const emotionSelector = document.getElementById('emotion-selector');
        if (emotionSelector) {
            emotionSelector.style.display = 'block';
        }

        // Show mood details on mood tracking page
        const moodDetails = document.getElementById('mood-details');
        if (moodDetails) {
            moodDetails.style.display = 'block';
        }
    }

    formatText(command) {
        document.execCommand(command, false, null);
    }

    insertPrompt(prompt) {
        const contentArea = document.getElementById('entry-content');
        if (contentArea) {
            contentArea.focus();
            contentArea.textContent += (contentArea.textContent ? '\n\n' : '') + prompt + ' ';
            this.updateWordCount();
            this.autoSave();
        }
    }

    publishEntry() {
        const titleEl = document.getElementById('entry-title');
        const contentEl = document.getElementById('entry-content');
        const selectedMood = document.querySelector('.mood-btn.selected');
        const selectedEmotionEl = document.getElementById('emotion-select');

        if (!titleEl || !contentEl) {
            this.showNotification('Editor elements not found.', 'error');
            return;
        }

        const title = titleEl.value.trim();
        const content = contentEl.textContent || contentEl.innerText;
        const selectedEmotion = selectedEmotionEl ? selectedEmotionEl.value : '';

        if (!title || !content) {
            this.showNotification('Please fill in both title and content before publishing.', 'warning');
            return;
        }

        // Create new entry
        const newEntry = {
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
            title: title,
            content: content,
            mood: selectedMood ? parseInt(selectedMood.getAttribute('data-mood')) : 3,
            emotion: selectedEmotion || 'neutral',
            companion: this.currentCompanion.id,
            response: this.generateCompanionResponse()
        };

        this.entries.unshift(newEntry);
        this.saveUserData();

        // Clear form
        titleEl.value = '';
        contentEl.textContent = '';
        document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
        
        // Show success message and navigate
        this.showNotification('Entry published successfully!', 'success');
        this.showScreen('dashboard');
    }

    generateCompanionResponse() {
        if (this.currentCompanion && this.currentCompanion.sampleResponses) {
            const responses = this.currentCompanion.sampleResponses;
            return responses[Math.floor(Math.random() * responses.length)];
        }
        return "Thank you for sharing. I'm here to support you on your journey.";
    }

    updateChatCompanion() {
        const avatarEl = document.getElementById('chat-companion-avatar');
        const nameEl = document.getElementById('chat-companion-name');

        if (avatarEl && this.currentCompanion) {
            avatarEl.textContent = this.currentCompanion.avatar;
        }

        if (nameEl && this.currentCompanion) {
            nameEl.textContent = this.currentCompanion.name;
        }
    }

    updateSendButton() {
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-message');
        
        if (chatInput && sendBtn) {
            sendBtn.disabled = !chatInput.value.trim();
        }
    }

    sendMessage() {
        const chatInput = document.getElementById('chat-input');
        const messagesContainer = document.getElementById('chat-messages');
        
        if (!chatInput || !messagesContainer || !chatInput.value.trim()) return;

        const message = chatInput.value.trim();
        
        // Add user message
        this.addChatMessage(message, 'user');
        
        // Clear input
        chatInput.value = '';
        this.updateSendButton();

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate companion response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateCompanionResponse();
            this.addChatMessage(response, 'companion');
        }, 1500);
    }

    addChatMessage(message, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        const messageEl = document.createElement('div');
        messageEl.className = `message ${sender === 'user' ? 'user-message' : 'companion-message'}`;
        
        const avatar = sender === 'user' ? '👤' : this.currentCompanion.avatar;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageEl.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${time}</span>
            </div>
        `;

        messagesContainer.appendChild(messageEl);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.style.display = 'flex';
        }
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.style.display = 'none';
        }
    }

    saveMoodEntry() {
        const selectedMood = document.querySelector('.mood-btn.selected');
        const selectedEmotions = document.querySelectorAll('.emotion-tag.selected');
        const notesEl = document.getElementById('mood-notes');
        const notes = notesEl ? notesEl.value : '';

        if (!selectedMood) {
            this.showNotification('Please select a mood level.', 'warning');
            return;
        }

        const moodEntry = {
            date: new Date().toISOString().split('T')[0],
            mood: parseInt(selectedMood.getAttribute('data-mood')),
            emotion: selectedMood.getAttribute('data-emotion'),
            emotions: Array.from(selectedEmotions).map(tag => tag.getAttribute('data-emotion')),
            notes: notes,
            timestamp: new Date().toISOString()
        };

        this.moods.push(moodEntry);
        this.saveUserData();
        
        this.showNotification('Mood entry saved successfully!', 'success');
        this.showScreen('dashboard');
    }

    populateJournalHistory() {
        const container = document.getElementById('entries-timeline');
        if (!container) return;

        container.innerHTML = this.entries.map(entry => `
            <div class="timeline-entry" data-entry-id="${entry.id}">
                <div class="entry-header">
                    <h3 class="entry-title">${entry.title}</h3>
                    <div class="entry-meta">
                        <span>${this.getMoodEmoji(entry.mood)}</span>
                        <span>${this.formatDate(entry.date)}</span>
                    </div>
                </div>
                <div class="entry-preview">${entry.content.substring(0, 150)}${entry.content.length > 150 ? '...' : ''}</div>
                <div class="entry-tags">
                    <span class="entry-tag">${entry.emotion}</span>
                    <span class="entry-tag">${this.getCompanionName(entry.companion)}</span>
                </div>
            </div>
        `).join('');
    }

    populateTaskList() {
        const pendingContainer = document.getElementById('pending-tasks');
        const completedContainer = document.getElementById('completed-tasks');

        if (pendingContainer) {
            const pendingTasks = this.tasks.filter(task => !task.completed);
            pendingContainer.innerHTML = pendingTasks.map(task => this.renderTaskItem(task)).join('');
        }

        if (completedContainer) {
            const completedTasks = this.tasks.filter(task => task.completed);
            completedContainer.innerHTML = completedTasks.map(task => this.renderTaskItem(task)).join('');
        }
    }

    renderTaskItem(task) {
        const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
        return `
            <div class="task-item-full">
                <div class="task-checkbox ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                    ${task.completed ? '✓' : ''}
                </div>
                <div class="task-content">
                    <div class="task-title ${task.completed ? 'completed' : ''}">${task.title}</div>
                    ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
                    <div class="task-due-date ${isOverdue ? 'overdue' : ''}">${this.formatDate(task.dueDate)}</div>
                    <div class="task-priority ${task.priority}">${task.priority} priority</div>
                </div>
                <div class="task-actions">
                    <button class="btn btn--outline btn--sm" onclick="app.editTask('${task.id}')">Edit</button>
                    <button class="btn btn--outline btn--sm" onclick="app.deleteTask('${task.id}')">Delete</button>
                </div>
            </div>
        `;
    }

    showTaskModal(taskId = null) {
        const modal = document.getElementById('task-modal');
        const title = document.getElementById('task-modal-title');
        
        if (taskId) {
            const task = this.tasks.find(t => t.id === taskId);
            if (task) {
                title.textContent = 'Edit Task';
                document.getElementById('task-title').value = task.title;
                document.getElementById('task-description').value = task.description || '';
                document.getElementById('task-priority').value = task.priority;
                document.getElementById('task-due-date').value = task.dueDate;
            }
        } else {
            title.textContent = 'Add New Task';
            const form = document.getElementById('task-form');
            if (form) form.reset();
        }
        
        modal.classList.remove('hidden');
    }

    saveTask() {
        const titleEl = document.getElementById('task-title');
        const descriptionEl = document.getElementById('task-description');
        const priorityEl = document.getElementById('task-priority');
        const dueDateEl = document.getElementById('task-due-date');

        if (!titleEl || !titleEl.value.trim()) {
            this.showNotification('Please enter a task title.', 'warning');
            return;
        }

        const task = {
            id: Date.now().toString(),
            title: titleEl.value.trim(),
            description: descriptionEl ? descriptionEl.value : '',
            priority: priorityEl ? priorityEl.value : 'medium',
            dueDate: dueDateEl ? dueDateEl.value : new Date().toISOString().split('T')[0],
            completed: false
        };

        this.tasks.push(task);
        this.saveUserData();
        this.populateTaskList();
        this.hideModal('task-modal');
    }

    toggleTask(checkbox) {
        const taskId = checkbox.getAttribute('data-task-id');
        const task = this.tasks.find(t => t.id === taskId);
        
        if (task) {
            task.completed = !task.completed;
            checkbox.classList.toggle('completed');
            checkbox.textContent = task.completed ? '✓' : '';
            
            // Update task title styling
            const taskTitle = checkbox.parentElement.querySelector('.task-title');
            if (taskTitle) {
                taskTitle.classList.toggle('completed');
            }
            
            this.saveUserData();
        }
    }

    filterTasks(category) {
        // Task filtering logic would go here
        this.populateTaskList();
    }

    editTask(taskId) {
        this.showTaskModal(taskId);
    }

    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.saveUserData();
            this.populateTaskList();
        }
    }

    showCompanionModal() {
        const modal = document.getElementById('companion-modal');
        this.populateCompanionSelection();
        modal.classList.remove('hidden');
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    updateBottomNav(activeScreen) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        const activeItem = document.querySelector(`[data-screen="${activeScreen}"]`);
        if (activeItem && activeItem.classList.contains('nav-item')) {
            activeItem.classList.add('active');
        }
    }

    // Chart creation methods
    initializeCharts() {
        // Charts will be created when needed
    }

    createMoodTrendChart() {
        const ctx = document.getElementById('mood-trend-chart');
        if (!ctx) {
            console.warn('Mood trend chart canvas not found');
            return;
        }

        if (this.charts.moodTrend) {
            this.charts.moodTrend.destroy();
        }

        const last7Days = this.moods.slice(-7);
        
        if (last7Days.length === 0) {
            console.warn('No mood data available for chart');
            return;
        }
        
        this.charts.moodTrend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: last7Days.map(mood => this.formatDate(mood.date)),
                datasets: [{
                    label: 'Mood',
                    data: last7Days.map(mood => mood.mood),
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    updateMoodChart() {
        setTimeout(() => {
            const ctx = document.getElementById('mood-history-chart');
            if (!ctx) {
                console.warn('Mood history chart canvas not found');
                return;
            }

            if (this.charts.moodHistory) {
                this.charts.moodHistory.destroy();
            }

            if (this.moods.length === 0) {
                console.warn('No mood data available for history chart');
                return;
            }

            this.charts.moodHistory = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.moods.map(mood => this.formatDate(mood.date)),
                    datasets: [{
                        label: 'Mood Level',
                        data: this.moods.map(mood => mood.mood),
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 5,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            });
        }, 100);
    }

    updateAnalyticsCharts() {
        setTimeout(() => {
            // Create mood patterns chart
            const moodCtx = document.getElementById('analytics-mood-chart');
            if (moodCtx) {
                if (this.charts.analyticsMood) {
                    this.charts.analyticsMood.destroy();
                }

                const moodCounts = {};
                this.moods.forEach(mood => {
                    moodCounts[mood.mood] = (moodCounts[mood.mood] || 0) + 1;
                });

                this.charts.analyticsMood = new Chart(moodCtx, {
                    type: 'doughnut',
                    data: {
                        labels: ['😞 Terrible', '😔 Sad', '😐 Okay', '😊 Good', '😄 Amazing'],
                        datasets: [{
                            data: [
                                moodCounts[1] || 0,
                                moodCounts[2] || 0,
                                moodCounts[3] || 0,
                                moodCounts[4] || 0,
                                moodCounts[5] || 0
                            ],
                            backgroundColor: ['#B4413C', '#FFC185', '#ECEBD5', '#1FB8CD', '#5D878F']
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                });
            }

            // Create activity chart
            const activityCtx = document.getElementById('analytics-activity-chart');
            if (activityCtx) {
                if (this.charts.analyticsActivity) {
                    this.charts.analyticsActivity.destroy();
                }

                // Generate sample weekly activity data
                const weeklyData = [2, 5, 3, 7, 4, 6, 8];
                
                this.charts.analyticsActivity = new Chart(activityCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [{
                            label: 'Entries',
                            data: weeklyData,
                            backgroundColor: '#1FB8CD',
                            borderRadius: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }, 100);
    }

    // Utility methods
    getMoodEmoji(mood) {
        const emojis = ['', '😞', '😔', '😐', '😊', '😄'];
        return emojis[mood] || '😐';
    }

    getCompanionName(companionId) {
        const companion = this.companions.find(c => c.id === companionId);
        return companion ? companion.name : 'Unknown';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    saveUserData() {
        localStorage.setItem('companionJournal_entries', JSON.stringify(this.entries));
        localStorage.setItem('companionJournal_tasks', JSON.stringify(this.tasks));
        localStorage.setItem('companionJournal_moods', JSON.stringify(this.moods));
    }

    loadUserData() {
        const savedEntries = localStorage.getItem('companionJournal_entries');
        const savedTasks = localStorage.getItem('companionJournal_tasks');
        const savedMoods = localStorage.getItem('companionJournal_moods');

        if (savedEntries) {
            try {
                this.entries = JSON.parse(savedEntries);
            } catch (e) {
                console.error('Error parsing saved entries:', e);
                this.entries = [];
            }
        }

        if (savedTasks) {
            try {
                this.tasks = JSON.parse(savedTasks);
            } catch (e) {
                console.error('Error parsing saved tasks:', e);
                this.tasks = [];
            }
        }

        if (savedMoods) {
            try {
                this.moods = JSON.parse(savedMoods);
            } catch (e) {
                console.error('Error parsing saved moods:', e);
                this.moods = [];
            }
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            maxWidth: '300px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        // Set background color based on type
        const colors = {
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B',
            info: '#3B82F6'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the application
const app = new CompanionJournalApp();

// Service Worker registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}