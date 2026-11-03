/**
 * Home Page - Kalianda Explore
 */

import { store } from '../state/store.js';
import { renderDestinationCard, renderBusinessCard } from '../components/Card.js';

export function renderHome() {
  const destinations = store.getDestinations().slice(0, 6);
  const businesses = store.getBusinesses().slice(0, 4);

  return `
    <div class="home-page">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <div class="hero-tagline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
              <span>Gerbang Wisata Pesisir Lampung Selatan</span>
            </div>
            
            <h1 class="hero-title">
              Jelajahi Pesona Eksotis <br><span style="color: #48CAE4;">Kecamatan Kalianda</span>
            </h1>
            
            <p class="hero-subtitle">
              Temukan keindahan pantai berlatar Gunung Rajabasa, air terjun alami, serta cita rasa kuliner khas dan produk UMKM pesisir dalam satu platform.
            </p>

            <form class="hero-search-wrapper" id="hero-search-form">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5" style="margin-left: 0.75rem;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input 
                type="text" 
                id="hero-search-input" 
                class="hero-search-input" 
                placeholder="Cari pantai, air terjun, kopi Rajabasa, atau kuliner..." 
                autocomplete="off"
              />
              <button type="submit" class="btn btn-primary btn-lg">
                Cari Sekarang
              </button>
            </form>
          </div>
        </div>
      </section>

      <!-- Kategori Cepat -->
      <section style="background: #ffffff; border-bottom: 1px solid var(--border-subtle); padding: 1.5rem 0;">
        <div class="container">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <div style="font-weight: 700; color: var(--text-main); font-size: 0.95rem; display: flex; align-items: center; gap: 0.5rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
              Kategori Populer:
            </div>
            <div class="chips-container" style="padding-bottom: 0;">
              <a href="#/destinasi?cat=Pantai" class="chip">🏖️ Wisata Pantai</a>
              <a href="#/destinasi?cat=Alam" class="chip">🌿 Wisata Alam</a>
              <a href="#/umkm?cat=Kuliner" class="chip">🍲 Kuliner Pesisir</a>
              <a href="#/umkm?cat=Kopi" class="chip">☕ Kopi Rajabasa</a>
              <a href="#/umkm?cat=Oleh-Oleh" class="chip">🍌 Oleh-Oleh Pisang</a>
              <a href="#/umkm?cat=Kerajinan" class="chip">🧵 Tapis Tradisional</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Destinasi Wisata Pilihan -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="badge badge-primary" style="margin-bottom: 0.5rem;">Eksplorasi Wisata</span>
              <h2 class="section-title">Destinasi Pilihan di Kalianda</h2>
              <p class="section-subtitle">Surga bahari Selat Sunda dan sejuknya lereng Rajabasa yang memikat.</p>
            </div>
            <a href="#/destinasi" class="btn btn-outline">
              Lihat Semua Destinasi (${store.getDestinations().length}) →
            </a>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.75rem;">
            ${destinations.map(renderDestinationCard).join('')}
          </div>
        </div>
      </section>

      <!-- Banner Ajak Dukung UMKM -->
      <section style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-container) 100%); color: #ffffff; padding: 3.5rem 0; margin: 1rem 0;">
        <div class="container">
          <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 2.5rem; align-items: center;">
            <div>
              <span class="badge" style="background: rgba(255,255,255,0.2); color: #fff; margin-bottom: 0.75rem;">Pemberdayaan Lokal</span>
              <h2 style="font-size: 2.25rem; font-weight: 800; color: #ffffff; margin-bottom: 1rem; line-height: 1.25;">
                Dukung Produk dan Kuliner Asli Pengrajin Kalianda
              </h2>
              <p style="font-size: 1.05rem; color: rgba(255,255,255,0.9); line-height: 1.6; margin-bottom: 1.75rem;">
                Setiap kunjungan dan pesanan Anda memberikan dampak langsung bagi kemandirian ekonomi keluarga nelayan, petani kopi lereng Rajabasa, dan pengrajin tapis Kalianda.
              </p>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <a href="#/umkm" class="btn btn-lg" style="background: #ffffff; color: var(--primary); font-weight: 700;">
                  Jelajahi Produk UMKM
                </a>
                <a href="#/tentang" class="btn btn-outline btn-lg" style="color: #ffffff; border-color: rgba(255,255,255,0.5);">
                  Tentang Inisiatif Ini
                </a>
              </div>
            </div>
            <div style="position: relative;">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80" 
                alt="Kuliner dan Produk Kalianda" 
                style="border-radius: var(--radius-xl); box-shadow: var(--shadow-xl); border: 4px solid rgba(255,255,255,0.2);"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- UMKM & Kuliner Unggulan -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="badge badge-secondary" style="margin-bottom: 0.5rem;">Cita Rasa & Kreativitas Lokal</span>
              <h2 class="section-title">UMKM & Kuliner Unggulan</h2>
              <p class="section-subtitle">Hubungi langsung mitra usaha melalui kanal WhatsApp tanpa biaya perantara.</p>
            </div>
            <a href="#/umkm" class="btn btn-outline">
              Semua Mitra UMKM (${store.getBusinesses().length}) →
            </a>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.75rem;">
            ${businesses.map(renderBusinessCard).join('')}
          </div>
        </div>
      </section>

      <!-- Fitur Layanan / Kenapa Kalianda Explore -->
      <section class="section" style="background: #ffffff; border-top: 1px solid var(--border-subtle);">
        <div class="container">
          <div style="text-align: center; max-width: 650px; margin: 0 auto 3rem;">
            <h2 class="section-title">Kenapa Kalianda Explore?</h2>
            <p class="section-subtitle">Dirancang untuk memudahkan wisatawan sekaligus memajukan potensi ekonomi lokal Lampung Selatan.</p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
            <div style="text-align: center; padding: 1.75rem; border-radius: var(--radius-lg); background: var(--background);">
              <div style="width: 3.5rem; height: 3.5rem; margin: 0 auto 1.25rem; background: var(--primary-container-light); color: var(--primary); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem;">Informasi Terverifikasi</h3>
              <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.5;">Data destinasi ditinjau secara berkala tanpa melebih-lebihkan fasilitas atau harga tiket.</p>
            </div>

            <div style="text-align: center; padding: 1.75rem; border-radius: var(--radius-lg); background: var(--background);">
              <div style="width: 3.5rem; height: 3.5rem; margin: 0 auto 1.25rem; background: var(--secondary-light); color: var(--secondary); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </div>
              <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem;">Kontak Langsung Mitra</h3>
              <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.5;">Wisatawan terhubung langsung dengan penjual melalui WhatsApp tanpa biaya perantara.</p>
            </div>

            <div style="text-align: center; padding: 1.75rem; border-radius: var(--radius-lg); background: var(--background);">
              <div style="width: 3.5rem; height: 3.5rem; margin: 0 auto 1.25rem; background: var(--accent-light); color: var(--accent); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </div>
              <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem;">Akses Mudah & Ringan</h3>
              <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.5;">Tanpa perlu registrasi akun atau instalasi aplikasi berat, langsung akses dari browser ponsel.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function setupHomeEvents() {
  const form = document.getElementById('hero-search-form');
  const input = document.getElementById('hero-search-input');
  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = input.value.trim();
      if (query) {
        window.location.hash = `#/destinasi?q=${encodeURIComponent(query)}`;
      } else {
        window.location.hash = '#/destinasi';
      }
    });
  }
}
