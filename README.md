# K-Trip

Panduan mobile Korea Autumn Escape untuk 29 November–5 Desember 2026.

## Jalankan secara lokal

Dari direktori proyek:

```sh
python3 -m http.server 4173
```

Buka `http://localhost:4173`. Situs ini statis dan dapat dihosting langsung dari direktori proyek. Checklist serta catatan disimpan lewat localStorage pada browser dan alamat situs yang dipakai peserta.

## Perbarui isi trip

- `data.js` memuat itinerary tujuh hari, daftar persiapan, panduan Korea, dan tautan. Isi dirangkum dari PDF itinerary dan informasi umum Pergi.com. Panduan peta, transportasi, dan bantuan darurat adalah tambahan.
- `app.js` merender kelima halaman dan bagian kontak trip. Tanda — berarti informasi belum tersedia.
- Pertahankan ID item checklist saat mengubah teks atau urutan supaya status peserta tetap terbaca.
