// Require Auth
auth.requireAuth();

class DashboardApp {
    constructor() {
        this.totalDays = 100;
        this.user = auth.getCurrentUser();
        this.theme = localStorage.getItem('vocabTheme') || 'light';
        
        this.init();
    }

    init() {
        this.applyTheme();
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        document.getElementById('btnLogout').addEventListener('click', () => auth.logout());

        this.renderDashboard();
    }

    applyTheme() {
        if (this.theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('themeToggle').innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            document.documentElement.removeAttribute('data-theme');
            document.getElementById('themeToggle').innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('vocabTheme', this.theme);
        this.applyTheme();
    }

    renderDashboard() {
        const progress = this.user.progress;
        const unlockedDay = progress.unlockedDay || 1;
        const scores = progress.scores || {};

        // 1. User Greeting
        document.getElementById('userGreeting').innerText = `Welcome, ${this.user.name.split(' ')[0]}`;

        // 2. Progress Overview
        const completedDays = unlockedDay - 1;
        const width = (completedDays / this.totalDays) * 100;
        document.getElementById('overallProgressBar').style.width = width + '%';
        document.getElementById('progressText').innerText = `${Math.round(width)}%`;
        document.getElementById('statDaysCompleted').innerText = `${completedDays} / ${this.totalDays}`;

        // 3. Performance Summary
        const scoreKeys = Object.keys(scores);
        let avgScore = 0;
        let bestScore = 0;
        
        if (scoreKeys.length > 0) {
            let total = 0;
            scoreKeys.forEach(k => {
                const s = scores[k];
                total += s;
                if (s > bestScore) bestScore = s;
            });
            avgScore = Math.round(total / scoreKeys.length);
        }

        document.getElementById('statAvgScore').innerText = `${avgScore}%`;
        document.getElementById('statBestScore').innerText = `${bestScore}%`;

        // 4. Recent Activity
        const activityList = document.getElementById('recentActivityList');
        if (scoreKeys.length > 0) {
            activityList.innerHTML = '';
            // Get last 3 days completed
            // Keys look like "day1", "day2"
            const daysArr = scoreKeys.map(k => parseInt(k.replace('day', ''))).sort((a, b) => b - a);
            const recentDays = daysArr.slice(0, 3);

            recentDays.forEach(day => {
                const score = scores[`day${day}`];
                const li = document.createElement('li');
                li.classList.add('activity-item');
                li.innerHTML = `
                    <div class="activity-day">
                        <i class="fa-solid fa-check-circle" style="color: var(--success-color)"></i>
                        Day ${day} Completed
                    </div>
                    <div class="activity-score">${score}%</div>
                `;
                activityList.appendChild(li);
            });
        }

        // 5. Day-wise Tracker
        this.renderRoadmap(unlockedDay);
    }

    renderRoadmap(unlockedDay) {
        const grid = document.getElementById('roadmapGrid');
        grid.innerHTML = '';

        for (let i = 1; i <= this.totalDays; i++) {
            const card = document.createElement('div');
            card.classList.add('day-card');
            
            const dayNum = document.createElement('div');
            dayNum.classList.add('day-num');
            dayNum.innerText = `Day ${i}`;
            card.appendChild(dayNum);
            
            const dayStatus = document.createElement('div');
            dayStatus.classList.add('day-status');
            
            if (i < unlockedDay) {
                card.classList.add('completed');
                dayStatus.innerHTML = '<i class="fa-solid fa-check"></i> Passed';
            } else if (i === unlockedDay) {
                card.classList.add('current');
                card.classList.add('unlocked');
                dayStatus.innerHTML = '<i class="fa-solid fa-lock-open"></i> Start';
            } else {
                card.classList.add('locked');
                dayStatus.innerHTML = '<i class="fa-solid fa-lock"></i> Locked';
            }
            card.appendChild(dayStatus);

            if (i <= unlockedDay) {
                card.addEventListener('click', () => this.handleDaySelect(i));
            }
            grid.appendChild(card);
        }
    }

    handleDaySelect(day) {
        window.location.href = `index.html?day=${day}`;
    }
}

// Initialize Application
const dashboardApp = new DashboardApp();
