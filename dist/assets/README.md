# Folder Aset Pocket Story

Taruh file gambar di folder yang sesuai. Gunakan nama file huruf kecil, tanpa spasi, dan pisahkan kata dengan tanda minus.

## Struktur

```text
assets/
├─ icons/apps/                 ikon aplikasi
├─ avatars/                    foto profil pemilik HP dan kontak
├─ wallpapers/                 wallpaper lock screen/home screen
├─ photos/gallery/             foto yang muncul di aplikasi Photos
├─ social/instagram/posts/     gambar post Instagram
├─ social/instagram/stories/   gambar Instagram Story
├─ social/x/posts/             gambar yang dilampirkan pada post X
├─ social/x/headers/           header profil X
└─ music/covers/               cover playlist, album, atau lagu
```

## Nama file yang disarankan

### Ikon aplikasi

Taruh di `icons/apps/`:

```text
messages.png
whatsapp.png
photos.png
notes.png
music.png
spotify.png
instagram.png
x.png
settings.png
camera.png
safari.png
phone.png
calendar.png
maps.png
```

Tidak perlu menyiapkan semuanya. Pilih `music.png` atau `spotify.png` sesuai aplikasi musik utama yang akan dipakai.

Ukuran ideal: 512 × 512 px, PNG atau WebP. File persegi biasa tidak masalah karena sudut membulat akan dibuat oleh website.

### Avatar

Taruh di `avatars/`:

```text
owner.jpg
contact-main.jpg
contact-02.jpg
contact-03.jpg
instagram-profile.jpg
x-profile.jpg
```

Satu foto boleh digunakan ulang untuk akun orang yang sama. Ukuran ideal: 512 × 512 px.

### Wallpaper

Taruh di `wallpapers/`:

```text
lock-screen.jpg
home-screen.jpg
```

`home-screen.jpg` opsional. Ukuran ideal sekitar 1290 × 2796 px atau gambar vertikal dengan rasio 9:19.5.

### Galeri

Taruh 10–15 foto di `photos/gallery/`:

```text
gallery-01.jpg
gallery-02.jpg
gallery-03.jpg
...
gallery-15.jpg
```

Campuran foto potret dan lanskap diperbolehkan. Sisi terpanjang sebaiknya minimal 1200 px.

### Instagram

Post ditempatkan di `social/instagram/posts/`:

```text
post-01.jpg
post-02.jpg
...
post-06.jpg
```

Story ditempatkan di `social/instagram/stories/`:

```text
story-01.jpg
story-02.jpg
story-03.jpg
```

Ukuran ideal post: 1080 × 1080 atau 1080 × 1350 px. Ukuran ideal Story: 1080 × 1920 px.

Foto dari galeri boleh disalin atau digunakan kembali sebagai post agar isi HP terasa saling terhubung.

### X

Gambar post ditempatkan di `social/x/posts/`:

```text
x-post-01.jpg
x-post-02.jpg
x-post-03.jpg
```

Header profil opsional ditempatkan di `social/x/headers/` dengan nama:

```text
x-header.jpg
```

Ukuran header yang disarankan: 1500 × 500 px.

### Music atau Spotify

Taruh cover di `music/covers/`:

```text
playlist-01.jpg
playlist-02.jpg
now-playing.jpg
```

Ukuran ideal: 1000 × 1000 px. Link playlist dan daftar lagu nantinya ditulis di `story.js`, bukan di folder aset.

## Catatan dan percakapan

Isi Notes, Messages, caption Instagram, post X, judul lagu, link playlist, jam, dan waktu muncul tidak memerlukan file terpisah. Semua teks tersebut nantinya dimasukkan ke `story.js`.

## Format file

- Gunakan JPG atau WebP untuk foto.
- Gunakan PNG atau WebP untuk ikon yang memerlukan transparansi.
- Hindari nama file dengan spasi, tanda kurung, atau karakter khusus.
- Jangan menghapus file `.gitkeep`; file tersebut hanya menjaga folder tetap terlihat sebelum diisi.
