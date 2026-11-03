/**
 * Main Application Controller & Hash Router - Kalianda Explore
 */

import './index.css';
import { store } from './state/store.js';
import { renderNavbar, setupNavbarEvents } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { showToastNotification, setupToastContainer } from './components/Toast.js';

import { renderHome, setupHomeEvents } from './pages/Home.js';
import { renderDestinations, setupDestinationsEvents } from './pages/Destinations.js';
import { renderDestinationDetail, setupDestinationDetailEvents } from './pages/DestinationDetail.js';
import { renderBusinesses, setupBusinessesEvents } from './pages/Businesses.js';
import { renderBusinessDetail } from './pages/BusinessDetail.js';
import { renderAbout } from './pages/About.js';
import { renderAdminLogin, setupAdminLoginEvents } from './pages/AdminLogin.js';
import { renderAdminDashboard, setupAdminDashboardEvents } from './pages/AdminDashboard.js';

// Setup Toast Notification Listener
setupToastContainer();
store.onToast(({ message, type }) => {
  showToastNotification(message, type);
});

// Router Handler
function parseHash() {
  const rawHash = window.location.hash.slice(1) || '/';
  const [pathPart, queryPart] = rawHash.split('?');
  
  const searchParams = {};
  if (queryPart) {
    const usp = new URLSearchParams(queryPart);
    for (const [key, val] of usp.entries()) {
      searchParams[key] = val;
    }
  }

  const segments = pathPart.split('/').filter(Boolean);
  return { path: pathPart, segments, searchParams };
}

function route() {
  const { path, segments, searchParams } = parseHash();
  const appContainer = document.getElementById('app');

  let activeNav = 'home';
  if (segments[0] === 'destinasi') activeNav = 'destinasi';
  else if (segments[0] === 'umkm') activeNav = 'umkm';
  else if (segments[0] === 'tentang') activeNav = 'tentang';
  else if (segments[0] === 'admin') activeNav = 'admin';

  let pageContent = '';
  let afterRender = () => {};

  if (segments.length === 0 || path === '/') {
    activeNav = 'home';
    pageContent = renderHome();
    afterRender = setupHomeEvents;
  } else if (segments[0] === 'destinasi') {
    if (segments[1]) {
      const destId = segments[1];
      pageContent = renderDestinationDetail(destId);
      afterRender = setupDestinationDetailEvents;
    } else {
      pageContent = renderDestinations(searchParams);
      afterRender = () => setupDestinationsEvents(searchParams);
    }
  } else if (segments[0] === 'umkm') {
    if (segments[1]) {
      const bizId = segments[1];
      pageContent = renderBusinessDetail(bizId);
    } else {
      pageContent = renderBusinesses(searchParams);
      afterRender = () => setupBusinessesEvents(searchParams);
    }
  } else if (segments[0] === 'tentang') {
    pageContent = renderAbout();
  } else if (segments[0] === 'admin') {
    if (segments[1] === 'dashboard') {
      const state = store.getState();
      if (!state.isAdminLoggedIn) {
        window.location.hash = '#/admin/login';
        return;
      }
      pageContent = renderAdminDashboard();
      afterRender = setupAdminDashboardEvents;
    } else {
      pageContent = renderAdminLogin();
      afterRender = setupAdminLoginEvents;
    }
  } else {
    // 404 Not Found Page
    pageContent = `
      <div class="section container">
        <div class="empty-state">
          <h2 class="empty-title">Halaman Tidak Ditemukan (404)</h2>
          <p class="empty-desc">Tautan atau halaman yang Anda tuju tidak tersedia.</p>
          <a href="#/" class="btn btn-primary">Kembali ke Beranda</a>
        </div>
      </div>
    `;
  }

  // Render Full Page Layout
  appContainer.innerHTML = `
    ${renderNavbar(activeNav)}
    <main id="main-content">
      ${pageContent}
    </main>
    ${renderFooter()}
  `;

  // Attach navbar & page-specific event listeners
  setupNavbarEvents();
  afterRender();

  // Scroll to top
  window.scrollTo(0, 0);
}

// Subscribe to store updates to keep UI synced
store.subscribe(() => {
  const { segments } = parseHash();
  // If we are on public pages or admin dashboard, we can refresh the current view safely
  if (segments[0] === 'admin' && segments[1] === 'dashboard') {
    // handled internally in admin dashboard to preserve form inputs
  }
});

// Event Listeners for Hash Navigation
window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', route);

// Initial route execution
route();
