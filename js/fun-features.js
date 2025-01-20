// Fun Features and Achievements
const funFeatures = {
    achievements: [
        { id: 'first_order', title: 'First Slice!', description: 'Placed your first order', icon: '🎉' },
        { id: 'pizza_master', title: 'Pizza Master', description: 'Tried 5 different pizzas', icon: '👨‍🍳' },
        { id: 'loyal_customer', title: 'Loyal Customer', description: 'Visited 5 times', icon: '💝' },
        { id: 'party_order', title: 'Party Master', description: 'Ordered more than 5 pizzas at once', icon: '🎪' }
    ],

    init() {
        this.setupAchievements();
        this.setupFunInteractions();
        this.setupSeasonalThemes();
    },

    setupAchievements() {
        // Track visits
        let visits = parseInt(localStorage.getItem('visits') || '0');
        visits++;
        localStorage.setItem('visits', visits);

        if (visits === 1) {
            this.unlockAchievement('first_order');
        }
        if (visits === 5) {
            this.unlockAchievement('loyal_customer');
        }

        // Track unique pizzas ordered
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                let orderedPizzas = JSON.parse(localStorage.getItem('orderedPizzas') || '[]');
                const pizzaId = e.target.dataset.pizzaId;
                
                if (!orderedPizzas.includes(pizzaId)) {
                    orderedPizzas.push(pizzaId);
                    localStorage.setItem('orderedPizzas', JSON.stringify(orderedPizzas));
                    
                    if (orderedPizzas.length === 5) {
                        this.unlockAchievement('pizza_master');
                    }
                }

                this.addToCartAnimation(e.target);
            });
        });
    },

    unlockAchievement(achievementId) {
        const achievement = this.achievements.find(a => a.id === achievementId);
        const badge = document.createElement('div');
        badge.className = 'achievement-badge';
        badge.innerHTML = `
            <i>${achievement.icon}</i>
            <div>
                <h4>${achievement.title}</h4>
                <p>${achievement.description}</p>
            </div>
        `;
        document.body.appendChild(badge);
        this.createConfetti();
        
        setTimeout(() => badge.remove(), 5000);
    },

    createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.background = ['#ff6b6b', '#ffd93d', '#6c5ce7', '#a8e6cf'][Math.floor(Math.random() * 4)];
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }
    },

    setupFunInteractions() {
        // Pizza cursor
        document.body.classList.add('pizza-cursor');

        // Add pizza size visualizer
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            const sizeVisualizer = document.createElement('div');
            sizeVisualizer.className = 'size-visualizer';
            sizeVisualizer.innerHTML = `
                <div class="pizza-size" style="--size: 100px">Small</div>
                <div class="pizza-size" style="--size: 150px">Medium</div>
                <div class="pizza-size" style="--size: 200px">Large</div>
            `;
            item.appendChild(sizeVisualizer);
        });

        // Add hover sound effect
        const audio = new Audio('assets/sounds/sizzle.mp3');
        menuItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                audio.currentTime = 0;
                audio.volume = 0.2;
                audio.play();
            });
        });
    },

    setupSeasonalThemes() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🎨';
        document.body.appendChild(themeToggle);

        const themes = [
            { name: 'default', icon: '🎨' },
            { name: 'christmas', icon: '🎄' },
            { name: 'halloween', icon: '🎃' },
            { name: 'valentine', icon: '💝' }
        ];

        let currentTheme = 0;
        themeToggle.addEventListener('click', () => {
            currentTheme = (currentTheme + 1) % themes.length;
            document.body.className = themes[currentTheme].name;
            themeToggle.innerHTML = themes[currentTheme].icon;
        });
    },

    addToCartAnimation(button) {
        const cart = document.querySelector('.cart-icon');
        const buttonRect = button.getBoundingClientRect();
        const cartRect = cart.getBoundingClientRect();

        const pizza = document.createElement('div');
        pizza.innerHTML = '🍕';
        pizza.style.position = 'fixed';
        pizza.style.left = buttonRect.left + 'px';
        pizza.style.top = buttonRect.top + 'px';
        pizza.style.fontSize = '2rem';
        pizza.style.transition = 'all 0.5s ease';
        document.body.appendChild(pizza);

        setTimeout(() => {
            pizza.style.left = cartRect.left + 'px';
            pizza.style.top = cartRect.top + 'px';
            pizza.style.transform = 'scale(0)';
        }, 50);

        setTimeout(() => {
            pizza.remove();
            cart.classList.add('cart-item-added');
            setTimeout(() => cart.classList.remove('cart-item-added'), 500);
        }, 500);
    }
};

// Initialize fun features
document.addEventListener('DOMContentLoaded', () => funFeatures.init());
