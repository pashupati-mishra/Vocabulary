class Gamification {
    constructor() {
        this.audioCtx = null;
    }

    _initAudio() {
        if (!this.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.audioCtx = new AudioContext();
            }
        }
    }

    _playTone(freq, type, duration, vol, delay=0) {
        this._initAudio();
        if (!this.audioCtx) return;

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + delay);
        
        gain.gain.setValueAtTime(vol, this.audioCtx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + delay + duration);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(this.audioCtx.currentTime + delay);
        osc.stop(this.audioCtx.currentTime + delay + duration);
    }

    playSuccess() {
        // A happy chime
        this._playTone(523.25, 'sine', 0.1, 0.5, 0);   // C5
        this._playTone(659.25, 'sine', 0.2, 0.5, 0.1); // E5
        this._playTone(783.99, 'sine', 0.4, 0.5, 0.2); // G5
    }

    playError() {
        // A buzzer sound
        this._playTone(150, 'sawtooth', 0.3, 0.5);
    }

    playLevelUp() {
        // Multi-chime celebration
        this._playTone(440, 'sine', 0.2, 0.5, 0);
        this._playTone(554.37, 'sine', 0.2, 0.5, 0.15);
        this._playTone(659.25, 'sine', 0.2, 0.5, 0.3);
        this._playTone(880, 'sine', 0.6, 0.5, 0.45);
    }

    shootConfetti() {
        const colors = ['#fca311', '#4361ee', '#38b000', '#e63946', '#a2d2ff'];
        for (let i = 0; i < 100; i++) {
            this._createConfettiParticle(colors[Math.floor(Math.random() * colors.length)]);
        }
    }

    _createConfettiParticle(color) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.backgroundColor = color;
        particle.style.top = '-10px';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.opacity = Math.random() + 0.5;
        particle.style.transform = `rotate(${Math.random() * 360}deg)`;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        document.body.appendChild(particle);

        const fallDuration = Math.random() * 3000 + 2000;
        const drift = (Math.random() - 0.5) * 200;

        particle.animate([
            { transform: particle.style.transform, top: '-10px', left: particle.style.left },
            { transform: `rotate(${Math.random() * 360 + 360}deg)`, top: '100vh', left: `calc(${particle.style.left} + ${drift}px)` }
        ], {
            duration: fallDuration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }

    updateStreak(userProgress) {
        const today = new Date().toDateString();
        let addedXP = 0;
        let messages = [];

        if (userProgress.lastActivityDate) {
            const lastDate = new Date(userProgress.lastActivityDate);
            const currentDate = new Date(today);
            const diffTime = Math.abs(currentDate - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                userProgress.streak += 1;
                userProgress.lastActivityDate = today;
                
                // Bonus Logic
                if (userProgress.streak === 3) {
                    addedXP = 20;
                    messages.push("+20 XP (3-Day Streak!)");
                } else if (userProgress.streak === 7) {
                    addedXP = 50;
                    messages.push("+50 XP (7-Day Streak!)");
                }
            } else if (diffDays > 1) {
                userProgress.streak = 1;
                userProgress.lastActivityDate = today;
            }
        } else {
            userProgress.streak = 1;
            userProgress.lastActivityDate = today;
        }

        return { newStreak: userProgress.streak, addedXP, messages };
    }

    addXP(userProgress, amount) {
        userProgress.xp += amount;
        let leveledUp = false;
        
        // Simple scaling: Level = floor(xp / 100) + 1
        const newLevel = Math.floor(userProgress.xp / 100) + 1;
        if (newLevel > userProgress.level) {
            userProgress.level = newLevel;
            leveledUp = true;
        }

        return { xp: userProgress.xp, level: userProgress.level, leveledUp };
    }

    evaluateBadges(userProgress, recentScoreStr) {
        let newBadges = [];
        const checkAndAdd = (badgeName) => {
            if (!userProgress.badges.includes(badgeName)) {
                userProgress.badges.push(badgeName);
                newBadges.push(badgeName);
            }
        };

        if (userProgress.unlockedDay > 7) checkAndAdd("7-Day Warrior");
        if (userProgress.unlockedDay > 50) checkAndAdd("Halfway Hero");
        if (userProgress.unlockedDay > 100) checkAndAdd("Vocabulary Master");
        
        if (recentScoreStr >= 90) checkAndAdd("Sharp Learner");

        return newBadges;
    }
}

const gamification = new Gamification();
