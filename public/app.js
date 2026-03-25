const API_BASE = 'http://localhost:8000';

// Estado global simples
let state = {
    user: null,
    token: localStorage.getItem('blx_token'),
    activeSection: 'products'
};

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    checkAuth();
});

function setupEventListeners() {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('signup-form').addEventListener('submit', handleSignup);
    document.getElementById('product-form').addEventListener('submit', handleCreateProduct);
}

// --- AUTENTICAÇÃO ---
async function checkAuth() {
    if (!state.token) {
        showSection('auth');
        updateNav();
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/login/me`, {
            headers: { 'Authorization': `Bearer ${state.token}` }
        });

        if (res.ok) {
            state.user = await res.json();
            showSection('products');
            loadProducts();
        } else {
            logout();
        }
    } catch (err) {
        console.error('Erro ao validar sessão:', err);
        logout();
    }
    updateNav();
}

async function handleLogin(e) {
    e.preventDefault();
    const telefone = document.getElementById('login-phone').value;
    const senha = document.getElementById('login-pass').value;

    try {
        const res = await fetch(`${API_BASE}/auth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ telefone, senha })
        });

        const data = await res.json();
        if (res.ok) {
            state.token = data.access_token;
            state.user = data.usuario;
            localStorage.setItem('blx_token', state.token);
            showToast('Login realizado com sucesso!');
            showSection('products');
            loadProducts();
            updateNav();
        } else {
            showToast(data.detail || 'Erro ao entrar', 'error');
        }
    } catch (err) {
        showToast('Erro de conexão com servidor', 'error');
    }
}

async function handleSignup(e) {
    e.preventDefault();
    const nome = document.getElementById('signup-name').value;
    const telefone = document.getElementById('signup-phone').value;
    const senha = document.getElementById('signup-pass').value;

    try {
        const res = await fetch(`${API_BASE}/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, telefone, senha })
        });

        if (res.ok) {
            showToast('Usuário criado! Agora faça login.');
            switchAuthTab('login');
        } else {
            const data = await res.json();
            showToast(data.detail || 'Erro ao cadastrar', 'error');
        }
    } catch (err) {
        showToast('Erro de conexão', 'error');
    }
}

function logout() {
    state.token = null;
    state.user = null;
    localStorage.removeItem('blx_token');
    showSection('auth');
    updateNav();
}

// --- PRODUTOS ---
async function loadProducts() {
    const grid = document.getElementById('products-grid');
    try {
        const res = await fetch(`${API_BASE}/produtos`);
        const products = await res.json();
        
        grid.innerHTML = products.map(p => `
            <div class="product-card glass-card">
                <h3>${p.nome}</h3>
                <p>${p.descricao || 'Sem descrição'}</p>
                <div class="card-footer">
                    <span class="price-tag">R$ ${p.preco.toFixed(2)}</span>
                    <button class="btn-micro" onclick="buyProduct(${p.id})">Comprar</button>
                </div>
            </div>
        `).join('') || '<p>Nenhum produto cadastrado.</p>';
    } catch (err) {
        grid.innerHTML = '<p>Erro ao carregar produtos.</p>';
    }
}

async function handleCreateProduct(e) {
    e.preventDefault();
    if (!state.token) return;

    const payload = {
        nome: document.getElementById('prod-name').value,
        descricao: document.getElementById('prod-desc').value,
        preco: parseFloat(document.getElementById('prod-price').value),
        disponivel: document.getElementById('prod-avail').checked,
        usuario_id: state.user.id
    };

    try {
        const res = await fetch(`${API_BASE}/produtos`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            showToast('Produto publicado!');
            hideModal('product-modal');
            loadProducts();
        }
    } catch (err) {
        showToast('Erro ao publicar', 'error');
    }
}

// --- UTILITÁRIOS DE UI ---
function showSection(id) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById(`${id}-section`).classList.remove('hidden');
    state.activeSection = id;
}

function updateNav() {
    const nav = document.getElementById('nav-links');
    if (state.token) {
        nav.innerHTML = `
            <span>Olá, ${state.user?.nome || 'Usuário'}</span>
            <button onclick="showSection('products')">Produtos</button>
            <button onclick="logout()">Sair</button>
        `;
    } else {
        nav.innerHTML = `<button onclick="showSection('auth')">Entrar / Cadastrar</button>`;
    }
}

function switchAuthTab(tab) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const btns = document.querySelectorAll('.tab-btn');

    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        btns[0].classList.add('active');
        btns[1].classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        btns[0].classList.remove('active');
        btns[1].classList.add('active');
    }
}

function showModal(id) { document.getElementById(id).classList.remove('hidden'); }
function hideModal(id) { document.getElementById(id).classList.add('hidden'); }

function showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}
