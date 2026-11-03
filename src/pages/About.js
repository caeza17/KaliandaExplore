/**
 * About Page - Kalianda Explore
 */

export function renderAbout() {
  return `
    <div class="about-page section">
      <div class="container" style="max-width: 900px;">
        <div class="breadcrumb">
          <a href="#/">Beranda</a>
          <span>/</span>
          <span style="color: var(--text-main); font-weight: 600;">Tentang Kami</span>
        </div>

        <div style="text-align: center; margin-bottom: 3rem;">
          <span class="badge badge-primary" style="margin-bottom: 0.5rem;">Tentang Platform</span>
          <h1 class="section-title" style="font-size: 2.4rem;">Kalianda Explore</h1>
          <p class="section-subtitle" style="font-size: 1.15rem; max-width: 680px; margin: 0.5rem auto 0;">
            Platform digital pariwisata bahari dan sentra promosi terpadu bagi UMKM lokal Kecamatan Kalianda, Kabupaten Lampung Selatan.
          </p>
        </div>

        <!-- Vision and Context -->
        <div style="background: var(--surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 2.5rem; margin-bottom: 2rem; box-shadow: var(--shadow-sm);">
          <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.25rem; color: var(--primary);">
            Latar Belakang & Tujuan
          </h2>
          <p style="font-size: 1.05rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 1.25rem;">
            Kecamatan Kalianda memiliki potensi pariwisata yang sangat kaya, mulai dari garis pantai berpasir putih menghadap Selat Sunda, gugusan pulau eksotis, keindahan lereng vulkanik Gunung Rajabasa, hingga warisan budaya sulam Tapis dan boga bahari segar.
          </p>
          <p style="font-size: 1.05rem; line-height: 1.8; color: var(--text-muted);">
            Namun, informasi destinasi seringkali tersebar di media sosial tanpa kurasi yang terstruktur. <strong>Kalianda Explore</strong> hadir sebagai jembatan informasi yang mempermudah wisatawan merencanakan perjalanan sekaligus memberikan ruang promosi langsung bagi pelaku usaha lokal tanpa potongan komisi.
          </p>
        </div>

        <!-- Pillars -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
          <div style="background: var(--surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.75rem;">
            <div style="color: var(--primary); font-size: 1.75rem; margin-bottom: 0.75rem;">🏝️</div>
            <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem;">Pariwisata Berkelanjutan</h3>
            <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6;">
              Mempromosikan keindahan alam dan budaya lokal secara bertanggung jawab demi kelestarian pesisir Lampung Selatan.
            </p>
          </div>

          <div style="background: var(--surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.75rem;">
            <div style="color: var(--secondary); font-size: 1.75rem; margin-bottom: 0.75rem;">🤝</div>
            <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem;">Pemberdayaan UMKM</h3>
            <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6;">
              Menghubungkan langsung pembeli dengan pengrajin lokal melalui jalur komunikasi WhatsApp tanpa biaya perantara.
            </p>
          </div>

          <div style="background: var(--surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.75rem;">
            <div style="color: var(--accent); font-size: 1.75rem; margin-bottom: 0.75rem;">📋</div>
            <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem;">Kejujuran Data</h3>
            <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6;">
              Menyajikan data tarif, fasilitas, dan kontak sesuai kondisi riil di lapangan tanpa manipulasi ulasan.
            </p>
          </div>
        </div>

        <!-- Disclaimer & Business Rules Callout -->
        <div style="background: var(--primary-container-light); border-left: 4px solid var(--primary); border-radius: var(--radius-md); padding: 1.5rem 1.75rem; margin-bottom: 2.5rem;">
          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--primary); margin-bottom: 0.5rem;">
            Catatan Ruang Lingkup MVP (Minimum Viable Product)
          </h4>
          <p style="font-size: 0.9rem; color: var(--text-main); line-height: 1.6;">
            Aplikasi ini dikembangkan sebagai purwarupa sistem informasi proyek mahasiswa untuk memvalidasi kebutuhan wisatawan dan mitra UMKM. Platform ini berfokus pada katalog informasi dan sarana kontak langsung. Pendapatan platform, omzet UMKM, dan Pendapatan Asli Daerah (PAD) dicatat dan dilaporkan secara terpisah sesuai ketentuan resmi.
          </p>
        </div>

        <div style="text-align: center;">
          <a href="#/destinasi" class="btn btn-primary btn-lg">
            Mulai Menjelajah Kalianda
          </a>
        </div>
      </div>
    </div>
  `;
}
