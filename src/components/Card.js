/**
 * Card Components - Kalianda Explore
 * Komponen kartu destinasi wisata dan UMKM lokal
 */

export function renderDestinationCard(dest) {
  const isVerified = dest.isVerified !== false;
  return `
    <article class="card destination-card" data-id="${dest.id}">
      <div class="card-img-wrapper">
        <img 
          src="${dest.coverImage}" 
          alt="${escapeHTML(dest.name)}" 
          class="card-img" 
          loading="lazy"
          onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';"
        />
        <span class="card-badge">${escapeHTML(dest.category)}</span>
        ${isVerified ? `
          <span class="card-verified">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            Terverifikasi
          </span>
        ` : ''}
      </div>

      <div class="card-body">
        <h3 class="card-title">
          <a href="#/destinasi/${dest.id}">${escapeHTML(dest.name)}</a>
        </h3>
        
        <p class="card-desc">${escapeHTML(dest.tagline || dest.description)}</p>
        
        <div class="card-meta">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHTML(dest.address)}</span>
        </div>

        <div class="card-footer">
          <div style="font-size: 0.85rem; font-weight: 700; color: var(--primary);">
            ${dest.ticketPrice ? escapeHTML(dest.ticketPrice.split('(')[0].trim()) : 'Info di lokasi'}
          </div>
          <a href="#/destinasi/${dest.id}" class="btn btn-outline btn-sm">
            Lihat Detail →
          </a>
        </div>
      </div>
    </article>
  `;
}

export function renderBusinessCard(biz) {
  const isVerified = biz.isVerified !== false;
  const productCount = biz.products ? biz.products.length : 0;

  return `
    <article class="card business-card" data-id="${biz.id}">
      <div class="card-img-wrapper">
        <img 
          src="${biz.coverImage || biz.logoImage}" 
          alt="${escapeHTML(biz.name)}" 
          class="card-img" 
          loading="lazy"
          onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';"
        />
        <span class="card-badge" style="background: rgba(8, 126, 139, 0.85);">${escapeHTML(biz.category)}</span>
        ${isVerified ? `
          <span class="card-verified">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            Mitra Aktif
          </span>
        ` : ''}
      </div>

      <div class="card-body">
        <div style="font-size: 0.82rem; color: var(--text-subtle); margin-bottom: 0.25rem;">
          ${biz.owner ? `Pengelola: <strong>${escapeHTML(biz.owner)}</strong>` : 'Mitra Terdaftar'}
        </div>

        <h3 class="card-title">
          <a href="#/umkm/${biz.id}">${escapeHTML(biz.name)}</a>
        </h3>

        <p class="card-desc">${escapeHTML(biz.tagline || biz.description)}</p>

        <div class="card-meta">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHTML(biz.address)}</span>
        </div>

        <div class="card-footer">
          <span class="badge badge-primary" style="font-size: 0.75rem;">
            ${productCount} Produk/Menu
          </span>
          <div style="display: flex; gap: 0.35rem;">
            ${biz.whatsapp ? `
              <a 
                href="https://wa.me/${biz.whatsapp}?text=${encodeURIComponent(`Halo ${biz.name}, saya menemukan usaha Anda melalui Kalianda Explore dan ingin bertanya tentang produk/layanan.`)}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="btn btn-wa btn-sm"
                title="Hubungi via WhatsApp"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                WA
              </a>
            ` : ''}
            <a href="#/umkm/${biz.id}" class="btn btn-outline btn-sm">
              Detail
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
