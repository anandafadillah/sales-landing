# 02: Tracer RFQ — tambah produk lalu kirim lewat WhatsApp

**What to build:** Pembeli menekan "Tambah" pada produk di katalog, produk masuk ke daftar permintaan penawaran, lalu Pembeli mengirimnya dan WhatsApp terbuka ke nomor sales dengan pesan berisi daftar item. Ini jalur tipis pertama dari katalog sampai pesan terkirim. Aturan RFQ ditempatkan di modul logika RFQ (JavaScript murni, tanpa DOM/Alpine), yang menjadi satu-satunya seam pengujian; komponen Alpine hanya memanggilnya.

**Blocked by:** 01 (Kerangka demo + deploy ke GitHub Pages)

**Status:** ready-for-agent

- [ ] Produk yang ditambahkan masuk ke daftar dengan jumlah awal sama dengan MOQ-nya
- [ ] Menambah produk yang sama dua kali tidak membuat item ganda
- [ ] Tombol produk yang sudah ada di daftar berubah menjadi "Ditambahkan"
- [ ] Jumlah item di daftar permintaan terlihat (misal badge "3 item")
- [ ] Tombol kirim membuka URL wa.me ke nomor WhatsApp dari konfigurasi
- [ ] Pesan memuat daftar item bernomor dengan nama produk, spesifikasi singkat, jumlah, dan satuan
- [ ] Pesan di-encode untuk URL; bila di-decode hasilnya sama persis dengan teks pesan, termasuk baris baru dan karakter seperti "&", "×", "Ø"
- [ ] Tes Vitest pada modul logika RFQ mencakup: jumlah awal = MOQ, tanpa duplikasi, URL WhatsApp memakai nomor konfigurasi, dan encode/decode pesan
