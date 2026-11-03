/**
 * Footer Component - Kalianda Explore
 */

export function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 1rem;">
              <div style="width: 2rem; height: 2rem; background: var(--primary-container); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #fff;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M2 12h20"/></svg>
              </div>
              <span style="font-size: 1.3rem; font-weight: 800; color: #ffffff;">Kalianda<span style="color: #48CAE4;">Explore</span></span>
            </div>
            <p style="font-size: 0.92rem; line-height: 1.6; color: #A0B2B6; margin-bottom: 1.25rem;">
              Platform digital informasi pariwisata bahari, alam, kuliner khas, dan sarana promosi terpadu bagi pelaku UMKM lokal Kecamatan Kalianda, Kabupaten Lampung Selatan.
            </p>
            <div style="display: flex; gap: 0.75rem;">
              <span class="badge" style="background: rgba(255,255,255,0.08); color: #E0F2F4; font-size: 0.75rem;">Lampung Selatan</span>
              <span class="badge" style="background: rgba(255,255,255,0.08); color: #E0F2F4; font-size: 0.75rem;">Pariwisata & UMKM</span>
            </div>
          </div>

          <div>
            <h4 class="footer-title">Jelajah Wisata</h4>
            <ul class="footer-links">
              <li><a href="#/destinasi?cat=Pantai">Wisata Pantai & Bahari</a></li>
              <li><a href="#/destinasi?cat=Alam">Wisata Alam & Pegunungan</a></li>
              <li><a href="#/destinasi?cat=Sejarah">Wisata Budaya & Sejarah</a></li>
              <li><a href="#/destinasi">Semua Destinasi</a></li>
            </ul>
          </div>

          <div>
            <h4 class="footer-title">Mitra UMKM</h4>
            <ul class="footer-links">
              <li><a href="#/umkm?cat=Kuliner">Kuliner Khas Pesisir</a></li>
              <li><a href="#/umkm?cat=Kopi">Kopi Robusta & Liberika</a></li>
              <li><a href="#/umkm?cat=Oleh-Oleh">Oleh-Oleh Khas Lampung</a></li>
              <li><a href="#/umkm?cat=Kerajinan">Sulam Tapis & Kriya</a></li>
            </ul>
          </div>

          <div>
            <h4 class="footer-title">Informasi & Akses</h4>
            <p style="font-size: 0.88rem; color: #A0B2B6; margin-bottom: 0.75rem;">
              Kecamatan Kalianda, Kabupaten Lampung Selatan, Provinsi Lampung.
            </p>
            <div style="margin-top: 1rem;">
              <a href="#/admin/login" class="btn btn-outline btn-sm" style="color: #ffffff; border-color: rgba(255,255,255,0.25);">
                Masuk Administrator
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div>
            &copy; ${new Date().getFullYear()} Kalianda Explore. Seluruh hak cipta dilindungi.
          </div>
          <div style="font-size: 0.82rem; color: #6E797B;">
            Platform MVP Mahasiswa — Membantu promosi digital UMKM lokal tanpa klaim otomatisasi pendapatan PAD.
          </div>
        </div>
      </div>
    </footer>
  `;
}
