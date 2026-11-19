# Sales Landing — Demo distributor material bangunan

Demo pitch (fase sebelum ACC) untuk landing page B2B distributor material bangunan: katalog tanpa harga, daftar **Permintaan Penawaran (RFQ)**, lalu kirim ke sales lewat WhatsApp atau email.

- Glosarium: [`CONTEXT.md`](CONTEXT.md)
- Keputusan arsitektur: [`docs/adr/`](docs/adr/)
- Spec & tiket: [`.scratch/demo-landing-distributor/`](.scratch/demo-landing-distributor/)

## Stack (fase demo)

HTML + Tailwind CSS (CDN) + Alpine.js, tanpa build step, di-hosting di GitHub Pages (ADR-0002). RFQ tidak disimpan; v1 Nuxt + Postgres dibangun setelah ACC (ADR-0001).

```
demo/
├── index.html            # halaman one-page
├── data/katalog.json     # data produk contoh
├── js/config.js          # nama perusahaan, WA, email, alamat, legalitas
├── js/rfq.js             # logika RFQ murni (diuji)
├── js/app.js             # komponen Alpine, hanya memanggil rfq.js
└── katalog-contoh.pdf    # dibuat oleh tools/buat_katalog_pdf.py
tests/rfq.test.js         # Vitest
```

## Menjalankan

```bash
npm install
npm run dev     # buka http://localhost:5173 (perlu server, ES module tidak jalan dari file://)
npm test        # Vitest
npm run pdf     # buat ulang katalog PDF setelah data katalog berubah (perlu Python + reportlab)
```

## Mengganti data contoh dengan data klien

1. `demo/js/config.js`: nama, nomor WhatsApp (format `62…`), email, alamat, legalitas. Set `modeDemo: false` untuk menyembunyikan label "contoh".
2. `demo/data/katalog.json`: produk. `status` bernilai `ready`, `partai`, atau `indent`.
3. `npm run pdf` untuk memperbarui katalog PDF.

## Deploy

Push ke `main` → GitHub Actions menjalankan tes lalu mempublikasikan folder `demo/` ke GitHub Pages. Aktifkan sekali di **Settings › Pages › Source: GitHub Actions**.
