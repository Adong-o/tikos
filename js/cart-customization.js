// Cart Customization System
const cartCustomization = {
    toppings: [
        { id: 'extra_cheese', name: 'Extra Cheese', price: 100, icon: '🧀' },
        { id: 'pepperoni', name: 'Pepperoni', price: 150, icon: '🍖' },
        { id: 'mushrooms', name: 'Mushrooms', price: 100, icon: '🍄' },
        { id: 'onions', name: 'Onions', price: 50, icon: '🧅' },
        { id: 'bell_peppers', name: 'Bell Peppers', price: 50, icon: '🫑' },
        { id: 'olives', name: 'Olives', price: 100, icon: '🫒' },
        { id: 'bacon', name: 'Bacon', price: 150, icon: '🥓' },
        { id: 'chicken', name: 'Grilled Chicken', price: 200, icon: '🍗' }
    ],

    drinks: [
        { id: 'coke', name: 'Coca Cola', price: 100, icon: '🥤' },
        { id: 'sprite', name: 'Sprite', price: 100, icon: '🥤' },
        { id: 'fanta', name: 'Fanta', price: 100, icon: '🥤' },
        { id: 'water', name: 'Mineral Water', price: 50, icon: '💧' }
    ],

    sizes: [
        { id: 'regular', name: 'Regular', price: 0 },
        { id: 'large', name: 'Large', price: 200 },
        { id: 'extra_large', name: 'Extra Large', price: 400 }
    ],

    currentPizza: null,
    modal: null,

    init() {
        this.modal = document.getElementById('customizationModal');
        this.setupEventListeners();
        this.populateCustomizationOptions();
    },

    setupEventListeners() {
        // Close modal button
        const closeBtn = document.getElementById('closeCustomization');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideModal());
        }

        // Skip customization button
        const skipBtn = document.getElementById('skipCustomization');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                this.addToCart({ size: 'regular', toppings: [], drinks: [] });
                this.hideModal();
            });
        }

        // Confirm customization button
        const confirmBtn = document.getElementById('confirmCustomization');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                const customizations = this.getCustomizations();
                this.addToCart(customizations);
                this.hideModal();
            });
        }

        // Setup price update listeners
        document.querySelectorAll('input[name="size"], input[name="toppings"], input[name="drinks"]')
            .forEach(input => {
                input.addEventListener('change', () => this.updateTotalPrice());
            });
    },

    populateCustomizationOptions() {
        // Populate toppings
        const toppingsGrid = document.getElementById('toppingsGrid');
        if (toppingsGrid) {
            toppingsGrid.innerHTML = this.toppings.map(topping => `
                <label class="topping-option">
                    <input type="checkbox" name="toppings" value="${topping.id}">
                    <span class="topping-label">
                        ${topping.icon} ${topping.name} (+Ksh. ${topping.price})
                    </span>
                </label>
            `).join('');
        }

        // Populate drinks
        const drinksGrid = document.getElementById('drinksGrid');
        if (drinksGrid) {
            drinksGrid.innerHTML = this.drinks.map(drink => `
                <label class="drink-option">
                    <input type="checkbox" name="drinks" value="${drink.id}">
                    <span class="drink-label">
                        ${drink.icon} ${drink.name} (+Ksh. ${drink.price})
                    </span>
                </label>
            `).join('');
        }
    },

    showModal(pizza) {
        this.currentPizza = pizza;
        if (this.modal) {
            // Update pizza details
            document.getElementById('pizzaImage').src = pizza.image;
            document.getElementById('pizzaName').textContent = pizza.name;
            document.getElementById('basePrice').textContent = `Ksh. ${pizza.price}`;
            
            // Reset form
            this.modal.querySelector('input[value="regular"]').checked = true;
            this.modal.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false);
            
            // Show modal
            this.modal.style.display = 'flex';
            this.updateTotalPrice();
        }
    },

    hideModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
        }
    },

    getCustomizations() {
        const size = document.querySelector('input[name="size"]:checked').value;
        const toppings = Array.from(document.querySelectorAll('input[name="toppings"]:checked'))
            .map(input => input.value);
        const drinks = Array.from(document.querySelectorAll('input[name="drinks"]:checked'))
            .map(input => input.value);

        return { size, toppings, drinks };
    },

    calculateTotal(customizations) {
        let total = this.currentPizza.price;

        // Add size price
        const selectedSize = this.sizes.find(s => s.id === customizations.size);
        total += selectedSize.price;

        // Add toppings price
        customizations.toppings.forEach(toppingId => {
            const topping = this.toppings.find(t => t.id === toppingId);
            if (topping) total += topping.price;
        });

        // Add drinks price
        customizations.drinks.forEach(drinkId => {
            const drink = this.drinks.find(d => d.id === drinkId);
            if (drink) total += drink.price;
        });

        return total;
    },

    updateTotalPrice() {
        if (!this.currentPizza) return;

        const customizations = this.getCustomizations();
        const total = this.calculateTotal(customizations);

        // Update size extra
        const selectedSize = this.sizes.find(s => s.id === customizations.size);
        document.getElementById('sizeExtra').textContent = `Ksh. ${selectedSize.price}`;

        // Update toppings total
        const toppingsTotal = customizations.toppings.reduce((sum, toppingId) => {
            const topping = this.toppings.find(t => t.id === toppingId);
            return sum + (topping ? topping.price : 0);
        }, 0);
        document.getElementById('toppingsTotal').textContent = `Ksh. ${toppingsTotal}`;

        // Update drinks total
        const drinksTotal = customizations.drinks.reduce((sum, drinkId) => {
            const drink = this.drinks.find(d => d.id === drinkId);
            return sum + (drink ? drink.price : 0);
        }, 0);
        document.getElementById('drinksTotal').textContent = `Ksh. ${drinksTotal}`;

        // Update total
        document.getElementById('customizationTotal').textContent = `Ksh. ${total}`;
    },

    addToCart(customizations) {
        if (!this.currentPizza) return;

        const cartItem = {
            id: Date.now(),
            pizza: this.currentPizza,
            customizations: customizations,
            quantity: 1,
            total: this.calculateTotal(customizations)
        };

        cart.push(cartItem);
        saveCart();
        updateCartUI();
        this.showNotification('Added to cart!');
    },

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
};

// Initialize cart customization
document.addEventListener('DOMContentLoaded', () => {
    cartCustomization.init();
    
    // Override the addToCart function in main.js
    window.addToCart = function(pizzaId) {
        const pizza = menuItems.find(item => item.id === parseInt(pizzaId)) || 
                     popularPizzas.find(item => item.id === parseInt(pizzaId));
        
        if (pizza) {
            cartCustomization.showModal(pizza);
        }
    };
});
