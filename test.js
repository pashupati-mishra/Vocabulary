// Require Auth
auth.requireAuth();

class TestApp {
    constructor() {
        this.user = auth.getCurrentUser();
        this.theme = localStorage.getItem('vocabTheme') || 'dark';
        
        this.testType = null;
        this.weekNum = null;
        this.wordPool = [];
        this.questions = [];
        this.currentQIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        
        this.init();
    }

    init() {
        this.applyTheme();
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        document.getElementById('btnDashboard').addEventListener('click', () => window.location.href = 'dashboard.html');
        document.getElementById('btnSubmitTestAnswer').addEventListener('click', () => this.submitAnswer());
        document.getElementById('btnNextTestQuestion').addEventListener('click', () => this.nextQuestion());
        document.getElementById('btnResultAction').addEventListener('click', () => window.location.href = 'dashboard.html');

        const params = new URLSearchParams(window.location.search);
        this.testType = params.get('type');
        this.weekNum = parseInt(params.get('week'));

        this.setupTest();
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

    switchView(viewId) {
        document.querySelectorAll('.view').forEach(v => {
            v.classList.remove('active-view');
            v.classList.add('hidden-view');
        });
        document.getElementById(viewId).classList.remove('hidden-view');
        document.getElementById(viewId).classList.add('active-view');
        window.scrollTo(0, 0);
    }

    setupTest() {
        let startDay = 1, endDay = 1;
        let title = '';
        let subtitle = '';
        let targetQuestionCount = 10;

        if (this.testType === 'weekly' && this.weekNum) {
            startDay = (this.weekNum - 1) * 7 + 1;
            endDay = this.weekNum * 7;
            title = `Weekly Test ${this.weekNum}`;
            subtitle = `Days ${startDay} - ${endDay}`;
            targetQuestionCount = 15;
        } else if (this.testType === 'mid') {
            startDay = 1;
            endDay = 50;
            title = "Mid-Course Test";
            subtitle = "Days 1 - 50";
            targetQuestionCount = 25;
        } else if (this.testType === 'final') {
            startDay = 1;
            endDay = 100;
            title = "Final Exam";
            subtitle = "Complete Vocabulary Assessment";
            targetQuestionCount = 40;
        } else {
            alert("Invalid Test Parameters.");
            window.location.href = 'dashboard.html';
            return;
        }

        document.getElementById('testTitle').innerText = title;
        document.getElementById('testSubtitle').innerText = subtitle;

        // Build word pool from available vocabData
        // (Uses dummy fallback by grabbing available days if specific range is mostly empty)
        for (let i = startDay; i <= endDay; i++) {
            if (vocabData[i]) {
                this.wordPool = this.wordPool.concat(vocabData[i]);
            }
        }

        if (this.wordPool.length === 0) {
            // Fallback for demo purposes if no words found in range
            Object.values(vocabData).forEach(dayArr => this.wordPool = this.wordPool.concat(dayArr));
        }

        this.generateQuestions(targetQuestionCount);
        this.startTest();
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    generateQuestions(count) {
        // Cap the count to available questions based on word pool size
        let maxQ = this.wordPool.length * 2; // We can make ~2 questions per word (meaning + fill)
        count = Math.min(count, maxQ);

        // Word pool should be shuffled to get random words
        let shuffledWords = [...this.wordPool];
        this.shuffleArray(shuffledWords);
        
        let allMeanings = this.wordPool.map(w => w.meaning_en);

        for (let i = 0; i < count; i++) {
            let wordObj = shuffledWords[i % shuffledWords.length];
            let qType = Math.random() > 0.5 ? 'meaning' : 'fill';

            if (qType === 'meaning') {
                // Generate MCQ
                let options = [wordObj.meaning_en];
                let otherMeanings = [...allMeanings].filter(m => m !== wordObj.meaning_en);
                this.shuffleArray(otherMeanings);
                options.push(...otherMeanings.slice(0, 3));
                this.shuffleArray(options);

                this.questions.push({
                    type: 'mcq',
                    question: `What is the meaning of '${wordObj.word}'?`,
                    options: options,
                    answer: options.indexOf(wordObj.meaning_en)
                });
            } else {
                // Generate Fill in the blanks from sentence
                // Find a word pattern in the sentence (case insensitive)
                let sentence = wordObj.sentence;
                let pattern = new RegExp(wordObj.word, "i");
                if (pattern.test(sentence)) {
                    let blankSentence = sentence.replace(pattern, "_________");
                    let options = [wordObj.word];
                    let otherWords = this.wordPool.filter(w => w.word !== wordObj.word).map(w => w.word);
                    this.shuffleArray(otherWords);
                    options.push(...otherWords.slice(0, 3));
                    this.shuffleArray(options);

                    this.questions.push({
                        type: 'mcq',
                        question: `Fill in the blank:\n"${blankSentence}"`,
                        options: options,
                        answer: options.indexOf(wordObj.word)
                    });
                } else {
                    // Fallback to synonym question
                    let syn = wordObj.synonyms[0].word;
                    let options = [syn];
                    let otherSyns = this.wordPool.filter(w => w.word !== wordObj.word).map(w => w.synonyms[0].word);
                    this.shuffleArray(otherSyns);
                    options.push(...otherSyns.slice(0, 3));
                    this.shuffleArray(options);
                    
                    this.questions.push({
                        type: 'mcq',
                        question: `Which word is a synonym for '${wordObj.word}'?`,
                        options: options,
                        answer: options.indexOf(syn)
                    });
                }
            }
        }
        
        // Shuffle final question list
        this.shuffleArray(this.questions);
    }

    startTest() {
        if (this.questions.length === 0) {
            alert('Not enough data to start test.');
            window.location.href = 'dashboard.html';
            return;
        }

        this.currentQIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.renderQuestion();
        this.switchView('quizView');
    }

    renderQuestion() {
        const q = this.questions[this.currentQIndex];
        document.getElementById('testProgressIndicator').innerText = `${this.currentQIndex + 1} / ${this.questions.length}`;
        document.getElementById('testProgressBar').style.width = `${((this.currentQIndex) / this.questions.length) * 100}%`;
        
        const card = document.getElementById('testCard');
        card.innerHTML = `<h3 class="question-text" style="white-space: pre-line;">${q.question}</h3>`;
        
        if (q.type === 'mcq') {
            const optionsContainer = document.createElement('div');
            optionsContainer.classList.add('options-container');
            q.options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.classList.add('option-btn');
                btn.innerText = opt;
                btn.onclick = () => this.selectOption(btn, idx);
                optionsContainer.appendChild(btn);
            });
            card.appendChild(optionsContainer);
        }

        const feedback = document.createElement('div');
        feedback.id = 'quizFeedback';
        feedback.classList.add('feedback-container');
        card.appendChild(feedback);

        document.getElementById('btnSubmitTestAnswer').style.display = 'block';
        document.getElementById('btnNextTestQuestion').style.display = 'none';
    }

    selectOption(btnSelected, index) {
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btnSelected.classList.add('selected');
        btnSelected.dataset.idx = index;
    }

    submitAnswer() {
        const q = this.questions[this.currentQIndex];
        let isCorrect = false;
        let userAnswerText = "";
        const feedback = document.getElementById('quizFeedback');

        const selected = document.querySelector('.option-btn.selected');
        if (!selected) {
            alert("Please select an option!");
            return;
        }
        
        document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
        const userIdx = parseInt(selected.dataset.idx);
        userAnswerText = q.options[userIdx];
        
        if (userIdx === q.answer) {
            isCorrect = true;
            selected.classList.add('correct-ans');
            feedback.innerHTML = `<strong><i class="fa-solid fa-circle-check"></i> Correct!</strong>`;
            feedback.className = 'feedback-container show correct';
            if (typeof gamification !== 'undefined') gamification.playSuccess();
        } else {
            selected.classList.add('wrong-ans');
            const correctBtn = document.querySelectorAll('.option-btn')[q.answer];
            if (correctBtn) correctBtn.classList.add('correct-ans');
            feedback.innerHTML = `<strong><i class="fa-solid fa-circle-xmark"></i> Incorrect.</strong><p>The correct answer is: ${q.options[q.answer]}</p>`;
            feedback.className = 'feedback-container show incorrect';
            if (typeof gamification !== 'undefined') gamification.playError();
        }

        if (isCorrect) this.score++;

        this.userAnswers.push({
            question: q.question,
            userAnswer: userAnswerText,
            isCorrect: isCorrect,
            correctShow: q.options[q.answer]
        });

        document.getElementById('btnSubmitTestAnswer').style.display = 'none';
        
        const nextBtn = document.getElementById('btnNextTestQuestion');
        nextBtn.style.display = 'block';
        if (this.currentQIndex === this.questions.length - 1) {
            nextBtn.innerHTML = 'See Results <i class="fa-solid fa-ribbon"></i>';
        } else {
            nextBtn.innerHTML = 'Next Question <i class="fa-solid fa-arrow-right"></i>';
        }
    }

    nextQuestion() {
        if (this.currentQIndex < this.questions.length - 1) {
            this.currentQIndex++;
            this.renderQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        document.getElementById('testProgressBar').style.width = `100%`;
        
        const total = this.questions.length;
        const percentage = Math.round((this.score / total) * 100);
        
        document.getElementById('scoreText').innerText = `${percentage}%`;
        const scoreCircle = document.getElementById('scoreCircle');
        scoreCircle.className = 'score-circle'; // reset
        
        let passed = percentage >= 80;
        let pLevel = "";

        if (this.testType === 'final') {
            if (percentage >= 90) pLevel = "Excellent!";
            else if (percentage >= 75) pLevel = "Good";
            else if (percentage >= 50) pLevel = "Average";
            else pLevel = "Needs Improvement";
            document.getElementById('performanceLevel').innerText = `Performance: ${pLevel}`;
        }

        if (passed) {
            document.getElementById('resultTitle').innerText = "Congratulations!";
            document.getElementById('resultMessage').innerText = "You have successfully passed the test!";
            scoreCircle.classList.add('success');
            
            // Save Progress
            if (this.testType === 'weekly' && this.weekNum) {
                this.user.progress.weeklyTests[`week${this.weekNum}`] = percentage;
            } else if (this.testType === 'mid') {
                this.user.progress.midTestScore = percentage;
            } else if (this.testType === 'final') {
                this.user.progress.finalExamScore = percentage;
            }
            
            let msg = "You have successfully passed the test!";
            if (typeof gamification !== 'undefined') {
                let xpRes = gamification.addXP(this.user.progress, 100);
                let newBadges = gamification.evaluateBadges(this.user.progress, percentage);
                
                if (xpRes.leveledUp) {
                    gamification.playLevelUp();
                    msg += `<br><strong style="color:var(--primary-color);">Wow! You reached Level ${xpRes.level}!</strong>`;
                } else {
                    gamification.shootConfetti();
                }

                msg += `<br>+100 XP earned!`;
                if (newBadges.length > 0) msg += `<br><span style="color:var(--warning-color)"><i class="fa-solid fa-medal"></i> New Badges: ${newBadges.join(', ')}</span>`;
                document.getElementById('resultMessage').innerHTML = msg;
            }

            auth.updateUserProgress({
                weeklyTests: this.user.progress.weeklyTests,
                midTestScore: this.user.progress.midTestScore,
                finalExamScore: this.user.progress.finalExamScore,
                xp: this.user.progress.xp,
                level: this.user.progress.level,
                badges: this.user.progress.badges
            });

        } else {
            document.getElementById('resultTitle').innerText = "Keep Practicing";
            document.getElementById('resultMessage').innerText = "You need a score of 80% or higher to pass. You can retry the test from the dashboard.";
            scoreCircle.classList.add('fail');
        }

        // Render Review
        const reviewBox = document.getElementById('reviewAnswers');
        reviewBox.innerHTML = '<h3>Review your answers:</h3>';
        this.userAnswers.forEach((ans, idx) => {
            const div = document.createElement('div');
            div.className = `review-item ${ans.isCorrect ? 'correct' : 'incorrect'}`;
            div.innerHTML = `
                <h4>Q${idx + 1}: ${ans.question}</h4>
                <p class="user-ans"><i class="fa-solid ${ans.isCorrect ? 'fa-check' : 'fa-xmark'}"></i> Your answer: ${ans.userAnswer}</p>
                ${!ans.isCorrect ? `<p class="correct-ans">Expected: ${ans.correctShow}</p>` : ''}
            `;
            reviewBox.appendChild(div);
        });

        this.switchView('resultView');
    }
}

const testApp = new TestApp();
