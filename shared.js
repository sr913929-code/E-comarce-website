// ── SHARED STATE ──
const DEFAULT_STATE = {
  users: [
    { id: 1, name: 'Admin User', email: 'admin@luxe.com', password: 'admin123', role: 'admin', joined: '2024-01-01' },
    { id: 2, name: 'Jane Doe', email: 'user@luxe.com', password: 'user123', role: 'user', joined: '2024-03-15' }
  ],
  products: [
    { id: 1, name: 'Cashmere Overcoat', category: 'Fashion', price: 489, stock: 12, desc: 'Italian cashmere, tailored fit', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=300&fit=crop', badge: 'New' },
    { id: 2, name: 'Pro Wireless Earbuds', category: 'Electronics', price: 199, stock: 34, desc: 'ANC, 30hr battery life', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop', badge: 'Hot' },
    { id: 3, name: 'Artisan Perfume', category: 'Beauty', price: 129, stock: 20, desc: 'French floral bouquet', image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&h=300&fit=crop', badge: '' },
    { id: 4, name: 'Silk Pocket Square', category: 'Fashion', price: 49, stock: 60, desc: 'Hand-rolled edges, Lyon silk', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=300&fit=crop', badge: '' },
    { id: 5, name: 'Smart Watch Ultra', category: 'Electronics', price: 549, stock: 8, desc: 'Titanium case, health suite', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop', badge: 'Sale' },
    { id: 6, name: 'Marble Diffuser Set', category: 'Home', price: 89, stock: 25, desc: 'Nordic design, 5 oils included', image: 'https://images.unsplash.com/photo-1608181831718-c9efc4a180c9?w=400&h=300&fit=crop', badge: 'New' },
    { id: 7, name: 'Yoga Mat Pro', category: 'Sports', price: 79, stock: 40, desc: 'Natural rubber, 6mm thickness', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop', badge: '' },
    { id: 8, name: 'Gold Skincare Kit', category: 'Beauty', price: 219, stock: 15, desc: '24K gold infused, 5-piece set', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop', badge: 'Luxe' }
  ],
  orders: [],
  cart: []
};

function getState() {
  try {
    const s = localStorage.getItem('luxe_state');
    return s ? JSON.parse(s) : JSON.parse(JSON.stringify(DEFAULT_STATE));
  } catch { return JSON.parse(JSON.stringify(DEFAULT_STATE)); }
}

function saveState(state) {
  try { localStorage.setItem('luxe_state', JSON.stringify(state)); } catch {}
}

function getCurrentUser() {
  try {
    const u = localStorage.getItem('luxe_user');
    return u ? JSON.parse(u) : null;
  } catch { return null; }
}

function setCurrentUser(user) {
  if (user) localStorage.setItem('luxe_user', JSON.stringify(user));
  else localStorage.removeItem('luxe_user');
}

function requireAuth(role) {
  const user = getCurrentUser();
  if (!user) { window.location.href = 'index.html'; return null; }
  if (role && user.role !== role) { window.location.href = user.role === 'admin' ? 'admin.html' : 'store.html'; return null; }
  return user;
}

function logout() {
  setCurrentUser(null);
  window.location.href = 'index.html';
}

function toast(msg, icon = '✓') {
  let el = document.getElementById('toast');
  if (!el) return;
  document.getElementById('toast-msg').textContent = msg;
  document.getElementById('toast-icon').textContent = icon;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2800);
}
