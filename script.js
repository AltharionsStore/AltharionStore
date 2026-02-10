// ===== SECURITY MEASURES =====
// Disable right-click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showToast('Fitur ini dinonaktifkan untuk keamanan');
});

// Disable keyboard shortcuts for developer tools
document.addEventListener('keydown', function(e) {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
        showToast('Akses developer tools dinonaktifkan');
    }
});

// ===== UTILITY FUNCTIONS =====
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--accent);
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
