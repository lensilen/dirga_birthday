# Pocket Story Template

Template website cerita interaktif berbentuk ponsel. Tidak memakai framework atau proses build; cukup buka melalui server statis.

## Mulai cepat

1. Jalankan server dari folder proyek:

   ```powershell
   python -m http.server 4173 --directory dist
   ```

2. Buka `http://localhost:4173`.
3. PIN cerita adalah `1117`.

Jangan membuka `index.html` langsung dengan `file://` karena beberapa browser membatasi penyimpanan lokal pada file lokal.

## File yang diedit

- `dist/story.js` — nama, PIN, warna, daftar aplikasi, chat, cabang cerita, foto, dan catatan.
- `dist/styles.css` — bentuk visual, ukuran, font, dan animasi.
- `dist/app.js` — mesin aplikasi. Biasanya tidak perlu disentuh saat hanya mengganti cerita.
- `dist/assets/` — simpan foto, audio, atau video milikmu.

## Mengganti foto

Taruh file, misalnya `dist/assets/toko-buku.jpg`, kemudian ubah entri foto di `story.js`:

```js
{
  id: "bookshop",
  title: "Toko buku di ujung gang",
  caption: "Dikirim Naya · malam ini",
  src: "assets/toko-buku.jpg",
  color: "linear-gradient(145deg, #fb7185, #7c3aed)"
}
```

Jika `src` dikosongkan, template otomatis menggunakan placeholder gradasi.

## Audit sebelum publikasi

Jalankan audit struktur cerita, referensi aset, ID trigger, dan syntax JavaScript:

```powershell
node scripts/audit.mjs
```

## Membuat percakapan WhatsApp bertahap

Isi `chatScripts` di `dist/story.js`. Pesan `mc` menjadi draft yang harus dikirim pemain, sedangkan pesan `them` menampilkan indikator mengetik sebelum masuk ke chat:

```js
chatScripts: {
  dirga: {
    steps: [
      { type: "mc", text: "Can I ask u something...", waitBefore: 500 },
      { type: "them", text: "Of course", waitBefore: 900, typingMs: 800 },
      { type: "mc", text: "Kamu emang begini ke semua orang?", waitBefore: 600 },
      { type: "missed_call", waitBefore: 1800 },
      { type: "them", text: "Sorry", waitBefore: 1200, typingMs: 1500 }
    ]
  }
}
```

- `waitBefore` mengatur jeda sebelum draft, indikator mengetik, atau missed call muncul.
- `typingMs` mengatur lamanya kontak terlihat sedang mengetik.
- `1000` milidetik sama dengan satu detik.
- Jangan menambahkan tanda titik jika gaya chat karakternya memang kasual.

## Mengatur pesan bertimer

`timeline.afterMs` dihitung sejak ponsel berhasil dibuka:

```js
{
  id: "pesan_unik",
  afterMs: 5000,
  threadId: "naya",
  text: "Pesan muncul setelah lima detik.",
  notificationTitle: "Naya",
  activateNode: "scene_a"
}
```

Gunakan ID event yang selalu unik agar progress tersimpan dengan benar.

## Menghapus progress

Buka aplikasi **Pengaturan** di dalam template, lalu tekan **Reset seluruh cerita**. Progress disimpan hanya di `localStorage` browser dan tidak dikirim ke server.

## Publikasi

Karena proyek ini buildless, folder yang perlu dipublikasikan hanyalah `dist`. Bisa digunakan di Cloudflare Pages, GitHub Pages, Netlify, Vercel static hosting, atau server web biasa.

Gunakan foto, musik, merek, dan karakter yang kamu miliki atau sudah mendapat izin untuk digunakan.
