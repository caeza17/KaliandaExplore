---
name: kalianda-explore-design-skill
description: Panduan desain UI/UX untuk Kalianda Explore, platform web responsif pariwisata dan UMKM lokal Kecamatan Kalianda, Lampung Selatan.
---

# Skill Desain UI/UX — Kalianda Explore

## 1. Tujuan Skill

Gunakan panduan ini saat merancang, memperbarui, atau mengembangkan antarmuka **Kalianda Explore**, platform digital untuk membantu pengguna menemukan informasi destinasi wisata dan UMKM lokal di Kecamatan Kalianda, Kabupaten Lampung Selatan.

Desain harus konsisten dengan konsep produk, kebutuhan MVP, dan halaman yang sudah dirancang. Utamakan kemudahan menemukan informasi, keterbacaan, konsistensi visual, dan kelayakan implementasi.

## 2. Prinsip Desain

- **Mobile-first dan responsif:** desain harus nyaman di ponsel, tablet, dan desktop.
- **Jelas dan mudah digunakan:** navigasi, pencarian, filter, dan tombol harus mudah dipahami.
- **Visual lokal:** gunakan foto pantai, alam, kuliner, dan produk lokal yang relevan.
- **Konsisten:** pertahankan palet warna, tipografi, ikon, radius, jarak, dan gaya komponen.
- **Berorientasi konten:** tampilkan foto dan informasi utama secara terstruktur.
- **Realistis untuk MVP:** hindari fitur yang membutuhkan integrasi kompleks jika tidak termasuk ruang lingkup.
- **Jujur terhadap data:** tandai data contoh sebagai dummy dan jangan mengarang harga, rating, jam operasional, kontak, atau fasilitas seolah-olah terverifikasi.
- **Aksesibel:** pastikan kontras teks, label form, fokus keyboard, dan pesan status mudah dipahami.

## 3. Identitas Visual

### Palet warna

Gunakan token warna berikut secara konsisten:

| Peran | Warna |
|---|---|
| Primary | `#00636E` |
| Primary container / aksen teal | `#087E8B` |
| Secondary / hijau | `#176B4B` |
| Accent hangat | `#A66126` |
| Background | `#F8F9FF` |
| Surface / kartu | `#FFFFFF` |
| Teks utama | `#001D36` |
| Teks sekunder | `#3E494A` |
| Outline / border | `#6E797B` / `#BDC8CA` |
| Error | `#BA1A1A` |

Gunakan teal sebagai warna identitas utama, hijau untuk elemen terkait alam atau status positif, dan aksen hangat secara terbatas. Hindari penggunaan banyak warna aksen dalam satu layar.

### Tipografi

- Gunakan **Plus Jakarta Sans** sebagai font utama.
- Gunakan bobot 400 untuk isi, 600–700 untuk subjudul, dan 700–800 untuk judul utama.
- Buat hierarki yang jelas antara judul halaman, judul bagian, teks kartu, label, dan keterangan.
- Hindari paragraf panjang pada kartu; gunakan ringkasan yang mudah dipindai.

### Bentuk dan komponen

- Gunakan kartu putih, sudut membulat, dan bayangan tipis.
- Gunakan ruang kosong yang cukup agar layar tidak terasa padat.
- Gunakan ikon yang konsisten, misalnya Material Symbols atau satu pustaka ikon yang seragam.
- Gunakan foto dengan rasio dan perlakuan visual yang konsisten.
- Gunakan overlay gelap pada foto hero bila teks diletakkan di atas gambar.
- Hindari dekorasi yang mengganggu konten atau keterbacaan.

## 4. Pola Layout

### Halaman publik

- Navbar konsisten dengan identitas Kalianda Explore.
- Beranda menonjolkan hero, pencarian, kategori, destinasi pilihan, UMKM lokal, ajakan menjelajah, dan footer.
- Pada ponsel, gunakan navigasi ringkas dan area sentuh yang cukup besar.
- Katalog menggunakan kartu yang konsisten dan kontrol pencarian/filter yang mudah dijangkau.
- Halaman detail memprioritaskan foto, nama, kategori, deskripsi, lokasi, fasilitas atau produk, dan tindakan utama.

### Halaman admin

- Gunakan layout dashboard yang rapi dan berorientasi tugas.
- Tampilkan navigasi yang jelas untuk Dashboard, Kelola Destinasi, Kelola UMKM, dan Keluar.
- Ringkasan statistik boleh digunakan untuk membantu orientasi, tetapi angka contoh harus diperlakukan sebagai data dummy.
- Form dibagi menjadi beberapa bagian dengan judul yang jelas.
- Tombol Simpan dan Batal harus mudah ditemukan; pada ponsel, pertimbangkan action bar yang tetap terlihat tanpa menutupi isi form.
- Aksi Hapus harus memiliki dialog konfirmasi.

## 5. Halaman dan Komponen Utama

### Beranda
Sertakan:
- Identitas/logo Kalianda Explore.
- Hero dengan pesan utama “Jelajahi Keindahan Kalianda”.
- Kolom pencarian destinasi atau kuliner.
- Kategori populer.
- Kartu destinasi favorit.
- Kartu UMKM dan kuliner lokal.
- Ajakan untuk menjelajahi atau mendukung usaha lokal.
- Footer dengan navigasi dan informasi kontak yang valid jika tersedia.

### Katalog destinasi
Sertakan:
- Judul dan deskripsi singkat.
- Pencarian berdasarkan nama.
- Filter kategori dan filter lain jika data mendukung.
- Kartu berisi foto, nama, kategori, ringkasan, lokasi bila tersedia, dan tombol detail.
- Empty state saat tidak ada hasil.
- Loading state dan pagination atau tombol “Muat Lebih Banyak” jika diperlukan.

### Detail destinasi
Sertakan:
- Breadcrumb.
- Foto utama dan galeri jika tersedia.
- Nama, kategori, dan deskripsi.
- Lokasi serta tautan peta jika tersedia.
- Fasilitas, jam operasional, dan harga hanya jika data tersedia/terverifikasi.
- Informasi kontak pengelola bila tersedia.
- Rekomendasi destinasi lain jika sesuai.
- Tombol aksi utama yang jelas.

### Katalog UMKM
Sertakan:
- Pencarian nama usaha atau produk.
- Filter kategori.
- Kartu UMKM dengan foto, nama usaha, kategori, ringkasan, dan tautan detail.
- Empty state dan pagination/muat lebih banyak jika diperlukan.

### Detail UMKM
Sertakan:
- Foto usaha atau produk.
- Nama usaha, kategori, dan deskripsi.
- Daftar produk/layanan bila tersedia.
- Lokasi dan kontak bila tersedia.
- Tombol WhatsApp hanya jika nomor usaha yang valid tersedia.
- Jangan menampilkan informasi kontak atau harga fiktif sebagai fakta.

### Login admin
Sertakan:
- Form username/email dan kata sandi.
- Kontrol tampilkan/sembunyikan kata sandi.
- Validasi dan pesan kesalahan yang jelas.
- Tombol masuk dan tautan kembali ke halaman publik.
- Jangan sediakan pendaftaran admin publik jika tidak ditentukan dalam kebutuhan produk.

### Dashboard admin
Sertakan:
- Navigasi admin.
- Ringkasan data destinasi dan UMKM.
- Daftar entri terbaru atau tabel data.
- Pencarian bila diperlukan.
- Tombol Tambah, Edit, dan Hapus.
- Dialog konfirmasi dan notifikasi hasil tindakan.

### Form tambah/edit
Form destinasi dapat mencakup nama, kategori, deskripsi, lokasi/alamat, tautan peta, foto, fasilitas, dan informasi operasional opsional.

Form UMKM dapat mencakup nama usaha, penanggung jawab jika diperlukan, kategori, deskripsi, alamat, nomor WhatsApp, tautan toko/media sosial, foto, dan daftar produk.

Untuk kedua form:
- Tandai kolom wajib dan opsional.
- Validasi input dan tampilkan pesan yang spesifik.
- Sediakan tombol Simpan dan Batal.
- Berikan status berhasil/gagal setelah tindakan.
- Jangan meminta data yang tidak dibutuhkan oleh MVP.

## 6. Komponen Reusable

Bangun dan gunakan ulang komponen berikut:
- Navbar desktop/mobile dan footer.
- Search bar dan filter chips.
- Kartu destinasi dan kartu UMKM.
- Breadcrumb.
- Tombol utama, sekunder, dan destruktif.
- Input, textarea, dropdown, dan upload gambar.
- Label status/verifikasi jika memang didukung data.
- Empty state dan loading skeleton.
- Tabel/list admin.
- Dialog konfirmasi.
- Toast atau notifikasi sukses/gagal.
- Pagination atau tombol muat lebih banyak.

Setiap komponen harus memiliki perilaku dan tampilan yang konsisten, termasuk hover, focus, disabled, loading, success, dan error bila relevan.

## 7. Interaksi dan Alur Pengguna

Pastikan desain mendukung alur utama berikut:

**Wisatawan:** Beranda → pencarian/kategori → katalog destinasi → detail → peta atau kontak jika tersedia.

**Pencari UMKM:** Beranda → UMKM lokal → pencarian/filter → detail UMKM → informasi produk → kontak WhatsApp jika tersedia.

**Admin:** Login → dashboard → pilih pengelolaan destinasi/UMKM → tambah/edit/hapus → simpan perubahan → kembali ke daftar.

Jangan menampilkan tombol yang tampak aktif tetapi tidak memiliki tujuan atau aksi. Jika sebuah fitur belum diimplementasikan, tandai sebagai placeholder atau jangan tampilkan sebagai fitur aktif.

## 8. Responsivitas dan Aksesibilitas

- Desktop: gunakan ruang layar dengan proporsional; kartu dapat ditampilkan dalam grid.
- Tablet: kurangi jumlah kolom tanpa membuat kartu terlalu sempit.
- Mobile: utamakan satu kolom, navigasi ringkas, dan kontrol yang mudah disentuh.
- Cegah teks, tabel, gambar, dan form meluber dari viewport.
- Gunakan kontras warna yang memadai.
- Berikan label yang terlihat pada input; jangan hanya mengandalkan placeholder.
- Pastikan navigasi dan dialog dapat digunakan dengan keyboard.
- Jangan menggunakan warna saja untuk menyampaikan status.
- Sediakan teks alternatif yang relevan untuk gambar.

## 9. Batasan MVP

Prioritaskan:
1. Beranda.
2. Katalog dan detail destinasi.
3. Katalog dan detail UMKM.
4. Pencarian dan filter dasar.
5. Login admin.
6. Dashboard admin.
7. CRUD destinasi dan UMKM.

Jangan menambahkan sebagai fitur wajib tanpa persetujuan ruang lingkup:
- Pembayaran online.
- Pemesanan tiket terintegrasi.
- Chat internal.
- Login wisatawan.
- Dashboard mandiri pemilik UMKM.
- Integrasi pajak/retribusi atau pembayaran PAD.
- Analitik bisnis tingkat lanjut.

Kalianda Explore mendukung promosi wisata dan UMKM. Jangan menyatakan bahwa aplikasi otomatis meningkatkan PAD; hal tersebut memerlukan mekanisme resmi dan bukti yang sesuai.

## 10. Prompt Dasar untuk AI Desain

Gunakan prompt berikut saat meminta AI menghasilkan atau memperbarui desain:

> Bertindaklah sebagai UI/UX Designer. Rancang atau perbarui antarmuka Kalianda Explore berdasarkan skill desain ini dan PRD produk. Pertahankan palet teal, hijau alam, aksen hangat, font Plus Jakarta Sans, kartu membulat, hierarki visual yang jelas, serta desain responsif. Prioritaskan kemudahan mencari destinasi dan UMKM serta pengelolaan data admin. Gunakan komponen reusable, tampilkan empty/loading/error states bila relevan, dan jangan menampilkan data dummy sebagai fakta. Fokus pada fitur MVP dan jangan menambahkan integrasi kompleks yang tidak termasuk ruang lingkup.

## 11. Checklist Evaluasi Desain

Sebelum menyetujui desain, pastikan:
- [ ] Identitas visual konsisten di semua halaman.
- [ ] Navigasi utama jelas dan mudah digunakan.
- [ ] Pencarian dan filter mudah ditemukan.
- [ ] Kartu destinasi/UMKM menampilkan informasi yang relevan.
- [ ] Detail menyediakan lokasi/kontak hanya jika tersedia.
- [ ] Form memiliki label, validasi, dan pesan status.
- [ ] Aksi hapus memerlukan konfirmasi.
- [ ] Layout nyaman pada desktop dan ponsel.
- [ ] Tidak ada tombol tanpa fungsi yang jelas.
- [ ] Data contoh tidak disajikan sebagai fakta terverifikasi.
- [ ] Desain tetap sesuai ruang lingkup MVP.

---
**Akhir skill desain Kalianda Explore.**
