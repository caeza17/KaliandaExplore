# Kalianda Explore — Platform Digital Wisata & Promosi UMKM (MVP)

> **Kecamatan Kalianda, Kabupaten Lampung Selatan**  
> Dibuat berdasarkan spesifikasi pada [PRD_Kalianda_Explore.pdf](./PRD_Kalianda_Explore.pdf) dan [Skill_Desain_Kalianda_Explore.md](./Skill_Desain_Kalianda_Explore.md).

---

## 🌊 Ringkasan Aplikasi

**Kalianda Explore** adalah platform web responsif yang dirancang untuk mempermudah wisatawan menemukan informasi pariwisata bahari dan alam di Kecamatan Kalianda serta menyediakan sarana promosi digital langsung bagi pelaku UMKM lokal tanpa perantara biaya komisi.

---

## 🎨 Identitas Visual & Sistem Desain

Aplikasi dibangun dengan token warna dan tipografi resmi sesuai pedoman desain:

| Peran | Hex Code | Penggunaan |
|---|---|---|
| **Primary** | `#00636E` | Warna identitas platform, tombol primer, header aktif |
| **Primary Container** | `#087E8B` | Aksen interaktif, badge kategori aktif |
| **Secondary** | `#176B4B` | Nuansa alam, status aktif/buka, badge positif |
| **Accent Hangat** | `#A66126` | Aksen terbatas untuk sorotan khusus |
| **Background** | `#F8F9FF` | Latar belakang aplikasi bersih dan sejuk |
| **Surface / Card** | `#FFFFFF` | Permukaan kartu, modal, dan container |
| **Teks Utama** | `#001D36` | Judul dan teks kontras tinggi |
| **Teks Sekunder** | `#3E494A` | Deskripsi, metadata, dan keterangan |
| **Border / Outline** | `#BDC8CA` / `#6E797B` | Garis batas dan state fokus input |
| **Error / Destructive** | `#BA1A1A` | Status gagal, alert error, tombol hapus |

- **Font Family:** `Plus Jakarta Sans` (Google Fonts: 400, 500, 600, 700, 800)
- **Komponen:** Kartu membulat (`border-radius: 16px`), bayangan lembut (*soft elevation*), efek transisi hover mikro.

---

## 🚀 Fitur yang Telah Diimplementasikan (MVP P0)

### 1. Halaman Publik (Wisatawan)
- **Beranda (`#/`):**
  - Hero banner bernuansa laut dengan tagline *"Jelajahi Pesona Eksotis Kecamatan Kalianda"*.
  - Kolom pencarian instan (nama destinasi, kuliner, produk).
  - Filter chips kategori populer (Pantai, Alam, Kuliner, Kopi, Tapis, Oleh-oleh).
  - Destinasi pilihan & UMKM unggulan.
  - Ajakan mendukung produk pengrajin lokal.
  - Footer komprehensif dengan navigasi dan *disclaimer* mahasiswa.
- **Katalog Destinasi (`#/destinasi`):**
  - Pencarian teks real-time & filter kategori (Semua, Wisata Pantai, Wisata Alam, dsb.).
  - Kartu destinasi responsif dengan foto 16:9, badge verifikasi, estimasi tarif, dan lokasi.
  - *Empty state* interaktif dengan tombol reset jika pencarian tidak ditemukan.
- **Detail Destinasi (`#/destinasi/:id`):**
  - Galeri foto interaktif dengan *thumbnail switcher*.
  - Deskripsi lengkap, daftar fasilitas terverifikasi, jam operasional, dan tarif tiket.
  - Tautan rute langsung ke **Google Maps**.
  - Tombol **WhatsApp Click-to-Chat** ke pengelola destinasi.
  - Rekomendasi destinasi serupa.
- **Katalog UMKM & Kuliner (`#/umkm`):**
  - Filter multi-kategori (Kuliner Pesisir, Kopi Rajabasa, Oleh-Oleh Pisang, Kerajinan Tapis, Merchandise).
  - Kartu profil mitra usaha dan preview produk.
- **Detail UMKM (`#/umkm/:id`):**
  - Profil usaha, nama pemilik/pengelola, nomor kontak, dan alamat.
  - Daftar produk unggulan dengan harga tertera (Rp).
  - Tombol aksi cepat **WhatsApp Direct Chat** dengan teks pembuka otomatis.
- **Halaman Tentang (`#/tentang`):**
  - Latar belakang, pilar pariwisata berkelanjutan, dan batasan ruang lingkup MVP.

### 2. Portal Administrator
- **Autentikasi Admin (`#/admin/login`):**
  - Form login dengan validasi input dan toggle lihat sandi.
  - **Akun Uji Coba MVP:**
    - **Username / Email:** `admin` atau `admin@kaliandaexplore.id`
    - **Password:** `admin123`
- **Dashboard Admin (`#/admin/dashboard`):**
  - Kartu ringkasan statistik (Total Destinasi, Mitra UMKM, Status Sistem).
  - **Kelola Destinasi (CRUD):**
    - Tambah Destinasi Baru via Modal Form interaktif.
    - Edit data destinasi yang sudah ada.
    - Toggle status cepat (*Aktif* / *Nonaktif* — data nonaktif otomatis tersembunyi dari publik).
    - Hapus data dengan dialog konfirmasi keamanan.
  - **Kelola Mitra UMKM (CRUD):**
    - Tambah, Edit, Toggle Aktif/Nonaktif, dan Hapus profil usaha serta kontak WhatsApp.
  - **Reset Data Default:** Tombol untuk mengembalikan dataset seed 10 destinasi & 10 UMKM kapan saja.
  - **Sistem Notifikasi Toast:** Feedback pop-up mengambang saat aksi berhasil atau gagal.

---

## 🛠️ Cara Menjalankan Secara Lokal

1. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Buka peramban di `http://localhost:3000/`.

2. **Build untuk Produksi:**
   ```bash
   npm run build
   ```
   File hasil build yang optimal akan berada di folder `/dist`.

---

## 📂 Struktur Direktori Proyek

```
@KUIS PPSI/
├── index.html                  # Entry file HTML utama & meta SEO
├── package.json                # Konfigurasi proyek & dependensi (Vite, Lucide)
├── README.md                   # Dokumentasi lengkap proyek
├── src/
│   ├── main.js                 # Router hash client-side & app bootstrap
│   ├── index.css               # Design system, CSS variables & utilities
│   ├── data/
│   │   ├── destinations.js     # Seed data 10 destinasi wisata Kalianda
│   │   └── businesses.js       # Seed data 10 UMKM & kuliner lokal
│   ├── state/
│   │   └── store.js            # State management, persistensi localStorage, dan CRUD
│   ├── components/
│   │   ├── Navbar.js           # Header navigasi responsif & portal admin
│   │   ├── Footer.js           # Footer & sitemap disclaimer
│   │   ├── Card.js             # Kartu destinasi & UMKM
│   │   └── Toast.js            # Notifikasi toast mengambang
│   └── pages/
│       ├── Home.js             # Halaman Beranda
│       ├── Destinations.js     # Katalog Destinasi & Search
│       ├── DestinationDetail.js# Detail Destinasi, Galeri & Maps
│       ├── Businesses.js       # Katalog Direktori UMKM
│       ├── BusinessDetail.js   # Detail Profil UMKM & WhatsApp CTA
│       ├── About.js            # Halaman Tentang & Penjelasan Proyek
│       ├── AdminLogin.js       # Form Login Administrator
│       └── AdminDashboard.js   # Dashboard Kelola Destinasi & UMKM (CRUD)
```
