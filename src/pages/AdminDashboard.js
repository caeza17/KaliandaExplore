/**
 * Admin Dashboard - Kalianda Explore
 * Kelola Destinasi & UMKM (CRUD Lengkap dengan Validasi & Status Aktif/Nonaktif)
 */

import { store } from '../state/store.js';

let activeTab = 'destinations'; // 'destinations' | 'businesses'
let editingItem = null; // null | destination object | business object
let deleteTarget = null; // null | { type: 'dest' | 'biz', id: string, name: string }

export function renderAdminDashboard() {
  const state = store.getState();
  if (!state.isAdminLoggedIn) {
    window.location.hash = '#/admin/login';
    return '';
  }

  const allDestinations = store.getDestinations(true);
  const allBusinesses = store.getBusinesses(true);

  const activeDestCount = allDestinations.filter(d => d.status === 'active').length;
  const activeBizCount = allBusinesses.filter(b => b.status === 'active').length;

  return `
    <div class="admin-dashboard-page section" style="background: #F1F4F8; min-height: 90vh; padding: 2rem 0 4rem;">
      <div class="container">
        <!-- Top bar admin -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.25rem 1.75rem; margin-bottom: 2rem; box-shadow: var(--shadow-sm); flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 2.75rem; height: 2.75rem; border-radius: var(--radius-md); background: var(--primary-container-light); color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: bold;">
              ADM
            </div>
            <div>
              <h1 style="font-size: 1.35rem; font-weight: 800; color: var(--text-main);">Dashboard Administrator</h1>
              <p style="font-size: 0.85rem; color: var(--text-muted);">
                Pengelolaan data terpadu Kalianda Explore &bull; Sesi aktif: <strong>${escapeHTML(state.adminUser.name)}</strong>
              </p>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <button id="admin-reset-data-btn" class="btn btn-outline btn-sm" title="Kembalikan data contoh ke pengaturan awal">
              🔄 Reset Data Default
            </button>
            <a href="#/" class="btn btn-outline btn-sm" target="_blank" title="Buka website publik di tab baru">
              Lihat Web Publik ↗
            </a>
            <button id="admin-logout-btn" class="btn btn-destructive btn-sm">
              Keluar
            </button>
          </div>
        </div>

        <!-- Metric Summary Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon" style="background: var(--primary-container-light); color: var(--primary);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <div class="stat-val">${allDestinations.length}</div>
              <div class="stat-label">Total Destinasi (${activeDestCount} Aktif)</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon" style="background: var(--secondary-light); color: var(--secondary);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <div class="stat-val">${allBusinesses.length}</div>
              <div class="stat-label">Mitra UMKM (${activeBizCount} Aktif)</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon" style="background: var(--accent-light); color: var(--accent);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
            </div>
            <div>
              <div class="stat-val">100%</div>
              <div class="stat-label">Status Server & Database</div>
            </div>
          </div>
        </div>

        <!-- Main Management Tabs -->
        <div style="background: var(--surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); overflow: hidden;">
          <!-- Tab Navigation Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid var(--border-subtle); padding: 0.75rem 1.5rem; background: var(--surface-alt); flex-wrap: wrap; gap: 1rem;">
            <div style="display: flex; gap: 0.5rem;">
              <button 
                id="tab-btn-dest" 
                class="btn ${activeTab === 'destinations' ? 'btn-primary' : 'btn-outline'}"
                style="padding: 0.55rem 1.25rem;"
              >
                🏖️ Kelola Destinasi (${allDestinations.length})
              </button>
              <button 
                id="tab-btn-biz" 
                class="btn ${activeTab === 'businesses' ? 'btn-primary' : 'btn-outline'}"
                style="padding: 0.55rem 1.25rem;"
              >
                🏪 Kelola Mitra UMKM (${allBusinesses.length})
              </button>
            </div>

            <div>
              ${activeTab === 'destinations' ? `
                <button id="add-destination-btn" class="btn btn-secondary">
                  + Tambah Destinasi Baru
                </button>
              ` : `
                <button id="add-business-btn" class="btn btn-secondary">
                  + Tambah Profil UMKM Baru
                </button>
              `}
            </div>
          </div>

          <!-- Tab Content Area -->
          <div style="padding: 1.5rem;">
            ${activeTab === 'destinations' ? renderDestinationsTable(allDestinations) : renderBusinessesTable(allBusinesses)}
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Form Placeholder -->
    <div id="admin-modal-root"></div>
  `;
}

function renderDestinationsTable(destinations) {
  return `
    <div>
      <div style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
        <p style="font-size: 0.9rem; color: var(--text-muted);">
          Daftar seluruh destinasi wisata. Data berstatus <em>Nonaktif</em> tidak akan ditampilkan pada katalog wisatawan publik.
        </p>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 70px;">Foto</th>
              <th>Nama Destinasi</th>
              <th>Kategori</th>
              <th>Tarif Tiket</th>
              <th>Kontak</th>
              <th style="text-align: center;">Status</th>
              <th style="text-align: right; width: 220px;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${destinations.map(d => `
              <tr>
                <td>
                  <img 
                    src="${d.coverImage}" 
                    alt="${escapeHTML(d.name)}" 
                    style="width: 54px; height: 38px; object-fit: cover; border-radius: var(--radius-sm);" 
                    onerror="this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=100&q=80';"
                  />
                </td>
                <td>
                  <strong style="color: var(--text-main); font-size: 0.95rem;">${escapeHTML(d.name)}</strong>
                  <div style="font-size: 0.8rem; color: var(--text-subtle); max-width: 260px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${escapeHTML(d.address)}
                  </div>
                </td>
                <td>
                  <span class="badge badge-primary" style="font-size: 0.75rem;">${escapeHTML(d.category)}</span>
                </td>
                <td style="font-size: 0.85rem; color: var(--text-muted);">
                  ${d.ticketPrice ? escapeHTML(d.ticketPrice.split('(')[0]) : '-'}
                </td>
                <td style="font-size: 0.85rem; color: var(--text-muted);">
                  ${d.contact || '-'}
                </td>
                <td style="text-align: center;">
                  <span class="badge ${d.status === 'active' ? 'badge-secondary' : 'badge-inactive'}">
                    ${d.status === 'active' ? '● Aktif' : '○ Nonaktif'}
                  </span>
                </td>
                <td style="text-align: right;">
                  <div style="display: inline-flex; gap: 0.35rem;">
                    <button class="btn btn-outline btn-sm btn-toggle-dest" data-id="${d.id}" title="Ubah status publikasi">
                      ${d.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                    </button>
                    <button class="btn btn-outline btn-sm btn-edit-dest" data-id="${d.id}">
                      Edit
                    </button>
                    <button class="btn btn-destructive btn-sm btn-delete-dest" data-id="${d.id}" data-name="${escapeHTML(d.name)}">
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderBusinessesTable(businesses) {
  return `
    <div>
      <div style="margin-bottom: 1rem;">
        <p style="font-size: 0.9rem; color: var(--text-muted);">
          Daftar mitra UMKM terdaftar di Kecamatan Kalianda. Kelola profil, produk, dan nomor WhatsApp usaha.
        </p>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 70px;">Logo/Foto</th>
              <th>Nama UMKM</th>
              <th>Kategori</th>
              <th>Pemilik</th>
              <th>WhatsApp</th>
              <th style="text-align: center;">Status</th>
              <th style="text-align: right; width: 220px;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${businesses.map(b => `
              <tr>
                <td>
                  <img 
                    src="${b.logoImage || b.coverImage}" 
                    alt="${escapeHTML(b.name)}" 
                    style="width: 44px; height: 44px; object-fit: cover; border-radius: var(--radius-sm);" 
                    onerror="this.src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=100&q=80';"
                  />
                </td>
                <td>
                  <strong style="color: var(--text-main); font-size: 0.95rem;">${escapeHTML(b.name)}</strong>
                  <div style="font-size: 0.8rem; color: var(--text-subtle);">
                    ${b.products ? b.products.length : 0} Produk Unggulan
                  </div>
                </td>
                <td>
                  <span class="badge badge-primary" style="font-size: 0.75rem;">${escapeHTML(b.category)}</span>
                </td>
                <td style="font-size: 0.88rem; color: var(--text-muted);">
                  ${b.owner ? escapeHTML(b.owner) : '-'}
                </td>
                <td style="font-size: 0.88rem; color: var(--secondary); font-weight: 600;">
                  ${b.whatsapp ? '+' + escapeHTML(b.whatsapp) : '-'}
                </td>
                <td style="text-align: center;">
                  <span class="badge ${b.status === 'active' ? 'badge-secondary' : 'badge-inactive'}">
                    ${b.status === 'active' ? '● Aktif' : '○ Nonaktif'}
                  </span>
                </td>
                <td style="text-align: right;">
                  <div style="display: inline-flex; gap: 0.35rem;">
                    <button class="btn btn-outline btn-sm btn-toggle-biz" data-id="${b.id}" title="Ubah status publikasi">
                      ${b.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                    </button>
                    <button class="btn btn-outline btn-sm btn-edit-biz" data-id="${b.id}">
                      Edit
                    </button>
                    <button class="btn btn-destructive btn-sm btn-delete-biz" data-id="${b.id}" data-name="${escapeHTML(b.name)}">
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function setupAdminDashboardEvents() {
  const logoutBtn = document.getElementById('admin-logout-btn');
  const resetBtn = document.getElementById('admin-reset-data-btn');
  const tabDestBtn = document.getElementById('tab-btn-dest');
  const tabBizBtn = document.getElementById('tab-btn-biz');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('Apakah Anda yakin ingin keluar dari sesi Admin?')) {
        store.logoutAdmin();
        window.location.hash = '#/';
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('PERINGATAN: Tindakan ini akan mengembalikan seluruh data destinasi & UMKM ke kondisi awal (default). Lanjutkan?')) {
        store.resetToDefault();
        window.location.reload();
      }
    });
  }

  if (tabDestBtn) {
    tabDestBtn.addEventListener('click', () => {
      activeTab = 'destinations';
      renderCurrentView();
    });
  }

  if (tabBizBtn) {
    tabBizBtn.addEventListener('click', () => {
      activeTab = 'businesses';
      renderCurrentView();
    });
  }

  // --- Add Buttons ---
  const addDestBtn = document.getElementById('add-destination-btn');
  if (addDestBtn) {
    addDestBtn.addEventListener('click', () => {
      openDestinationModal(null);
    });
  }

  const addBizBtn = document.getElementById('add-business-btn');
  if (addBizBtn) {
    addBizBtn.addEventListener('click', () => {
      openBusinessModal(null);
    });
  }

  // --- Destination Actions ---
  document.querySelectorAll('.btn-toggle-dest').forEach(btn => {
    btn.addEventListener('click', () => {
      store.toggleDestinationStatus(btn.dataset.id);
      renderCurrentView();
    });
  });

  document.querySelectorAll('.btn-edit-dest').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = store.getDestinationById(btn.dataset.id);
      if (item) openDestinationModal(item);
    });
  });

  document.querySelectorAll('.btn-delete-dest').forEach(btn => {
    btn.addEventListener('click', () => {
      openDeleteConfirmModal('dest', btn.dataset.id, btn.dataset.name);
    });
  });

  // --- Business Actions ---
  document.querySelectorAll('.btn-toggle-biz').forEach(btn => {
    btn.addEventListener('click', () => {
      store.toggleBusinessStatus(btn.dataset.id);
      renderCurrentView();
    });
  });

  document.querySelectorAll('.btn-edit-biz').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = store.getBusinessById(btn.dataset.id);
      if (item) openBusinessModal(item);
    });
  });

  document.querySelectorAll('.btn-delete-biz').forEach(btn => {
    btn.addEventListener('click', () => {
      openDeleteConfirmModal('biz', btn.dataset.id, btn.dataset.name);
    });
  });
}

function renderCurrentView() {
  const app = document.getElementById('main-content');
  if (app) {
    app.innerHTML = renderAdminDashboard();
    setupAdminDashboardEvents();
  }
}

// --- Modals Logic ---

function openDestinationModal(item) {
  const modalRoot = document.getElementById('admin-modal-root');
  if (!modalRoot) return;

  const isEdit = !!item;
  const categories = ['Wisata Pantai', 'Wisata Alam', 'Wisata Bahari & Rekreasi', 'Wisata Sejarah & Pantai', 'Wisata Kebugaran & Alam'];

  modalRoot.innerHTML = `
    <div class="modal-overlay" id="dest-modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">${isEdit ? 'Edit Destinasi Wisata' : 'Tambah Destinasi Baru'}</h3>
          <button class="modal-close" id="close-dest-modal">✕</button>
        </div>

        <form id="dest-form">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Nama Destinasi <span class="req">*</span></label>
              <input type="text" id="df-name" class="form-input" required value="${isEdit ? escapeHTML(item.name) : ''}" placeholder="Misal: Pantai Kedu Warna" />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Kategori <span class="req">*</span></label>
                <select id="df-category" class="form-select" required>
                  ${categories.map(cat => `
                    <option value="${cat}" ${isEdit && item.category === cat ? 'selected' : ''}>${cat}</option>
                  `).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Status Publikasi</label>
                <select id="df-status" class="form-select">
                  <option value="active" ${isEdit && item.status === 'active' ? 'selected' : ''}>Aktif (Tampil)</option>
                  <option value="inactive" ${isEdit && item.status === 'inactive' ? 'selected' : ''}>Nonaktif (Sembunyikan)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Tagline Singkat</label>
              <input type="text" id="df-tagline" class="form-input" value="${isEdit ? escapeHTML(item.tagline || '') : ''}" placeholder="Spot sunset spektakuler dan area camping..." />
            </div>

            <div class="form-group">
              <label class="form-label">Deskripsi Lengkap <span class="req">*</span></label>
              <textarea id="df-desc" class="form-textarea" required placeholder="Deskripsi daya tarik, suasana, dan keunikan destinasi...">${isEdit ? escapeHTML(item.description) : ''}</textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Alamat / Lokasi <span class="req">*</span></label>
              <input type="text" id="df-address" class="form-input" required value="${isEdit ? escapeHTML(item.address) : ''}" placeholder="Jl. Sinar Laut, Way Urang, Kec. Kalianda..." />
            </div>

            <div class="form-group">
              <label class="form-label">URL Foto Cover (Gambar)</label>
              <input type="url" id="df-image" class="form-input" value="${isEdit ? escapeHTML(item.coverImage) : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'}" placeholder="https://..." />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Perkiraan Tiket</label>
                <input type="text" id="df-ticket" class="form-input" value="${isEdit ? escapeHTML(item.ticketPrice || '') : 'Rp 15.000 / orang'}" placeholder="Misal: Rp 15.000 / orang" />
              </div>

              <div class="form-group">
                <label class="form-label">Jam Operasional</label>
                <input type="text" id="df-hours" class="form-input" value="${isEdit ? escapeHTML(item.operatingHours || '') : '07.00 - 18.00 WIB'}" placeholder="07.00 - 18.00 WIB" />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Nomor WhatsApp Pengelola</label>
                <input type="text" id="df-whatsapp" class="form-input" value="${isEdit ? escapeHTML(item.whatsapp || '') : ''}" placeholder="628xxxxxxxxxx" />
                <div class="form-hint">Gunakan awalan 628 tanpa spasi untuk tautan Click-to-Chat.</div>
              </div>

              <div class="form-group">
                <label class="form-label">Daftar Fasilitas (Pisahkan koma)</label>
                <input type="text" id="df-facilities" class="form-input" value="${isEdit && item.facilities ? escapeHTML(item.facilities.join(', ')) : 'Area Parkir, Toilet, Gazebo, Warung Makan'}" placeholder="Toilet, Gazebo, Mushola..." />
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="cancel-dest-btn">Batal</button>
            <button type="submit" class="btn btn-primary">${isEdit ? 'Simpan Perubahan' : 'Tambah Destinasi'}</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const closeBtn = document.getElementById('close-dest-modal');
  const cancelBtn = document.getElementById('cancel-dest-btn');
  const overlay = document.getElementById('dest-modal-overlay');
  const form = document.getElementById('dest-form');

  const closeModal = () => modalRoot.innerHTML = '';

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawFacilities = document.getElementById('df-facilities').value;
      const facilities = rawFacilities.split(',').map(s => s.trim()).filter(Boolean);

      const payload = {
        name: document.getElementById('df-name').value.trim(),
        category: document.getElementById('df-category').value,
        status: document.getElementById('df-status').value,
        tagline: document.getElementById('df-tagline').value.trim(),
        description: document.getElementById('df-desc').value.trim(),
        address: document.getElementById('df-address').value.trim(),
        coverImage: document.getElementById('df-image').value.trim() || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        ticketPrice: document.getElementById('df-ticket').value.trim(),
        operatingHours: document.getElementById('df-hours').value.trim(),
        whatsapp: document.getElementById('df-whatsapp').value.trim().replace(/[^0-9]/g, ''),
        contact: document.getElementById('df-whatsapp').value.trim(),
        facilities: facilities
      };

      if (isEdit) {
        store.updateDestination(item.id, payload);
      } else {
        store.addDestination(payload);
      }

      closeModal();
      renderCurrentView();
    });
  }
}

function openBusinessModal(item) {
  const modalRoot = document.getElementById('admin-modal-root');
  if (!modalRoot) return;

  const isEdit = !!item;
  const categories = ['Kuliner & Kopi', 'Kuliner Khas Pesisir', 'Oleh-Oleh Khas', 'Kerajinan & Kesenian', 'Produk Olahan & Herbal', 'Merchandise & Fashion'];

  modalRoot.innerHTML = `
    <div class="modal-overlay" id="biz-modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">${isEdit ? 'Edit Profil Mitra UMKM' : 'Tambah Mitra UMKM Baru'}</h3>
          <button class="modal-close" id="close-biz-modal">✕</button>
        </div>

        <form id="biz-form">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Nama Usaha / Toko <span class="req">*</span></label>
              <input type="text" id="bf-name" class="form-input" required value="${isEdit ? escapeHTML(item.name) : ''}" placeholder="Misal: Kopi Rajabasa Kalianda" />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Kategori <span class="req">*</span></label>
                <select id="bf-category" class="form-select" required>
                  ${categories.map(cat => `
                    <option value="${cat}" ${isEdit && item.category === cat ? 'selected' : ''}>${cat}</option>
                  `).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Nama Pemilik / Pengelola</label>
                <input type="text" id="bf-owner" class="form-input" value="${isEdit ? escapeHTML(item.owner || '') : ''}" placeholder="Bapak/Ibu..." />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Tagline Promosi</label>
              <input type="text" id="bf-tagline" class="form-input" value="${isEdit ? escapeHTML(item.tagline || '') : ''}" placeholder="Cita rasa kopi asli lereng Rajabasa..." />
            </div>

            <div class="form-group">
              <label class="form-label">Deskripsi Profil Usaha <span class="req">*</span></label>
              <textarea id="bf-desc" class="form-textarea" required placeholder="Jelaskan sejarah usaha, keunggulan bahan baku lokal, atau proses produksi...">${isEdit ? escapeHTML(item.description) : ''}</textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Alamat Usaha <span class="req">*</span></label>
              <input type="text" id="bf-address" class="form-input" required value="${isEdit ? escapeHTML(item.address) : ''}" placeholder="Jl. Kusuma Bangsa, Kalianda..." />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Nomor WhatsApp Usaha <span class="req">*</span></label>
                <input type="text" id="bf-whatsapp" class="form-input" required value="${isEdit ? escapeHTML(item.whatsapp || '') : ''}" placeholder="628123456789" />
                <div class="form-hint">Format internasional tanpa tanda plus (cth: 628123456789)</div>
              </div>

              <div class="form-group">
                <label class="form-label">Status Publikasi</label>
                <select id="bf-status" class="form-select">
                  <option value="active" ${isEdit && item.status === 'active' ? 'selected' : ''}>Aktif (Tampil di Katalog)</option>
                  <option value="inactive" ${isEdit && item.status === 'inactive' ? 'selected' : ''}>Nonaktif (Sembunyikan)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Foto Produk / Toko (URL)</label>
              <input type="url" id="bf-image" class="form-input" value="${isEdit ? escapeHTML(item.coverImage || item.logoImage || '') : 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80'}" placeholder="https://..." />
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="cancel-biz-btn">Batal</button>
            <button type="submit" class="btn btn-primary">${isEdit ? 'Simpan Perubahan' : 'Tambah Mitra UMKM'}</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const closeBtn = document.getElementById('close-biz-modal');
  const cancelBtn = document.getElementById('cancel-biz-btn');
  const overlay = document.getElementById('biz-modal-overlay');
  const form = document.getElementById('biz-form');

  const closeModal = () => modalRoot.innerHTML = '';

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const payload = {
        name: document.getElementById('bf-name').value.trim(),
        category: document.getElementById('bf-category').value,
        owner: document.getElementById('bf-owner').value.trim(),
        tagline: document.getElementById('bf-tagline').value.trim(),
        description: document.getElementById('bf-desc').value.trim(),
        address: document.getElementById('bf-address').value.trim(),
        status: document.getElementById('bf-status').value,
        whatsapp: document.getElementById('bf-whatsapp').value.trim().replace(/[^0-9]/g, ''),
        contact: document.getElementById('bf-whatsapp').value.trim(),
        coverImage: document.getElementById('bf-image').value.trim(),
        logoImage: document.getElementById('bf-image').value.trim()
      };

      if (isEdit) {
        store.updateBusiness(item.id, payload);
      } else {
        // default 1 item product if empty
        payload.products = [
          { id: 'p-' + Date.now(), name: 'Produk Unggulan ' + payload.name, price: 25000, desc: 'Produk asli berkualitas pengrajin Kalianda' }
        ];
        store.addBusiness(payload);
      }

      closeModal();
      renderCurrentView();
    });
  }
}

function openDeleteConfirmModal(type, id, name) {
  const modalRoot = document.getElementById('admin-modal-root');
  if (!modalRoot) return;

  const typeName = type === 'dest' ? 'Destinasi Wisata' : 'Mitra UMKM';

  modalRoot.innerHTML = `
    <div class="modal-overlay" id="delete-modal-overlay">
      <div class="modal-container" style="max-width: 460px;">
        <div class="modal-header" style="border-bottom: none; padding-bottom: 0;">
          <h3 class="modal-title" style="color: var(--error);">Konfirmasi Hapus Data</h3>
          <button class="modal-close" id="close-delete-modal">✕</button>
        </div>

        <div class="modal-body">
          <p style="color: var(--text-main); font-size: 1rem; margin-bottom: 1rem;">
            Apakah Anda yakin ingin menghapus <strong>${escapeHTML(name)}</strong> dari daftar ${typeName}?
          </p>
          <div style="background: var(--error-light); border-left: 4px solid var(--error); padding: 0.75rem 1rem; border-radius: var(--radius-sm); font-size: 0.85rem; color: var(--error);">
            Data yang dihapus tidak akan dapat dipulihkan kembali kecuali melalui tombol Reset Data Default.
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline" id="cancel-delete-btn">Batal</button>
          <button type="button" class="btn btn-destructive" id="confirm-delete-btn">Ya, Hapus Data</button>
        </div>
      </div>
    </div>
  `;

  const closeBtn = document.getElementById('close-delete-modal');
  const cancelBtn = document.getElementById('cancel-delete-btn');
  const confirmBtn = document.getElementById('confirm-delete-btn');
  const overlay = document.getElementById('delete-modal-overlay');

  const closeModal = () => modalRoot.innerHTML = '';

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (type === 'dest') {
        store.deleteDestination(id);
      } else {
        store.deleteBusiness(id);
      }
      closeModal();
      renderCurrentView();
    });
  }
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
