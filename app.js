/* Holly Coffee Roastery - Option 4: Kyoto Bauhaus Storefront Script */

// --- Default Products Data ---
const defaultProducts = [
    {
        id: "prod-1",
        title: "Holly Blend Espresso",
        category: "espresso",
        roastLevel: 4,
        notes: "Yoğun gövdeli, karamelize çikolata, fındık ve tatlı asidite",
        price: 420.00,
        icon: "fa-mug-hot"
    },
    {
        id: "prod-2",
        title: "Ethiopia Yirgacheffe",
        category: "filtre",
        roastLevel: 2,
        notes: "Yasemin, bergamot, limon ve belirgin meyvemsi tonlar",
        price: 480.00,
        icon: "fa-seedling"
    },
    {
        id: "prod-3",
        title: "Colombia Supremo",
        category: "filtre",
        roastLevel: 3,
        notes: "Kırmızı elma, esmer şeker, sütlü çikolata ve dengeli gövde",
        price: 440.00,
        icon: "fa-leaf"
    },
    {
        id: "prod-4",
        title: "V60 Akrilik Demleme Seti",
        category: "ekipman",
        roastLevel: 0,
        notes: "Nitelikli demleme için V60 akrilik dripper ve filtre kağıdı",
        price: 340.00,
        icon: "fa-filter"
    },
    {
        id: "prod-5",
        title: "Paslanmaz Çelik Kettle",
        category: "ekipman",
        roastLevel: 0,
        notes: "Isı ayarlı kaz boynu (gooseneck) hassas su akış kettle'ı",
        price: 1850.00,
        icon: "fa-faucet-drip"
    },
    {
        id: "prod-6",
        title: "Holly Seramik Kupa",
        category: "ekipman",
        roastLevel: 0,
        notes: "El yapımı, özel tasarım seramik kahve kupası",
        price: 260.00,
        icon: "fa-whiskey-glass"
    }
];

// --- Global Application State ---
let products = [];
let cart = [];
let orders = [];
let customers = [];
let currentUser = null;
let currentTheme = 'kyoto-terracotta';
let quizAnswers = {};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadOrders();
    loadCustomers();
    renderProducts(products);
    setupEventListeners();
    loadCartFromLocalStorage();
    checkActiveUserSession();
    initializeTheme();
});

// --- Data Layer (LocalStorage & Sync) ---
function loadProducts() {
    const savedProducts = localStorage.getItem('holly_coffee_products_4');
    if (savedProducts) {
        try {
            products = JSON.parse(savedProducts);
        } catch (e) {
            products = [...defaultProducts];
        }
    } else {
        products = [...defaultProducts];
        localStorage.setItem('holly_coffee_products_4', JSON.stringify(products));
    }
}

function saveProductsToLocalStorage() {
    localStorage.setItem('holly_coffee_products_4', JSON.stringify(products));
}

function loadOrders() {
    const savedOrders = localStorage.getItem('holly_coffee_orders_4');
    if (savedOrders) {
        try {
            orders = JSON.parse(savedOrders);
        } catch (e) {
            orders = [];
        }
    } else {
        orders = [
            {
                id: "HL-82914",
                customerName: "Canan Şen",
                customerEmail: "canan@example.com",
                address: "Kavaklıdere, Tunalı Hilmi Cd. Çankaya/Ankara",
                phone: "0544 987 65 43",
                items: [
                    { title: "Paslanmaz Çelik Kettle", quantity: 1, price: 1850.00 },
                    { title: "Ethiopia Yirgacheffe", quantity: 1, price: 480.00 }
                ],
                total: 2330.00,
                date: "04.07.2026",
                status: "shipping"
            },
            {
                id: "HL-19402",
                customerName: "Ahmet Yılmaz",
                customerEmail: "user@holly.coffee",
                address: "Bağış Sokak No:15, Çankaya/Ankara",
                phone: "0555 555 55 55",
                items: [
                    { title: "Colombia Supremo", quantity: 2, price: 440.00 }
                ],
                total: 880.00,
                date: "04.07.2026",
                status: "completed"
            }
        ];
        localStorage.setItem('holly_coffee_orders_4', JSON.stringify(orders));
    }
}

function saveOrdersToLocalStorage() {
    localStorage.setItem('holly_coffee_orders_4', JSON.stringify(orders));
}

function loadCustomers() {
    const savedCustomers = localStorage.getItem('holly_coffee_customers_4');
    if (savedCustomers) {
        try {
            customers = JSON.parse(savedCustomers);
        } catch (e) {
            customers = [];
        }
    } else {
        customers = [
            {
                name: "Ahmet Yılmaz",
                email: "user@holly.coffee",
                password: "user",
                phone: "0555 555 55 55",
                address: "Bağış Sokak No:15, Çankaya/Ankara"
            }
        ];
        localStorage.setItem('holly_coffee_customers_4', JSON.stringify(customers));
    }
}

function saveCustomersToLocalStorage() {
    localStorage.setItem('holly_coffee_customers_4', JSON.stringify(customers));
}

function loadCartFromLocalStorage() {
    const savedCart = sessionStorage.getItem('holly_coffee_cart_4');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartBadge();
        } catch (e) {
            cart = [];
        }
    }
}

function saveCartToSessionStorage() {
    sessionStorage.setItem('holly_coffee_cart_4', JSON.stringify(cart));
}

function checkActiveUserSession() {
    const savedUser = sessionStorage.getItem('holly_coffee_user_4');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            updateUserMenuState(true);
        } catch (e) {
            currentUser = null;
        }
    }
}

// --- Theme Controller (Kyoto Terracotta / Sage Toggle) ---
function initializeTheme() {
    const savedTheme = localStorage.getItem('holly_coffee_theme_4');
    if (savedTheme) {
        currentTheme = savedTheme;
    } else {
        currentTheme = 'kyoto-terracotta';
    }
    document.body.className = `theme-${currentTheme}`;
}

function toggleTheme() {
    currentTheme = currentTheme === 'kyoto-terracotta' ? 'kyoto-sage' : 'kyoto-terracotta';
    document.body.className = `theme-${currentTheme}`;
    localStorage.setItem('holly_coffee_theme_4', currentTheme);
}

// --- Storefront Rendering ---
function renderProducts(productsList) {
    const grid = document.getElementById('storefront-products-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    if (productsList.length === 0) {
        grid.innerHTML = `<div class="empty-cart-msg">Bu kategoride ürün bulunmamaktadır.</div>`;
        return;
    }

    productsList.forEach(prod => {
        const roastLevelHtml = prod.roastLevel > 0 ? `
            <div class="roast-meter" title="Kavrum: ${prod.roastLevel}/5">
                ${Array.from({ length: 5 }, (_, i) => `<span class="dot ${i < prod.roastLevel ? 'active' : ''}"></span>`).join('')}
            </div>
        ` : '<div></div>';

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-container">
                <i class="fa-solid ${prod.icon}"></i>
                ${prod.roastLevel > 0 ? `<span class="product-badge">Çekirdek</span>` : `<span class="product-badge" style="background-color:#333;">Ekipman</span>`}
            </div>
            <div class="product-info">
                <div class="product-meta">
                    <span class="product-category">${prod.category === 'espresso' ? 'Espresso Blend' : prod.category === 'filtre' ? 'Filtre Kahve' : 'Ekipman'}</span>
                    ${roastLevelHtml}
                </div>
                <a href="#" class="product-title" onclick="event.preventDefault();">${prod.title}</a>
                <p class="product-notes">${prod.notes}</p>
                <div class="product-footer">
                    <span class="product-price">₺${prod.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" data-id="${prod.id}" title="Sepete Ekle">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const prodId = btn.getAttribute('data-id');
            addToCart(prodId);
        });
    });
}

// --- Cart Operations ---
function addToCart(prodId) {
    const product = products.find(p => p.id === prodId);
    if (!product) return;

    const cartItem = cart.find(item => item.id === prodId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            icon: product.icon,
            quantity: 1
        });
    }

    saveCartToSessionStorage();
    updateCartBadge();
    openCartDrawer();
}

// --- Cart Update Drawer UI ---
function updateCartBadge() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(badge => badge.textContent = totalCount);
    document.querySelectorAll('.cart-count-drawer').forEach(badge => badge.textContent = totalCount);
    
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
    }
}

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;
    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-cart-msg">Sepetiniz boş.</div>`;
        document.getElementById('cart-subtotal-value').textContent = '₺0.00';
        return;
    }

    let subtotal = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
            <div class="cart-item-icon">
                <i class="fa-solid ${item.icon}"></i>
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <span class="cart-item-price">₺${item.price.toFixed(2)}</span>
            </div>
            <div class="cart-item-actions">
                <div class="qty-controls">
                    <button class="qty-btn minus-qty" data-id="${item.id}">-</button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="qty-btn plus-qty" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item-btn" data-id="${item.id}">Kaldır</button>
            </div>
        `;
        container.appendChild(row);
    });

    document.getElementById('cart-subtotal-value').textContent = `₺${subtotal.toFixed(2)}`;

    container.querySelectorAll('.plus-qty').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const item = cart.find(i => i.id === id);
            if (item) {
                item.quantity += 1;
                saveCartToSessionStorage();
                updateCartBadge();
                renderCartItems();
            }
        });
    });

    container.querySelectorAll('.minus-qty').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const item = cart.find(i => i.id === id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                saveCartToSessionStorage();
                updateCartBadge();
                renderCartItems();
            }
        });
    });

    container.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            cart = cart.filter(item => item.id !== id);
            saveCartToSessionStorage();
            updateCartBadge();
            renderCartItems();
        });
    });
}

function openCartDrawer() {
    const drawer = document.getElementById('cart-drawer-backdrop');
    if (drawer) {
        renderCartItems();
        drawer.style.display = 'flex';
    }
}

function closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer-backdrop');
    if (drawer) {
        drawer.style.display = 'none';
    }
}

// --- Customer Portal Account System ---
function updateUserMenuState(isLoggedIn) {
    const icon = document.querySelector('#user-portal-btn i');
    const label = document.querySelector('#user-display-name');
    if (!icon) return;

    if (isLoggedIn && currentUser) {
        icon.className = 'fa-solid fa-user';
        icon.style.color = 'var(--accent-color)';
        if (label) label.textContent = currentUser.name.split(' ')[0];
    } else {
        icon.className = 'fa-regular fa-user';
        icon.style.color = '';
        if (label) label.textContent = 'Giriş';
    }
}

function handleCustomerLogin(email, password) {
    const user = customers.find(c => c.email === email && c.password === password);
    if (user) {
        currentUser = user;
        sessionStorage.setItem('holly_coffee_user_4', JSON.stringify(currentUser));
        updateUserMenuState(true);
        document.getElementById('user-portal-modal').style.display = 'none';
        document.getElementById('customer-login-error').style.display = 'none';
        return true;
    } else {
        document.getElementById('customer-login-error').style.display = 'block';
        return false;
    }
}

function handleCustomerRegister(name, email, password, phone, address) {
    if (customers.some(c => c.email === email)) {
        alert("Bu e-posta adresiyle kayıtlı bir hesap zaten var!");
        return;
    }

    const newCustomer = { name, email, password, phone, address };
    customers.push(newCustomer);
    saveCustomersToLocalStorage();

    currentUser = newCustomer;
    sessionStorage.setItem('holly_coffee_user_4', JSON.stringify(currentUser));
    updateUserMenuState(true);
    document.getElementById('user-portal-modal').style.display = 'none';
}

function renderCustomerOrdersHistory() {
    const tbody = document.getElementById('customer-orders-history-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    if (!currentUser) return;

    const userOrders = orders.filter(o => o.customerEmail === currentUser.email);
    if (userOrders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center" style="opacity:0.6;">Daha önce verilmiş bir siparişiniz bulunmamaktadır.</td></tr>`;
        return;
    }

    userOrders.forEach(o => {
        const itemsSummary = o.items.map(i => `${i.title} (x${i.quantity})`).join(', ');
        let statusBadge = '';
        if (o.status === 'completed') {
            statusBadge = `<span class="badge-status status-completed">Tamamlandı</span>`;
        } else if (o.status === 'shipping') {
            statusBadge = `<span class="badge-status status-shipping">Kargoda</span>`;
        } else {
            statusBadge = `<span class="badge-status status-pending">Hazırlanıyor</span>`;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>#${o.id}</strong></td>
            <td>${o.date}</td>
            <td style="max-width: 250px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="${itemsSummary}">${itemsSummary}</td>
            <td><strong>₺${o.total.toFixed(2)}</strong></td>
            <td>${statusBadge}</td>
        `;
        tbody.appendChild(tr);
    });
}

// --- Checkout Process ---
let checkoutStep = 1;

function initCheckoutWizard() {
    if (cart.length === 0) return;
    checkoutStep = 1;
    
    document.getElementById('checkout-panel-1').style.display = 'block';
    document.getElementById('checkout-panel-2').style.display = 'none';
    document.getElementById('checkout-panel-3').style.display = 'none';
    
    document.getElementById('step-dot-1').className = 'progress-step active';
    document.getElementById('step-dot-2').className = 'progress-step';
    document.getElementById('step-dot-3').className = 'progress-step';
    
    if (currentUser) {
        document.getElementById('checkout-name').value = currentUser.name;
        document.getElementById('checkout-phone').value = currentUser.phone || '';
        document.getElementById('checkout-address').value = currentUser.address || '';
    } else {
        document.getElementById('checkout-name').value = '';
        document.getElementById('checkout-phone').value = '';
        document.getElementById('checkout-address').value = '';
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('checkout-total-val').textContent = `₺${total.toFixed(2)}`;
    document.getElementById('checkout-modal').style.display = 'flex';
}

function processCheckoutAddress(name, phone, address) {
    quizAnswers.shipping = { name, phone, address };
    checkoutStep = 2;
    document.getElementById('checkout-panel-1').style.display = 'none';
    document.getElementById('checkout-panel-2').style.display = 'block';
    document.getElementById('step-dot-2').className = 'progress-step active';
}

function processCheckoutPayment() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderId = 'HL-' + Math.floor(10000 + Math.random() * 90000);
    const orderDate = new Date().toLocaleDateString('tr-TR');

    const newOrder = {
        id: orderId,
        customerName: quizAnswers.shipping.name,
        customerEmail: currentUser ? currentUser.email : 'misafir@holly.coffee',
        address: quizAnswers.shipping.address,
        phone: quizAnswers.shipping.phone,
        items: cart.map(item => ({ title: item.title, quantity: item.quantity, price: item.price })),
        total: subtotal,
        date: orderDate,
        status: "pending"
    };

    orders.unshift(newOrder);
    saveOrdersToLocalStorage();

    cart = [];
    sessionStorage.removeItem('holly_coffee_cart_4');
    updateCartBadge();
    closeCartDrawer();

    checkoutStep = 3;
    document.getElementById('checkout-panel-2').style.display = 'none';
    document.getElementById('checkout-panel-3').style.display = 'block';
    document.getElementById('step-dot-3').className = 'progress-step active';
    document.getElementById('success-order-id').textContent = orderId;
}

// --- Interactive Coffee Finder Quiz ---
function handleQuizAnswer(step, val) {
    quizAnswers[step] = val;
    if (step < 2) {
        document.getElementById(`quiz-step-${step}`).classList.remove('active');
        document.getElementById(`quiz-step-${step + 1}`).classList.add('active');
    } else {
        document.getElementById('quiz-step-2').classList.remove('active');
        showQuizRecommendation();
    }
}

function showQuizRecommendation() {
    let matchId = 'prod-1';
    const brew = quizAnswers[1];
    const taste = quizAnswers[2];
    
    if (brew === 'filtre' && taste === 'meyve') {
        matchId = 'prod-2';
    } else if (brew === 'filtre' && taste === 'dengeli') {
        matchId = 'prod-3';
    } else if (brew === 'espresso') {
        matchId = 'prod-1';
    } else {
        matchId = 'prod-3';
    }

    const recommended = products.find(p => p.id === matchId) || products[0];
    const recContainer = document.getElementById('recommended-product-card');
    
    if (recContainer) {
        recContainer.innerHTML = `
            <div class="product-card" style="margin: 0 auto; max-width: 320px;">
                <div class="product-image-container">
                    <i class="fa-solid ${recommended.icon}"></i>
                    <span class="product-badge">Eşleşen</span>
                </div>
                <div class="product-info">
                    <div class="product-meta">
                        <span class="product-category">${recommended.category === 'espresso' ? 'Espresso' : 'Filtre'}</span>
                        <div class="roast-meter">
                            ${Array.from({ length: 5 }, (_, i) => `<span class="dot ${i < recommended.roastLevel ? 'active' : ''}"></span>`).join('')}
                        </div>
                    </div>
                    <a href="#" class="product-title" onclick="event.preventDefault();">${recommended.title}</a>
                    <p class="product-notes">${recommended.notes}</p>
                    <div class="product-footer">
                        <span class="product-price">₺${recommended.price.toFixed(2)}</span>
                        <button class="add-to-cart-btn" data-id="${recommended.id}" title="Sepete Ekle">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        recContainer.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            addToCart(recommended.id);
        });
    }

    document.getElementById('quiz-result').classList.add('active');
}

function restartQuiz() {
    quizAnswers = {};
    document.getElementById('quiz-result').classList.remove('active');
    document.getElementById('quiz-step-2').classList.remove('active');
    document.getElementById('quiz-step-1').classList.add('active');
}

// --- Admin Panel Dashboard ---
function renderAdminAnalytics() {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalCount = orders.length;
    const avgBasket = totalCount > 0 ? (totalRevenue / totalCount) : 0;

    document.getElementById('stat-revenue').textContent = `₺${totalRevenue.toFixed(2)}`;
    document.getElementById('stat-orders').textContent = totalCount;
    document.getElementById('stat-avg').textContent = `₺${avgBasket.toFixed(2)}`;
}

function renderAdminOrders() {
    const tbody = document.getElementById('admin-orders-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center" style="opacity:0.5;">Sipariş kaydı bulunmamaktadır.</td></tr>`;
        return;
    }

    orders.forEach(o => {
        const itemsList = o.items.map(i => `${i.title} (x${i.quantity})`).join('<br>');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>#${o.id}</strong><br><small style="opacity:0.6;">${o.date}</small></td>
            <td><strong>${o.customerName}</strong><br><small style="opacity:0.6;">${o.customerEmail}</small></td>
            <td><div style="max-width:180px; font-size:12px;">${o.address}</div><small style="opacity:0.6;">${o.phone}</small></td>
            <td><div style="font-size:12px;">${itemsList}</div></td>
            <td><strong>₺${o.total.toFixed(2)}</strong></td>
            <td>
                <select class="admin-select-status" data-id="${o.id}">
                    <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Hazırlanıyor</option>
                    <option value="shipping" ${o.status === 'shipping' ? 'selected' : ''}>Kargoda</option>
                    <option value="completed" ${o.status === 'completed' ? 'selected' : ''}>Tamamlandı</option>
                </select>
            </td>
        `;
        tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.admin-select-status').forEach(sel => {
        sel.addEventListener('change', (e) => {
            const orderId = sel.getAttribute('data-id');
            const order = orders.find(o => o.id === orderId);
            if (order) {
                order.status = e.target.value;
                saveOrdersToLocalStorage();
                renderAdminAnalytics();
            }
        });
    });
}

function renderAdminProducts() {
    const tbody = document.getElementById('admin-products-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    products.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><div class="admin-img-preview"><i class="fa-solid ${p.icon}"></i></div></td>
            <td><strong>${p.title}</strong></td>
            <td><span class="product-category" style="font-size:11px;">${p.category}</span></td>
            <td>${p.roastLevel > 0 ? `${p.roastLevel}/5` : 'N/A'}</td>
            <td>
                <input type="number" class="admin-input-price" data-id="${p.id}" value="${p.price}" step="5" min="10">
            </td>
            <td>
                <button class="btn btn-primary btn-mini admin-update-price-btn" data-id="${p.id}">Güncelle</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.admin-update-price-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const prodId = btn.getAttribute('data-id');
            const input = tbody.querySelector(`input[data-id="${prodId}"]`);
            if (input) {
                const newPrice = parseFloat(input.value);
                const product = products.find(p => p.id === prodId);
                if (product && !isNaN(newPrice) && newPrice > 0) {
                    product.price = newPrice;
                    saveProductsToLocalStorage();
                    renderProducts(products);
                    alert(`${product.title} fiyatı ₺${newPrice.toFixed(2)} olarak güncellendi!`);
                }
            }
        });
    });
}

function switchAdminDashboardTab(tabId) {
    document.querySelectorAll('.sidebar-nav li').forEach(li => li.classList.remove('active'));
    document.querySelector(`.sidebar-nav li[data-tab="${tabId}"]`).classList.add('active');

    document.querySelectorAll('.dashboard-tab').forEach(tab => tab.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';

    if (tabId === 'tab-analytics') {
        renderAdminAnalytics();
    } else if (tabId === 'tab-orders') {
        renderAdminOrders();
    } else if (tabId === 'tab-products') {
        renderAdminProducts();
    }
}

// --- Event Listeners ---
function setupEventListeners() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            if (category === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === category);
                renderProducts(filtered);
            }
        });
    });

    const cartOpenBtn = document.getElementById('cart-open-btn');
    if (cartOpenBtn) cartOpenBtn.addEventListener('click', openCartDrawer);

    const cartCloseBtn = document.getElementById('cart-close-btn');
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);

    const cartBackdrop = document.getElementById('cart-drawer-backdrop');
    if (cartBackdrop) {
        cartBackdrop.addEventListener('click', (e) => {
            if (e.target === cartBackdrop) closeCartDrawer();
        });
    }

    const userBtn = document.getElementById('user-portal-btn');
    if (userBtn) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentUser) {
                const menu = document.getElementById('user-dropdown-menu');
                menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
            } else {
                document.getElementById('user-portal-modal').style.display = 'flex';
                document.getElementById('customer-login-form').style.display = 'block';
                document.getElementById('customer-register-form').style.display = 'none';
                document.getElementById('user-modal-title').textContent = 'Giriş Yap';
            }
        });
    }

    document.addEventListener('click', () => {
        const menu = document.getElementById('user-dropdown-menu');
        if (menu) menu.style.display = 'none';
    });

    document.getElementById('modal-close-btn-user').addEventListener('click', () => {
        document.getElementById('user-portal-modal').style.display = 'none';
    });

    document.getElementById('modal-close-btn-orders').addEventListener('click', () => {
        document.getElementById('customer-orders-modal').style.display = 'flex'; // Fix display trigger
        document.getElementById('customer-orders-modal').style.display = 'none';
    });

    document.getElementById('modal-close-btn-checkout').addEventListener('click', () => {
        document.getElementById('checkout-modal').style.display = 'none';
    });

    document.getElementById('switch-to-register').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('customer-login-form').style.display = 'none';
        document.getElementById('customer-register-form').style.display = 'block';
        document.getElementById('user-modal-title').textContent = 'Kayıt Ol';
    });

    document.getElementById('switch-to-login').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('customer-register-form').style.display = 'none';
        document.getElementById('customer-login-form').style.display = 'block';
        document.getElementById('user-modal-title').textContent = 'Giriş Yap';
    });

    document.getElementById('customer-login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('customer-email').value;
        const pass = document.getElementById('customer-password').value;
        handleCustomerLogin(email, pass);
    });

    document.getElementById('customer-register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const pass = document.getElementById('register-password').value;
        const phone = document.getElementById('register-phone').value;
        const address = document.getElementById('register-address').value;
        handleCustomerRegister(name, email, pass, phone, address);
    });

    document.getElementById('user-logout-btn').addEventListener('click', () => {
        currentUser = null;
        sessionStorage.removeItem('holly_coffee_user_4');
        updateUserMenuState(false);
    });

    document.getElementById('user-orders-btn').addEventListener('click', () => {
        renderCustomerOrdersHistory();
        document.getElementById('customer-orders-modal').style.display = 'flex';
    });

    document.querySelectorAll('.quiz-step .quiz-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const stepElement = btn.closest('.quiz-step');
            const step = parseInt(stepElement.getAttribute('data-step'));
            const val = btn.getAttribute('data-value');
            handleQuizAnswer(step, val);
        });
    });

    document.getElementById('quiz-restart-btn').addEventListener('click', restartQuiz);

    document.getElementById('cart-checkout-btn').addEventListener('click', () => {
        closeCartDrawer();
        initCheckoutWizard();
    });

    document.getElementById('checkout-address-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('checkout-name').value;
        const phone = document.getElementById('checkout-phone').value;
        const address = document.getElementById('checkout-address').value;
        processCheckoutAddress(name, phone, address);
    });

    document.getElementById('checkout-payment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        processCheckoutPayment();
    });

    document.getElementById('checkout-success-close-btn').addEventListener('click', () => {
        document.getElementById('checkout-modal').style.display = 'none';
    });

    const adminLink = document.getElementById('admin-footer-link');
    if (adminLink) {
        adminLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('storefront-wrapper').style.display = 'none';
            document.getElementById('admin-login-wrapper').style.display = 'flex';
            document.getElementById('admin-email').value = 'admin@holly.coffee';
            document.getElementById('admin-password').value = 'admin';
            document.getElementById('admin-login-error').style.display = 'none';
        });
    }

    document.getElementById('back-to-store-btn-1').addEventListener('click', () => {
        document.getElementById('admin-login-wrapper').style.display = 'none';
        document.getElementById('storefront-wrapper').style.display = 'block';
    });

    document.getElementById('admin-login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('admin-email').value;
        const pass = document.getElementById('admin-password').value;
        
        if (email === 'admin@holly.coffee' && pass === 'admin') {
            document.getElementById('admin-login-wrapper').style.display = 'none';
            document.getElementById('admin-dashboard-wrapper').style.display = 'grid';
            switchAdminDashboardTab('tab-analytics');
        } else {
            document.getElementById('admin-login-error').style.display = 'block';
        }
    });

    document.querySelectorAll('.sidebar-nav li').forEach(li => {
        li.addEventListener('click', () => {
            const tabId = li.getAttribute('data-tab');
            switchAdminDashboardTab(tabId);
        });
    });

    document.getElementById('back-to-store-btn-2').addEventListener('click', () => {
        document.getElementById('admin-dashboard-wrapper').style.display = 'none';
        document.getElementById('storefront-wrapper').style.display = 'block';
    });

    document.getElementById('admin-logout-btn').addEventListener('click', () => {
        document.getElementById('admin-dashboard-wrapper').style.display = 'none';
        document.getElementById('storefront-wrapper').style.display = 'block';
    });
}
