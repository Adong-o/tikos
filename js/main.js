// Pizza Data
const pizzas = [
    {
        id: 1,
        name: "Classic Margherita",
        description: "Fresh tomatoes, mozzarella, basil, and olive oil",
        price: 1200,
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=800&q=80",
        rating: 4.5
    },
    {
        id: 2,
        name: "Pepperoni Supreme",
        description: "Loaded with pepperoni, mozzarella, and special sauce",
        price: 1400,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
        rating: 4.8
    },
    {
        id: 3,
        name: "Meat Lovers",
        description: "Pepperoni, sausage, bacon, ground beef, and ham",
        price: 1700,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
        rating: 4.9
    },
    {
        id: 4,
        name: "BBQ Chicken",
        description: "Grilled chicken, BBQ sauce, onions, and cilantro",
        price: 1500,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
        rating: 4.6
    }
];

// Cart functionality
let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    cart = savedCart ? JSON.parse(savedCart) : [];
    updateCartCount();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in UI
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Add item to cart
function addToCart(pizzaId) {
    const pizza = pizzas.find(item => item.id === parseInt(pizzaId));
    
    if (pizza) {
        cart.push({
            id: Date.now(),
            pizza: pizza,
            quantity: 1
        });
        saveCart();
        updateCartUI();
    }
}

// Update cart UI
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cartItems) {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.pizza.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.pizza.name}</h4>
                    <p>Ksh. ${item.pizza.price}</p>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
            `;
            cartItems.appendChild(cartItem);
        });

        if (cartTotal) {
            cartTotal.textContent = `Ksh. ${total}`;
        }
    }
}

// Update item quantity
function updateQuantity(itemId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(itemId);
        return;
    }

    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
        saveCart();
        updateCartUI();
    }
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartUI();
}

// Cart sidebar functionality
document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.getElementById('cartButton');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const overlay = document.getElementById('overlay');

    if (cartButton && cartSidebar && closeCart && overlay) {
        cartButton.addEventListener('click', function(e) {
            e.preventDefault();
            cartSidebar.classList.add('active');
            overlay.classList.add('active');
            updateCartUI();
        });

        closeCart.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
        });

        overlay.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Initialize cart
    loadCart();
});

// Menu navigation
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
});

// Display Popular Pizzas
function displayPopularPizzas() {
    const popularPizzasElement = document.getElementById('popularPizzas');
    if (popularPizzasElement) {
        popularPizzasElement.innerHTML = pizzas.map(pizza => `
            <div class="pizza-card card-hover">
                <img src="${pizza.image}" alt="${pizza.name}">
                <div class="pizza-card-content">
                    <h3>${pizza.name}</h3>
                    <p>${pizza.description}</p>
                </div>
                <div class="pizza-card-footer">
                    <span class="price">Ksh. ${pizza.price}</span>
                    <button class="btn btn-primary" onclick="addToCart(${pizza.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    displayPopularPizzas();
});

// Loading Bar Animation
function showLoading() {
    const loadingBar = document.getElementById('loadingBar');
    if (loadingBar) {
        loadingBar.style.width = '0%';
        setTimeout(() => {
            loadingBar.style.width = '70%';
        }, 10);
        setTimeout(() => {
            loadingBar.style.width = '100%';
        }, 300);
        setTimeout(() => {
            loadingBar.style.width = '0%';
        }, 600);
    }
}

// Page Load Animation
document.addEventListener('DOMContentLoaded', () => {
    showLoading();
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Page Transitions
window.addEventListener('pageshow', showLoading);

// Handle Navigation
const links = document.querySelectorAll('a[href]');
links.forEach(link => {
    if (!link.href.startsWith('#') && !link.href.includes('tel:') && !link.href.includes('mailto:')) {
        link.addEventListener('click', (e) => {
            const isExternalLink = link.hostname !== window.location.hostname;
            if (!isExternalLink) {
                e.preventDefault();
                showLoading();
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            }
        });
    }
});
