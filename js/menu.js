// Menu Items Data
const menuItems = [
    {
        id: 1,
        name: "Classic Margherita",
        description: "Fresh tomatoes, mozzarella, basil, and olive oil",
        price: 1200,
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&auto=format&fit=crop",
        category: "vegetarian"
    },
    {
        id: 2,
        name: "Pepperoni Supreme",
        description: "Loaded with pepperoni, mozzarella, and special sauce",
        price: 1400,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&auto=format&fit=crop",
        category: "meat"
    },
    {
        id: 3,
        name: "Meat Lovers",
        description: "Pepperoni, sausage, bacon, ground beef, and ham",
        price: 1700,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop",
        category: "meat"
    },
    {
        id: 4,
        name: "BBQ Chicken",
        description: "Grilled chicken, BBQ sauce, onions, and cilantro",
        price: 1500,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop",
        category: "specialty"
    },
    {
        id: 5,
        name: "Vegetarian Supreme",
        description: "Mushrooms, bell peppers, onions, olives, and tomatoes",
        price: 1300,
        image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&auto=format&fit=crop",
        category: "vegetarian"
    },
    {
        id: 6,
        name: "Hawaiian",
        description: "Ham, pineapple, and extra cheese",
        price: 1400,
        image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=600&auto=format&fit=crop",
        category: "specialty"
    }
];

// Menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuGrid = document.getElementById('menuGrid');
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loadingBar = document.getElementById('loadingBar');
    let currentFilter = 'all';
    let searchQuery = '';

    // Hide loading bar
    if (loadingBar) {
        loadingBar.style.display = 'none';
    }

    // Display menu items
    function displayMenuItems(items) {
        if (!menuGrid) return;

        if (items.length === 0) {
            menuGrid.innerHTML = `
                <div class="no-results">
                    <h3>No pizzas found</h3>
                    <p>Try adjusting your search or filter</p>
                </div>
            `;
            return;
        }

        menuGrid.innerHTML = items.map(item => `
            <div class="pizza-card card-hover">
                <img src="${item.image}" alt="${item.name}" 
                     onerror="this.src='./images/pizza-placeholder.jpg'"
                     loading="lazy">
                <div class="pizza-card-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="pizza-card-footer">
                        <span class="price">Ksh. ${item.price}</span>
                        <button class="btn btn-primary" onclick="addToCart(${item.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Filter menu items
    function filterMenuItems() {
        let filteredItems = menuItems;

        // Apply category filter
        if (currentFilter !== 'all') {
            filteredItems = filteredItems.filter(item => item.category === currentFilter);
        }

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredItems = filteredItems.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
            );
        }

        displayMenuItems(filteredItems);
    }

    // Initialize menu
    displayMenuItems(menuItems);

    // Setup filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update filter and refresh display
            currentFilter = this.dataset.category;
            filterMenuItems();
        });
    });

    // Setup search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchQuery = this.value;
            filterMenuItems();
        });
    }
});
