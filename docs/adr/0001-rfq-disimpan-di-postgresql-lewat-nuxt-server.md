---
status: proposed (berlaku untuk v1 Nuxt, setelah klien ACC demo)
---

# RFQ disimpan di PostgreSQL lewat Nuxt server API + Drizzle

Demo dibangun supaya bisa langsung tumbuh jadi v1, dan metrik suksesnya adalah jumlah RFQ masuk, jadi setiap RFQ harus tersimpan sebelum WhatsApp/email dibuka; tanpa penyimpanan, jumlahnya hanya bisa ditebak dari klik. Kami memakai PostgreSQL, diakses langsung dari Nuxt server API (Nitro) dengan Drizzle ORM, sehingga frontend dan API ada di satu codebase.

Aplikasi di-deploy ke Vercel, yang tidak menjalankan Docker. Karena itu PostgreSQL di Docker hanya dipakai untuk development lokal, dan deploy memakai Neon (free plan). Keduanya Postgres biasa yang diakses lewat connection string (`DATABASE_URL`), jadi pindah penyedia cukup dengan ganti variabel itu.

## Considered Options

- **Hanya deep link WA/email tanpa backend**: ditolak karena RFQ tidak bisa dihitung atau dilacak.
- **Supabase**: ditolak demi menghindari lock-in ke fitur di luar Postgres.
- **Backend terpisah (Laravel/Express)**: ditolak karena menambah repo dan deploy kedua untuk kebutuhan yang masih kecil.
- **Prisma**: ditolak karena lebih berat dan butuh langkah generate; Drizzle lebih dekat ke SQL.
- **Postgres di VPS sendiri**: ditolak karena backup dan keamanan harus diurus sendiri, sementara Neon gratis.
