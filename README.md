# Film Sineas

Aplikasi penjelajah film: lihat film yang sedang ramai, saring berdasarkan genre, cari judul, tonton trailer, dan simpan film ke watchlist. Dibangun dengan React dan data dari TMDB API.

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0F172A?logo=tailwindcss&logoColor=38BDF8)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white)
![TMDB API](https://img.shields.io/badge/TMDB_API-01B4E4)

**Demo:** https://filmsineas.netlify.app

<!--
Tambahkan tangkapan layar setelah kamu menyimpannya di docs/screenshots/, lalu hapus tanda komentar ini.

## Tampilan

| Home | Detail film |
| --- | --- |
| ![Home](docs/screenshots/home.png) | ![Detail film](docs/screenshots/detail.png) |
-->

## Fitur

- **Home:** hero film trending yang berganti otomatis (berhenti saat kursor di atasnya) dan baris Popular now, Now playing, Top rated, serta Coming soon
- **Browse:** filter genre, pilihan urutan (terpopuler, rating tertinggi, terbaru), dan tombol *Muat lebih banyak*. Filter tersimpan di URL, jadi bisa dibagikan lewat tautan
- **Pencarian:** cari judul dari navbar, hasil berhalaman
- **Detail film:** sinopsis, genre, sutradara, pemeran, trailer YouTube dalam jendela modal, dan film serupa
- **Watchlist:** simpan film dengan satu klik. Tersimpan di `localStorage`, dan jumlahnya tampil di navbar
- **Kondisi lengkap:** skeleton saat memuat, pesan error spesifik dengan tombol *Coba lagi*, tampilan data kosong, dan halaman 404
- **Responsif dan mudah diakses:** nyaman di HP dan desktop, bisa dioperasikan dengan keyboard, dengan skor Lighthouse Accessibility 100 pada halaman Home

## Teknologi

- React dengan Vite
- Tailwind CSS v4
- React Router
- Lucide React (ikon)
- TMDB API sebagai sumber data

## Hal yang saya pelajari

- **Konsumsi REST API:** satu fungsi `request()` yang menangani key, parameter, dan pengecekan `response.ok`, dengan error khusus (`ApiError`) yang membawa jenis kegagalan, sehingga tiap kasus (jaringan putus, key salah, data tidak ada) mendapat pesan yang tepat
- **Custom hook:** `useFetch` dan `usePaginatedMovies` merangkum logika loading, error, dan penumpukan data berhalaman
- **Mencegah race condition:** request lama dibatalkan dengan `AbortController` saat pengguna pindah halaman atau mengganti filter
- **State di URL:** genre, urutan, dan kata pencarian disimpan di query string, sehingga tombol Back dan refresh bekerja sebagaimana mestinya
- **Context API dan `localStorage`:** satu sumber data watchlist yang dipakai banyak komponen, dengan pembacaan data yang aman jika isi penyimpanan rusak
- **Aksesibilitas dasar:** label pada kontrol, `aria-label` pada tombol ikon, elemen `<dialog>` bawaan untuk modal trailer, dan penanda landmark

## Struktur project

```
src/
├─ lib/tmdb.js               semua request ke TMDB dan helper format
├─ hooks/
│  ├─ useFetch.js            ambil data, loading, error, dan pembatalan request
│  └─ usePaginatedMovies.js  daftar berhalaman untuk "Muat lebih banyak"
├─ context/
│  └─ WatchlistContext.jsx   state watchlist global dan penyimpanan lokal
├─ components/               Layout, Hero, MovieRow, MovieCard, TrailerModal, dll.
└─ pages/                    Home, Browse, Search, MovieDetail, Watchlist, About, NotFound
```

## Menjalankan di komputer

Prasyarat: Node.js 20.19 ke atas (atau 22.12 ke atas) dan API Key (v3) gratis dari [themoviedb.org](https://www.themoviedb.org/).

```bash
git clone https://github.com/raihanamar0810/film-sineas.git
cd film-sineas
npm install
```

Buat file `.env` di folder paling luar:

```
VITE_TMDB_API_KEY=isi_dengan_api_key_kamu
```

Lalu jalankan:

```bash
npm run dev
```

Buka `http://localhost:5173`. Untuk membuat versi produksi, gunakan `npm run build`, lalu `npm run preview`.

> Jika data tidak muncul padahal API key benar, jaringanmu mungkin memblokir TMDB. Coba ganti DNS atau gunakan VPN.

## Deploy

Situs di-deploy ke Netlify secara manual: folder `dist` hasil `npm run build` diunggah ke Netlify. File `public/_redirects` memastikan alamat seperti `/movie/27205` tetap berfungsi saat di-refresh. API key dibaca dari file `.env` lokal saat proses build dan tidak tersimpan di repositori.

Catatan: pada aplikasi frontend murni, API key terlihat di browser. Itu wajar untuk key TMDB gratis yang hanya membaca data publik, dan file `.env` tidak ikut tersimpan di repositori.

## Atribusi

<img src="public/tmdb-logo.svg" alt="Logo TMDB" height="20">

This product uses the TMDB API but is not endorsed or certified by TMDB.

Data film dan gambar berasal dari TMDB. Poster dan trailer adalah milik pemegang haknya masing-masing, dan trailer diputar lewat YouTube. Project ini dibuat untuk belajar dan portofolio, tidak dikomersialkan, dan tidak berafiliasi dengan TMDB.

## Pembuat

Dibuat oleh [raihanamar0810](https://github.com/raihanamar0810).