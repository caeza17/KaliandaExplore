/**
 * Businesses (UMKM) Catalog Page - Kalianda Explore
 */

import { store } from '../state/store.js';
import { renderBusinessCard } from '../components/Card.js';

export function renderBusinesses(searchParams = {}) {
  const initialQuery = searchParams.q || '';
  const initialCategory = searchParams.cat || 'Semua';

  const categories = [
    'Semua', 
    'Kuliner', 
    'Kopi', 
    'Oleh-Oleh', 
    'Kerajinan', 
    'Produk Olahan',
    'Merchandise'
  ];

  return `
    <div class="businesses-page section">
      <div class="container">
        <div class="breadcrumb">
          <a href="#/">Beranda</a>
          <span>/</span>
          <span style="color: var(--text-main); font-weight: 600;">Direktori UMKM & Kuliner</span>
        </div>

        <div class="section-header">
          <div>
            <span class="badge badge-secondary" style="margin-bottom: 0.5rem;">Pemberdayaan Usaha Lokal</span>
            <h1 class="section-title">Katalog UMKM & Kuliner Kalianda</h1>
            <p class="section-subtitle">Dukung ekonomi pengrajin tapis, olahan pisang, hasil kebun kopi Rajabasa, dan sentra boga bahari.</p>
          </div>
        </div>

        <!-- Filter & Search Controls -->
        <div style="background: var(--surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 2rem; box-shadow: var(--shadow-sm);">
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <div class="search-box" style="flex: 1; min-width: 280px; max-width: 480px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-subtle)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input 
                type="text" 
                id="biz-search-input" 
                class="search-input" 
                placeholder="Cari nama usaha, produk, kopi, tapis, oleh-oleh..." 
                value="${escapeHTML(initialQuery)}"
              />
              ${initialQuery ? `
                <button id="clear-biz-search-btn" style="background:none; border:none; cursor:pointer; color: var(--text-subtle); font-size:1.1rem; padding: 0 4px;" title="Hapus pencarian">×</button>
              ` : ''}
            </div>

            <div id="biz-count-indicator" style="font-size: 0.9rem; color: var(--text-muted); font-weight: 600;">
              Memuat data...
            </div>
          </div>

          <!-- Category Chips -->
          <div class="chips-container" id="biz-category-chips">
            ${categories.map(cat => {
              const isActive = (cat === 'Semua' && (initialCategory === 'Semua' || !initialCategory)) || 
                               (cat.toLowerCase().includes(initialCategory.toLowerCase()));
              return `
                <button 
                  class="chip ${isActive ? 'active' : ''}" 
                  data-cat="${cat}"
                >
                  ${cat}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Grid Container -->
        <div id="businesses-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.75rem;">
          <!-- Dynamically populated -->
        </div>
      </div>
    </div>
  `;
}

export function setupBusinessesEvents(searchParams = {}) {
  let currentQuery = (searchParams.q || '').toLowerCase();
  let currentCategory = searchParams.cat || 'Semua';

  const searchInput = document.getElementById('biz-search-input');
  const clearBtn = document.getElementById('clear-biz-search-btn');
  const categoryChips = document.querySelectorAll('#biz-category-chips .chip');
  const grid = document.getElementById('businesses-grid');
  const countIndicator = document.getElementById('biz-count-indicator');

  function updateList() {
    const all = store.getBusinesses();
    const filtered = all.filter(item => {
      const matchQuery = !currentQuery || 
        item.name.toLowerCase().includes(currentQuery) ||
        item.description.toLowerCase().includes(currentQuery) ||
        item.address.toLowerCase().includes(currentQuery) ||
        (item.owner && item.owner.toLowerCase().includes(currentQuery)) ||
        (item.products && item.products.some(p => p.name.toLowerCase().includes(currentQuery)));

      const matchCategory = currentCategory === 'Semua' || 
        item.category.toLowerCase().includes(currentCategory.toLowerCase()) ||
        currentCategory.toLowerCase().includes(item.category.toLowerCase());

      return matchQuery && matchCategory;
    });

    if (countIndicator) {
      countIndicator.textContent = `Menampilkan ${filtered.length} dari ${all.length} mitra UMKM aktif`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1;">
          <div class="empty-state">
            <div class="empty-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </div>
            <h3 class="empty-title">Tidak Ada UMKM Ditemukan</h3>
            <p class="empty-desc">Tidak ada mitra yang cocok dengan kata kunci "<strong>${escapeHTML(currentQuery || currentCategory)}</strong>".</p>
            <button id="reset-biz-filter-btn" class="btn btn-primary">
              Reset Pencarian
            </button>
          </div>
        </div>
      `;

      const resetBtn = document.getElementById('reset-biz-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (searchInput) searchInput.value = '';
          currentQuery = '';
          currentCategory = 'Semua';
          categoryChips.forEach(c => c.classList.toggle('active', c.dataset.cat === 'Semua'));
          updateList();
        });
      }
    } else {
      grid.innerHTML = filtered.map(renderBusinessCard).join('');
    }
  }

  // Initial render
  updateList();

  // Search input event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentQuery = e.target.value.trim().toLowerCase();
      updateList();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentQuery = '';
      clearBtn.style.display = 'none';
      updateList();
    });
  }

  // Category chip clicks
  categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      categoryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.dataset.cat;
      updateList();
    });
  });
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
