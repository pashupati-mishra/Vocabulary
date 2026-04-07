// Require Auth
auth.requireAuth();

class DashboardApp {
    constructor() {
        this.totalDays = 100;
        this.user = auth.getCurrentUser();
        this.theme = localStorage.getItem('vocabTheme') || 'dark';

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

        // 2. XP & Gamification Stats
        document.getElementById('playerLevelBadge').innerText = progress.level;
        const currentXp = progress.xp;
        const xpForNextLevel = progress.level * 100;
        document.getElementById('xpText').innerText = `${currentXp} / ${xpForNextLevel} XP`;

        const xpPct = Math.min((currentXp / xpForNextLevel) * 100, 100);
        document.getElementById('xpProgressBar').style.width = xpPct + '%';

        document.getElementById('streakCount').innerText = `${progress.streak} Day Streak`;

        const badges = progress.badges;
        document.getElementById('badgeCount').innerText = `${badges.length} Badges Earned`;

        const completedDays = unlockedDay - 1;
        document.getElementById('statDaysCompleted').innerText = `${completedDays} Days Done`;

        // 3. Render Badges
        const badgesContainer = document.getElementById('badgesContainer');
        if (badges.length > 0) {
            badgesContainer.innerHTML = '';
            badges.forEach(b => {
                const badgeEl = document.createElement('div');
                badgeEl.style.display = 'flex';
                badgeEl.style.alignItems = 'center';
                badgeEl.style.gap = '0.5rem';
                badgeEl.style.background = 'rgba(67, 97, 238, 0.1)';
                badgeEl.style.padding = '0.5rem 1rem';
                badgeEl.style.borderRadius = '20px';
                badgeEl.style.color = 'var(--primary-color)';
                badgeEl.style.fontWeight = '600';
                badgeEl.innerHTML = `<i class="fa-solid fa-medal"></i> <span>${b}</span>`;
                badgesContainer.appendChild(badgeEl);
            });
        }

        // 4. Recent Activity
        const scoreKeys = Object.keys(scores);
        const activityList = document.getElementById('recentActivityList');
        if (scoreKeys.length > 0 && activityList) {
            activityList.innerHTML = '';
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

        // 5. Milestones
        this.renderMilestones(unlockedDay, scores);

        // 6. Day-wise Tracker
        this.renderRoadmap(unlockedDay);
    }

    isDayBlockedByMilestone(day) {
        const progress = this.user.progress;
        if (day > 50 && progress.midTestScore === null) return true;

        const requiredWeek = Math.floor((day - 1) / 7);
        if (requiredWeek > 0 && !progress.weeklyTests[`week${requiredWeek}`]) {
            return true;
        }
        return false;
    }

    renderMilestones(unlockedDay, scores) {
        const grid = document.getElementById('milestonesGrid');
        grid.innerHTML = '';
        const progress = this.user.progress;

        // Identify which milestones should be shown
        // We will show all weeks up to the currently unlocked required week so user can see them
        const maxWeekToDisplay = Math.max(1, Math.ceil((unlockedDay - 1) / 7));

        for (let w = 1; w <= maxWeekToDisplay; w++) {
            if (w * 7 > 100) break; // Maximum 14 weeks limit (98 days)

            const isUnlocked = unlockedDay > (w * 7) || (unlockedDay === (w * 7) && scores[`day${w * 7}`]);
            // Accessible if Day 7 is completed (which means unlockedDay > 7 or unlockedDay == 7 and scores[day7] exists) 
            const hasPassed = !!progress.weeklyTests[`week${w}`];
            const score = progress.weeklyTests[`week${w}`];

            this.createMilestoneCard(grid, `Weekly Test ${w}`, `Days ${((w - 1) * 7) + 1} - ${w * 7}`, isUnlocked, hasPassed, score, `weekly&week=${w}`);
        }

        // Mid-Course Test (Day 50)
        const isMidUnlocked = unlockedDay > 50 || (unlockedDay === 50 && scores['day50']);
        const hasPassedMid = progress.midTestScore !== null;
        if (maxWeekToDisplay >= 7 || isMidUnlocked) { // Show if user is around day 49+
            this.createMilestoneCard(grid, 'Mid-Course Test', 'Days 1 - 50', isMidUnlocked, hasPassedMid, progress.midTestScore, 'mid');
        }

        // Final Exam (Day 100)
        const isFinalUnlocked = unlockedDay > 100 || (unlockedDay === 100 && scores['day100']);
        const hasPassedFinal = progress.finalExamScore !== null;
        if (maxWeekToDisplay >= 14 || isFinalUnlocked) {
            this.createMilestoneCard(grid, 'Final Exam', 'Days 1 - 100', isFinalUnlocked, hasPassedFinal, progress.finalExamScore, 'final');
        }
    }

    createMilestoneCard(container, title, subtitle, isUnlocked, hasPassed, score, typeParam) {
        const card = document.createElement('div');
        card.className = 'stat-card';
        card.style.flexDirection = 'column';
        card.style.alignItems = 'flex-start';
        card.style.position = 'relative';

        let badgeHtml = '';
        let btnHtml = '';

        if (hasPassed) {
            card.classList.add('success');
            badgeHtml = `<span style="background: var(--success-color); color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;"><i class="fa-solid fa-check"></i> Passed: ${score}%</span>`;
            btnHtml = `<button class="btn-primary" style="margin-top: 1rem; width: 100%; padding: 0.5rem;" onclick="window.location.href='test.html?type=${typeParam}'">Retake</button>`;
        } else if (isUnlocked) {
            card.classList.add('warning'); // Using warning styling to draw focus
            badgeHtml = `<span style="background: #f59e0b; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;"><i class="fa-solid fa-unlock"></i> Available</span>`;
            btnHtml = `<button class="btn-primary" style="margin-top: 1rem; width: 100%; padding: 0.5rem; background: var(--error-color);" onclick="window.location.href='test.html?type=${typeParam}'">Take Test</button>`;
        } else {
            card.style.opacity = '0.6';
            badgeHtml = `<span style="background: var(--text-light); color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;"><i class="fa-solid fa-lock"></i> Locked</span>`;
        }

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; width: 100%;">
                <h3 style="margin-bottom: 0.2rem;">${title}</h3>
                ${badgeHtml}
            </div>
            <p style="color: var(--text-light); font-size: 0.9rem; margin-bottom: 0;">${subtitle}</p>
            ${btnHtml}
        `;
        container.appendChild(card);
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
                if (this.isDayBlockedByMilestone(i)) {
                    card.classList.add('locked');
                    dayStatus.innerHTML = '<i class="fa-solid fa-lock"></i> Milestone Pending';
                } else {
                    card.classList.add('current');
                    card.classList.add('unlocked');
                    dayStatus.innerHTML = '<i class="fa-solid fa-lock-open"></i> Start';
                }
            } else {
                card.classList.add('locked');
                dayStatus.innerHTML = '<i class="fa-solid fa-lock"></i> Locked';
            }
            card.appendChild(dayStatus);

            if (i <= unlockedDay && !this.isDayBlockedByMilestone(i)) {
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
