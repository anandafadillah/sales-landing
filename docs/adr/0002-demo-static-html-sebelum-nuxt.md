# Demo pitch dibuat static HTML, Nuxt dibangun setelah ACC

Untuk pitch ke calon klien, demo dibuat sebagai halaman static (HTML + Tailwind CDN + Alpine.js) di GitHub Pages supaya cepat jadi dan tanpa biaya hosting. Di demo, RFQ tidak disimpan; tombol kirim hanya membuka WhatsApp/email dengan pesan terisi, dan data katalog berupa data contoh di dalam repo. Aplikasi Nuxt (lihat ADR-0001) baru dibangun setelah klien menyetujui demo, dan demo static tidak dipakai sebagai fondasinya.

## Consequences

- Demo dan v1 dibangun dua kali; desain, copy, dan data katalog dari demo dipakai ulang, kodenya tidak.
- Selama fase demo, metrik "jumlah RFQ masuk" tidak bisa diukur.
