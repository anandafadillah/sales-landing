import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs@3.14.9/dist/module.esm.js';
import { config } from './config.js';
import {
  tambahItem,
  ubahJumlah,
  hapusItem,
  cekJumlah,
  validasiRfq,
  susunPesan,
  urlWhatsApp,
  urlWhatsAppRfq,
  urlEmail,
  cariProduk,
} from './rfq.js';

// Label & warna Status Suplai, dipakai tabel desktop dan kartu HP
const STATUS_SUPLAI = {
  ready: { label: 'Ready stock gudang', kelas: 'bg-emerald-50 text-emerald-800' },
  partai: { label: 'Siap kirim partai besar', kelas: 'bg-[#EEF3FF] text-[#1E3A8A]' },
  indent: { label: 'Indent', kelas: 'bg-orange-50 text-orange-800' },
};

// Urutan fokus saat ada error: ikuti urutan field di form
const URUTAN_ERROR = [
  ['daftar', 'permintaan-judul'],
  ['tipe', 'f-tipe-perusahaan'],
  ['perusahaan', 'f-pt'],
  ['nama', 'f-nama'],
  ['kota', 'f-kota'],
  ['kontak', 'f-wa'],
  ['wa', 'f-wa'],
  ['email', 'f-email'],
];

Alpine.data('landing', () => ({
  config,
  produk: [],
  statusMuat: 'memuat',
  kategoriList: ['Semua', 'Besi & baja', 'Semen & mortar', 'Pipa & fitting', 'Atap & rangka', 'Kayu & panel'],
  kata: '',
  kategori: 'Semua',
  daftar: [],
  identitas: { tipe: 'perusahaan', perusahaan: '', nama: '', kota: '', wa: '', email: '' },
  sudahCobaKirim: false,
  faqBuka: 0,
  pengumuman: '',

  async init() {
    try {
      const res = await fetch('data/katalog.json');
      if (!res.ok) throw new Error(res.status);
      this.produk = await res.json();
      this.statusMuat = 'siap';
    } catch {
      this.statusMuat = 'gagal';
    }
  },

  // ---------- Katalog ----------
  get hasil() {
    return cariProduk(this.produk, { kata: this.kata, kategori: this.kategori });
  },
  statusSuplai(p) {
    return STATUS_SUPLAI[p.status];
  },
  sudahAda(id) {
    return this.daftar.some((i) => i.id === id);
  },
  tambah(p) {
    if (this.sudahAda(p.id)) return;
    this.daftar = tambahItem(this.daftar, p);
    this.pengumuman = `${p.nama} ditambahkan. ${this.daftar.length} item di permintaan.`;
  },

  // ---------- Daftar permintaan ----------
  ubah(id, jumlah) {
    this.daftar = ubahJumlah(this.daftar, id, jumlah);
  },
  hapus(item) {
    this.daftar = hapusItem(this.daftar, item.id);
    this.pengumuman = `${item.nama} dihapus. ${this.daftar.length} item di permintaan.`;
  },
  cek(item) {
    return cekJumlah(item.jumlah, item.moq);
  },
  lanjutKeForm() {
    document.getElementById('form').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('f-tipe-perusahaan').focus({ preventScroll: true });
  },

  // ---------- Form & kirim ----------
  get errors() {
    return this.sudahCobaKirim ? validasiRfq(this.daftar, this.identitas) : {};
  },
  get pesan() {
    return susunPesan(this.daftar, this.identitas, config);
  },
  siapKirim() {
    this.sudahCobaKirim = true;
    const err = validasiRfq(this.daftar, this.identitas);
    const pertama = URUTAN_ERROR.find(([key]) => err[key]);
    if (!pertama) return true;
    this.$nextTick(() => document.getElementById(pertama[1])?.focus());
    return false;
  },
  kirimWhatsApp() {
    if (this.siapKirim()) window.open(urlWhatsAppRfq(this.daftar, this.identitas, config), '_blank', 'noopener');
  },
  kirimEmail() {
    if (this.siapKirim()) window.location.href = urlEmail(this.daftar, this.identitas, config);
  },
  urlTanyaSales(kata = '') {
    const teks = kata.trim()
      ? `Halo tim sales ${config.namaPerusahaan}, saya mencari "${kata.trim()}". Apakah tersedia?`
      : `Halo tim sales ${config.namaPerusahaan}, saya ingin tanya harga dan stok.`;
    return urlWhatsApp(config.waSales, teks);
  },
}));

Alpine.start();
