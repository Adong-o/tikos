// Welcome Animation for First-Time Visitors
const welcomeAnimation = {
    init() {
        if (!localStorage.getItem('visitedBefore')) {
            this.createWelcomeScreen();
            localStorage.setItem('visitedBefore', 'true');
        }
    },

    createWelcomeScreen() {
        const welcomeScreen = document.createElement('div');
        welcomeScreen.className = 'welcome-screen';
        welcomeScreen.innerHTML = `
            <div class="pizza-builder">
                <h2>Welcome to Tiko's Pizza!</h2>
                <div class="pizza-canvas">
                    <div class="pizza-base"></div>
                    <div class="toppings-container"></div>
                </div>
                <p>Build your dream pizza to continue...</p>
                <div class="topping-options">
                    <button data-topping="pepperoni">🍕 Add Pepperoni</button>
                    <button data-topping="mushroom">🍄 Add Mushrooms</button>
                    <button data-topping="olive">🫒 Add Olives</button>
                </div>
                <button class="finish-pizza">Done! Let's Explore</button>
            </div>
        `;

        document.body.appendChild(welcomeScreen);
        this.addEventListeners(welcomeScreen);
    },

    addEventListeners(screen) {
        const toppingButtons = screen.querySelectorAll('[data-topping]');
        const finishButton = screen.querySelector('.finish-pizza');
        const toppingsContainer = screen.querySelector('.toppings-container');

        toppingButtons.forEach(button => {
            button.addEventListener('click', () => {
                const topping = button.dataset.topping;
                this.addTopping(toppingsContainer, topping);
            });
        });

        finishButton.addEventListener('click', () => {
            this.completeAnimation(screen);
        });
    },

    addTopping(container, type) {
        const positions = [
            { top: '20%', left: '30%' }, { top: '30%', left: '60%' },
            { top: '50%', left: '40%' }, { top: '40%', left: '70%' },
            { top: '60%', left: '50%' }, { top: '70%', left: '30%' }
        ];

        const topping = document.createElement('div');
        topping.className = `topping ${type}`;
        const pos = positions[Math.floor(Math.random() * positions.length)];
        topping.style.top = pos.top;
        topping.style.left = pos.left;
        container.appendChild(topping);

        // Add animation
        topping.animate([
            { transform: 'scale(0) rotate(180deg)' },
            { transform: 'scale(1) rotate(0deg)' }
        ], {
            duration: 500,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
    },

    completeAnimation(screen) {
        screen.classList.add('fade-out');
        setTimeout(() => {
            screen.remove();
            this.showWelcomeMessage();
        }, 1000);
    },

    showWelcomeMessage() {
        const message = document.createElement('div');
        message.className = 'welcome-message';
        message.innerHTML = `
            <div class="message-content">
                <h3>Your Adventure Begins!</h3>
                <p>Get ready for a pizza experience like no other!</p>
            </div>
        `;
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 3000);
    }
};

// Initialize welcome animation
document.addEventListener('DOMContentLoaded', () => welcomeAnimation.init());
