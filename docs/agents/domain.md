# Dokumen domain

Cara skill engineering membaca dokumentasi domain repo ini saat menjelajah kode.

## Baca ini dulu sebelum menjelajah

- **`CONTEXT.md`** di root repo, atau
- **`CONTEXT-MAP.md`** di root repo kalau ada: isinya menunjuk ke satu `CONTEXT.md` per konteks. Baca yang relevan dengan topik.
- **`docs/adr/`**: baca ADR yang menyentuh area yang akan dikerjakan. Di repo multi-context, cek juga `src/<konteks>/docs/adr/` untuk keputusan khusus konteks itu.

Kalau file-file ini belum ada, **lanjut saja tanpa komentar**. Jangan menandai ketiadaannya dan jangan menyarankan membuatnya di awal. Skill `/domain-modeling` (lewat `/grill-with-docs` dan `/improve-codebase-architecture`) akan membuatnya saat istilah atau keputusan benar-benar disepakati.

## Struktur file

Repo single-context (kebanyakan repo, termasuk repo ini):

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-rfq-disimpan-di-database.md
│   └── 0002-katalog-dari-spreadsheet.md
└── src/
```

Repo multi-context (ditandai adanya `CONTEXT-MAP.md` di root):

```
/
├── CONTEXT-MAP.md
├── docs/adr/                          ← keputusan level sistem
└── src/
    ├── katalog/
    │   ├── CONTEXT.md
    │   └── docs/adr/                  ← keputusan khusus konteks
    └── rfq/
        ├── CONTEXT.md
        └── docs/adr/
```

## Pakai istilah dari glosarium

Saat output-mu menyebut konsep domain (di judul issue, usulan refactor, hipotesis, nama test), pakai istilah persis seperti yang didefinisikan di `CONTEXT.md`. Jangan bergeser ke sinonim yang sengaja dihindari glosarium.

Kalau konsep yang kamu butuhkan belum ada di glosarium, itu tanda: kamu sedang mengarang istilah yang tidak dipakai proyek (pikir ulang), atau memang ada celah (catat untuk `/domain-modeling`).

## Tandai konflik dengan ADR

Kalau output-mu bertentangan dengan ADR yang sudah ada, sebutkan terang-terangan, jangan diam-diam ditimpa:

> _Bertentangan dengan ADR-0001 (RFQ disimpan di database), tapi layak dibuka lagi karena…_
