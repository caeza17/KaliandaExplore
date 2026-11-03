/**
 * Destination Detail Page - Kalianda Explore
 */

import { store } from '../state/store.js';
import { renderDestinationCard } from '../components/Card.js';

export function renderDestinationDetail(id) {
  const dest = store.getDestinationById(id);

  if (!dest) {
    return `
      <div class="section container">
        <div class="empty-state">
          <h2 class="empty-title">Destinasi Tidak Ditemukan</h2>
          <p class="empty-desc">Data destinasi yang Anda cari tidak tersedia atau mungkin telah dinonaktifkan oleh pengelola.</p>
          <a href="#/destinasi" class="btn btn-primary">← Kembali ke Katalog Destinasi</a>
        </div>
      </div>
    `;
  }

  const related = store.getDestinations()
    .filter(d => d.id !== dest.id && d.category === dest.category)
    .slice(0, 3);

  const mapUrl = (dest.latitude && dest.longitude)
    ? `https://www.google.com/maps/search/?api=1&query=${dest.latitude},${dest.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dest.name + ' Kalianda Lampung Selatan')}`;

  const waMessage = encodeURIComponent(`Halo pengelola ${dest.name}, saya mendapatkan info dari portal Kalianda Explore dan ingin bertanya mengenai info kunjungan & tiket.`);
  const waUrl = dest.whatsapp ? `https://wa.me/${dest.whatsapp}?text=${waMessage}` : null;

  return `
    <div class="destination-detail-page section">
      <div class="container">
        <!-- Breadcrumb -->
        <div class="breadcrumb">
          <a href="#/">Beranda</a>
          <span>/</span>
          <a href="#/destinasi">Destinasi Wisata</a>
          <span>/</span>
          <span style="color: var(--text-main); font-weight: 600;">${escapeHTML(dest.name)}</span>
        </div>

        <!-- Detail Header -->
        <div style="margin-bottom: 2rem;">
          <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap;">
            <span class="badge badge-primary">${escapeHTML(dest.category)}</span>
            ${dest.isVerified ? `
              <span class="badge badge-secondary">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                Informasi Terverifikasi
              </span>
            ` : ''}
          </div>
          <h1 style="font-size: 2.5rem; font-weight: 800; color: var(--text-main); line-height: 1.2; margin-bottom: 0.5rem;">
            ${escapeHTML(dest.name)}
          </h1>
          <p style="font-size: 1.15rem; color: var(--text-muted);">
            ${escapeHTML(dest.tagline || '')}
          </p>
        </div>

        <!-- Main Media Gallery -->
        <div style="margin-bottom: 2.5rem; border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-lg);">
          <div style="position: relative; aspect-ratio: 21 / 9; max-height: 480px; width: 100%; background: #000;">
            <img 
              id="main-detail-image"
              src="${dest.coverImage}" 
              alt="${escapeHTML(dest.name)}" 
              style="width: 100%; height: 100%; object-fit: cover;"
            />
          </div>

          ${dest.gallery && dest.gallery.length > 1 ? `
            <div style="display: flex; gap: 0.75rem; padding: 1rem; background: var(--surface); border-top: 1px solid var(--border-subtle); overflow-x: auto;">
              ${dest.gallery.map((img, idx) => `
                <button 
                  class="gallery-thumb-btn" 
                  data-src="${img}"
                  style="border: 2px solid ${idx === 0 ? 'var(--primary)' : 'transparent'}; border-radius: var(--radius-md); overflow: hidden; width: 100px; height: 65px; cursor: pointer; flex-shrink: 0; padding: 0;"
                >
                  <img src="${img}" style="width: 100%; height: 100%; object-fit: cover;" alt="Galeri ${idx + 1}" />
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- Grid Layout Content & Sidebar -->
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2.5rem; align-items: start;">
          <!-- Left Column: Description & Facilities -->
          <div>
            <div style="background: var(--surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 2rem; margin-bottom: 2rem;">
              <h2 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-main); border-bottom: 2px solid var(--primary-container-light); padding-bottom: 0.5rem;">
                Deskripsi Destinasi
              </h2>
              <div style="font-size: 1.05rem; line-height: 1.8; color: var(--text-muted); white-space: pre-line;">
                ${escapeHTML(dest.description)}
              </div>
            </div>

            <!-- Fasilitas -->
            <div style="background: var(--surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 2rem; margin-bottom: 2rem;">
              <h2 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 1.25rem; color: var(--text-main); border-bottom: 2px solid var(--primary-container-light); padding-bottom: 0.5rem;">
                Fasilitas yang Tersedia
              </h2>
              ${dest.facilities && dest.facilities.length > 0 ? `
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.85rem;">
                  ${dest.facilities.map(fac => `
                    <div style="display: flex; align-items: center; gap: 0.65rem; padding: 0.6rem 0.85rem; background: var(--background); border-radius: var(--radius-md); font-size: 0.92rem; font-weight: 500;">
                      <span style="color: var(--secondary); font-weight: bold;">✓</span>
                      <span>${escapeHTML(fac)}</span>
                    </div>
                  `).join('')}
                </div>
              ` : `
                <p style="color: var(--text-subtle); font-style: italic;">Data fasilitas belum diisi secara lengkap.</p>
              `}
            </div>
          </div>

          <!-- Right Column: Info Box & Action Buttons -->
          <div>
            <div style="background: var(--surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.75rem; box-shadow: var(--shadow-md); position: sticky; top: 5.5rem;">
              <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.25rem; color: var(--text-main);">
                Informasi Kunjungan
              </h3>

              <div style="margin-bottom: 1.25rem;">
                <div style="font-size: 0.85rem; color: var(--text-subtle); font-weight: 600; text-transform: uppercase;">Perkiraan Tiket Masuk</div>
                <div style="font-size: 1.2rem; font-weight: 800; color: var(--primary); margin-top: 0.2rem;">
                  ${dest.ticketPrice ? escapeHTML(dest.ticketPrice) : 'Informasi tarif di lokasi'}
                </div>
              </div>

              <div style="margin-bottom: 1.25rem;">
                <div style="font-size: 0.85rem; color: var(--text-subtle); font-weight: 600; text-transform: uppercase;">Jam Operasional</div>
                <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-main); margin-top: 0.2rem;">
                  ${dest.operatingHours ? escapeHTML(dest.operatingHours) : 'Buka setiap hari'}
                </div>
              </div>

              <div style="margin-bottom: 1.5rem;">
                <div style="font-size: 0.85rem; color: var(--text-subtle); font-weight: 600; text-transform: uppercase;">Alamat & Lokasi</div>
                <div style="font-size: 0.92rem; color: var(--text-muted); margin-top: 0.2rem; line-height: 1.5;">
                  ${escapeHTML(dest.address)}
                </div>
              </div>

              <!-- CTA Actions -->
              <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                <a 
                  href="${mapUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn btn-primary"
                  style="width: 100%;"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/></svg>
                  Buka Rute di Google Maps
                </a>

                ${waUrl ? `
                  <a 
                    href="${waUrl}" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="btn btn-wa"
                    style="width: 100%;"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                    Hubungi Pengelola Destinasi
                  </a>
                ` : ''}

                <a href="#/destinasi" class="btn btn-outline" style="width: 100%;">
                  ← Kembali ke Katalog
                </a>
              </div>

              <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px dashed var(--border-subtle); font-size: 0.78rem; color: var(--text-subtle); line-height: 1.4;">
                * Data operasional dan tarif dapat berubah sewaktu-waktu sesuai kebijakan pengelola resmi setempat.
              </div>
            </div>
          </div>
        </div>

        <!-- Related Destinations -->
        ${related.length > 0 ? `
          <div style="margin-top: 4rem; padding-top: 2.5rem; border-top: 1px solid var(--border-subtle);">
            <h3 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 1.5rem; color: var(--text-main);">
              Destinasi Serupa Lainnya
            </h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
              ${related.map(renderDestinationCard).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

export function setupDestinationDetailEvents() {
  const mainImage = document.getElementById('main-detail-image');
  const thumbBtns = document.querySelectorAll('.gallery-thumb-btn');

  thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbBtns.forEach(b => b.style.borderColor = 'transparent');
      btn.style.borderColor = 'var(--primary)';
      if (mainImage) {
        mainImage.src = btn.dataset.src;
      }
    });
  });
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
