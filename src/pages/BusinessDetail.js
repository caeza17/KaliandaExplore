/**
 * Business (UMKM) Detail Page - Kalianda Explore
 */

import { store } from '../state/store.js';

export function renderBusinessDetail(id) {
  const biz = store.getBusinessById(id);

  if (!biz) {
    return `
      <div class="section container">
        <div class="empty-state">
          <h2 class="empty-title">Profil UMKM Tidak Ditemukan</h2>
          <p class="empty-desc">Data mitra usaha yang Anda cari tidak tersedia atau sedang dinonaktifkan.</p>
          <a href="#/umkm" class="btn btn-primary">← Kembali ke Katalog UMKM</a>
        </div>
      </div>
    `;
  }

  const defaultWaMessage = encodeURIComponent(`Halo ${biz.name}, saya menemukan profil usaha Anda melalui Kalianda Explore dan ingin menanyakan ketersediaan produk/pemesanan.`);
  const mainWaUrl = biz.whatsapp ? `https://wa.me/${biz.whatsapp}?text=${defaultWaMessage}` : null;

  return `
    <div class="business-detail-page section">
      <div class="container">
        <!-- Breadcrumb -->
        <div class="breadcrumb">
          <a href="#/">Beranda</a>
          <span>/</span>
          <a href="#/umkm">Direktori UMKM</a>
          <span>/</span>
          <span style="color: var(--text-main); font-weight: 600;">${escapeHTML(biz.name)}</span>
        </div>

        <!-- Business Header Banner -->
        <div style="background: var(--surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); overflow: hidden; margin-bottom: 2.5rem; box-shadow: var(--shadow-sm);">
          <div style="height: 220px; width: 100%; position: relative; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-container) 100%);">
            ${biz.coverImage ? `
              <img src="${biz.coverImage}" alt="${escapeHTML(biz.name)}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.85;" />
            ` : ''}
          </div>

          <div style="padding: 1.75rem 2rem; position: relative;">
            <div style="display: flex; gap: 1.5rem; align-items: flex-start; flex-wrap: wrap;">
              <div style="width: 90px; height: 90px; border-radius: var(--radius-lg); overflow: hidden; border: 4px solid #ffffff; box-shadow: var(--shadow-md); margin-top: -60px; background: #ffffff; flex-shrink: 0;">
                <img src="${biz.logoImage || biz.coverImage}" alt="Logo ${escapeHTML(biz.name)}" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>

              <div style="flex: 1;">
                <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.35rem; flex-wrap: wrap;">
                  <span class="badge badge-primary">${escapeHTML(biz.category)}</span>
                  <span class="badge badge-secondary">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                    Mitra Terverifikasi
                  </span>
                </div>
                <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-main); line-height: 1.2; margin-bottom: 0.4rem;">
                  ${escapeHTML(biz.name)}
                </h1>
                <p style="font-size: 1.05rem; color: var(--text-muted);">
                  ${escapeHTML(biz.tagline || '')}
                </p>
              </div>

              ${mainWaUrl ? `
                <div>
                  <a 
                    href="${mainWaUrl}" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="btn btn-wa btn-lg"
                    style="box-shadow: 0 4px 14px rgba(37, 211, 102, 0.4);"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                    Hubungi via WhatsApp
                  </a>
                </div>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Content Layout -->
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2.5rem; align-items: start;">
          <!-- Left: About & Products -->
          <div>
            <div style="background: var(--surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 2rem; margin-bottom: 2rem;">
              <h2 style="font-size: 1.35rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-main); border-bottom: 2px solid var(--primary-container-light); padding-bottom: 0.5rem;">
                Tentang Usaha
              </h2>
              <p style="font-size: 1.05rem; line-height: 1.8; color: var(--text-muted);">
                ${escapeHTML(biz.description)}
              </p>
            </div>

            <!-- Daftar Produk / Menu -->
            <div style="background: var(--surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 2rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 2px solid var(--primary-container-light); padding-bottom: 0.5rem;">
                <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--text-main);">
                  Daftar Produk & Layanan Unggulan
                </h2>
                <span style="font-size: 0.85rem; color: var(--text-subtle);">
                  ${biz.products ? biz.products.length : 0} Item Tersedia
                </span>
              </div>

              ${biz.products && biz.products.length > 0 ? `
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                  ${biz.products.map(prod => {
                    const prodWaText = encodeURIComponent(`Halo ${biz.name}, saya berminat memesan/menanyakan produk: *${prod.name}* (Rp ${prod.price.toLocaleString('id-ID')}).`);
                    const prodWaUrl = biz.whatsapp ? `https://wa.me/${biz.whatsapp}?text=${prodWaText}` : null;

                    return `
                      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1.1rem; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); background: var(--background); gap: 1rem; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 220px;">
                          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.2rem;">
                            ${escapeHTML(prod.name)}
                          </h4>
                          <p style="font-size: 0.88rem; color: var(--text-muted);">
                            ${escapeHTML(prod.desc || '')}
                          </p>
                        </div>

                        <div style="display: flex; align-items: center; gap: 1rem;">
                          <div style="font-size: 1.15rem; font-weight: 800; color: var(--primary);">
                            Rp ${prod.price.toLocaleString('id-ID')}
                          </div>

                          ${prodWaUrl ? `
                            <a 
                              href="${prodWaUrl}" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              class="btn btn-wa btn-sm"
                            >
                              Tanya Produk
                            </a>
                          ` : ''}
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              ` : `
                <p style="color: var(--text-subtle); font-style: italic;">Daftar produk sedang dalam proses pembaharuan oleh pengelola.</p>
              `}
            </div>
          </div>

          <!-- Right: Owner Info & Direct Contact -->
          <div>
            <div style="background: var(--surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.75rem; box-shadow: var(--shadow-md); position: sticky; top: 5.5rem;">
              <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.25rem; color: var(--text-main);">
                Kontak & Lokasi Usaha
              </h3>

              <div style="margin-bottom: 1.25rem;">
                <div style="font-size: 0.85rem; color: var(--text-subtle); font-weight: 600; text-transform: uppercase;">Penanggung Jawab / Pemilik</div>
                <div style="font-size: 1rem; font-weight: 700; color: var(--text-main); margin-top: 0.2rem;">
                  ${biz.owner ? escapeHTML(biz.owner) : 'Mitra Terdaftar'}
                </div>
              </div>

              <div style="margin-bottom: 1.25rem;">
                <div style="font-size: 0.85rem; color: var(--text-subtle); font-weight: 600; text-transform: uppercase;">Nomor WhatsApp / Telepon</div>
                <div style="font-size: 1rem; font-weight: 600; color: var(--primary); margin-top: 0.2rem;">
                  ${biz.contact ? escapeHTML(biz.contact) : (biz.whatsapp ? '+' + escapeHTML(biz.whatsapp) : 'Hubungi via admin')}
                </div>
              </div>

              <div style="margin-bottom: 1.5rem;">
                <div style="font-size: 0.85rem; color: var(--text-subtle); font-weight: 600; text-transform: uppercase;">Alamat Tempat Usaha</div>
                <div style="font-size: 0.92rem; color: var(--text-muted); margin-top: 0.2rem; line-height: 1.5;">
                  ${escapeHTML(biz.address)}
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                ${mainWaUrl ? `
                  <a 
                    href="${mainWaUrl}" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="btn btn-wa"
                    style="width: 100%;"
                  >
                    Chat Pemilik di WhatsApp
                  </a>
                ` : ''}

                <a 
                  href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(biz.name + ' ' + biz.address)}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn btn-outline"
                  style="width: 100%;"
                >
                  Buka Peta Lokasi
                </a>

                <a href="#/umkm" class="btn btn-outline" style="width: 100%;">
                  ← Kembali ke Katalog UMKM
                </a>
              </div>

              <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px dashed var(--border-subtle); font-size: 0.78rem; color: var(--text-subtle); line-height: 1.4;">
                * Transaksi dilakukan secara langsung antara pembeli dan pelaku usaha tanpa komisi platform.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
