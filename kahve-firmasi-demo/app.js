// --- Products Database ---
const defaultProducts = [
    {
        id: 1,
        title: "Holly Blend Espresso",
        category: "espresso",
        price: 420.00,
        description: "Çikolata, karamel ve fındık notalarıyla tatlı ve yoğun bir gövde. Sütlü içeceklerle mükemmel uyum.",
        icon: "fa-solid fa-mug-hot",
        badge: "Çok Satan",
        quizMatch: { method: "espresso", notes: "sweet", acidity: "medium" }
    },
    {
        id: 2,
        title: "Ethiopia Yirgacheffe",
        category: "filter",
        price: 280.00,
        description: "Narenciye, yasemin ve bergamot notalarıyla parlak asidite ve floral aromaya sahip hafif gövdeli filtre kahve.",
        icon: "fa-solid fa-leaf",
        badge: "Nitelikli",
        quizMatch: { method: "filter", notes: "fruity", acidity: "high" }
    },
    {
        id: 3,
        title: "Colombia Supremo",
        category: "filter",
        price: 260.00,
        description: "Kırmızı elma esintileri, karamelize şeker tatlılığı ve dengeli, yumuşak gövdesiyle gün boyu içime uygun.",
        icon: "fa-solid fa-seedling",
        badge: null,
        quizMatch: { method: "filter", notes: "sweet", acidity: "medium" }
    },
    {
        id: 4,
        title: "Sumatra Mandheling",
        category: "filter",
        price: 295.00,
        description: "Topraksı, odunsu ve baharatlı tonlar. Çok düşük asidite and yoğun, kadifemsi gövdeye sahip sert kahve severlerin tercihi.",
        icon: "fa-solid fa-fire",
        badge: "Geleneksel",
        quizMatch: { method: "filter", notes: "bold", acidity: "low" }
    },
    {
        id: 5,
        title: "Holly Cold Brew Signature",
        category: "filter",
        price: 95.00,
        description: "16 saat boyunca soğuk demlenmiş, yumuşak içimli, çikolatalı ve ferahlatıcı yaz lezzeti (500 ml).",
        icon: "fa-solid fa-whiskey-glass",
        badge: "Soğuk Popüler",
        quizMatch: { method: "cold", notes: "sweet", acidity: "medium" }
    },
    {
        id: 6,
        title: "Holly Dark Espresso",
        category: "espresso",
        price: 410.00,
        description: "Bitter çikolata ve kavrulmuş kakao çekirdeği tonlarında yoğun gövdeli, düşük asiditeli klasik İtalyan espressosu.",
        icon: "fa-solid fa-droplet",
        badge: "Yeni",
        quizMatch: { method: "espresso", notes: "bold", acidity: "low" }
    },
    {
        id: 7,
        title: "V60 Akrilik Demleme Seti",
        category: "equipment",
        price: 340.00,
        description: "Mükemmel berraklıkta ve aromatik zenginlikte filtre kahveler hazırlamak için standart V60 demleme aparatı.",
        icon: "fa-solid fa-filter",
        badge: "Ekipman",
        quizMatch: null
    },
    {
        id: 8,
        title: "Holly El Yapımı Seramik Kupa",
        category: "equipment",
        price: 190.00,
        description: "Ankaralı yerel seramik sanatçıları tarafından Holly Coffee için özel tasarlanmış minimalist kupa.",
        icon: "fa-solid fa-mug-saucer",
        badge: "Aksesuar",
        quizMatch: null
    }
];

// --- State Management ---
let products = [];
let orders = [];
let customers = [];
let currentUser = null;
let cart = [];
let quizAnswers = {
    method: null,
    notes: null,
    acidity: null
};

// --- DOM Elements ---
const productsContainer = document.getElementById('products-container');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

// Cart elements
const cartOpenBtn = document.getElementById('cart-open-btn');
const cartCloseBtn = document.getElementById('cart-close-btn');
const cartOverlay = document.getElementById('cart-overlay');
const cartDrawer = document.getElementById('cart-drawer');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCountElement = document.querySelector('.cart-count');
const cartDrawerCount = document.getElementById('cart-drawer-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const cartDrawerFooter = document.getElementById('cart-drawer-footer');
const cartStartShopping = document.getElementById('cart-start-shopping');

// Checkout elements
const checkoutOverlay = document.getElementById('checkout-overlay');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutCloseBtn = document.getElementById('checkout-close-btn');
const step1Form = document.getElementById('checkout-form-step-1');
const step2Form = document.getElementById('checkout-form-step-2');
const checkoutSuccess = document.getElementById('checkout-success');
const payNowBtn = document.getElementById('pay-now-btn');
const indicatorStep1 = document.getElementById('indicator-step-1');
const indicatorStep2 = document.getElementById('indicator-step-2');
const indicatorStep3 = document.getElementById('indicator-step-3');
const successDoneBtn = document.getElementById('success-done-btn');

// Quiz elements
const quizSteps = document.querySelectorAll('.quiz-step');
const quizProgress = document.getElementById('quiz-progress');
const quizResult = document.getElementById('quiz-result');
const quizRestartBtn = document.getElementById('quiz-restart-btn');
const recommendedCardContainer = document.getElementById('recommended-product-card');

// SPA Routing elements
const storefrontWrapper = document.getElementById('storefront-wrapper');
const adminLoginWrapper = document.getElementById('admin-login-wrapper');
const adminDashboardWrapper = document.getElementById('admin-dashboard-wrapper');

// Admin Controls
const adminHeaderLink = document.getElementById('admin-header-link');
const adminFooterLink = document.getElementById('admin-footer-link');
const loginBackBtn = document.getElementById('login-back-btn');
const adminLoginForm = document.getElementById('admin-login-form');
const adminLogoutBtn = document.getElementById('admin-logout-btn');
const adminSidebarBtns = document.querySelectorAll('.admin-nav-item');
const adminPanelTabs = document.querySelectorAll('.admin-panel-tab');
const loginErrorMsg = document.getElementById('login-error-msg');

// Admin Stats
const adminStatRevenue = document.getElementById('admin-stat-revenue');
const adminStatOrders = document.getElementById('admin-stat-orders');
const adminStatAverage = document.getElementById('admin-stat-average');
const adminOrdersCountBadge = document.getElementById('admin-orders-count');

// Admin Lists
const adminOrdersTableBody = document.getElementById('admin-orders-table-body');
const adminProductsTableBody = document.getElementById('admin-products-table-body');

// Customer Login / Session elements
const userLoginNavBtn = document.getElementById('user-login-nav-btn');
const userProfileDropdown = document.getElementById('user-profile-dropdown');
const userDisplayName = document.getElementById('user-display-name');
const userOrdersBtn = document.getElementById('user-orders-btn');
const userLogoutBtn = document.getElementById('user-logout-btn');

const customerLoginOverlay = document.getElementById('customer-login-overlay');
const customerLoginCloseBtn = document.getElementById('customer-login-close-btn');
const customerLoginForm = document.getElementById('customer-login-form');
const customerRegisterForm = document.getElementById('customer-register-form');
const customerLoginError = document.getElementById('customer-login-error');

const tabLoginBtn = document.getElementById('tab-login-btn');
const tabRegisterBtn = document.getElementById('tab-register-btn');

const customerOrdersOverlay = document.getElementById('customer-orders-overlay');
const customerOrdersCloseBtn = document.getElementById('customer-orders-close-btn');
const customerOrdersTableBody = document.getElementById('customer-orders-table-body');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadOrders();
    loadCustomers();
    renderProducts(products);
    setupEventListeners();
    loadCartFromLocalStorage();
    checkActiveUserSession();
});

// --- Load Products ---
function loadProducts() {
    const savedProducts = localStorage.getItem('holly_coffee_products');
    if (savedProducts) {
        try {
            products = JSON.parse(savedProducts);
        } catch (e) {
            products = [...defaultProducts];
        }
    } else {
        products = [...defaultProducts];
        localStorage.setItem('holly_coffee_products', JSON.stringify(products));
    }
}

// --- Load Orders ---
function loadOrders() {
    const savedOrders = localStorage.getItem('holly_coffee_orders');
    if (savedOrders) {
        try {
            orders = JSON.parse(savedOrders);
        } catch (e) {
            orders = [];
        }
    } else {
        // Seed initial orders so dashboard isn't completely empty initially
        orders = [
            {
                id: "HL-74921",
                customerName: "Ahmet Yılmaz",
                customerEmail: "user@holly.coffee",
                address: "Kızılay, Atatürk Bulvarı No:123 Çankaya/Ankara",
                phone: "0532 123 45 67",
                items: [
                    { title: "Holly Blend Espresso", quantity: 2, price: 420.00 },
                    { title: "V60 Akrilik Demleme Seti", quantity: 1, price: 340.00 }
                ],
                total: 1180.00,
                date: "03.07.2026",
                status: "completed"
            },
            {
                id: "HL-28401",
                customerName: "Canan Şen",
                customerEmail: "canan@example.com",
                address: "Kavaklıdere, Tunalı Hilmi Cd. Çankaya/Ankara",
                phone: "0544 987 65 43",
                items: [
                    { title: "Ethiopia Yirgacheffe", quantity: 1, price: 280.00 }
                ],
                total: 280.00,
                date: "03.07.2026",
                status: "shipping"
            }
        ];
        localStorage.setItem('holly_coffee_orders', JSON.stringify(orders));
    }
}

// --- Load Customers ---
function loadCustomers() {
    const savedCustomers = localStorage.getItem('holly_coffee_customers');
    if (savedCustomers) {
        try {
            customers = JSON.parse(savedCustomers);
        } catch (e) {
            customers = [];
        }
    } else {
        // Default Seed Customer
        customers = [
            {
                name: "Ahmet Yılmaz",
                email: "user@holly.coffee",
                password: "user",
                phone: "0555 555 55 55",
                address: "Bağış Sokak No:15, Çankaya/Ankara"
            }
        ];
        localStorage.setItem('holly_coffee_customers', JSON.stringify(customers));
    }
}

// --- Check Session ---
function checkActiveUserSession() {
    const savedSession = sessionStorage.getItem('holly_coffee_user');
    if (savedSession) {
        try {
            currentUser = JSON.parse(savedSession);
            onUserLoggedIn();
        } catch(e) {
            currentUser = null;
        }
    }
}

// --- View Router Helpers ---
function showStorefront() {
    adminLoginWrapper.style.display = 'none';
    adminDashboardWrapper.style.display = 'none';
    storefrontWrapper.style.display = 'block';
    renderProducts(products);
}

function showAdminLogin() {
    storefrontWrapper.style.display = 'none';
    adminDashboardWrapper.style.display = 'none';
    adminLoginWrapper.style.display = 'block';
    loginErrorMsg.style.display = 'none';
    document.getElementById('admin-email').value = "admin@holly.coffee";
    document.getElementById('admin-password').value = "admin";
}

function showAdminDashboard() {
    storefrontWrapper.style.display = 'none';
    adminLoginWrapper.style.display = 'none';
    adminDashboardWrapper.style.display = 'block';
    renderAdminDashboard();
}

// --- Setup Event Listeners ---
function setupEventListeners() {
    // Theme Switcher
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Navigation for Admin Portal
    adminHeaderLink.addEventListener('click', (e) => {
        e.preventDefault();
        showAdminLogin();
    });
    adminFooterLink.addEventListener('click', (e) => {
        e.preventDefault();
        showAdminLogin();
    });
    loginBackBtn.addEventListener('click', showStorefront);

    // Login Form Submit
    adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('admin-email').value;
        const password = document.getElementById('admin-password').value;

        if (email === "admin@holly.coffee" && password === "admin") {
            showAdminDashboard();
        } else {
            loginErrorMsg.style.display = 'flex';
        }
    });

    // Dashboard Logout
    adminLogoutBtn.addEventListener('click', showStorefront);

    // Admin Sidebar Tabs Navigation
    adminSidebarBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            adminSidebarBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');

            const tabId = e.currentTarget.getAttribute('data-tab');
            adminPanelTabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.id === `tab-${tabId}`) {
                    tab.classList.add('active');
                }
            });
        });
    });

    // Customer Account Header Actions
    userLoginNavBtn.addEventListener('click', (e) => {
        if (currentUser) {
            // Toggle dropdown
            userProfileDropdown.style.display = userProfileDropdown.style.display === 'block' ? 'none' : 'block';
        } else {
            // Open login modal
            customerLoginOverlay.style.display = 'flex';
            showCustomerTab('login');
        }
        e.stopPropagation();
    });

    // Close user dropdown on clicking outside
    document.addEventListener('click', () => {
        userProfileDropdown.style.display = 'none';
    });

    // Customer Login tabs
    tabLoginBtn.addEventListener('click', () => showCustomerTab('login'));
    tabRegisterBtn.addEventListener('click', () => showCustomerTab('register'));

    // Customer Login Close
    customerLoginCloseBtn.addEventListener('click', () => {
        customerLoginOverlay.style.display = 'none';
    });

    // Customer Forms Submissions
    customerLoginForm.addEventListener('submit', handleCustomerLogin);
    customerRegisterForm.addEventListener('submit', handleCustomerRegister);

    // Profile Dropdown Actions
    userOrdersBtn.addEventListener('click', () => {
        userProfileDropdown.style.display = 'none';
        openCustomerOrdersModal();
    });
    userLogoutBtn.addEventListener('click', handleCustomerLogout);

    customerOrdersCloseBtn.addEventListener('click', () => {
        customerOrdersOverlay.style.display = 'none';
    });

    // Product Category Filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const filterValue = e.currentTarget.getAttribute('data-filter');
            
            if (filterValue === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === filterValue);
                renderProducts(filtered);
            }
        });
    });

    // Cart Drawer Toggle
    cartOpenBtn.addEventListener('click', openCart);
    cartCloseBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    if(cartStartShopping) {
        cartStartShopping.addEventListener('click', (e) => {
            e.preventDefault();
            closeCart();
            document.querySelector('#kahveler').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Quiz Options Click
    const quizOptions = document.querySelectorAll('.quiz-opt');
    quizOptions.forEach(opt => {
        opt.addEventListener('click', handleQuizOptionClick);
    });
    quizRestartBtn.addEventListener('click', restartQuiz);

    // Checkout Modal Toggle
    checkoutBtn.addEventListener('click', openCheckout);
    checkoutCloseBtn.addEventListener('click', closeCheckout);
    checkoutOverlay.addEventListener('click', (e) => {
        if(e.target === checkoutOverlay) closeCheckout();
    });

    // Checkout Form Submissions
    step1Form.addEventListener('submit', handleCheckoutStep1);
    step2Form.addEventListener('submit', handleCheckoutStep2);
    successDoneBtn.addEventListener('click', handleCheckoutFinish);

    // Input Formatting (Credit Card helper)
    const cardNoInput = document.getElementById('card-no');
    cardNoInput.addEventListener('input', formatCardNumber);
    const cardExpiryInput = document.getElementById('card-expiry');
    cardExpiryInput.addEventListener('input', formatCardExpiry);
    
    // Live update payment card visual
    const cardHolderInput = document.getElementById('card-holder');
    cardHolderInput.addEventListener('input', (e) => {
        document.querySelector('.card-holder-display').textContent = e.target.value.toUpperCase() || 'AD SOYAD';
    });
    cardNoInput.addEventListener('input', (e) => {
        document.querySelector('.card-number-display').textContent = e.target.value || '•••• •••• •••• ••••';
    });
    cardExpiryInput.addEventListener('input', (e) => {
        document.querySelector('.card-expiry-display').textContent = e.target.value || 'AA/YY';
    });
}

// --- Render Products ---
function renderProducts(productsList) {
    productsContainer.innerHTML = '';
    
    if (productsList.length === 0) {
        productsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; font-weight: 700; padding: 40px;">Aradığınız kategoride ürün bulunamadı.</p>`;
        return;
    }

    productsList.forEach(product => {
        const badgeHTML = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';
        const cardHTML = `
            <div class="product-card" data-id="${product.id}">
                ${badgeHTML}
                <div class="product-img-holder">
                    <i class="${product.icon}"></i>
                </div>
                <div class="product-details">
                    <span class="product-category">${product.category === 'filter' ? 'Filtre Kahve' : product.category === 'espresso' ? 'Espresso' : 'Ekipman / Aksesuar'}</span>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-desc">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">${product.price.toFixed(2)} TL</span>
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})" title="Sepete Ekle">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// --- Theme Switcher ---
function toggleTheme() {
    if (body.classList.contains('theme-blue')) {
        body.classList.remove('theme-blue');
        body.classList.add('theme-pink');
    } else {
        body.classList.remove('theme-pink');
        body.classList.add('theme-blue');
    }
}

// --- Cart Actions ---
function openCart() {
    body.classList.add('cart-open');
}

function closeCart() {
    body.classList.remove('cart-open');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            icon: product.icon,
            quantity: 1
        });
    }

    saveCartToLocalStorage();
    renderCart();
    openCart();
    
    // Add minor scale effect to shopping bag badge
    cartOpenBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartOpenBtn.style.transform = 'scale(1)';
    }, 150);
}

window.addToCart = addToCart;

function updateQuantity(productId, amount) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += amount;
    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }

    saveCartToLocalStorage();
    renderCart();
}
window.updateQuantity = updateQuantity;

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToLocalStorage();
    renderCart();
}
window.removeFromCart = removeFromCart;

function renderCart() {
    cartItemsContainer.innerHTML = '';
    
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalCount;
    cartDrawerCount.textContent = totalCount;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty-state">
                <i class="fa-solid fa-basket-shopping"></i>
                <p>Sepetiniz şu anda boş.</p>
                <a href="#kahveler" class="btn btn-primary" id="cart-start-shopping" onclick="closeCart()">Alışverişe Başla</a>
            </div>
        `;
        cartDrawerFooter.style.display = 'none';
        return;
    }

    cartDrawerFooter.style.display = 'block';

    cart.forEach(item => {
        const itemHTML = `
            <div class="cart-item">
                <div class="cart-item-img">
                    <i class="${item.icon}"></i>
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-price">${(item.price * item.quantity).toFixed(2)} TL</p>
                    <div class="cart-item-qty-controls">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Kaldır">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    });

    // Update Price Totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSubtotal.textContent = `${subtotal.toFixed(2)} TL`;
    cartTotal.textContent = `${subtotal.toFixed(2)} TL`;
    
    // Update payment text on checkout button
    payNowBtn.textContent = `Güvenli Ödeme Yap (${subtotal.toFixed(2)} TL)`;
}

function saveCartToLocalStorage() {
    localStorage.setItem('holly_coffee_cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const saved = localStorage.getItem('holly_coffee_cart');
    if (saved) {
        try {
            cart = JSON.parse(saved);
            renderCart();
        } catch (e) {
            cart = [];
        }
    }
}

// --- Checkout Modal Wizard ---
function openCheckout() {
    closeCart();
    body.classList.add('checkout-open');
    
    // Auto fill if user logged in
    if (currentUser) {
        document.getElementById('c-name').value = currentUser.name;
        document.getElementById('c-email').value = currentUser.email;
        document.getElementById('c-phone').value = currentUser.phone || '';
        document.getElementById('c-address').value = currentUser.address || '';
        document.getElementById('c-city').value = "Ankara";
    } else {
        // Clear
        document.getElementById('c-name').value = '';
        document.getElementById('c-email').value = '';
        document.getElementById('c-phone').value = '';
        document.getElementById('c-address').value = '';
        document.getElementById('c-city').value = 'Ankara';
    }
    
    showCheckoutStep(1);
}

function closeCheckout() {
    body.classList.remove('checkout-open');
}

function showCheckoutStep(step) {
    step1Form.classList.remove('active');
    step2Form.classList.remove('active');
    checkoutSuccess.classList.remove('active');
    
    indicatorStep1.classList.remove('active');
    indicatorStep2.classList.remove('active');
    indicatorStep3.classList.remove('active');

    if (step === 1) {
        step1Form.classList.add('active');
        indicatorStep1.classList.add('active');
    } else if (step === 2) {
        step2Form.classList.add('active');
        indicatorStep2.classList.add('active');
    } else if (step === 3) {
        checkoutSuccess.classList.add('active');
        indicatorStep3.classList.add('active');
    }
}

function handleCheckoutStep1(e) {
    e.preventDefault();
    showCheckoutStep(2);
}

function handleCheckoutStep2(e) {
    e.preventDefault();
    payNowBtn.disabled = true;
    payNowBtn.textContent = "İşlem yapılıyor...";
    
    setTimeout(() => {
        payNowBtn.disabled = false;
        
        // Log order before clearing cart!
        logCustomerOrder();

        showCheckoutStep(3);
        
        // Clear Cart
        cart = [];
        saveCartToLocalStorage();
        renderCart();
    }, 1500);
}

function logCustomerOrder() {
    const customerName = document.getElementById('c-name').value;
    const address = document.getElementById('c-address').value;
    const phone = document.getElementById('c-phone').value;
    const email = document.getElementById('c-email').value;
    
    const orderItems = cart.map(item => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price
    }));
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderId = `HL-${Math.floor(10000 + Math.random() * 90000)}`;
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()}`;

    const newOrder = {
        id: orderId,
        customerName: customerName,
        customerEmail: email,
        address: address,
        phone: phone,
        items: orderItems,
        total: subtotal,
        date: formattedDate,
        status: "pending"
    };

    orders.unshift(newOrder); // Add to beginning
    localStorage.setItem('holly_coffee_orders', JSON.stringify(orders));
}

function handleCheckoutFinish() {
    closeCheckout();
}

// Credit Card Input Helpers
function formatCardNumber(e) {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = value.match(/\d{4,16}/g);
    let match = matches && matches[0] || '';
    let parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
        e.target.value = parts.join(' ');
    } else {
        e.target.value = value;
    }
}

function formatCardExpiry(e) {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (value.length > 2) {
        e.target.value = value.substring(0,2) + '/' + value.substring(2,4);
    } else {
        e.target.value = value;
    }
}

// --- Coffee Finder Quiz Logic ---
function handleQuizOptionClick(e) {
    const parentStep = e.currentTarget.closest('.quiz-step');
    const stepNumber = parseInt(parentStep.getAttribute('data-step'));
    const selectedValue = e.currentTarget.getAttribute('data-value');
    
    if (stepNumber === 1) quizAnswers.method = selectedValue;
    if (stepNumber === 2) quizAnswers.notes = selectedValue;
    if (stepNumber === 3) quizAnswers.acidity = selectedValue;

    const options = parentStep.querySelectorAll('.quiz-opt');
    options.forEach(o => o.style.borderColor = 'var(--charcoal)');
    e.currentTarget.style.borderColor = '#2a9d8f';

    setTimeout(() => {
        if (stepNumber < 3) {
            parentStep.classList.remove('active');
            const nextStep = document.querySelector(`.quiz-step[data-step="${stepNumber + 1}"]`);
            nextStep.classList.add('active');
            quizProgress.style.width = `${((stepNumber + 1) / 3) * 100}%`;
        } else {
            parentStep.classList.remove('active');
            showQuizResult();
        }
    }, 450);
}

function showQuizResult() {
    quizProgress.style.width = '100%';
    quizResult.classList.add('active');

    let bestProduct = products[0];
    let maxMatches = -1;

    const coffeeProducts = products.filter(p => p.quizMatch);

    coffeeProducts.forEach(prod => {
        let score = 0;
        if (prod.quizMatch.method === quizAnswers.method) score += 3;
        if (prod.quizMatch.notes === quizAnswers.notes) score += 2;
        if (prod.quizMatch.acidity === quizAnswers.acidity) score += 1;

        if (score > maxMatches) {
            maxMatches = score;
            bestProduct = prod;
        }
    });

    const badgeHTML = bestProduct.badge ? `<span class="product-badge">${bestProduct.badge}</span>` : '';
    recommendedCardContainer.innerHTML = `
        <div class="product-card" data-id="${bestProduct.id}" style="box-shadow: 6px 6px 0px #2a9d8f; border-color: var(--charcoal)">
            ${badgeHTML}
            <div class="product-img-holder" style="background-color: var(--bg-color)">
                <i class="${bestProduct.icon}"></i>
            </div>
            <div class="product-details">
                <span class="product-category">${bestProduct.category === 'filter' ? 'Filtre Kahve' : 'Espresso'}</span>
                <h3 class="product-title">${bestProduct.title}</h3>
                <p class="product-desc" style="font-size: 13px;">${bestProduct.description}</p>
                <div class="product-footer">
                    <span class="product-price">${bestProduct.price.toFixed(2)} TL</span>
                    <button class="btn btn-primary" onclick="addToCart(${bestProduct.id})" style="padding: 10px 16px; font-size: 13px; border-radius: 10px;">
                        Sepete Ekle <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function restartQuiz() {
    quizAnswers = { method: null, notes: null, acidity: null };
    
    const quizOptions = document.querySelectorAll('.quiz-opt');
    quizOptions.forEach(o => o.style.borderColor = 'var(--charcoal)');

    quizResult.classList.remove('active');
    quizSteps.forEach(s => s.classList.remove('active'));
    
    const step1 = document.querySelector('.quiz-step[data-step="1"]');
    step1.classList.add('active');
    quizProgress.style.width = '33.33%';
}

// --- Customer Accounts Logic ---
function showCustomerTab(tab) {
    const panels = customerLoginOverlay.querySelectorAll('.checkout-form-panel');
    const tabs = customerLoginOverlay.querySelectorAll('.checkout-step-indicator');
    
    panels.forEach(p => p.classList.remove('active'));
    tabs.forEach(t => t.classList.remove('active'));

    if (tab === 'login') {
        document.getElementById('customer-login-form').classList.add('active');
        tabLoginBtn.classList.add('active');
    } else {
        document.getElementById('customer-register-form').classList.add('active');
        tabRegisterBtn.classList.add('active');
    }
}

function handleCustomerLogin(e) {
    e.preventDefault();
    const email = document.getElementById('cust-email').value;
    const password = document.getElementById('cust-password').value;

    const user = customers.find(c => c.email === email && c.password === password);
    if (user) {
        currentUser = user;
        sessionStorage.setItem('holly_coffee_user', JSON.stringify(currentUser));
        onUserLoggedIn();
        customerLoginOverlay.style.display = 'none';
    } else {
        customerLoginError.style.display = 'flex';
    }
}

function handleCustomerRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const password = document.getElementById('reg-password').value;
    const address = document.getElementById('reg-address').value;

    if (customers.some(c => c.email === email)) {
        alert("Bu e-posta adresi ile zaten kayıtlı bir hesap var.");
        return;
    }

    const newUser = { name, email, phone, password, address };
    customers.push(newUser);
    localStorage.setItem('holly_coffee_customers', JSON.stringify(customers));
    
    currentUser = newUser;
    sessionStorage.setItem('holly_coffee_user', JSON.stringify(currentUser));
    
    onUserLoggedIn();
    customerLoginOverlay.style.display = 'none';

    // Clear register form inputs
    customerRegisterForm.reset();
}

function onUserLoggedIn() {
    userLoginNavBtn.innerHTML = `<i class="fa-solid fa-user-check"></i> ${currentUser.name.split(' ')[0]}`;
    userDisplayName.textContent = currentUser.name;
    // Add success login border outline to nav btn
    userLoginNavBtn.style.borderColor = '#2a9d8f';
}

function handleCustomerLogout() {
    currentUser = null;
    sessionStorage.removeItem('holly_coffee_user');
    userLoginNavBtn.innerHTML = `<i class="fa-solid fa-user"></i> Giriş Yap`;
    userLoginNavBtn.style.borderColor = 'var(--charcoal)';
    userProfileDropdown.style.display = 'none';
}

function openCustomerOrdersModal() {
    customerOrdersTableBody.innerHTML = '';
    
    // Filter orders belonging to current user name or email
    const userOrders = orders.filter(o => o.customerEmail === currentUser.email || o.customerName === currentUser.name);

    if (userOrders.length === 0) {
        customerOrdersTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:30px;">Henüz bir siparişiniz bulunmuyor.</td></tr>`;
    } else {
        userOrders.forEach(order => {
            const itemsText = order.items.map(i => `${i.title} (x${i.quantity})`).join(', ');
            
            let statusBadgeClass = 'pending';
            let statusText = 'Hazırlanıyor';
            if (order.status === 'completed') {
                statusBadgeClass = 'completed';
                statusText = 'Tamamlandı';
            } else if (order.status === 'shipping') {
                statusBadgeClass = 'shipping';
                statusText = 'Kargoda';
            }

            const rowHTML = `
                <tr>
                    <td><strong>#${order.id}</strong></td>
                    <td>${order.date}</td>
                    <td style="font-size:13px;">${itemsText}</td>
                    <td>${order.total.toFixed(2)} TL</td>
                    <td><span class="status-badge ${statusBadgeClass}">${statusText}</span></td>
                </tr>
            `;
            customerOrdersTableBody.insertAdjacentHTML('beforeend', rowHTML);
        });
    }
    customerOrdersOverlay.style.display = 'flex';
}

// --- Admin Panel Dashboard Rendering ---
function renderAdminDashboard() {
    // 1. Stats updates
    const totalRev = orders.reduce((sum, o) => sum + o.total, 0);
    const totalCount = orders.length;
    const avgOrder = totalCount > 0 ? (totalRev / totalCount) : 0;

    adminStatRevenue.textContent = `${totalRev.toFixed(2)} TL`;
    adminStatOrders.textContent = totalCount;
    adminStatAverage.textContent = `${avgOrder.toFixed(2)} TL`;
    adminOrdersCountBadge.textContent = totalCount;

    // 2. Render Orders Table
    renderAdminOrders();

    // 3. Render Products Editing Table
    renderAdminProducts();
}

function renderAdminOrders() {
    adminOrdersTableBody.innerHTML = '';
    
    if (orders.length === 0) {
        adminOrdersTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px;">Henüz kayıtlı bir sipariş bulunmuyor.</td></tr>`;
        return;
    }

    orders.forEach(order => {
        const productsListText = order.items.map(item => `${item.title} (x${item.quantity})`).join(', ');
        
        let statusBadgeClass = 'pending';
        let statusText = 'Hazırlanıyor';
        if (order.status === 'completed') {
            statusBadgeClass = 'completed';
            statusText = 'Tamamlandı';
        } else if (order.status === 'shipping') {
            statusBadgeClass = 'shipping';
            statusText = 'Kargoda';
        }

        const rowHTML = `
            <tr>
                <td><strong>#${order.id}</strong></td>
                <td>
                    <div style="font-weight: 800;">${order.customerName}</div>
                    <div style="font-size: 11px; color:#666; font-weight:500;">${order.phone}</div>
                </td>
                <td style="font-size: 13px; font-weight:600;">${productsListText}</td>
                <td>${order.total.toFixed(2)} TL</td>
                <td style="font-size: 13px;">${order.date}</td>
                <td>
                    <select class="status-badge ${statusBadgeClass}" onchange="updateOrderStatus('${order.id}', this.value)" style="border-width:2px; font-weight:800; cursor:pointer;">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Hazırlanıyor</option>
                        <option value="shipping" ${order.status === 'shipping' ? 'selected' : ''}>Kargoda</option>
                        <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Tamamlandı</option>
                    </select>
                </td>
            </tr>
        `;
        adminOrdersTableBody.insertAdjacentHTML('beforeend', rowHTML);
    });
}

function updateOrderStatus(orderId, newStatus) {
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
        orders[orderIndex].status = newStatus;
        localStorage.setItem('holly_coffee_orders', JSON.stringify(orders));
        renderAdminDashboard();
    }
}
window.updateOrderStatus = updateOrderStatus;

function renderAdminProducts() {
    adminProductsTableBody.innerHTML = '';

    products.forEach(product => {
        const catText = product.category === 'filter' ? 'Filtre Kahve' : product.category === 'espresso' ? 'Espresso' : 'Ekipman/Aksesuar';
        const rowHTML = `
            <tr>
                <td>
                    <div class="cart-item-img" style="width:44px; height:44px; font-size:18px;">
                        <i class="${product.icon}"></i>
                    </div>
                </td>
                <td><strong>${product.title}</strong></td>
                <td style="font-size: 13px; color: #666;">${catText}</td>
                <td>${product.price.toFixed(2)} TL</td>
                <td>
                    <div class="admin-price-input-group">
                        <input type="number" id="price-input-${product.id}" value="${product.price}" step="5" min="10">
                        <span style="font-weight:800;">TL</span>
                    </div>
                </td>
                <td>
                    <button class="btn btn-primary btn-small" id="update-btn-${product.id}" onclick="updateProductPrice(${product.id})">
                        Güncelle
                    </button>
                </td>
            </tr>
        `;
        adminProductsTableBody.insertAdjacentHTML('beforeend', rowHTML);
    });
}

function updateProductPrice(productId) {
    const inputElement = document.getElementById(`price-input-${productId}`);
    const updateBtn = document.getElementById(`update-btn-${productId}`);
    const newPrice = parseFloat(inputElement.value);

    if (isNaN(newPrice) || newPrice <= 0) {
        alert("Lütfen geçerli bir fiyat girin.");
        return;
    }

    const prodIndex = products.findIndex(p => p.id === productId);
    if (prodIndex !== -1) {
        products[prodIndex].price = newPrice;
        localStorage.setItem('holly_coffee_products', JSON.stringify(products));
        
        // Visual confirmation feedback
        updateBtn.textContent = "Güncellendi!";
        updateBtn.style.backgroundColor = "#2a9d8f";
        updateBtn.style.borderColor = "var(--charcoal)";
        
        setTimeout(() => {
            updateBtn.textContent = "Güncelle";
            updateBtn.style.backgroundColor = "var(--charcoal)";
            updateBtn.style.borderColor = "var(--charcoal)";
            renderAdminDashboard();
        }, 1200);
    }
}
window.updateProductPrice = updateProductPrice;
