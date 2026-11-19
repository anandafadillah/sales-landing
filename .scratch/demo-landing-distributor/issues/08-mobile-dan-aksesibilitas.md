# 08: Versi mobile + pengecekan aksesibilitas

**What to build:** Pembeli yang membuka link dari WhatsApp di HP bisa menjalankan seluruh alur dengan nyaman: katalog tampil sebagai kartu, chip filter bisa digeser ke samping, dan sticky CTA bar ("Tanya harga & stok" dan "Minta penawaran") selalu terlihat. Seluruh halaman bisa dipakai dengan keyboard dan pembaca layar. Tiket ini ditutup dengan pengecekan manual di desktop dan HP sebelum pitch.

Acuan desain: lima artboard Mobile dan "State & edge case" (ring fokus keyboard).

**Blocked by:** 03 (Kelola daftar permintaan), 04 (Form identitas Pembeli + kirim lewat email), 05 (Cari dan filter katalog)

**Status:** ready-for-agent

- [ ] Di lebar HP (390 px), katalog tampil sebagai kartu dan tidak ada tabel yang terpotong atau scroll horizontal halaman
- [ ] Chip filter kategori bisa digeser horizontal tanpa memakan banyak ruang vertikal
- [ ] Sticky CTA bar tampil di bawah layar HP; "Tanya harga & stok" membuka WhatsApp, "Minta penawaran" menuju daftar permintaan
- [ ] Jumlah item di daftar permintaan terlihat dari mana saja saat menggulir di HP
- [ ] Semua tombol dan field punya target sentuh minimal 44 px
- [ ] Semua tombol, field, filter, dan accordion bisa dijangkau dengan Tab dan punya ring fokus yang terlihat
- [ ] Semua field punya label; tombol yang hanya ikon punya aria-label
- [ ] Kontras teks minimal 4.5:1
- [ ] Alur lengkap (cari, tambah, ubah jumlah, isi form, kirim WA dan email) dicek manual di Chrome desktop dan satu HP Android
