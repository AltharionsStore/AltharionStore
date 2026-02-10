fetch("products.json")
  .then(res => res.json())
  .then(data => {
    const featured = document.getElementById("featuredProducts");
    const random = document.getElementById("randomProducts");

    data.forEach(p => {
      const card = document.createElement("div");
      card.className = "product";
      card.innerHTML = `
        <img src="${p.image}">
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
        <div class="actions">
          <a class="chat" href="https://wa.me/${p.seller}">Chat</a>
          <a class="midman" href="https://wa.me/6283895335264">Midman</a>
        </div>
      `;

      p.featured ? featured.appendChild(card) : random.appendChild(card);
    });
  });

document.getElementById("gameMenuBtn").onclick = () =>
  document.getElementById("gameMenu").style.display = "block";

document.getElementById("mainMenuBtn").onclick = () =>
  document.getElementById("mainMenu").style.display = "block";        
        .notification-icon {
            font-size: 1.5rem;
            animation: pulse 1s infinite;
        }
        
        .notification-text {
            font-size: 0.9rem;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// ===== ANIMATED COUNTER =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start counter when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// ===== PRODUCT DATA WITH ANIME THEME =====
const animeProducts = [
    {
        id: 1,
        category: 'game',
        title: 'VALORANT RADIANT ACCOUNT',
        price: 'Rp 850.000',
        image: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        seller: '+6281234567891',
        midman: '+6289876543210',
        description: 'Radiant rank with ALL EPIC skins - Prime, Oni, Glitchpop. Full access, email changeable.',
        featured: true
    },
    {
        id: 2,
        category: 'item',
        title: 'GENSHIN IMPACT CRYSTALS',
        price: 'Rp 120.000',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        seller: '+6281234567892',
        midman: '+6289876543210',
        description: '6480 Genesis Crystals + bonus. Instant delivery, safe top-up method.',
        featured: true
    },
    {
        id: 3,
        category: 'game',
        title: 'MOBILE LEGENDS MYTHIC',
        price: 'Rp 450.000',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        seller: '+6281234567893',
        midman: '+6289876543210',
        description: 'Mythic 500+ points, 120+ skins including Legend & Collector. Moonton verified.',
        featured: true
    },
    {
        id: 4,
        category: 'item',
        title: 'FIFA ULTIMATE TEAM POINTS',
        price: 'Rp 650.000',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        seller: '+6281234567894',
        midman: '+6289876543210',
        description: '4600 FIFA Points for PS5/Xbox/PC. Instant delivery, account login method.',
        featured: false
    },
    {
        id: 5,
        category: 'jasa',
        title: 'VALORANT BOOSTING SERVICE',
        price: 'Rp 300.000',
        image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        seller: '+6281234567895',
        midman: '+6289876543210',
        description: 'Iron to Gold rank boost. Safe, no cheat, guaranteed no ban. 24-48 hours completion.',
        featured: false
    },
    {
        id: 6,
        category: 'item',
        title: 'STEAM WALLET ULTIMATE',
        price: 'Rp 750.000',
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        seller: '+6281234567896',
        midman: '+6289876543210',
        description: '$50 Steam Wallet Code. Works worldwide, instant code delivery via email.',
        featured: true
    },
    {
        id: 7,
        category: 'game',
        title: 'PUBG MOBILE CONQUEROR',
        price: 'Rp 600.000',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        seller: '+6281234567897',
        midman: '+6289876543210',
        description: 'Conqueror rank with legendary skins & 10K+ UC. Full access, safety guaranteed.',
        featured: false
    },
    {
        id: 8,
        category: 'jasa',
        title: 'GAME TOP-UP SERVICE',
        price: 'Rp 50.000',
        image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        seller: '+6281234567898',
        midman: '+6289876543210',
        description: 'All games top-up: MLBB, Free Fire, PUBG, Valorant, etc. 5-30 minutes delivery.',
        featured: false
    }
];

// ===== APPLICATION STATE =====
let products = [];
let filteredProducts = [];
let currentFilter = 'all';
let currentSearch = '';

// ===== DOM ELEMENTS =====
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menuToggle');
const productsContainer = document.getElementById('productsContainer');
const featuredPreview = document.getElementById('featuredPreview');
const filterTabs = document.querySelectorAll('.filter-tab');
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const currentYear = document.getElementById('currentYear');
const scrollTop = document.getElementById('scrollTop');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Initialize products
    initializeProducts();
    
    // Setup navigation
    setupNavigation();
    
    // Setup filters
    setupFilters();
    
    // Setup search
    setupSearch();
    
    // Setup scroll to top
    setupScrollTop();
    
    // Animate counters
    animateCounters();
    
    // Add random anime effects
    addAnimeEffects();
});

// ===== PRODUCT INITIALIZATION =====
function initializeProducts() {
    // For demo, use the animeProducts array
    // In production, this would fetch from products.json
    products = animeProducts;
    filteredProducts = [...products];
    
    // Render featured products
    renderFeaturedProducts();
    
    // Render all products
    renderProducts(products);
}

function renderFeaturedProducts() {
    if (!featuredPreview) return;
    
    const featured = products.filter(p => p.featured).slice(0, 3);
    
    if (featured.length === 0) {
        featuredPreview.innerHTML = '<p class="no-featured">No featured products available</p>';
        return;
    }
    
    featuredPreview.innerHTML = featured.map(product => `
        <div class="featured-card anime-card-float">
            <div class="featured-badge">🔥 FEATURED</div>
            <img src="${product.image}" alt="${product.title}" class="featured-image">
            <div class="featured-content">
                <h4 class="featured-title">${product.title}</h4>
                <div class="featured-price">${product.price}</div>
                <a href="#" class="btn btn-primary btn-small" onclick="showSection('shop'); highlightProduct(${product.id}); return false;">
                    <i class="fas fa-bolt"></i> VIEW DETAILS
                </a>
            </div>
        </div>
    `).join('');
}

function renderProducts(productsToRender) {
    if (!productsContainer) return;
    
    if (productsToRender.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products anime-slide-up">
                <div class="no-products-icon">🎮</div>
                <h3 class="no-products-title">NO PRODUCTS FOUND</h3>
                <p class="no-products-desc">Try adjusting your filters or search terms</p>
                <button class="btn btn-primary" onclick="clearFilters()">
                    <i class="fas fa-redo"></i> RESET FILTERS
                </button>
            </div>
        `;
        return;
    }
    
    productsContainer.innerHTML = productsToRender.map(product => `
        <div class="product-card anime-card-slide">
            <div class="product-badge ${product.category}">
                ${getCategoryIcon(product.category)} ${product.category.toUpperCase()}
            </div>
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-content">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">${product.price}</div>
                <p class="product-desc">${product.description}</p>
                
                <div class="product-meta">
                    <div class="meta-item">
                        <i class="fas fa-user-ninja"></i>
                        <span>${getCategoryName(product.category)}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-bolt"></i>
                        <span>INSTANT DELIVERY</span>
                    </div>
                </div>
                
                <div class="product-buttons">
                    <a href="https://wa.me/${product.seller.replace(/\D/g, '')}?text=${encodeURIComponent(`Halo! Saya tertarik dengan produk: ${product.title} (${product.price})`)}" 
                       class="btn btn-whatsapp" target="_blank">
                        <i class="fab fa-whatsapp"></i> BUY NOW
                    </a>
                    <a href="https://wa.me/${product.midman.replace(/\D/g, '')}?text=${encodeURIComponent(`Halo Midman! Saya mau transaksi produk: ${product.title}`)}" 
                       class="btn btn-secondary" target="_blank">
                        <i class="fas fa-user-shield"></i> MIDMAN
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryIcon(category) {
    const icons = {
        'game': '👤',
        'item': '💎',
        'jasa': '⚙️'
    };
    return icons[category] || '🎮';
}

function getCategoryName(category) {
    const names = {
        'game': 'ACCOUNT',
        'item': 'ITEM',
        'jasa': 'SERVICE'
    };
    return names[category] || category.toUpperCase();
}

// ===== FILTER FUNCTIONS =====
function filterProducts(category) {
    currentFilter = category;
    
    filteredProducts = products.filter(product => {
        const categoryMatch = currentFilter === 'all' || product.category === currentFilter;
        const searchMatch = currentSearch === '' || 
            product.title.toLowerCase().includes(currentSearch) ||
            product.description.toLowerCase().includes(currentSearch);
        
        return categoryMatch && searchMatch;
    });
    
    renderProducts(filteredProducts);
    updateActiveFilterTab();
    
    // Add anime effect
    productsContainer.classList.add('anime-slide-up');
    setTimeout(() => productsContainer.classList.remove('anime-slide-up'), 800);
}

function searchProducts(searchTerm) {
    currentSearch = searchTerm.toLowerCase().trim();
    filterProducts(currentFilter);
}

function clearFilters() {
    currentFilter = 'all';
    currentSearch = '';
    
    if (searchInput) searchInput.value = '';
    if (searchClear) searchClear.style.display = 'none';
    
    filterProducts('all');
    showAnimeNotification('✨ Filters cleared!');
}

function highlightProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Filter to show only this product
        filteredProducts = [product];
        renderProducts(filteredProducts);
        
        // Update filter tab
        filterTabs.forEach(tab => tab.classList.remove('active'));
        document.querySelector(`.filter-tab[data-filter="all"]`).classList.add('active');
        
        showAnimeNotification(`✨ Showing: ${product.title}`);
    }
}

// ===== SETUP FUNCTIONS =====
function setupNavigation() {
    // Navigation click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.dataset.section;
            showSection(sectionId);
            
            // Close mobile menu if open
            const navLinksElement = document.querySelector('.nav-links');
            navLinksElement.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const navLinksElement = document.querySelector('.nav-links');
            navLinksElement.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Button navigation
    document.querySelectorAll('[data-section]').forEach(element => {
        if (element.dataset.section && (element.tagName === 'A' || element.tagName === 'BUTTON')) {
            element.addEventListener('click', function(e) {
                if (this.dataset.section) {
                    e.preventDefault();
                    
                    // Update active nav link
                    navLinks.forEach(l => l.classList.remove('active'));
                    const targetLink = document.querySelector(`[data-section="${this.dataset.section}"]`);
                    if (targetLink) targetLink.classList.add('active');
                    
                    // Show section
                    showSection(this.dataset.section);
                    
                    // Close mobile menu
                    if (menuToggle) {
                        const navLinksElement = document.querySelector('.nav-links');
                        navLinksElement.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                }
            });
        }
    });
}

function setupFilters() {
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.dataset.filter;
            filterProducts(filter);
            showAnimeNotification(`🎮 Showing: ${filter === 'all' ? 'All Products' : filter.toUpperCase()}`);
        });
    });
}

function setupSearch() {
    if (searchInput) {
        // Search on input
        searchInput.addEventListener('input', function() {
            searchProducts(this.value);
            
            // Show/hide clear button
            if (searchClear) {
                searchClear.style.display = this.value ? 'block' : 'none';
            }
        });
        
        // Clear search
        if (searchClear) {
            searchClear.addEventListener('click', function() {
                searchInput.value = '';
                searchProducts('');
                this.style.display = 'none';
                searchInput.focus();
            });
        }
        
        // Search on enter
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                searchProducts(this.value);
            }
        });
    }
}

function setupScrollTop() {
    if (scrollTop) {
        // Show/hide scroll button
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTop.style.display = 'flex';
            } else {
                scrollTop.style.display = 'none';
            }
        });
        
        // Scroll to top
        scrollTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function updateActiveFilterTab() {
    filterTabs.forEach(tab => {
        if (tab.dataset.filter === currentFilter) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

function showSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
        
        // Scroll to top of section
        window.scrollTo({
            top: activeSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// ===== ANIME EFFECTS =====
function addAnimeEffects() {
    // Add hover effects to all cards
    const cards = document.querySelectorAll('.product-card, .service-card, .rule-card, .contact-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add styles for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Random sparkle effects
    setInterval(() => {
        createSparkle();
    }, 2000);
}

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: fixed;
        font-size: 1.5rem;
        z-index: 10000;
        pointer-events: none;
        animation: sparkleMove 2s linear forwards;
        opacity: 0;
    `;
    
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    
    sparkle.style.left = `${startX}px`;
    sparkle.style.top = `${startY}px`;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
    
    // Add sparkle animation
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkleMove {
            0% {
                transform: translate(0, 0) rotate(0deg) scale(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
                transform: translate(10px, -10px) rotate(45deg) scale(1);
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translate(20px, -20px) rotate(90deg) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(sparkleStyle);
    
    setTimeout(() => {
        sparkleStyle.remove();
    }, 2100);
}

// ===== FETCH FROM JSON (For Production) =====
async function fetchProducts() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        return data.products || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return animeProducts; // Fallback to demo data
    }
}

// ===== EXPORT FUNCTIONS FOR HTML ONCLICK =====
window.clearFilters = clearFilters;
window.highlightProduct = highlightProduct;
window.showSection = showSection;        background: var(--accent);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== APPLICATION STATE =====
let products = [];
let filteredProducts = [];
let currentFilter = 'all';
let currentSearch = '';

// ===== DOM ELEMENTS =====
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menuToggle');
const productsContainer = document.getElementById('productsContainer');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const currentYear = document.getElementById('currentYear');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Load products
    loadProducts();
    
    // Setup navigation
    setupNavigation();
    
    // Setup filters
    setupFilters();
    
    // Setup search
    setupSearch();
});

// ===== PRODUCT LOADING =====
async function loadProducts() {
    try {
        // Show loading state
        productsContainer.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Memuat produk...</p>
            </div>
        `;
        
        // In production, this would fetch from a real JSON file
        // For demo, we'll use a simulated fetch
        await simulateFetch();
        
        // Clear loading
        productsContainer.innerHTML = '';
        
        // Render all products
        renderProducts(products);
        
    } catch (error) {
        console.error('Error loading products:', error);
        productsContainer.innerHTML = `
            <div class="loading">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Gagal memuat produk. Silakan refresh halaman.</p>
            </div>
        `;
    }
}

// Simulated fetch for demo purposes
async function simulateFetch() {
    return new Promise(resolve => {
        setTimeout(() => {
            // Use the products data from products.json
            products = [
                {
                    id: 1,
                    category: 'game',
                    title: 'Akun Valorant Radiant',
                    price: 'Rp 850.000',
                    image: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    seller: '+6281234567891',
                    midman: '+6289876543210',
                    description: 'Akun Valorant rank Radiant dengan skin premium termasuk Vandal Prime, Phantom Oni, dan Operator. Sudah verifikasi email dan bisa diganti.'
                },
                {
                    id: 2,
                    category: 'item',
                    title: 'Primogems Genshin Impact',
                    price: 'Rp 120.000',
                    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    seller: '+6281234567892',
                    midman: '+6289876543210',
                    description: 'Primogems 1000 + 100 bonus. Proses cepat hanya 5-15 menit setelah pembayaran. Top up via UID.'
                },
                {
                    id: 3,
                    category: 'game',
                    title: 'Akun Mobile Legends Mythic',
                    price: 'Rp 450.000',
                    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    seller: '+6281234567893',
                    midman: '+6289876543210',
                    description: 'Akun MLBB dengan 120 skin, termasuk legend dan epic. Rank Mythic 500+ points. Sudah verifikasi Moonton.'
                },
                {
                    id: 4,
                    category: 'item',
                    title: 'FIFA Points 4600',
                    price: 'Rp 650.000',
                    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    seller: '+6281234567894',
                    midman: '+6289876543210',
                    description: 'FIFA Points untuk PS5/Xbox/PC. Proses cepat, langsung masuk ke akun EA Anda. Bisa custom nominal.'
                },
                {
                    id: 5,
                    category: 'jasa',
                    title: 'Jasa Boost Rank Valorant',
                    price: 'Rp 300.000',
                    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    seller: '+6281234567895',
                    midman: '+6289876543210',
                    description: 'Jasa boost rank Valorant dari Iron ke Gold. Proses aman, tidak pakai cheat. Garansi tidak banned.'
                },
                {
                    id: 6,
                    category: 'item',
                    title: 'Steam Wallet Code $50',
                    price: 'Rp 750.000',
                    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    seller: '+6281234567896',
                    midman: '+6289876543210',
                    description: 'Steam Wallet Code senilai $50. Bisa digunakan untuk beli game, DLC, atau item di Steam. Region Indonesia.'
                },
                {
                    id: 7,
                    category: 'game',
                    title: 'Akun PUBG Mobile Conqueror',
                    price: 'Rp 600.000',
                    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    seller: '+6281234567897',
                    midman: '+6289876543210',
                    description: 'Akun PUBG Mobile rank Conqueror dengan skin legendary dan banyak UC. Sudah verifikasi dan aman.'
                },
                {
                    id: 8,
                    category: 'jasa',
                    title: 'Jasa Top Up Game',
                    price: 'Rp 50.000',
                    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    seller: '+6281234567898',
                    midman: '+6289876543210',
                    description: 'Jasa top up semua game: Mobile Legends, Free Fire, PUBG, Valorant, dll. Proses 5-30 menit.'
                }
            ];
            
            filteredProducts = [...products];
            resolve();
        }, 1000); // Simulate network delay
    });
}

// ===== RENDER PRODUCTS =====
function renderProducts(productsToRender) {
    productsContainer.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productsContainer.innerHTML = `
            <div class="loading">
                <i class="fas fa-search"></i>
                <p>Tidak ada produk yang ditemukan.</p>
                <button class="btn btn-primary" onclick="clearFilters()" style="margin-top: 20px;">
                    Tampilkan Semua Produk
                </button>
            </div>
        `;
        return;
    }
    
    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;
    
    // Format WhatsApp numbers
    const sellerNumber = product.seller.replace(/\D/g, '');
    const midmanNumber = product.midman.replace(/\D/g, '');
    
    // Create WhatsApp message
    const sellerMessage = `Halo, saya tertarik dengan produk: ${product.title} (${product.price})`;
    const midmanMessage = `Halo Midman, saya mau transaksi produk: ${product.title}`;
    
    card.innerHTML = `
        <div class="image-container">
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="watermark"></div>
        </div>
        <div class="product-content">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price">${product.price}</div>
            <p class="product-desc">${product.description}</p>
            <div class="product-meta">
                <span><i class="fas fa-tag"></i> ${getCategoryName(product.category)}</span>
                <span><i class="fas fa-check-circle"></i> Tersedia</span>
            </div>
            <div class="product-buttons">
                <a href="https://wa.me/${sellerNumber}?text=${encodeURIComponent(sellerMessage)}" 
                   class="btn btn-whatsapp" target="_blank">
                    <i class="fab fa-whatsapp"></i> Hubungi Seller
                </a>
                <a href="https://wa.me/${midmanNumber}?text=${encodeURIComponent(midmanMessage)}" 
                   class="btn btn-midman" target="_blank">
                    <i class="fas fa-user-shield"></i> Via Midman
                </a>
            </div>
        </div>
    `;
    
    return card;
}

function getCategoryName(category) {
    const categories = {
        'game': 'Akun Game',
        'item': 'Item Game',
        'jasa': 'Jasa Gaming'
    };
    return categories[category] || category;
}

// ===== FILTER FUNCTIONS =====
function filterProducts(category) {
    currentFilter = category;
    
    filteredProducts = products.filter(product => {
        // Apply category filter
        const categoryMatch = currentFilter === 'all' || product.category === currentFilter;
        
        // Apply search filter
        const searchMatch = currentSearch === '' || 
            product.title.toLowerCase().includes(currentSearch) ||
            product.description.toLowerCase().includes(currentSearch);
        
        return categoryMatch && searchMatch;
    });
    
    renderProducts(filteredProducts);
    updateActiveFilterButton();
}

function searchProducts(searchTerm) {
    currentSearch = searchTerm.toLowerCase().trim();
    filterProducts(currentFilter);
}

function clearFilters() {
    currentFilter = 'all';
    currentSearch = '';
    searchInput.value = '';
    filterProducts('all');
}

// ===== SETUP FUNCTIONS =====
function setupNavigation() {
    // Navigation click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.dataset.section;
            showSection(sectionId);
            
            // Close mobile menu if open
            const navLinksElement = document.querySelector('.nav-links');
            navLinksElement.classList.remove('active');
        });
    });
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const navLinksElement = document.querySelector('.nav-links');
            navLinksElement.classList.toggle('active');
        });
    }
    
    // Button navigation
    document.querySelectorAll('[data-section]').forEach(button => {
        if (button.tagName === 'A' || button.tagName === 'BUTTON') {
            button.addEventListener('click', function(e) {
                if (this.dataset.section) {
                    e.preventDefault();
                    
                    // Update active nav link
                    navLinks.forEach(l => l.classList.remove('active'));
                    document.querySelector(`[data-section="${this.dataset.section}"]`).classList.add('active');
                    
                    // Show section
                    showSection(this.dataset.section);
                }
            });
        }
    });
}

function setupFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            filterProducts(filter);
        });
    });
}

function setupSearch() {
    if (searchInput) {
        // Search on input
        searchInput.addEventListener('input', function() {
            searchProducts(this.value);
        });
        
        // Clear search on escape
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                searchProducts('');
            }
        });
    }
}

// ===== HELPER FUNCTIONS =====
function showSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
        
        // Scroll to top of section
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

function updateActiveFilterButton() {
    filterButtons.forEach(button => {
        if (button.dataset.filter === currentFilter) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// ===== CACHE PRODUCTS TO LOCALSTORAGE (OPTIONAL) =====
function saveProductsToCache(productsData) {
    try {
        const cache = {
            data: productsData,
            timestamp: new Date().getTime()
        };
        localStorage.setItem('altharion_products_cache', JSON.stringify(cache));
    } catch (error) {
        console.warn('Could not save products to cache:', error);
    }
}

function getProductsFromCache() {
    try {
        const cache = localStorage.getItem('altharion_products_cache');
        if (cache) {
            const { data, timestamp } = JSON.parse(cache);
            // Use cache if less than 1 hour old
            if (new Date().getTime() - timestamp < 3600000) {
                return data;
            }
        }
    } catch (error) {
        console.warn('Could not load products from cache:', error);
    }
    return null;
}
