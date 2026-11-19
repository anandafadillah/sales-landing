# Sales Landing Distributor

Website compro sekaligus landing page untuk distributor material bangunan yang menjual partai besar ke pembeli B2B. Harga tidak ditampilkan; pembeli mengirim permintaan penawaran, lalu sales membalas.

## Language

**Permintaan Penawaran (RFQ)**:
Daftar item dan jumlah yang dikirim pembeli untuk meminta harga. Belum mengikat dan belum berisi harga. Di UI ditulis "Permintaan penawaran"; "RFQ" hanya dipakai di kode dan dokumen internal.
_Avoid_: Order, pesanan, keranjang, quote, minta harga

**Penawaran**:
Surat balasan dari sales ke pembeli yang berisi harga, pajak, ongkos kirim, dan masa berlaku, sebagai jawaban atas satu RFQ.
_Avoid_: Quotation, invoice, tagihan

**Pembeli**:
Pihak yang mengirim RFQ, bisa perusahaan (PT, CV, toko bangunan, kontraktor) atau perorangan (mandor, tukang, pemilik proyek).
_Avoid_: Customer, klien, user, pelanggan

**MOQ**:
Jumlah minimum per produk agar berlaku harga distributor. Bukan batas keras: RFQ di bawah MOQ tetap boleh dikirim, sales yang memutuskan harganya.
_Avoid_: Minimal beli, minimum pembelian

**Status Suplai**:
Pola ketersediaan sebuah produk, diatur manual dan jarang berubah: Ready stock gudang, Siap kirim partai besar, atau Indent. Menggambarkan kemampuan suplai, bukan jumlah stok hari ini.
_Avoid_: Stok, stock counter, sisa barang
