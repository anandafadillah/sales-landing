# 03: Kelola daftar permintaan

**What to build:** Pembeli bisa mengubah jumlah dan menghapus item di daftar permintaan penawaran. Jumlah yang tidak valid ditolak dengan pesan di dekat field, jumlah di bawah MOQ tetap boleh dikirim tapi diberi peringatan, dan daftar kosong menampilkan ajakan memilih produk dari katalog.

Acuan desain: artboard "Mobile 3 — Daftar permintaan + peringatan MOQ" dan "State & edge case" (daftar kosong, jumlah tidak valid).

**Blocked by:** 02 (Tracer RFQ — tambah produk lalu kirim lewat WhatsApp)

**Status:** ready-for-agent

- [ ] Jumlah tiap item bisa diubah, dan satuannya (batang, sak, lembar) tampil di sebelahnya
- [ ] Item bisa dihapus; tombol produk di katalog kembali menjadi "Tambah"
- [ ] Jumlah kosong ditolak dengan pesan "Isi jumlah yang dibutuhkan."
- [ ] Jumlah nol atau negatif ditolak dengan pesan "Jumlah harus lebih dari 0."
- [ ] Jumlah desimal atau huruf ditolak dengan pesan "Gunakan angka bulat, misal 3."
- [ ] Jumlah di bawah MOQ menampilkan peringatan bahwa harga distributor mungkin tidak berlaku, tanpa memblokir pengiriman
- [ ] Item di bawah MOQ ditandai "di bawah MOQ" di pesan yang dikirim
- [ ] Daftar kosong menampilkan "Belum ada produk" dan tombol lanjut nonaktif
- [ ] Pengiriman diblokir selama ada jumlah yang tidak valid
- [ ] Tes Vitest pada modul logika RFQ mencakup semua kasus jumlah di atas, peringatan MOQ, dan daftar kosong yang tidak bisa dikirim
