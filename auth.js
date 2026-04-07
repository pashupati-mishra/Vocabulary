class Auth {
    constructor() {
        this.usersKey = 'vocabUsers';
        this.sessionKey = 'loggedInUser';
        this.users = JSON.parse(localStorage.getItem(this.usersKey)) || [];
    }

    _saveUsers() {
        localStorage.setItem(this.usersKey, JSON.stringify(this.users));
    }

    _hashPassword(password) {
        // Basic mock hashing (base64 encode) for simple security as requested
        return btoa(password);
    }

    _generateId() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    }

    signup(name, email, password) {
        const existingUser = this.users.find(u => u.email === email);
        if (existingUser) {
            return { success: false, message: 'Email already registered.' };
        }

        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters long.' };
        }

        const newUser = {
            id: this._generateId(),
            name: name,
            email: email,
            password: this._hashPassword(password),
            progress: {
                currentDay: 1,
                unlockedDay: 1, // Using integer for easier logic
                scores: {}
            }
        };

        this.users.push(newUser);
        this._saveUsers();
        return { success: true, message: 'Registered successfully.' };
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email);
        if (!user) {
            return { success: false, message: 'User not found.' };
        }

        if (user.password !== this._hashPassword(password)) {
            return { success: false, message: 'Invalid password.' };
        }

        localStorage.setItem(this.sessionKey, user.id);
        return { success: true, user: user };
    }

    logout() {
        localStorage.removeItem(this.sessionKey);
        window.location.href = 'login.html';
    }

    getCurrentUser() {
        const userId = localStorage.getItem(this.sessionKey);
        if (!userId) return null;
        return this.users.find(u => u.id === userId) || null;
    }

    requireAuth() {
        if (!this.getCurrentUser()) {
            window.location.href = 'login.html';
        }
    }

    requireGuest() {
        if (this.getCurrentUser()) {
            window.location.href = 'dashboard.html';
        }
    }

    updateUserProgress(progressPatch) {
        const user = this.getCurrentUser();
        if (!user) return;
        
        user.progress = { ...user.progress, ...progressPatch };
        
        // Find index and update
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            this.users[index] = user;
            this._saveUsers();
        }
    }
}

// Global instance to use across scripts
const auth = new Auth();
