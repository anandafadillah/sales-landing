// Modul logika Permintaan Penawaran (RFQ).
// JavaScript murni, tanpa DOM/Alpine, supaya bisa diuji dan dipakai ulang di v1.

const PESAN = {
  jumlahKosong: 'Isi jumlah yang dibutuhkan.',
  jumlahNol: 'Jumlah harus lebih dari 0.',
  jumlahBulat: 'Gunakan angka bulat, misal 3.',
  daftarKosong: 'Pilih minimal satu produk dari katalog.',
  daftarTidakValid: 'Perbaiki jumlah yang ditandai merah di daftar permintaan.',
};

const kosong = (s) => !String(s ?? '').trim();
const STRIP = '—';

// ---------- Daftar permintaan ----------

export function tambahItem(daftar, produk) {
  if (daftar.some((i) => i.id === produk.id)) return daftar;
  const { id, nama, spek, moq, satuan } = produk;
  return [...daftar, { id, nama, spek, moq, satuan, jumlah: String(moq) }];
}

export function ubahJumlah(daftar, id, jumlah) {
  return daftar.map((i) => (i.id === id ? { ...i, jumlah } : i));
}

export function hapusItem(daftar, id) {
  return daftar.filter((i) => i.id !== id);
}

export function cekJumlah(jumlah, moq) {
  const s = String(jumlah ?? '').trim();
  if (!s) return { error: PESAN.jumlahKosong, diBawahMoq: false };
  if (!/^-?\d+$/.test(s)) return { error: PESAN.jumlahBulat, diBawahMoq: false };
  const n = Number(s);
  if (n <= 0) return { error: PESAN.jumlahNol, diBawahMoq: false };
  return { error: null, diBawahMoq: n < moq };
}

// ---------- Validasi ----------

export function validasiIdentitas(id) {
  const err = {};
  if (!['perusahaan', 'perorangan'].includes(id.tipe)) err.tipe = 'Pilih atas nama perusahaan atau perorangan.';
  if (id.tipe === 'perusahaan' && kosong(id.perusahaan)) err.perusahaan = 'Isi nama perusahaan.';
  if (kosong(id.nama)) err.nama = 'Isi nama yang bisa dihubungi sales.';
  if (kosong(id.kota)) err.kota = 'Isi kota tujuan supaya ongkos kirim bisa dihitung.';

  if (kosong(id.wa) && kosong(id.email)) {
    err.kontak = 'Isi minimal salah satu: WhatsApp atau email.';
  } else {
    if (!kosong(id.wa) && id.wa.replace(/\D/g, '').length < 9) err.wa = 'Nomor WhatsApp terlalu pendek.';
    if (!kosong(id.email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id.email.trim())) err.email = 'Format email belum benar, misal nama@perusahaan.co.id.';
  }
  return err;
}

export function validasiRfq(daftar, identitas) {
  const err = validasiIdentitas(identitas);
  if (daftar.length === 0) err.daftar = PESAN.daftarKosong;
  else if (daftar.some((i) => cekJumlah(i.jumlah, i.moq).error)) err.daftar = PESAN.daftarTidakValid;
  return err;
}

// ---------- Pesan & URL ----------

function barisItem(item, n) {
  const { diBawahMoq } = cekJumlah(item.jumlah, item.moq);
  const spek = item.spek ? ` (${item.spek})` : '';
  const tanda = diBawahMoq ? ' [di bawah MOQ]' : '';
  return `${n}. ${item.nama}${spek} — ${String(item.jumlah).trim()} ${item.satuan}${tanda}`;
}

export function susunPesan(daftar, id, config) {
  const pembeli = id.tipe === 'perusahaan' ? `Perusahaan — ${id.perusahaan.trim()}` : 'Perorangan';
  const kontak = [id.wa, id.email].filter((v) => !kosong(v)).map((v) => v.trim()).join(' / ');
  const isi = (v) => (kosong(v) ? STRIP : v.trim());

  return [
    `Halo tim sales ${config.namaPerusahaan},`,
    'saya ingin meminta penawaran.',
    '',
    `Nama   : ${isi(id.nama)}`,
    `Pembeli: ${pembeli}`,
    `Kota   : ${isi(id.kota)}`,
    `Kontak : ${kontak || STRIP}`,
    '',
    ...daftar.map((item, i) => barisItem(item, i + 1)),
  ].join('\n');
}

export function urlWhatsApp(nomor, teks) {
  return `https://wa.me/${nomor}?text=${encodeURIComponent(teks)}`;
}

export function urlWhatsAppRfq(daftar, id, config) {
  return urlWhatsApp(config.waSales, susunPesan(daftar, id, config));
}

export function urlEmail(daftar, id, config) {
  const atasNama = id.tipe === 'perusahaan' ? id.perusahaan.trim() : id.nama.trim();
  const subject = `Permintaan penawaran — ${atasNama}`;
  // RFC 6068: baris baru di mailto memakai CRLF
  const body = susunPesan(daftar, id, config).replace(/\n/g, '\r\n');
  return `mailto:${config.emailSales}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// ---------- Katalog ----------

export function cariProduk(produk, { kata, kategori }) {
  const q = String(kata ?? '').trim().toLowerCase();
  return produk.filter(
    (p) =>
      (kategori === 'Semua' || p.kategori === kategori) &&
      (!q || `${p.nama} ${p.spek}`.toLowerCase().includes(q)),
  );
}
