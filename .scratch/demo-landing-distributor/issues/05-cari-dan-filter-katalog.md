# 05: Cari dan filter katalog

**What to build:** Pembeli bisa mencari produk berdasarkan nama atau ukuran (misal "D13", "3 inci") dan memfilter per kategori; keduanya bekerja bersamaan. Bila tidak ada hasil, tampil pesan yang menyebut kata kuncinya dan ajakan "Tanyakan ke sales" lewat WhatsApp.

Acuan desain: artboard "Mobile 2 — Katalog (filter Pipa, cari \"3 inci\")" dan "State & edge case" (pencarian tidak ditemukan).

**Blocked by:** 01 (Kerangka demo + deploy ke GitHub Pages)

**Status:** ready-for-agent

- [ ] Filter kategori: Semua, Besi dan baja, Semen dan mortar, Pipa dan fitting, Atap dan rangka, Kayu dan panel
- [ ] Filter aktif terlihat jelas dan diumumkan sebagai tombol yang ditekan (aria-pressed)
- [ ] Pencarian mencocokkan nama dan spesifikasi produk tanpa membedakan huruf besar/kecil
- [ ] Pencarian dan filter kategori berlaku bersamaan
- [ ] Hasil kosong menampilkan "Tidak ada produk untuk “<kata kunci>”" dan tombol "Tanyakan ke sales" yang membuka WhatsApp ke nomor konfigurasi
- [ ] Status "Ditambahkan" pada produk tetap benar setelah pencarian atau filter berubah
