# Spec: Demo landing page distributor material bangunan (fase demo)

Status: ready-for-agent

Rujukan: `CONTEXT.md` (glosarium), ADR-0002 (demo static), ADR-0001 (rencana v1, status proposed).

## Problem Statement

Calon klien kita adalah distributor material bangunan yang menjual partai besar ke Pembeli B2B (kontraktor, toko bangunan, developer) dan perorangan (mandor, tukang, pemilik proyek). Saat ini Pembeli mencari spesifikasi lewat katalog PDF yang dikirim manual dan bertanya harga serta stok lewat chat WhatsApp yang berulang. Staf purchasing butuh spesifikasi teknis, MOQ, dan bukti legalitas sebelum bisa mengajukan pembelian ke atasannya, tapi informasi itu tersebar dan harus ditanyakan satu per satu ke sales.

Untuk memenangkan proyek ini, kita perlu demo yang bisa diklik saat pitch: klien harus melihat sendiri bagaimana Pembeli menemukan produk, menyusun Permintaan Penawaran (RFQ), lalu mengirimnya ke sales dalam satu alur, tanpa harga ditampilkan.

## Solution

Satu halaman one-page scroll berbahasa Indonesia, berisi:

- Hero yang menyatakan penawaran distributor, dengan tombol unduh katalog PDF dan ajakan menyusun RFQ.
- Katalog produk dengan pencarian, filter kategori, spesifikasi teknis, standar (SNI), MOQ, dan Status Suplai per produk. Tanpa harga.
- Daftar RFQ yang diisi dari katalog: Pembeli menambah produk, mengubah jumlah, menghapus item, dan melihat peringatan kalau jumlahnya di bawah MOQ.
- Form RFQ dengan field wajib, lalu dua cara kirim: WhatsApp (pesan terisi otomatis) atau email lewat `mailto:` (subjek dan isi terisi).
- Seksi kredibilitas B2B: legalitas, foto gudang/armada, dan logo mitra (placeholder yang jelas bertanda contoh).
- FAQ pengadaan berbentuk accordion.
- Sticky CTA bar di mobile.

Demo dibangun static (HTML + Tailwind CDN + Alpine.js) di folder `demo/` dan di-hosting di GitHub Pages. RFQ tidak disimpan di mana pun pada fase ini.

## User Stories

### Menemukan produk
1. Sebagai Pembeli, aku ingin langsung paham dari hero bahwa ini distributor partai besar, supaya aku tahu aku berada di tempat yang tepat.
2. Sebagai Pembeli, aku ingin mencari produk berdasarkan nama atau ukuran (misal "D13"), supaya aku cepat menemukan barang yang ada di daftar kebutuhan proyekku.
3. Sebagai Pembeli, aku ingin memfilter katalog per kategori (besi dan baja, semen dan mortar, pipa dan fitting, atap dan rangka, kayu dan panel), supaya aku tidak perlu menggulir semua produk.
4. Sebagai Pembeli, aku ingin melihat pencarian dan filter bekerja bersamaan, supaya aku bisa mencari "3 inci" khusus di kategori pipa.
5. Sebagai Pembeli, aku ingin melihat pesan yang jelas saat pencarian tidak menemukan produk, beserta ajakan untuk tetap bertanya ke sales, supaya aku tidak buntu.
6. Sebagai staf purchasing, aku ingin melihat spesifikasi teknis tiap produk (ukuran, bahan, panjang/kemasan), supaya aku bisa mencocokkannya dengan kebutuhan teknis proyek.
7. Sebagai staf purchasing, aku ingin melihat standar produk (misal SNI), supaya aku tahu produknya memenuhi syarat proyek.
8. Sebagai Pembeli, aku ingin melihat MOQ tiap produk, supaya aku tahu berapa jumlah minimum untuk harga distributor.
9. Sebagai Pembeli, aku ingin melihat Status Suplai tiap produk (Ready stock gudang, Siap kirim partai besar, Indent), supaya aku bisa memperkirakan waktu pengadaan.
10. Sebagai Pembeli, aku ingin penjelasan singkat arti tiap Status Suplai, supaya aku tidak salah paham bahwa "Indent" berarti barang tidak tersedia.
11. Sebagai Pembeli, aku ingin Status Suplai bisa dibedakan tanpa mengandalkan warna saja, supaya tetap terbaca di layar HP yang redup atau oleh pengguna buta warna.
12. Sebagai staf purchasing, aku ingin mengunduh katalog PDF, supaya aku bisa meneruskannya ke atasan atau tim teknis.

### Menyusun Permintaan Penawaran
13. Sebagai Pembeli, aku ingin menambah produk ke daftar RFQ langsung dari katalog, supaya aku tidak perlu mengetik ulang nama dan spesifikasinya.
14. Sebagai Pembeli, aku ingin tombol produk yang sudah ditambahkan berubah tanda (misal "Ditambahkan"), supaya aku tidak menambahkannya dua kali.
15. Sebagai Pembeli, aku ingin produk yang ditambahkan masuk dengan jumlah awal sama dengan MOQ-nya, supaya aku langsung mendapat jumlah yang masuk akal.
16. Sebagai Pembeli, aku ingin mengubah jumlah tiap item beserta satuannya (batang, sak, lembar), supaya daftar sesuai kebutuhan proyekku.
17. Sebagai Pembeli, aku ingin menghapus item dari daftar RFQ, supaya aku bisa memperbaiki pilihan.
18. Sebagai Pembeli, aku ingin melihat jumlah item di daftar RFQ dari mana saja di halaman, supaya aku tahu daftarku tidak hilang saat menggulir katalog.
19. Sebagai Pembeli, aku ingin melihat peringatan saat jumlah sebuah item di bawah MOQ, supaya aku tahu harga distributor mungkin tidak berlaku, tapi tetap bisa mengirim.
20. Sebagai Pembeli, aku ingin jumlah yang tidak valid (kosong, nol, negatif, bukan angka) ditolak dengan pesan yang jelas, supaya RFQ yang kukirim tidak membingungkan sales.
21. Sebagai Pembeli, aku ingin melihat pesan ajakan saat daftar RFQ masih kosong, supaya aku tahu harus memilih produk dulu dari katalog.

### Mengisi identitas dan mengirim
22. Sebagai Pembeli, aku ingin memilih apakah aku mewakili perusahaan atau perorangan, supaya aku tidak dipaksa mengisi nama perusahaan kalau membeli atas nama pribadi.
23. Sebagai Pembeli perusahaan, aku ingin mengisi nama perusahaan, supaya Penawaran dibuat atas nama perusahaanku.
24. Sebagai Pembeli, aku ingin mengisi nama kontak, supaya sales tahu siapa yang dihubungi.
25. Sebagai Pembeli, aku ingin mengisi kota tujuan, supaya ongkos kirim bisa dihitung di Penawaran.
26. Sebagai Pembeli, aku ingin mengisi nomor WhatsApp atau email, supaya sales bisa membalas walau aku mengirim lewat email.
27. Sebagai Pembeli, aku ingin melihat field mana yang belum diisi dengan pesan di dekat field tersebut, supaya aku tahu persis apa yang harus diperbaiki sebelum mengirim.
28. Sebagai Pembeli yang ingin respons cepat, aku ingin mengirim RFQ lewat WhatsApp dengan pesan yang sudah tersusun rapi, supaya aku tidak perlu mengetik daftar barang di chat.
29. Sebagai staf purchasing, aku ingin mengirim RFQ lewat email, supaya aku bisa meminta surat Penawaran resmi berkop perusahaan dan menyimpannya sebagai arsip.
30. Sebagai Pembeli, aku ingin penjelasan singkat kapan memakai WhatsApp dan kapan email, supaya aku memilih kanal yang tepat.
31. Sebagai Pembeli, aku ingin isi pesan WhatsApp dan email memuat semua item, jumlah, satuan, identitasku, dan kota tujuan, supaya sales tidak perlu bertanya ulang.
32. Sebagai Pembeli, aku ingin item di bawah MOQ ditandai di pesan, supaya sales tahu sejak awal.

### Kepercayaan sebelum menghubungi
33. Sebagai staf purchasing, aku ingin melihat bahwa distributor ini distributor resmi, terdaftar PKP, dan bisa menerbitkan faktur pajak, supaya aku bisa memenuhi syarat administrasi perusahaan.
34. Sebagai Pembeli, aku ingin melihat foto gudang dan armada pengiriman, supaya aku yakin perusahaan ini nyata dan mampu menyuplai volume besar.
35. Sebagai Pembeli, aku ingin melihat logo perusahaan atau toko yang sudah disuplai, supaya aku yakin distributor ini sudah dipercaya pihak lain.
36. Sebagai staf purchasing, aku ingin membaca jawaban atas pertanyaan pengadaan (MOQ, PPN dan faktur pajak, pembayaran tempo, pengiriman luar kota), supaya aku tidak perlu menanyakannya satu per satu ke sales.
37. Sebagai Pembeli, aku ingin FAQ bisa dibuka-tutup per pertanyaan, supaya halaman tidak terlalu panjang.
38. Sebagai Pembeli, aku ingin melihat alamat gudang, jam operasional, nomor WhatsApp, dan email sales di footer, supaya aku bisa menghubungi lewat jalur lain.

### Mobile dan aksesibilitas
39. Sebagai Pembeli yang membuka link dari WhatsApp di HP, aku ingin tombol "Tanya harga & stok" dan "Minta penawaran" selalu terlihat di bawah layar, supaya aku bisa bertanya kapan saja tanpa menggulir ke atas.
40. Sebagai Pembeli di HP, aku ingin katalog tampil sebagai kartu yang mudah dibaca, bukan tabel yang terpotong, supaya spesifikasi tetap terbaca.
41. Sebagai Pembeli di HP, aku ingin filter kategori bisa digeser ke samping, supaya tidak memakan banyak ruang vertikal.
42. Sebagai Pembeli yang memakai keyboard atau pembaca layar, aku ingin semua tombol, field, dan accordion bisa dijangkau dan punya label, supaya aku tetap bisa menyusun dan mengirim RFQ.

### Admin dan klien (pemilik bisnis)
43. Sebagai admin sales, aku ingin semua RFQ masuk ke satu nomor WhatsApp dan satu email, supaya tidak ada permintaan yang tercecer.
44. Sebagai pengembang, aku ingin nomor WhatsApp, email sales, dan data perusahaan disimpan di satu konfigurasi, supaya mengganti data contoh ke data klien cukup di satu tempat.
45. Sebagai pengembang, aku ingin data katalog disimpan sebagai satu file data terstruktur, supaya produk contoh bisa diganti dengan produk asli klien tanpa menyentuh markup.
46. Sebagai calon klien yang menonton pitch, aku ingin semua data yang belum asli ditandai jelas sebagai contoh atau placeholder, supaya aku tidak mengira itu klaim tentang perusahaanku.

## Implementation Decisions

### Arsitektur dan hosting
- Halaman static tanpa build step: HTML + Tailwind lewat CDN + Alpine.js, di folder `demo/` repo ini, di-deploy ke GitHub Pages lewat GitHub Actions yang mempublikasikan folder itu (ADR-0002).
- Tidak ada backend dan tidak ada penyimpanan RFQ. Metrik "jumlah RFQ masuk" tidak diukur selama fase demo.
- Seluruh copy dalam Bahasa Indonesia. Label UI memakai "Permintaan penawaran"; istilah "RFQ" hanya dipakai di kode dan dokumen.
- Desain visual dibuat ulang (mockup di canvas Design tidak menjadi acuan). Spec ini tidak mengunci arah visual; yang dikunci adalah struktur seksi dan perilaku.

### Modul
1. **Modul logika RFQ** (JavaScript murni, tanpa ketergantungan DOM atau Alpine). Ini satu-satunya modul dalam yang punya perilaku bercabang, dan menjadi seam pengujian. Antarmukanya:
   - menambah produk ke daftar RFQ (jumlah awal = MOQ produk; menambah produk yang sama tidak menduplikasi item),
   - mengubah jumlah dan menghapus item,
   - mengevaluasi tiap item: valid atau tidak, dan apakah di bawah MOQ,
   - memvalidasi form identitas dan mengembalikan daftar error per field,
   - menyusun teks pesan RFQ,
   - membangun URL WhatsApp (`wa.me`) dan URL `mailto:` dari daftar RFQ, identitas Pembeli, dan konfigurasi sales.
2. **Data katalog**: satu file data terstruktur (contoh 20-30 produk material bangunan) dengan field per produk: id, nama, kategori, spesifikasi, standar, MOQ (angka), satuan, Status Suplai, dan ikon/gambar. Status Suplai diatur manual per produk dan bernilai salah satu dari tiga: ready, partai besar, indent.
3. **Konfigurasi bisnis**: satu objek berisi nama perusahaan, nomor WhatsApp sales, email sales, alamat gudang, jam operasional, dan placeholder legalitas (NPWP, NIB, prinsipal). Semua nilai contoh diberi penanda placeholder yang terlihat.
4. **Halaman (komponen Alpine)**: menampilkan katalog, mengelola state pencarian/filter dan daftar RFQ, lalu memanggil modul logika RFQ untuk semua aturan. Komponen Alpine tidak berisi aturan bisnis.
5. **Katalog PDF contoh**: satu file PDF statis yang dibuat dari data katalog contoh dan bertanda "contoh".

### Aturan RFQ
- Daftar RFQ minimal berisi 1 item untuk bisa dikirim.
- Jumlah harus bilangan bulat lebih dari 0.
- Jumlah di bawah MOQ diperbolehkan, dengan peringatan di daftar RFQ dan penanda di pesan yang dikirim.
- Field wajib: tipe Pembeli (perusahaan/perorangan), nama kontak, kota tujuan, dan kontak (nomor WhatsApp atau email, minimal salah satu). Nama perusahaan wajib hanya bila tipe Pembeli = perusahaan.
- Validasi berlaku sama untuk kirim lewat WhatsApp maupun email.
- Daftar RFQ hanya hidup di memori halaman; reload mengosongkan daftar. (Default yang dipilih saat menulis spec ini; bisa diubah ke localStorage kalau diminta.)

### Format pesan
- Pesan WhatsApp dan isi email memuat: salam pembuka, nama kontak, tipe Pembeli dan nama perusahaan (bila ada), kota tujuan, kontak Pembeli, lalu daftar item bernomor berisi nama produk, spesifikasi singkat, jumlah, satuan, dan penanda "di bawah MOQ" bila berlaku.
- Subjek email: "Permintaan penawaran" diikuti nama perusahaan, atau nama kontak untuk perorangan.
- Semua teks di-encode untuk URL; pesan diuji untuk karakter seperti "&", "×", "Ø", dan baris baru.

### Seksi halaman (urutan)
Navigasi, hero (unduh katalog PDF), penjelasan Status Suplai, katalog + daftar RFQ + form, kredibilitas B2B, FAQ pengadaan, footer kontak, dan sticky CTA bar di mobile. Penempatan daftar RFQ relatif terhadap katalog ditentukan saat desain ulang.

## Testing Decisions

- **Satu seam: modul logika RFQ**, diuji dengan Vitest. Vitest hanya alat development; halaman demo tetap tanpa build step.
- Tes yang baik menguji perilaku yang terlihat dari luar modul: masukan (produk, jumlah, identitas, konfigurasi) dan keluaran (daftar error, status di bawah MOQ, teks pesan, URL). Tes tidak menyentuh struktur internal modul.
- Kasus yang wajib dicakup:
  - menambah produk memakai MOQ sebagai jumlah awal, dan menambah produk yang sama dua kali tidak menduplikasi item,
  - jumlah kosong, nol, negatif, desimal, dan bukan angka ditolak,
  - jumlah di bawah MOQ lolos validasi tapi ditandai,
  - nama perusahaan wajib untuk perusahaan dan tidak wajib untuk perorangan,
  - kontak lolos bila salah satu dari WhatsApp atau email terisi, gagal bila keduanya kosong,
  - daftar RFQ kosong tidak bisa dikirim,
  - URL WhatsApp memakai nomor dari konfigurasi dan berisi pesan ter-encode yang bila di-decode sama dengan teks pesan,
  - URL `mailto:` memakai email dari konfigurasi dengan subjek dan isi yang benar.
- Halaman dan komponen Alpine tidak diuji otomatis; cukup cek manual di desktop dan HP sebelum pitch.
- Belum ada prior art di repo (repo masih kosong); tes modul ini menjadi pola pertama.

## Out of Scope

- Penyimpanan RFQ, database, server API, dan dashboard admin (masuk v1, ADR-0001).
- Pengukuran metrik jumlah RFQ masuk dan analytics.
- Routing RFQ ke beberapa sales per wilayah atau kategori.
- Harga, keranjang belanja, checkout, dan pembayaran.
- Login Pembeli, riwayat RFQ, dan status RFQ.
- Stok real-time dan integrasi ke sistem gudang/ERP.
- Admin panel untuk mengubah katalog.
- Halaman detail produk terpisah dan multi-page.
- Bahasa selain Indonesia.
- Data asli klien (nama, logo, produk, legalitas); demo memakai placeholder.

## Further Notes

- **Rencana v1 (setelah klien ACC):** dibangun ulang dengan Nuxt server API + Drizzle + PostgreSQL (Docker untuk lokal, Neon free plan saat deploy di Vercel). Setiap RFQ disimpan sebelum WhatsApp/email dibuka supaya metrik "jumlah RFQ masuk" bisa dihitung. Desain, copy, dan data katalog dari demo dipakai ulang; kodenya tidak. v1 akan mendapat spec sendiri.
- Kandidat fitur v1 yang muncul di sesi grilling: status RFQ (baru, dihubungi, Penawaran dikirim, deal/batal) untuk mengukur RFQ yang jadi PO, routing per wilayah, dan impor katalog dari spreadsheet.
- Pertanyaan terbuka untuk ditanyakan ke calon klien sebelum v1: aturan MOQ untuk pesanan campuran, kebijakan PPN dan faktur pajak, syarat pembayaran tempo, cakupan armada pengiriman, dan kapasitas suplai per bulan. Jawaban ini mengisi FAQ dan seksi kredibilitas.
- Placeholder di demo harus terlihat jelas sebagai contoh supaya tidak terbaca sebagai klaim legalitas atau klien yang tidak benar.
