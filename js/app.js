// Cursor trail effect
class CursorTrail {
    constructor() {
        this.trails = [];
        this.maxTrails = 30; // Extended trail length
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursor = document.querySelector('body::before');
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.updateCustomCursor();
            this.createTrail();
        });

        // Create initial trail elements
        for (let i = 0; i < this.maxTrails; i++) {
            this.createTrailElement();
        }

        this.animate();
    }

    updateCustomCursor() {
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background-color: #ff0000;
            border: 2px solid #545454ff;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            left: ${this.mouseX - 10}px;
            top: ${this.mouseY - 10}px;
            transition: transform 0.1s ease;
        `;
        
        // Remove old cursor
        const oldCursor = document.querySelector('.custom-cursor');
        if (oldCursor) {
            oldCursor.remove();
        }
        
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);
    }

    createTrailElement() {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = '0';
        document.body.appendChild(trail);
        this.trails.push({
            element: trail,
            x: 0,
            y: 0,
            opacity: 0,
            scale: 1
        });
    }

    createTrail() {
        if (this.trails.length === 0) return;

        // Find the first inactive trail
        const inactiveTrail = this.trails.find(trail => trail.opacity <= 0);
        if (inactiveTrail) {
            inactiveTrail.x = this.mouseX;
            inactiveTrail.y = this.mouseY;
            inactiveTrail.opacity = 0.7;
            inactiveTrail.scale = 1;
        }
    }

    animate() {
        this.trails.forEach((trail, index) => {
            if (trail.opacity > 0) {
                trail.opacity -= 0.03; // Slower fade for longer trail
                trail.scale -= 0.01;
                
                trail.element.style.left = `${trail.x - 4}px`;
                trail.element.style.top = `${trail.y - 4}px`;
                trail.element.style.opacity = trail.opacity;
                trail.element.style.transform = `scale(${trail.scale})`;
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Page navigation
class PageNavigation {
    constructor() {
        this.currentPage = 'home';
        this.pages = document.querySelectorAll('.page');
        this.navLinks = document.querySelectorAll('.pixel-link');
        this.init();
    }

    init() {
        // Handle navigation clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('data-page');
                this.navigateToPage(targetPage);
            });
        });

        // Handle button navigation
        document.querySelectorAll('.pixel-button[data-page]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = button.getAttribute('data-page');
                this.navigateToPage(targetPage);
            });
        });

        // Handle level select clicks
        document.querySelectorAll('.level-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const level = item.getAttribute('data-level');
                this.handleLevelSelect(level);
            });
        });

        // Handle URL hash changes
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash && this.isValidPage(hash)) {
                this.navigateToPage(hash);
            }
        });

        // Initialize page based on URL hash
        const initialHash = window.location.hash.substring(1);
        if (initialHash && this.isValidPage(initialHash)) {
            this.navigateToPage(initialHash);
        } else {
            this.navigateToPage('home');
        }
    }

    handleLevelSelect(level) {
        const levelMap = {
            '1': 'cyber-security',
            '2': 'game-dev',
            '3': 'interests',
            'bonus': 'contact'
        };
        
        const targetPage = levelMap[level];
        if (targetPage) {
            this.navigateToPage(targetPage);
        }
    }

    isValidPage(page) {
        const validPages = ['home', 'about', 'game-dev', 'cyber-security', 'interests', 'contact'];
        return validPages.includes(page);
    }

    navigateToPage(targetPage) {
        if (targetPage === this.currentPage) return;

        // Hide current page
        const currentPageElement = document.getElementById(this.currentPage);
        if (currentPageElement) {
            currentPageElement.classList.remove('active');
            currentPageElement.style.opacity = '0';
            currentPageElement.style.transform = 'translateY(20px)';
        }

        // Update navigation
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === targetPage) {
                link.classList.add('active');
            }
        });

        // Show target page with delay for transition
        setTimeout(() => {
            const targetPageElement = document.getElementById(targetPage);
            if (targetPageElement) {
                targetPageElement.classList.add('active');
                targetPageElement.style.opacity = '1';
                targetPageElement.style.transform = 'translateY(0)';
                
                // Update URL hash
                window.location.hash = targetPage;
                this.currentPage = targetPage;

                // Trigger page-specific animations
                this.triggerPageAnimations(targetPage);
            }
        }, 300);
    }

    triggerPageAnimations(pageName) {
        switch (pageName) {
            case 'home':
                this.animateHomeElements();
                break;
            case 'about':
                this.animateAboutElements();
                break;
            case 'game-dev':
                this.animateGameCards();
                break;
            case 'cyber-security':
                this.animateTerminal();
                break;
            case 'interests':
                this.animateGallery();
                break;
            case 'contact':
                this.animateForm();
                break;
        }
    }

    animateHomeElements() {
        const elements = document.querySelectorAll('#home .pixel-title, #home .pixel-subtitle, #home .dialogue-box, #home .level-select');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    animateAboutElements() {
        const elements = document.querySelectorAll('#about .pixel-title, #about .persona-card');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px) rotateX(90deg)';
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) rotateX(0)';
            }, index * 150);
        });
    }

    animateGameCards() {
        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) rotateX(90deg)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) rotateX(0)';
            }, index * 150);
        });
    }

    animateTerminal() {
        const terminalLines = document.querySelectorAll('.terminal-line');
        terminalLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                line.style.transition = 'all 0.3s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    animateGallery() {
        const photos = document.querySelectorAll('.photo-frame');
        photos.forEach((photo, index) => {
            photo.style.opacity = '0';
            photo.style.transform = 'scale(0.8) rotate(5deg)';
            setTimeout(() => {
                photo.style.transition = 'all 0.5s ease';
                photo.style.opacity = '1';
                photo.style.transform = 'scale(1) rotate(0deg)';
            }, index * 100);
        });
    }

    animateForm() {
        const formElements = document.querySelectorAll('.form-group, .submit-button, .contact-info');
        formElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            setTimeout(() => {
                element.style.transition = 'all 0.4s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// Contact form handling
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });

            // Add pixel-style focus effects
            const inputs = this.form.querySelectorAll('.pixel-input, .pixel-textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.style.boxShadow = 'inset 0 2px 0 #000000, 0 0 15px rgba(255, 0, 0, 0.5)';
                });

                input.addEventListener('blur', () => {
                    input.style.boxShadow = 'inset 0 2px 0 #000000';
                });
            });
        }
    }

    handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitButton = this.form.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'SENDING...';
        submitButton.disabled = true;

        setTimeout(() => {
            submitButton.textContent = 'MESSAGE SENT!';
            submitButton.style.backgroundColor = '#00ff00';
            submitButton.style.color = '#000000';
            
            // Reset form
            this.form.reset();
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.backgroundColor = '#ff0000';
                submitButton.style.color = '#ffffff';
            }, 2000);
        }, 1500);
    }
}

// Music player functionality
class MusicPlayer {
    constructor() {
        console.log('MusicPlayer constructor called');
        this.currentTrack = null;
        this.isPlaying = false;
        this.audio = new Audio();
        this.audioTracks = {
            '1': 'assets/audios/1.mp3',
            '2': 'assets/audios/2.mp3',
            '3': 'assets/audios/3.mp3'
        };
        console.log('MusicPlayer initialized with tracks:', this.audioTracks);
        this.init();
    }

    init() {
        // Handle play button clicks - only for buttons with data-track attribute
        document.querySelectorAll('.play-button[data-track]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const trackId = button.getAttribute('data-track');
                this.playTrack(trackId, button);
            });
        });

        // Handle audio events
        this.audio.addEventListener('ended', () => {
            this.stopTrack();
        });

        this.audio.addEventListener('error', (e) => {
            console.error('Audio loading error:', e);
            this.showNotification('⚠ AUDIO FILE NOT FOUND', '#ff6600');
        });

        // Time update event for progress bar
        this.audio.addEventListener('timeupdate', () => {
            console.log('timeupdate event fired');
            this.updateProgress();
        });

        // Loaded metadata event for duration
        this.audio.addEventListener('loadedmetadata', () => {
            console.log('loadedmetadata event fired');
            this.updateDuration();
        });

        // Initialize controls with a delay to ensure elements are available
        setTimeout(() => {
            this.initializeControls();
        }, 500);

        // Also initialize controls when interests page becomes active
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;
                    if (target.id === 'interests' && target.classList.contains('active')) {
                        console.log('Interests page became active, initializing controls');
                        this.initializeControls();
                    }
                }
            });
        });

        // Observe the interests page for class changes
        const interestsPage = document.getElementById('interests');
        if (interestsPage) {
            observer.observe(interestsPage, { attributes: true });
        }
    }

    initializeControls() {
        console.log('Initializing controls...');
        
        // Initialize progress bar click
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar && !progressBar.hasAttribute('data-initialized')) {
            console.log('Progress bar element found, adding click listener');
            progressBar.addEventListener('click', (e) => {
                this.seekTo(e);
            });
            progressBar.setAttribute('data-initialized', 'true');
        } else {
            console.log('Progress bar element not found or already initialized');
        }

        // Initialize volume control
        const volumeSlider = document.querySelector('.volume-slider');
        if (volumeSlider && !volumeSlider.hasAttribute('data-initialized')) {
            console.log('Volume slider element found, adding input listener');
            volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value);
            });
            volumeSlider.setAttribute('data-initialized', 'true');
        } else {
            console.log('Volume slider element not found or already initialized');
        }

        // Set initial volume
        this.audio.volume = 0.7;
        console.log('Initial volume set to 0.7');
    }

    playTrack(trackId, button) {
        // Stop current track if playing
        if (this.currentTrack && this.currentTrack !== trackId) {
            this.stopTrack();
        }

        // Toggle play/pause
        if (this.isPlaying && this.currentTrack === trackId) {
            this.stopTrack();
            button.textContent = '▶ PLAY';
            button.style.backgroundColor = '#ff0000';
        } else {
            this.startTrack(trackId, button);
            button.textContent = '⏸ PAUSE';
            button.style.backgroundColor = '#00ff00';
            button.style.color = '#000000';
        }
    }

    startTrack(trackId, button) {
        this.currentTrack = trackId;
        this.isPlaying = true;
        
        // Load and play the actual audio file
        this.audio.src = this.audioTracks[trackId];
        this.audio.load();
        
        const playPromise = this.audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.showPlayingNotification(trackId);
            }).catch(error => {
                console.error('Audio playback failed:', error);
                this.showNotification('⚠ PLAYBACK FAILED', '#ff6600');
                this.stopTrack();
            });
        }
    }

    stopTrack() {
        this.currentTrack = null;
        this.isPlaying = false;
        
        // Stop audio
        this.audio.pause();
        this.audio.currentTime = 0;
        
        // Reset all play buttons
        document.querySelectorAll('.play-button[data-track]').forEach(button => {
            button.textContent = '▶ PLAY';
            button.style.backgroundColor = '#ff0000';
            button.style.color = '#ffffff';
        });

        // Reset progress bar
        const progressFill = document.querySelector('.progress-fill');
        const currentTimeElement = document.querySelector('.current-time');
        
        if (progressFill) {
            progressFill.style.width = '0%';
        }
        
        if (currentTimeElement) {
            currentTimeElement.textContent = '0:00';
        }
    }

    showPlayingNotification(trackId) {
        const trackNames = {
            '1': 'Dream of Lily | A lofi beat',
            '2': 'Pixel Pulse',
            '3': 'Retro Wave'
        };

        this.showNotification(`🎵 NOW PLAYING<br>${trackNames[trackId]}`, '#ff0000');
    }

    // Progress bar methods
    updateProgress() {
        console.log('updateProgress called', {
            currentTime: this.audio.currentTime,
            duration: this.audio.duration,
            isPlaying: this.isPlaying
        });
        
        if (this.audio.duration) {
            const progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
            const progressFill = document.querySelector('.progress-fill');
            const currentTimeElement = document.querySelector('.current-time');
            
            console.log('Progress percent:', progressPercent);
            
            if (progressFill) {
                progressFill.style.width = progressPercent + '%';
                console.log('Set progress fill width to:', progressPercent + '%');
            } else {
                console.log('Progress fill element not found');
            }
            
            if (currentTimeElement) {
                currentTimeElement.textContent = this.formatTime(this.audio.currentTime);
                console.log('Set current time to:', this.formatTime(this.audio.currentTime));
            } else {
                console.log('Current time element not found');
            }
        } else {
            console.log('No duration available yet');
        }
    }

    updateDuration() {
        console.log('updateDuration called, duration:', this.audio.duration);
        const totalTimeElement = document.querySelector('.total-time');
        if (totalTimeElement && this.audio.duration) {
            totalTimeElement.textContent = this.formatTime(this.audio.duration);
            console.log('Set total time to:', this.formatTime(this.audio.duration));
        } else {
            console.log('Could not update duration - element or duration missing');
        }
    }

    seekTo(event) {
        console.log('seekTo called');
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar && this.audio.duration) {
            const rect = progressBar.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const width = rect.width;
            const percentage = clickX / width;
            this.audio.currentTime = percentage * this.audio.duration;
            console.log('Seeked to:', percentage * this.audio.duration);
        } else {
            console.log('Could not seek - progress bar or duration missing');
        }
    }

    // Volume control methods
    setVolume(value) {
        console.log('setVolume called with value:', value);
        const volume = value / 100;
        this.audio.volume = volume;
        console.log('Set audio volume to:', volume);
        
        const volumeValue = document.querySelector('.volume-value');
        const volumeIcon = document.querySelector('.volume-icon');
        
        if (volumeValue) {
            volumeValue.textContent = value + '%';
            console.log('Set volume value display to:', value + '%');
        } else {
            console.log('Volume value element not found');
        }
        
        if (volumeIcon) {
            if (value == 0) {
                volumeIcon.textContent = '🔇';
            } else if (value < 50) {
                volumeIcon.textContent = '🔉';
            } else {
                volumeIcon.textContent = '🔊';
            }
            console.log('Set volume icon to:', volumeIcon.textContent);
        } else {
            console.log('Volume icon element not found');
        }
    }

    // Utility method to format time
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    showNotification(message, color = '#ff0000') {
        // Remove existing notification
        const existingNotification = document.querySelector('.music-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'music-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${color};
            color: #ffffff;
            padding: 15px;
            border: 3px solid #ffffff;
            font-family: 'Press Start 2P', monospace;
            font-size: 8px;
            z-index: 10000;
            text-align: center;
            box-shadow: 0 4px 0 #000000;
            animation: slideIn 0.3s ease;
            max-width: 200px;
        `;
        notification.innerHTML = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Sound effects (optional - can be added later)
class SoundEffects {
    constructor() {
        this.sounds = {};
        this.enabled = true;
        this.init();
    }

    init() {
        // Create audio context for retro sounds
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
            this.enabled = false;
        }
    }

    playSound(frequency, duration, type = 'square') {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    playClickSound() {
        this.playSound(800, 0.1);
    }

    playHoverSound() {
        this.playSound(400, 0.05);
    }

    playSuccessSound() {
        this.playSound(600, 0.1);
        setTimeout(() => this.playSound(800, 0.1), 50);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const cursorTrail = new CursorTrail();
    const pageNavigation = new PageNavigation();
    const contactForm = new ContactForm();
    const musicPlayer = new MusicPlayer();
    const soundEffects = new SoundEffects();

    // Add sound effects to interactive elements
    document.querySelectorAll('.pixel-link, .pixel-button').forEach(element => {
        element.addEventListener('mouseenter', () => {
            soundEffects.playHoverSound();
        });

        element.addEventListener('click', () => {
            soundEffects.playClickSound();
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            pageNavigation.navigateToPage('home');
        }
        
        // Add Enter key support for dialogue boxes
        if (e.key === 'Enter') {
            const dialogueBoxes = document.querySelectorAll('.dialogue-prompt');
            dialogueBoxes.forEach(box => {
                if (box.style.opacity !== '0') {
                    // Hide current dialogue box or show next one
                    box.parentElement.style.opacity = '0';
                    setTimeout(() => {
                        box.parentElement.style.display = 'none';
                    }, 300);
                }
            });
        }
    });

    // Add touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            const pages = ['home', 'about', 'game-dev', 'cyber-security', 'interests', 'contact'];
            const currentIndex = pages.indexOf(pageNavigation.currentPage);
            
            if (diff > 0 && currentIndex < pages.length - 1) {
                // Swipe left - next page
                pageNavigation.navigateToPage(pages[currentIndex + 1]);
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - previous page
                pageNavigation.navigateToPage(pages[currentIndex - 1]);
            }
        }
    }

    // Add CSS animation for slide-in effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // Console welcome message
    console.log(`
    ██████╗ ███████╗██████╗  █████╗ ██╗     ██████╗ 
    ██╔══██╗██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗
    ██████╔╝█████╗  ██████╔╝███████║██║     ██║  ██║
    ██╔══██╗██╔══╝  ██╔══██╗██╔══██║██║     ██║  ██║
    ██║  ██║███████╗██║  ██║██║  ██║███████╗██████╔╝
    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═════╝ 
                    
    Welcome to Jakaria's Retro Pixel World!
    Built with ❤️ using HTML, CSS, and JavaScript
    
    Features:
    🎮 Extended cursor trail (30 particles)
    🛡️ Cybersecurity quest section
    🎮 Game development showcase
    🎨 Creative side missions with music player
    📱 Fully responsive design
    ⌨️ Keyboard navigation support
    🎵 Interactive music player
    🖱️ Level select menu navigation
    
    Controls:
    ESC - Return to home
    Enter - Advance dialogue boxes
    Swipe - Navigate pages (mobile)
    `);
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    // Adjust any dynamic elements if needed
    const customCursor = document.querySelector('.custom-cursor');
    if (customCursor) {
        customCursor.style.display = window.innerWidth < 768 ? 'none' : 'block';
    }
});

// Prevent accidental navigation away
window.addEventListener('beforeunload', (e) => {
    // Only if there's unsaved work (can be customized)
    if (document.querySelector('.pixel-input:focus, .pixel-textarea:focus')) {
        e.preventDefault();
        e.returnValue = '';
    }
});