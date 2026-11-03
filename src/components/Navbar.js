/**
 * Navbar Component - Kalianda Explore
 */

import { store } from '../state/store.js';

export function renderNavbar(activeRoute = 'home') {
  const state = store.getState();
  const isAdmin = state.isAdminLoggedIn;

  return `
    <header class="navbar">
      <div class="container">
        <div class="nav-inner">
          <a href="#/" class="brand-logo" id="nav-brand">
            <div class="brand-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 12h20M2 17h20M2 7h20"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <span>Kalianda<span style="color: var(--secondary);">Explore</span></span>
          </a>

          <nav>
            <ul class="nav-links" id="nav-links-menu">
              <li>
                <a href="#/" class="nav-link ${activeRoute === 'home' ? 'active' : ''}">Beranda</a>
              </li>
              <li>
                <a href="#/destinasi" class="nav-link ${activeRoute === 'destinasi' ? 'active' : ''}">Destinasi Wisata</a>
              </li>
              <li>
                <a href="#/umkm" class="nav-link ${activeRoute === 'umkm' ? 'active' : ''}">UMKM & Kuliner</a>
              </li>
              <li>
                <a href="#/tentang" class="nav-link ${activeRoute === 'tentang' ? 'active' : ''}">Tentang</a>
              </li>
              <li>
                ${isAdmin ? `
                  <a href="#/admin/dashboard" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.35rem;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                    Dashboard Admin
                  </a>
                ` : `
                  <a href="#/admin/login" class="btn btn-outline btn-sm" style="display: inline-flex; align-items: center; gap: 0.35rem;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Portal Admin
                  </a>
                `}
              </li>
            </ul>
          </nav>

          <button class="mobile-nav-toggle" id="mobile-toggle" aria-label="Menu Navigasi">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  `;
}

export function setupNavbarEvents() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('nav-links-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
  }
}
