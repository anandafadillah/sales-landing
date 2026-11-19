# Issue tracker: Markdown lokal

Issue dan spesifikasi repo ini disimpan sebagai file markdown di `.scratch/`.

## Aturan

- Satu fitur satu folder: `.scratch/<slug-fitur>/`
- Spesifikasi fitur ada di `.scratch/<slug-fitur>/spec.md`
- Tiket implementasi dibuat satu file per tiket di `.scratch/<slug-fitur>/issues/<NN>-<slug>.md`, nomor mulai dari `01`. Jangan digabung jadi satu file tiket.
- Status triage dicatat lewat baris `Status:` di bagian atas tiap file issue (lihat `triage-labels.md` untuk nama statusnya)
- Komentar dan riwayat diskusi ditambahkan di bagian bawah file, di bawah heading `## Comments`

## Saat skill bilang "publish ke issue tracker"

Buat file baru di `.scratch/<slug-fitur>/` (buat foldernya kalau belum ada).

## Saat skill bilang "ambil tiket terkait"

Baca file di path yang dirujuk. Biasanya user langsung memberi path atau nomor issue-nya.

## Operasi wayfinding

Dipakai oleh `/wayfinder`. **Map** adalah satu file, dengan satu file **child** per tiket.

- **Map**: `.scratch/<effort>/map.md` (berisi bagian Notes / Decisions-so-far / Fog).
- **Tiket child**: `.scratch/<effort>/issues/NN-<slug>.md`, nomor mulai dari `01`, isinya pertanyaan yang harus dijawab. Baris `Type:` mencatat jenis tiket (`research`/`prototype`/`grilling`/`task`); baris `Status:` mencatat `claimed`/`resolved`.
- **Blocking**: baris `Blocked by: NN, NN` di bagian atas. Tiket dianggap tidak terblokir kalau semua file yang disebut sudah `resolved`.
- **Frontier**: cari di `.scratch/<effort>/issues/` file yang masih terbuka, tidak terblokir, dan belum di-claim; nomor terkecil didahulukan.
- **Claim**: ubah jadi `Status: claimed` dan simpan sebelum mulai kerja.
- **Resolve**: tulis jawabannya di bawah heading `## Answer`, ubah jadi `Status: resolved`, lalu tambahkan ringkasan + link ke bagian Decisions-so-far di `map.md`.
