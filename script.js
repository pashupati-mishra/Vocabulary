const vocabData = {
    1: [
        { word: "Abundant", meaning_en: "More than enough", meaning_hi: "प्रचुर मात्रा में", sentence: "There was abundant food at the party.", synonyms: [{word: "Plentiful", meaning_hi: "बहुतायत"}], antonyms: [{word: "Scarce", meaning_hi: "कमी"}], pronunciation: "uh-buhn-duhnt", memory_trick: "Abundant sounds like 'a bundle' → bundle means a lot" },
        { word: "Diligent", meaning_en: "Hardworking and careful", meaning_hi: "मेहनती", sentence: "She is a diligent student who always does her homework.", synonyms: [{word: "Industrious", meaning_hi: "परिश्रमी"}], antonyms: [{word: "Lazy", meaning_hi: "आलसी"}], pronunciation: "dil-i-juhnt", memory_trick: "Diligent -> Delhi+Gent (gentlemen in Delhi are hardworking)" },
        { word: "Lucid", meaning_en: "Easy to understand, clear", meaning_hi: "स्पष्ट", sentence: "The teacher gave a lucid explanation of the topic.", synonyms: [{word: "Clear", meaning_hi: "साफ़"}], antonyms: [{word: "Confusing", meaning_hi: "भ्रमित"}], pronunciation: "loo-sid", memory_trick: "Lucid -> Look and See it -> visible and clear" },
        { word: "Obsolete", meaning_en: "No longer in use", meaning_hi: "अप्रचलित", sentence: "Typewriters are now obsolete.", synonyms: [{word: "Outdated", meaning_hi: "पुराना"}], antonyms: [{word: "Modern", meaning_hi: "आधुनिक"}], pronunciation: "ob-suh-leet", memory_trick: "Obsolete -> 'ab so late' -> It is too late, it's outdated" },
        { word: "Candid", meaning_en: "Honest and telling the truth", meaning_hi: "स्पष्टवादी", sentence: "Please be candid with your feedback.", synonyms: [{word: "Frank", meaning_hi: "साफ़-साफ़"}], antonyms: [{word: "Secretive", meaning_hi: "रहस्यमयी"}], pronunciation: "kan-did", memory_trick: "Candies -> Kids love candies and are always honest/candid" }
    ],
    2: [
        { word: "Tenacious", meaning_en: "Not easily giving up", meaning_hi: "दृढ़", sentence: "The tenacious athlete refused to quit.", synonyms: [{word: "Persistent", meaning_hi: "लगातार"}], antonyms: [{word: "Weak", meaning_hi: "कमज़ोर"}], pronunciation: "tuh-nay-shuhs", memory_trick: "Tenacious -> Ten Ashes -> fighting even after burning 10 times" },
        { word: "Meticulous", meaning_en: "Showing great attention to detail", meaning_hi: "अत्यंत सावधान", sentence: "He is meticulous about keeping his desk clean.", synonyms: [{word: "Careful", meaning_hi: "सावधान"}], antonyms: [{word: "Careless", meaning_hi: "लापरवाह"}], pronunciation: "muh-tik-yuh-luhs", memory_trick: "Meticulous -> Metric Calculate -> exact calculation requires attention" },
        { word: "Inevitable", meaning_en: "Certain to happen", meaning_hi: "अपरिहार्य", sentence: "Making mistakes is an inevitable part of learning.", synonyms: [{word: "Unavoidable", meaning_hi: "अनिवार्य"}], antonyms: [{word: "Preventable", meaning_hi: "रुकने योग्य"}], pronunciation: "in-ev-i-tuh-buhl", memory_trick: "In Every Table -> something present everywhere, cannot be avoided" },
        { word: "Pragmatic", meaning_en: "Solving problems practically", meaning_hi: "व्यावहारिक", sentence: "We need a pragmatic approach to solve this issue.", synonyms: [{word: "Practical", meaning_hi: "यथार्थवादी"}], antonyms: [{word: "Idealistic", meaning_hi: "आदर्शवादी"}], pronunciation: "prag-mat-ik", memory_trick: "Pragmatic -> Practical + Automatic" },
        { word: "Resilient", meaning_en: "Able to recover quickly", meaning_hi: "लचीला", sentence: "Children are often very resilient.", synonyms: [{word: "Tough", meaning_hi: "मज़बूत"}], antonyms: [{word: "Fragile", meaning_hi: "नाज़ुक"}], pronunciation: "ri-zil-yuhnt", memory_trick: "Resilient -> Re-Silent -> become quiet/normal again quickly" }
    ],
    3: [
        { word: "Amicable", meaning_en: "Friendly and peaceable", meaning_hi: "मैत्रीपूर्ण", sentence: "They reached an amicable agreement.", synonyms: [{word: "Friendly", meaning_hi: "दोस्ताना"}], antonyms: [{word: "Hostile", meaning_hi: "शत्रुतापूर्ण"}], pronunciation: "am-i-kuh-buhl", memory_trick: "Amicable -> Ami (friend) + Cable -> Friendly connection" },
        { word: "Vibrant", meaning_en: "Full of energy and life", meaning_hi: "जीवंत", sentence: "Hong Kong is a vibrant city.", synonyms: [{word: "Lively", meaning_hi: "ज़िंदादिल"}], antonyms: [{word: "Dull", meaning_hi: "सुस्त"}], pronunciation: "vahy-bruhnt", memory_trick: "Vibrant -> Vibrating -> full of energy" },
        { word: "Profound", meaning_en: "Very great or intense", meaning_hi: "गहरा", sentence: "The speech had a profound impact on me.", synonyms: [{word: "Deep", meaning_hi: "गहरा"}], antonyms: [{word: "Superficial", meaning_hi: "सतही"}], pronunciation: "pruh-found", memory_trick: "Profound -> Pro + Found -> found something deep" },
        { word: "Serene", meaning_en: "Calm and peaceful", meaning_hi: "शांत", sentence: "The lake was completely serene.", synonyms: [{word: "Calm", meaning_hi: "शांत"}], antonyms: [{word: "Turbulent", meaning_hi: "अशांत"}], pronunciation: "suh-reen", memory_trick: "Serene -> Siren-free -> peaceful and no sirens" },
        { word: "Versatile", meaning_en: "Able to adapt to many functions", meaning_hi: "बहुमुखी", sentence: "Eggs are a very versatile food.", synonyms: [{word: "Adaptable", meaning_hi: "अनुकूल"}], antonyms: [{word: "Limited", meaning_hi: "सीमित"}], pronunciation: "vur-suh-tl", memory_trick: "Versatile -> Various styles" }
    ],
    4: [
        { word: "Lethargic", meaning_en: "Sluggish and apathetic", meaning_hi: "सुस्त", sentence: "I feel lethargic after eating a large meal.", synonyms: [{word: "Sluggish", meaning_hi: "आलसी"}], antonyms: [{word: "Energetic", meaning_hi: "ऊर्जावान"}], pronunciation: "luh-thahr-jik", memory_trick: "Let + target -> let go of target, become lethargic" },
        { word: "Impeccable", meaning_en: "Without any flaws", meaning_hi: "त्रुटिहीन", sentence: "He has impeccable taste in music.", synonyms: [{word: "Flawless", meaning_hi: "दोषरहित"}], antonyms: [{word: "Imperfect", meaning_hi: "अपूर्ण"}], pronunciation: "im-pek-uh-buhl", memory_trick: "Im (no) + pecc (mistake) -> without mistake" },
        { word: "Frugal", meaning_en: "Economical with money", meaning_hi: "मितव्ययी", sentence: "He leads a frugal lifestyle to save money.", synonyms: [{word: "Thrifty", meaning_hi: "किफायती"}], antonyms: [{word: "Extravagant", meaning_hi: "फिजूलखर्च"}], pronunciation: "froo-guhl", memory_trick: "Frugal -> Free + Girl -> looks for free things" },
        { word: "Adequate", meaning_en: "Satisfactory in quantity", meaning_hi: "पर्याप्त", sentence: "This amount is adequate for our needs.", synonyms: [{word: "Sufficient", meaning_hi: "काफ़ी"}], antonyms: [{word: "Insufficient", meaning_hi: "अपर्याप्त"}], pronunciation: "ad-i-kwit", memory_trick: "Add + equate -> added enough to equate to need" },
        { word: "Ambiguous", meaning_en: "Open to more than one interpretation", meaning_hi: "अस्पष्ट", sentence: "The ending of the movie was ambiguous.", synonyms: [{word: "Unclear", meaning_hi: "अस्पष्ट"}], antonyms: [{word: "Clear", meaning_hi: "स्पष्ट"}], pronunciation: "am-big-yoo-uhs", memory_trick: "Ambi (both) + guess -> multiple guesses possible" }
    ],
    5: [
        { word: "Pivotal", meaning_en: "Of crucial importance", meaning_hi: "निर्णायक", sentence: "He played a pivotal role in the team's success.", synonyms: [{word: "Crucial", meaning_hi: "महत्वपूर्ण"}], antonyms: [{word: "Minor", meaning_hi: "मामूली"}], pronunciation: "piv-uh-tl", memory_trick: "Pivot -> central point on which things depend" },
        { word: "Audacious", meaning_en: "Showing willingness to take bold risks", meaning_hi: "निडर", sentence: "She made an audacious decision to quit her job.", synonyms: [{word: "Bold", meaning_hi: "साहसी"}], antonyms: [{word: "Timid", meaning_hi: "डरपोक"}], pronunciation: "aw-dey-shuhs", memory_trick: "Audio+cious -> loud and fearless" },
        { word: "Mitigate", meaning_en: "Make less severe", meaning_hi: "कम करना", sentence: "We must take action to mitigate climate change.", synonyms: [{word: "Reduce", meaning_hi: "घटाना"}], antonyms: [{word: "Aggravate", meaning_hi: "बिगाड़ना"}], pronunciation: "mit-i-geyt", memory_trick: "Miti (soil) + gate -> soil at gate prevents floods" },
        { word: "Eloquent", meaning_en: "Fluent or persuasive in speaking", meaning_hi: "वाक्पटु", sentence: "She gave an eloquent speech at the wedding.", synonyms: [{word: "Articulate", meaning_hi: "सुवक्ता"}], antonyms: [{word: "Inarticulate", meaning_hi: "अस्पष्ट"}], pronunciation: "el-uh-kwuhnt", memory_trick: "Elephant -> big and impressive, like eloquent speech" },
        { word: "Innovative", meaning_en: "Advanced and original", meaning_hi: "अभिनव", sentence: "The company is known for innovative products.", synonyms: [{word: "Inventive", meaning_hi: "रचनात्मक"}], antonyms: [{word: "Traditional", meaning_hi: "पारंपरिक"}], pronunciation: "in-uh-vey-tiv", memory_trick: "Inno (new) + vative (way) -> new way" }
    ]
};

const quizData = {
    1: [
        { type: "mcq", question: "What is the meaning of 'Abundant'?", options: ["More than enough", "Very small amount", "Angry", "Lazy"], answer: 0 },
        { type: "mcq", question: "Which word is the opposite of 'Lazy'?", options: ["Obsolete", "Diligent", "Candid", "Lucid"], answer: 1 },
        { type: "mcq", question: "A teacher gave a _____ explanation.", options: ["Diligent", "Lucid", "Abundant", "Obsolete"], answer: 1 },
        { type: "mcq", question: "'Outdated' is a synonym for which word?", options: ["Candid", "Diligent", "Lucid", "Obsolete"], answer: 3 },
        { type: "mcq", question: "Someone who is completely honest is...", options: ["Candid", "Abundant", "Obsolete", "Diligent"], answer: 0 },
        { type: "sentence", question: "Use the word 'Diligent' in a simple sentence.", keyword: "diligent", example: "He is a diligent worker." },
        { type: "sentence", question: "Make a sentence using 'Abundant'.", keyword: "abundant", example: "We have an abundant supply of water." }
    ],
    2: [
        { type: "mcq", question: "What does 'Tenacious' mean?", options: ["Giving up easily", "Not giving up easily", "Very weak", "Angry"], answer: 1 },
        { type: "mcq", question: "Which word means 'certain to happen'?", options: ["Inevitable", "Meticulous", "Pragmatic", "Resilient"], answer: 0 },
        { type: "mcq", question: "If you pay attention to details, you are...", options: ["Resilient", "Meticulous", "Pragmatic", "Tenacious"], answer: 1 },
        { type: "mcq", question: "'Practical' is a synonym for...", options: ["Pragmatic", "Resilient", "Meticulous", "Inevitable"], answer: 0 },
        { type: "mcq", question: "Which word means to recover quickly?", options: ["Resilient", "Meticulous", "Pragmatic", "Inevitable"], answer: 0 },
        { type: "sentence", question: "Use 'Inevitable' in a simple sentence.", keyword: "inevitable", example: "Change is inevitable." },
        { type: "sentence", question: "Write a sentence using 'Meticulous'.", keyword: "meticulous", example: "She is a meticulous painter." }
    ],
    3: [
        { type: "mcq", question: "What does 'Amicable' mean?", options: ["Hostile", "Friendly", "Slow", "Angry"], answer: 1 },
        { type: "mcq", question: "Which word means 'calm and peaceful'?", options: ["Vibrant", "Profound", "Serene", "Versatile"], answer: 2 },
        { type: "mcq", question: "A city full of energy is...", options: ["Serene", "Amicable", "Vibrant", "Profound"], answer: 2 },
        { type: "mcq", question: "If someone can adapt to many functions, they are...", options: ["Versatile", "Serene", "Profound", "Vibrant"], answer: 0 },
        { type: "mcq", question: "The opposite of 'Superficial' is...", options: ["Serene", "Amicable", "Profound", "Versatile"], answer: 2 },
        { type: "sentence", question: "Use 'Serene' in a simple sentence.", keyword: "serene", example: "The beach was very serene at dawn." },
        { type: "sentence", question: "Write a sentence using 'Versatile'.", keyword: "versatile", example: "The smartphone is a versatile device." }
    ],
    4: [
        { type: "mcq", question: "What does 'Lethargic' mean?", options: ["Energetic", "Sluggish", "Happy", "Fast"], answer: 1 },
        { type: "mcq", question: "Which word means 'without any flaws'?", options: ["Impeccable", "Frugal", "Adequate", "Ambiguous"], answer: 0 },
        { type: "mcq", question: "Someone who is economical with money is...", options: ["Ambiguous", "Adequate", "Frugal", "Impeccable"], answer: 2 },
        { type: "mcq", question: "If something is 'unclear', it is...", options: ["Ambiguous", "Adequate", "Impeccable", "Lethargic"], answer: 0 },
        { type: "mcq", question: "What is a synonym for 'Sufficient'?", options: ["Adequate", "Frugal", "Lethargic", "Ambiguous"], answer: 0 },
        { type: "sentence", question: "Use 'Frugal' in a simple sentence.", keyword: "frugal", example: "He lived a frugal life to save money." },
        { type: "sentence", question: "Write a sentence using 'Impeccable'.", keyword: "impeccable", example: "Her manners are impeccable." }
    ],
    5: [
        { type: "mcq", question: "What does 'Pivotal' mean?", options: ["Minor", "Important", "Ugly", "Slow"], answer: 1 },
        { type: "mcq", question: "Which word means 'to make less severe'?", options: ["Mitigate", "Audacious", "Eloquent", "Innovative"], answer: 0 },
        { type: "mcq", question: "Someone who takes bold risks is...", options: ["Audacious", "Eloquent", "Innovative", "Pivotal"], answer: 0 },
        { type: "mcq", question: "An 'articulate' speaker is...", options: ["Eloquent", "Mitigate", "Innovative", "Pivotal"], answer: 0 },
        { type: "mcq", question: "Which word means 'advanced and original'?", options: ["Innovative", "Mitigate", "Eloquent", "Audacious"], answer: 0 },
        { type: "sentence", question: "Use 'Mitigate' in a simple sentence.", keyword: "mitigate", example: "We need plans to mitigate the damage." },
        { type: "sentence", question: "Write a sentence using 'Innovative'.", keyword: "innovative", example: "The team proposed an innovative solution." }
    ]
};

class VocabApp {
    constructor() {
        auth.requireAuth();
        this.user = auth.getCurrentUser();
        this.totalDays = 100;
        
        const progress = this.user.progress || {};
        this.unlockedDay = progress.unlockedDay || 1;
        this.scores = progress.scores || {};
        this.theme = localStorage.getItem('vocabTheme') || 'light';
        
        this.currentDay = 1;
        this.currentWordIndex = 0;
        
        this.currentQuizQuestions = [];
        this.currentQuizIndex = 0;
        this.userAnswers = [];
        this.currentScore = 0;

        this.init();
    }

    init() {
        this.applyTheme();
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        document.getElementById('btnStartToday').addEventListener('click', () => this.startLesson(this.currentDay));
        document.getElementById('btnNextWord').addEventListener('click', () => this.handleNextWord());
        document.getElementById('btnPrevWord').addEventListener('click', () => this.handlePrevWord());
        document.getElementById('btnSubmitQuizAnswer').addEventListener('click', () => this.submitQuizAnswer());
        document.getElementById('btnNextQuizQuestion').addEventListener('click', () => this.handleNextQuizQuestion());
        document.getElementById('btnResultAction').addEventListener('click', () => this.handleResultAction());

        const params = new URLSearchParams(window.location.search);
        let day = parseInt(params.get('day'));
        
        if (!day || day > this.unlockedDay || day > this.totalDays) {
            this.goToDashboard();
            return;
        }

        this.handleDaySelect(day);
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

    goToDashboard() {
        window.location.href = 'dashboard.html';
    }

    handleDaySelect(day) {
        this.currentDay = day;
        this.currentWordIndex = 0;
        
        // Ensure data is mocked for unprovided days > 5 for this demo
        if (!vocabData[day]) {
            alert(`Demo limits: Content for Day ${day} is not fully loaded. Resetting to day 1.`);
            return;
        }

        // If there is a previous day, show revision
        if (day > 1) {
            this.showRevision(day - 1);
        } else {
            this.startLesson(day);
        }
    }

    showRevision(prevDayNum) {
        document.getElementById('revisionDayNum').innerText = prevDayNum;
        const grid = document.getElementById('revisionGrid');
        grid.innerHTML = '';
        
        const prevWords = vocabData[prevDayNum] || [];
        prevWords.forEach(w => {
            const card = document.createElement('div');
            card.classList.add('revision-card');
            card.innerHTML = `
                <h3>${w.word}</h3>
                <p class="rev-en">${w.meaning_en}</p>
                <p class="rev-hi">${w.meaning_hi}</p>
            `;
            grid.appendChild(card);
        });

        this.switchView('revisionView');
    }

    startLesson(day) {
        this.currentDay = day;
        this.currentWordIndex = 0;
        document.getElementById('learningDayNum').innerText = day;
        this.renderWord();
        this.switchView('learningView');
    }

    renderWord() {
        const words = vocabData[this.currentDay];
        const wordObj = words[this.currentWordIndex];
        
        document.getElementById('wordProgressIndicator').innerText = `${this.currentWordIndex + 1} / ${words.length}`;
        
        const card = document.getElementById('wordCard');
        card.innerHTML = `
            <div class="word-header">
                <div>
                    <h2 class="word-title">${wordObj.word}</h2>
                    <p class="pronunciation">[ ${wordObj.pronunciation} ]</p>
                </div>
                <button class="btn-audio" onclick="app.playAudio('${wordObj.word}')"><i class="fa-solid fa-volume-high"></i></button>
            </div>
            <div class="meaning-section">
                <p class="meaning-en">${wordObj.meaning_en}</p>
                <p class="meaning-hi">${wordObj.meaning_hi}</p>
            </div>
            <div class="example-box">
                <h4><i class="fa-solid fa-quote-left"></i> Example</h4>
                <p>${wordObj.sentence}</p>
            </div>
            <div class="memory-box">
                <h4><i class="fa-solid fa-lightbulb"></i> Memory Trick</h4>
                <p>${wordObj.memory_trick}</p>
            </div>
            <div class="syn-ant-box">
                <div class="synonyms">
                    <h4><i class="fa-solid fa-plus"></i> Synonyms</h4>
                    ${wordObj.synonyms.map(s => `<p>${s.word} <span class="meaning-hi">(${s.meaning_hi})</span></p>`).join('')}
                </div>
                <div class="antonyms">
                    <h4><i class="fa-solid fa-minus"></i> Antonyms</h4>
                    ${wordObj.antonyms.map(a => `<p>${a.word} <span class="meaning-hi">(${a.meaning_hi})</span></p>`).join('')}
                </div>
            </div>
        `;

        document.getElementById('btnPrevWord').disabled = this.currentWordIndex === 0;
        
        if (this.currentWordIndex === words.length - 1) {
            document.getElementById('btnNextWord').innerHTML = 'Start Quiz <i class="fa-solid fa-flag-checkered"></i>';
        } else {
            document.getElementById('btnNextWord').innerHTML = 'Next <i class="fa-solid fa-arrow-right"></i>';
        }
    }

    handleNextWord() {
        const words = vocabData[this.currentDay];
        if (this.currentWordIndex < words.length - 1) {
            this.currentWordIndex++;
            this.renderWord();
        } else {
            this.startQuiz();
        }
    }

    handlePrevWord() {
        if (this.currentWordIndex > 0) {
            this.currentWordIndex--;
            this.renderWord();
        }
    }

    playAudio(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            speechSynthesis.speak(utterance);
        } else {
            alert("Sorry, your browser doesn't support text to speech!");
        }
    }

    buildQuizPool() {
        // Build cumulative word pool from Day 1 to Day currentDay-1 to mix into current day's quiz exercises
        // In a real cumulative system we would randomly pick questions from the daily pool + past pool.
        // For now, we will just load the questions defined for the current day.
        let questions = quizData[this.currentDay] || [];
        return questions;
    }

    startQuiz() {
        this.currentQuizQuestions = this.buildQuizPool();
        this.currentQuizIndex = 0;
        this.userAnswers = [];
        this.currentScore = 0;
        
        document.getElementById('quizDayNum').innerText = this.currentDay;
        this.renderQuizQuestion();
        this.switchView('quizView');
    }

    renderQuizQuestion() {
        const q = this.currentQuizQuestions[this.currentQuizIndex];
        document.getElementById('quizProgressIndicator').innerText = `${this.currentQuizIndex + 1} / ${this.currentQuizQuestions.length}`;
        
        const card = document.getElementById('quizCard');
        card.innerHTML = `<h3 class="question-text">${q.question}</h3>`;
        
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
        } else if (q.type === 'sentence') {
            const txtContainer = document.createElement('div');
            txtContainer.classList.add('text-input-container');
            const textarea = document.createElement('textarea');
            textarea.id = 'sentenceInput';
            textarea.placeholder = "Type your sentence here...";
            txtContainer.appendChild(textarea);
            card.appendChild(txtContainer);
        }

        const feedback = document.createElement('div');
        feedback.id = 'quizFeedback';
        feedback.classList.add('feedback-container');
        card.appendChild(feedback);

        document.getElementById('btnSubmitQuizAnswer').style.display = 'block';
        document.getElementById('btnNextQuizQuestion').style.display = 'none';
    }

    selectOption(btnSelected, index) {
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btnSelected.classList.add('selected');
        btnSelected.dataset.idx = index;
    }

    submitQuizAnswer() {
        const q = this.currentQuizQuestions[this.currentQuizIndex];
        let isCorrect = false;
        let userAnswerText = "";
        const feedback = document.getElementById('quizFeedback');

        if (q.type === 'mcq') {
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

        } else if (q.type === 'sentence') {
            const input = document.getElementById('sentenceInput').value.trim();
            if (!input) {
                alert("Please write a sentence!");
                return;
            }
            document.getElementById('sentenceInput').disabled = true;
            userAnswerText = input;
            
            if (input.toLowerCase().includes(q.keyword.toLowerCase())) {
                isCorrect = true;
                feedback.innerHTML = `<strong><i class="fa-solid fa-circle-check"></i> Good job!</strong><p>You correctly used the word "${q.keyword}".</p><p>Sample: ${q.example}</p>`;
                feedback.className = 'feedback-container show correct';
                if (typeof gamification !== 'undefined') gamification.playSuccess();
            } else {
                feedback.innerHTML = `<strong><i class="fa-solid fa-circle-xmark"></i> Keyword Missing.</strong><p>You didn't use the word "${q.keyword}" properly.</p><p>Sample: ${q.example}</p>`;
                feedback.className = 'feedback-container show incorrect';
                if (typeof gamification !== 'undefined') gamification.playError();
            }
        }

        if (isCorrect) this.currentScore++;

        this.userAnswers.push({
            question: q.question,
            userAnswer: userAnswerText,
            isCorrect: isCorrect,
            correctShow: q.type === 'mcq' ? q.options[q.answer] : `Used: ${q.keyword}`
        });

        document.getElementById('btnSubmitQuizAnswer').style.display = 'none';
        
        const nextBtn = document.getElementById('btnNextQuizQuestion');
        nextBtn.style.display = 'block';
        if (this.currentQuizIndex === this.currentQuizQuestions.length - 1) {
            nextBtn.innerHTML = 'See Results <i class="fa-solid fa-ribbon"></i>';
        } else {
            nextBtn.innerHTML = 'Next Question <i class="fa-solid fa-arrow-right"></i>';
        }
    }

    handleNextQuizQuestion() {
        if (this.currentQuizIndex < this.currentQuizQuestions.length - 1) {
            this.currentQuizIndex++;
            this.renderQuizQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        const total = this.currentQuizQuestions.length;
        const percentage = Math.round((this.currentScore / total) * 100);
        
        document.getElementById('scoreText').innerText = `${percentage}%`;
        const scoreCircle = document.getElementById('scoreCircle');
        scoreCircle.className = 'score-circle'; // reset
        
        let msg = "";
        let passed = false;
        if (percentage >= 80) {
            passed = true;
            document.getElementById('resultTitle').innerText = "Congratulations!";
            msg = `You mastered Day ${this.currentDay}!`;
            scoreCircle.classList.add('success');
            document.getElementById('btnResultAction').innerText = "Return to Dashboard";
            
            // Unlock logic
            if (this.currentDay === this.unlockedDay && this.unlockedDay < this.totalDays) {
                this.unlockedDay++;
                msg += `<br><span style="color:var(--success-color)">Day ${this.unlockedDay} is now unlocked!</span>`;
            }
            
            // Save score
            this.scores[`day${this.currentDay}`] = percentage;
            
            // Gamification
            let streakRes = {addedXP: 0, messages: []};
            let xpRes = {leveledUp: false};
            let newBadges = [];

            if (typeof gamification !== 'undefined') {
                streakRes = gamification.updateStreak(this.user.progress);
                xpRes = gamification.addXP(this.user.progress, 50 + streakRes.addedXP);
                newBadges = gamification.evaluateBadges(this.user.progress, percentage);
                
                if (xpRes.leveledUp) {
                    gamification.playLevelUp();
                    msg += `<br><strong style="color:var(--primary-color);">Wow! You reached Level ${xpRes.level}!</strong>`;
                } else {
                    gamification.shootConfetti();
                }

                msg += `<br>+${50 + streakRes.addedXP} XP earned!`;
                if (streakRes.messages.length > 0) msg += ` <small>${streakRes.messages.join(', ')}</small>`;
                if (newBadges.length > 0) msg += `<br><span style="color:var(--warning-color)"><i class="fa-solid fa-medal"></i> New Badges: ${newBadges.join(', ')}</span>`;
            }

            auth.updateUserProgress({
                unlockedDay: this.unlockedDay,
                scores: this.scores,
                xp: this.user.progress.xp,
                level: this.user.progress.level,
                streak: this.user.progress.streak,
                lastActivityDate: this.user.progress.lastActivityDate,
                badges: this.user.progress.badges
            });
        } else {
            document.getElementById('resultTitle').innerText = "Keep Practicing";
            msg = `You need 80% to unlock the next day. Review and try again!`;
            scoreCircle.classList.add('fail');
            document.getElementById('btnResultAction').innerText = "Try Again";
        }
        
        document.getElementById('resultMessage').innerHTML = msg;

        // Populate review answers
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

    handleResultAction() {
        const percentage = Math.round((this.currentScore / this.currentQuizQuestions.length) * 100);
        if (percentage >= 80) {
            this.goToDashboard();
        } else {
            // retry
            this.startQuiz();
        }
    }
}

// Initialize Application
const app = new VocabApp();
