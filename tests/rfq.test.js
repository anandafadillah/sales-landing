import { describe, it, expect } from 'vitest';
import {
  tambahItem,
  ubahJumlah,
  hapusItem,
  cekJumlah,
  validasiIdentitas,
  validasiRfq,
  susunPesan,
  urlWhatsApp,
  urlEmail,
  cariProduk,
} from '../demo/js/rfq.js';

const besi = { id: 'besi', nama: 'Besi beton ulir D13', spek: 'BjTS 420B, panjang 12 m', kategori: 'Besi & baja', moq: 100, satuan: 'batang' };
const pipa = { id: 'pipa', nama: 'Pipa PVC AW 3 inci', spek: 'Panjang 4 m', kategori: 'Pipa & fitting', moq: 50, satuan: 'batang' };
const config = { namaPerusahaan: 'Sentosa Material Nusantara', waSales: '6281200000000', emailSales: 'sales@contoh.id' };

const identitasPerusahaan = {
  tipe: 'perusahaan',
  perusahaan: 'PT Contoh Karya',
  nama: 'Budi Santoso',
  kota: 'Bekasi',
  wa: '0812 3456 7890',
  email: '',
};

describe('daftar permintaan', () => {
  it('menambah produk dengan jumlah awal sama dengan MOQ', () => {
    const daftar = tambahItem([], besi);
    expect(daftar).toHaveLength(1);
    expect(daftar[0]).toMatchObject({ id: 'besi', nama: besi.nama, jumlah: '100', moq: 100, satuan: 'batang' });
  });

  it('tidak membuat item ganda untuk produk yang sama', () => {
    const daftar = tambahItem(tambahItem([], besi), besi);
    expect(daftar).toHaveLength(1);
  });

  it('tidak mengubah daftar asli (immutable)', () => {
    const awal = [];
    tambahItem(awal, besi);
    expect(awal).toHaveLength(0);
  });

  it('mengubah jumlah satu item', () => {
    const daftar = ubahJumlah(tambahItem(tambahItem([], besi), pipa), 'pipa', '30');
    expect(daftar.find((i) => i.id === 'pipa').jumlah).toBe('30');
    expect(daftar.find((i) => i.id === 'besi').jumlah).toBe('100');
  });

  it('menghapus item', () => {
    const daftar = hapusItem(tambahItem(tambahItem([], besi), pipa), 'besi');
    expect(daftar.map((i) => i.id)).toEqual(['pipa']);
  });
});

describe('cekJumlah', () => {
  it.each([
    ['', 'Isi jumlah yang dibutuhkan.'],
    ['   ', 'Isi jumlah yang dibutuhkan.'],
    ['0', 'Jumlah harus lebih dari 0.'],
    ['-5', 'Jumlah harus lebih dari 0.'],
    ['2,5', 'Gunakan angka bulat, misal 3.'],
    ['2.5', 'Gunakan angka bulat, misal 3.'],
    ['abc', 'Gunakan angka bulat, misal 3.'],
  ])('menolak "%s"', (jumlah, pesan) => {
    expect(cekJumlah(jumlah, 100).error).toBe(pesan);
  });

  it('menerima jumlah di atas MOQ tanpa peringatan', () => {
    expect(cekJumlah('150', 100)).toEqual({ error: null, diBawahMoq: false });
  });

  it('jumlah sama dengan MOQ tidak dianggap di bawah MOQ', () => {
    expect(cekJumlah('100', 100).diBawahMoq).toBe(false);
  });

  it('jumlah di bawah MOQ tetap valid tapi ditandai', () => {
    expect(cekJumlah('30', 50)).toEqual({ error: null, diBawahMoq: true });
  });
});

describe('validasiIdentitas', () => {
  it('lolos untuk perusahaan yang lengkap', () => {
    expect(validasiIdentitas(identitasPerusahaan)).toEqual({});
  });

  it('nama perusahaan wajib untuk tipe perusahaan', () => {
    expect(validasiIdentitas({ ...identitasPerusahaan, perusahaan: ' ' })).toHaveProperty('perusahaan');
  });

  it('nama perusahaan tidak wajib untuk perorangan', () => {
    const err = validasiIdentitas({ ...identitasPerusahaan, tipe: 'perorangan', perusahaan: '' });
    expect(err).toEqual({});
  });

  it('tipe pembeli wajib dipilih', () => {
    expect(validasiIdentitas({ ...identitasPerusahaan, tipe: '' })).toHaveProperty('tipe');
  });

  it('nama kontak dan kota wajib', () => {
    const err = validasiIdentitas({ ...identitasPerusahaan, nama: '', kota: '' });
    expect(err.nama).toBeTruthy();
    expect(err.kota).toBe('Isi kota tujuan supaya ongkos kirim bisa dihitung.');
  });

  it('kontak lolos bila hanya email yang terisi', () => {
    expect(validasiIdentitas({ ...identitasPerusahaan, wa: '', email: 'budi@contoh.co.id' })).toEqual({});
  });

  it('kontak gagal bila WhatsApp dan email kosong', () => {
    expect(validasiIdentitas({ ...identitasPerusahaan, wa: '', email: '' })).toHaveProperty('kontak');
  });

  it('nomor WhatsApp yang terlalu pendek ditolak', () => {
    expect(validasiIdentitas({ ...identitasPerusahaan, wa: '0812' })).toHaveProperty('wa');
  });

  it('format email yang salah ditolak', () => {
    expect(validasiIdentitas({ ...identitasPerusahaan, email: 'budi@' })).toHaveProperty('email');
  });
});

describe('validasiRfq', () => {
  it('daftar kosong tidak bisa dikirim', () => {
    expect(validasiRfq([], identitasPerusahaan).daftar).toBe('Pilih minimal satu produk dari katalog.');
  });

  it('jumlah tidak valid memblokir pengiriman', () => {
    const daftar = ubahJumlah(tambahItem([], besi), 'besi', '0');
    expect(validasiRfq(daftar, identitasPerusahaan)).toHaveProperty('daftar');
  });

  it('di bawah MOQ tidak memblokir pengiriman', () => {
    const daftar = ubahJumlah(tambahItem([], besi), 'besi', '10');
    expect(validasiRfq(daftar, identitasPerusahaan)).toEqual({});
  });
});

describe('susunPesan', () => {
  const daftar = ubahJumlah(tambahItem(tambahItem([], besi), pipa), 'pipa', '30');

  it('memuat identitas dan daftar item bernomor', () => {
    const pesan = susunPesan(daftar, identitasPerusahaan, config);
    expect(pesan).toBe(
      [
        'Halo tim sales Sentosa Material Nusantara,',
        'saya ingin meminta penawaran.',
        '',
        'Nama   : Budi Santoso',
        'Pembeli: Perusahaan — PT Contoh Karya',
        'Kota   : Bekasi',
        'Kontak : 0812 3456 7890',
        '',
        '1. Besi beton ulir D13 (BjTS 420B, panjang 12 m) — 100 batang',
        '2. Pipa PVC AW 3 inci (Panjang 4 m) — 30 batang [di bawah MOQ]',
      ].join('\n'),
    );
  });

  it('perorangan tanpa nama perusahaan, kontak WA dan email digabung', () => {
    const pesan = susunPesan(daftar, { ...identitasPerusahaan, tipe: 'perorangan', perusahaan: 'abaikan', email: 'b@c.id' }, config);
    expect(pesan).toContain('Pembeli: Perorangan\n');
    expect(pesan).not.toContain('abaikan');
    expect(pesan).toContain('Kontak : 0812 3456 7890 / b@c.id');
  });

  it('field kosong ditulis sebagai tanda pisah', () => {
    const pesan = susunPesan(daftar, { ...identitasPerusahaan, kota: '' }, config);
    expect(pesan).toContain('Kota   : —');
  });
});

describe('urlWhatsApp', () => {
  it('memakai nomor sales dan teks yang ter-encode', () => {
    const teks = 'Baris 1\nPipa Ø3 & elbow 2 × 3 — 10 batang';
    const url = urlWhatsApp(config.waSales, teks);
    expect(url.startsWith('https://wa.me/6281200000000?text=')).toBe(true);
    const encoded = url.split('?text=')[1];
    expect(encoded).not.toMatch(/[\s&]/);
    expect(decodeURIComponent(encoded)).toBe(teks);
  });
});

describe('urlEmail', () => {
  const daftar = tambahItem([], besi);

  it('subjek memakai nama perusahaan untuk perusahaan', () => {
    const url = urlEmail(daftar, identitasPerusahaan, config);
    const [alamat, query] = url.split('?');
    expect(alamat).toBe('mailto:sales@contoh.id');
    const params = new URLSearchParams(query.replace(/\+/g, '%2B'));
    expect(params.get('subject')).toBe('Permintaan penawaran — PT Contoh Karya');
    expect(params.get('body')).toBe(susunPesan(daftar, identitasPerusahaan, config).replace(/\n/g, '\r\n'));
  });

  it('subjek memakai nama kontak untuk perorangan', () => {
    const url = urlEmail(daftar, { ...identitasPerusahaan, tipe: 'perorangan' }, config);
    const subject = decodeURIComponent(url.match(/subject=([^&]*)/)[1]);
    expect(subject).toBe('Permintaan penawaran — Budi Santoso');
  });

  it('spasi di-encode sebagai %20, bukan +', () => {
    expect(urlEmail(daftar, identitasPerusahaan, config)).not.toContain('+');
  });
});

describe('cariProduk', () => {
  const produk = [besi, pipa, { ...pipa, id: 'pipa4', nama: 'Pipa PVC AW 4 inci', spek: 'Panjang 4 m' }];

  it('tanpa kata dan kategori Semua mengembalikan semua produk', () => {
    expect(cariProduk(produk, { kata: '', kategori: 'Semua' })).toHaveLength(3);
  });

  it('mencari di nama tanpa membedakan huruf besar/kecil', () => {
    expect(cariProduk(produk, { kata: 'd13', kategori: 'Semua' }).map((p) => p.id)).toEqual(['besi']);
  });

  it('mencari di spesifikasi', () => {
    expect(cariProduk(produk, { kata: 'bjts', kategori: 'Semua' }).map((p) => p.id)).toEqual(['besi']);
  });

  it('pencarian dan kategori berlaku bersamaan', () => {
    expect(cariProduk(produk, { kata: '3 inci', kategori: 'Pipa & fitting' }).map((p) => p.id)).toEqual(['pipa']);
    expect(cariProduk(produk, { kata: '3 inci', kategori: 'Besi & baja' })).toEqual([]);
  });
});
