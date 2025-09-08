// app.js
const API = location.origin + '/api';
let token = localStorage.getItem('token');

const authScreen = document.getElementById('auth-screen');
const dashboard = document.getElementById('dashboard');
const userArea = document.getElementById('user-area');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const btnLogin = document.getElementById('btn-login');
const expiryList = document.getElementById('expiry-list');
const drugsTableBody = document.querySelector('#drugs-table tbody');
const stockSummary = document.getElementById('stock-summary');

btnLogin.addEventListener('click', async () => {
  try {
    const res = await fetch(API + '/auth/login', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email: emailInput.value, password: passwordInput.value })
    });
    const j = await res.json();
    if (!res.ok) return alert(j.error || 'Login failed');
    localStorage.setItem('token', j.token);
    location.reload();
  } catch (e) { alert(e.message); }
});