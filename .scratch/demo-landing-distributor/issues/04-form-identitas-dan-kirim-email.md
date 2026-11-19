# 04: Form identitas Pembeli + kirim lewat email

**What to build:** Dari daftar permintaan, Pembeli lanjut ke form identitas: memilih mewakili perusahaan atau perorangan, lalu mengisi field wajib. Field yang belum benar menampilkan error di dekatnya. Setelah valid, Pembeli bisa mengirim lewat WhatsApp atau email (`mailto:`); keduanya memuat identitas lengkap. Ada penjelasan singkat kapan memakai WhatsApp (respons cepat) dan kapan email (Penawaran resmi berkop perusahaan).

Acuan desain: artboard "Mobile 4 — Form identitas + error + kirim".

**Blocked by:** 02 (Tracer RFQ — tambah produk lalu kirim lewat WhatsApp)

**Status:** ready-for-agent

- [ ] Pembeli memilih tipe: perusahaan atau perorangan
- [ ] Nama perusahaan wajib hanya bila tipe = perusahaan, dan tidak tampil sebagai wajib untuk perorangan
- [ ] Nama kontak dan kota tujuan wajib
- [ ] Kontak Pembeli lolos bila nomor WhatsApp atau email terisi, dan gagal bila keduanya kosong
- [ ] Error tampil di dekat field yang salah dan terhubung ke field tersebut untuk pembaca layar
- [ ] Validasi yang sama berlaku untuk kirim lewat WhatsApp maupun email
- [ ] Pesan WhatsApp dan isi email memuat nama kontak, tipe Pembeli, nama perusahaan (bila ada), kota tujuan, kontak Pembeli, lalu daftar item
- [ ] URL mailto: memakai email sales dari konfigurasi, dengan subjek "Permintaan penawaran" diikuti nama perusahaan, atau nama kontak untuk perorangan
- [ ] Tes Vitest pada modul logika RFQ mencakup validasi tiap field, aturan perusahaan/perorangan, aturan kontak, serta subjek dan isi mailto:
