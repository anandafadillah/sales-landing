# 01: Kerangka demo + deploy ke GitHub Pages

**What to build:** Halaman demo static (HTML + Tailwind CDN + Alpine.js) bisa dibuka di GitHub Pages dan menampilkan navigasi, katalog produk yang dirender dari data contoh, serta footer kontak. Data katalog (20-30 produk material bangunan) dan konfigurasi bisnis (nama perusahaan, nomor WhatsApp, email sales, alamat, jam operasional, placeholder legalitas) masing-masing ada di satu tempat. Vitest sudah terpasang sebagai alat development untuk tiket berikutnya; halaman tetap tanpa build step.

Acuan desain: artboard Desktop di https://claude.ai/artifact/JLHkbpW9gHznecpnm2YfKE

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] GitHub Actions mempublikasikan folder demo ke GitHub Pages pada setiap push ke branch utama
- [ ] Katalog menampilkan nama, kategori, spesifikasi, standar, MOQ beserta satuan, dan Status Suplai untuk setiap produk dari data contoh, tanpa harga
- [ ] Setiap produk punya satu dari tiga Status Suplai: Ready stock gudang, Siap kirim partai besar, Indent
- [ ] Footer mengambil alamat, jam operasional, nomor WhatsApp, dan email dari konfigurasi; nilai contoh terlihat jelas sebagai placeholder
- [ ] Mengganti satu nilai di konfigurasi atau data katalog langsung terlihat di halaman tanpa menyentuh markup
- [ ] Perintah tes Vitest berjalan dan lulus (minimal satu tes contoh)
- [ ] Seluruh copy berbahasa Indonesia
