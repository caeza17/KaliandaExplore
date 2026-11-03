/**
 * Admin Login Page - Kalianda Explore
 */

import { store } from '../state/store.js';

export function renderAdminLogin() {
  const state = store.getState();
  if (state.isAdminLoggedIn) {
    window.location.hash = '#/admin/dashboard';
    return '';
  }

  return `
    <div class="admin-login-page section" style="min-height: 80vh; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 50% 30%, #E0F2F4 0%, var(--background) 70%);">
      <div class="container" style="max-width: 440px;">
        <div style="background: var(--surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 2.25rem; box-shadow: var(--shadow-xl);">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 2rem;">
            <div style="width: 3.5rem; height: 3.5rem; margin: 0 auto 1rem; border-radius: var(--radius-lg); background: linear-gradient(135deg, var(--primary) 0%, var(--primary-container) 100%); display: flex; align-items: center; justify-content: center; color: #ffffff; box-shadow: 0 4px 12px rgba(0, 99, 110, 0.3);">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h1 style="font-size: 1.6rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">Portal Administrator</h1>
            <p style="font-size: 0.92rem; color: var(--text-muted);">Masuk untuk mengelola data destinasi dan mitra UMKM Kalianda.</p>
          </div>

          <!-- Credential Helper Callout -->
          <div style="background: var(--primary-container-light); border: 1px solid rgba(8, 126, 139, 0.25); border-radius: var(--radius-md); padding: 0.85rem 1rem; margin-bottom: 1.5rem; font-size: 0.85rem; color: var(--primary);">
            <div style="font-weight: 700; margin-bottom: 0.2rem;">Akun Uji Coba MVP:</div>
            <div>Username / Email: <strong>admin</strong></div>
            <div>Password: <strong>admin123</strong></div>
          </div>

          <!-- Error Alert Container -->
          <div id="login-error-alert" style="display: none; background: var(--error-light); border: 1px solid rgba(186, 26, 26, 0.25); color: var(--error); border-radius: var(--radius-md); padding: 0.75rem 1rem; margin-bottom: 1.25rem; font-size: 0.88rem; font-weight: 500;">
          </div>

          <!-- Login Form -->
          <form id="admin-login-form">
            <div class="form-group">
              <label class="form-label" for="login-username">Username atau Email <span class="req">*</span></label>
              <input 
                type="text" 
                id="login-username" 
                class="form-input" 
                placeholder="admin atau email pengelola" 
                required 
                autocomplete="username"
              />
            </div>

            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <label class="form-label" for="login-password" style="margin-bottom: 0;">Kata Sandi <span class="req">*</span></label>
                <button type="button" id="toggle-password-btn" style="background: none; border: none; font-size: 0.82rem; color: var(--primary); cursor: pointer; font-weight: 600;">
                  Lihat Sandi
                </button>
              </div>
              <input 
                type="password" 
                id="login-password" 
                class="form-input" 
                placeholder="Masukkan kata sandi" 
                required 
                autocomplete="current-password"
              />
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem; padding: 0.85rem;">
              Masuk ke Dashboard
            </button>
          </form>

          <div style="text-align: center; margin-top: 1.75rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle);">
            <a href="#/" style="font-size: 0.9rem; color: var(--text-muted); font-weight: 500;">
              ← Kembali ke Halaman Publik
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function setupAdminLoginEvents() {
  const form = document.getElementById('admin-login-form');
  const usernameInput = document.getElementById('login-username');
  const passwordInput = document.getElementById('login-password');
  const toggleBtn = document.getElementById('toggle-password-btn');
  const errorAlert = document.getElementById('login-error-alert');

  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener('click', () => {
      const isPass = passwordInput.type === 'password';
      passwordInput.type = isPass ? 'text' : 'password';
      toggleBtn.textContent = isPass ? 'Sembunyikan' : 'Lihat Sandi';
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = usernameInput.value.trim();
      const pass = passwordInput.value;

      const result = store.loginAdmin(user, pass);
      if (result.success) {
        window.location.hash = '#/admin/dashboard';
      } else {
        if (errorAlert) {
          errorAlert.textContent = result.message;
          errorAlert.style.display = 'block';
        }
      }
    });
  }
}
