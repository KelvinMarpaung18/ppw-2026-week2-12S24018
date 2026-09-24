# 🚀 Modernisasi & Refactoring Portofolio Web Menggunakan Ekosistem Bootstrap 5.3 & Advanced Custom CSS

> **Mata Kuliah**: Pemrograman dan Pengujian Web (12S3101)  
> **Modul Praktikum**: Minggu 03 – Penguasaan CSS Lanjutan, CSS Selector Spesifisitas, dan Integrasi Bootstrap 5  
> **Dosen Pengampu**: Chandro Pardede, S.Kom., M.Sc.  
> **Tahun Akademik**: Semester Ganjil 2026/2027 • Institut Teknologi Del

---

## 👨‍🎓 Identitas Mahasiswa Pengembang

| Parameter | Data Mahasiswa |
|---|---|
| **Nama Lengkap** | Kelvin Yohanes Putra |
| **NIM** | 12S24018 |
| **Program Studi** | Sarjana Sistem Informasi  |
| **Kelas** | 13SI1 |
| **Fakultas** | Fakultas Informatika dan Teknik Elektro (FITE) |
| **Institusi** | Institut Teknologi Del |
| **Tautan Repositori** | [KelvinMarpaung18/ppw-2026-week2-12S24018](https://github.com/KelvinMarpaung18/ppw-2026-week2-12S24018) |
| **Tautan Publikasi Live Demo** | [https://kelvinmarpaung18.github.io/ppw-2026-week2-12S24018/](https://kelvinmarpaung18.github.io/ppw-2026-week2-12S24018/) |

---

## 📋 Deskripsi Ringkas Proyek

Proyek ini merupakan hasil **refactoring dan modernisasi menyeluruh** dari tugas mandiri Minggu 2 (Portofolio Semantik Murni) ke dalam arsitektur web modern berbasis **Bootstrap 5.3.3**, **Bootstrap Icons**, dan **Advanced CSS Custom Properties (Variables) & Overrides**. Seluruh komponen visual dibangun dengan mengutamakan standar responsivitas 12-kolom, interaktivitas modal dialog, modern floating form validation, serta kepatuhan aksesibilitas **WCAG 2.2 Level AA** tanpa penggunaan deklarasi `!important` serampangan.

---

## 📊 Tabel Komparasi Komprehensif: Sebelum vs Sesudah Integrasi Framework

Berikut adalah evaluasi transformasi arsitektur kode dan fungsionalitas visual antarmuka:

| Aspek Evaluasi | Sebelum Integrasi (Tugas Minggu 2) | Sesudah Integrasi Bootstrap 5 (Tugas Minggu 3) | Manfaat & Nilai Tambah |
|---|---|---|---|
| **Tata Letak (Layouting)** | CSS Grid & Flexbox manual murni dengan styling custom media queries | Grid 12-kolom responsif Bootstrap 5.3 (`container`, `row`, `col-12`, `col-lg-7`, `col-lg-5`, `row-cols-*`, `g-4`) | Layout jauh lebih adaptif, proporsional, dan bebas horizontal overflow di seluruh breakpoint ponsel hingga monitor lebar |
| **Sistem Navigasi (Navbar)** | Header statis dengan CSS flexbox sederhana tanpa mekanisme collapse mobile | `navbar sticky-top` dengan tombol hamburger `navbar-toggler` (`data-bs-toggle="collapse"`) responsif | Menu navigasi dapat melipat (*collapse*) secara mulus di layar smartphone tanpa hambatan (*zero console error*) |
| **Penyajian Portofolio** | Berbentuk tabel data statis tunggal | Kombinasi **Grid 4 Kartu Proyek Interaktif (`.card`)** + **Tabel Rekapitulasi Capaian Matakuliah** | Portofolio tersaji visual dan interaktif dengan banner tema, badge teknologi, dan deskripsi ringkas |
| **Detail Interaktif Proyek** | Tidak tersedia (hanya teks statis di dalam tabel) | Terintegrasi dengan **Bootstrap Modal Dialog (`.modal`)** individual untuk 4 proyek berbeda & modal sertifikat | Pengguna dapat melihat detail proyek, deliverables, tech stack, dan tautan repositori secara instan via pop-up accessible |
| **Komponen Formulir Layanan** | Formulir HTML standar dengan styling input manual | **Modern Floating Labels (`.form-floating`)**, **Input Groups Berikon (`bi-*`)**, Select Dropdown, dan Radio Cards | Pengalaman input data klien lebih intuitif, modern, hemat ruang, dan berstandar antarmuka industri |
| **Validasi Formulir** | Validasi dasar peramban bawaan (*native tooltip*) | **Validasi Visual Bootstrap 5 (`needs-validation`)** dengan feedback real-time (`.valid-feedback` & `.invalid-feedback`) | Memberikan umpan balik visual jelas (warna hijau/merah) sesuai status kelengkapan data form |
| **Arsitektur CSS & Theming** | CSS variabel standar terbatas pada warna dasar | **11 CSS Custom Properties pada `:root`**, kombinator relasional (`>`, `+`), pseudo-classes (`:focus-within`, `:nth-child()`), pseudo-elements (`::before`) | Pemeliharaan tema warna terpusat, animasi garis aksen mikro-interaksi saat hover, dan kalkulasi spesifisitas bersih (*zero `!important`*) |

---

## ✨ Kepatuhan Indikator Ketercapaian Modul Minggu 03

### 1. 🏗️ Fondasi Framework & Semantik HTML5 (Bobot 15%)
- Menghubungkan pustaka resmi **Bootstrap 5.3.3 CDN** (CSS & JavaScript Bundle dengan Popper).
- Menghubungkan paket ikon modern **Bootstrap Icons CDN**.
- Menjaga keutuhan hierarki tag semantik HTML5 murni: `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, dan `<footer>`.
- Berkas custom `style.css` dimuat tepat setelah Bootstrap CSS untuk penerapan *CSS Overrides* yang elegan.

### 2. 📱 Responsive Sticky Navbar & Hero Section (Bobot 20%)
- **Navbar Sticky-Top**: Menggunakan kelas `navbar navbar-expand-lg custom-navbar shadow-sm sticky-top` dengan logo identitas "KP Kelvin Yohanes Putra".
- **Hamburger Toggle**: Tombol burger interaktif membuka dan menutup menu di resolusi `< 992px` tanpa error JavaScript.
- **Hero Section 12-Kolom**:
  - Kolom teks (`col-12 col-lg-7`): Memuat headline personal, bio akademik, badge status ketersediaan, tombol CTA (*Call to Action*), dan kartu statistik mikro-interaksi (*Lab 1*).
  - Kolom visual (`col-12 col-lg-5`): Menampilkan avatar foto profil dengan indikator aktif online dan efek scale hover.

### 3. 🗂️ Grid Portofolio & Bootstrap Modal Dialog (Bobot 20%)
- Menampilkan minimal 4 buah kartu proyek (`.card`) dalam grid multi-perangkat (`row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-4 g-4`):
  1. **DelOlympic Competition Portal** (Web App PPW)
  2. **TobaSatSet Local Service Solution** (Technopreneur & Jasa Lokal)
  3. **SI Loket PT Parisma Jaya Trans Balige** (Enterprise System & BPMN 2.0)
  4. **Aplikasi Jadwal Imunisasi Anak Indonesia** (HealthTech UI/UX)
- Setiap kartu memiliki tombol **"Detail Proyek"** yang memicu Bootstrap Modal (`#modalDelOlympic`, `#modalTobaSatSet`, `#modalParismaJaya`, `#modalImunisasi`).
- Seksi **Sertifikat & Penghargaan** terintegrasi dengan lightbox modal interaktif untuk melihat dokumen sertifikat resolusi tinggi
### 4. 📝 Modernisasi Formulir Layanan (Bobot 15%)
- Dikelompokkan dengan tag `<fieldset>` dan `<legend>` semantik.
- **Floating Labels**: Digunakan pada field Nama Lengkap, Alamat Email, Nomor WhatsApp, Kategori Layanan, dan Textarea Deskripsi Proyek.
- **Input Groups Berikon**: Setiap field input dilengkapi ikon tematik (`bi-person-badge`, `bi-envelope-at`, `bi-whatsapp`, `bi-briefcase`, `bi-chat-left-text`).
- **Validasi Visual Terstandarisasi**: Menggunakan kelas Bootstrap `.needs-validation`, `.valid-feedback`, dan `.invalid-feedback` yang diaktivasi melalui JavaScript closure.

### 5. 🎨 Advanced Custom Overrides & Theming (Bobot 15%)
- Mendefinisikan **11 variabel CSS pada `:root`** (`--primary-brand`, `--primary-hover`, `--surface-bg`, `--bg-page`, `--bg-subtle`, `--bg-middle-stripe`, `--card-radius`, `--shadow-lift`, `--border-color`, `--text-primary`, `--text-secondary`).
- **Skema Warna Personal**: Nuansa *Ice Blue Cyan* (`#B9F3FC`, `#AEE2FF`, `#90C8EC`) dipadukan dengan aksen *Ocean Slate Blue* (`#0284c7`, `#0369a1`).
- **Mikro-Interaksi**: Animasi `transform: translateY(-6px)`, `box-shadow` lift, dan pseudo-element `::before` animasi garis aktif pada `.metric-card`.
- **Kalkulasi Spesifisitas Murni**: Zero deklarasi `!important` serampangan.

---

## 📁 Struktur Berkas Proyek

```text
ppw-2026-week2-12S24018/
├── index.html          # Struktur semantik HTML5, Bootstrap 5.3 Grid, Modals & Forms
├── style.css           # 11 CSS Variables :root, Advanced Selectors & Overrides
├── README.md           # Dokumentasi komprehensif & tabel komparasi sebelum vs sesudah
├── potoku.jpeg         # Foto profil avatar mahasiswa
├── sertif_bronze.png   # Aset dokumen sertifikat Bronze Medal PIN 2
├── sertif_emas.jpg     # Aset dokumen piagam Medali Emas POSI
├── sertif_ipb.png      # Aset dokumen sertifikat Peserta IPB University
└── sertif_dec.jpg      # Aset dokumen sertifikat Member Del English Club (DEC)
```

---

## 💻 Panduan Pengujian Lokal (Local Testing)

1. Buka repositori proyek pada Visual Studio Code.
2. Klik kanan pada berkas `index.html` dan pilih **Open with Live Server** (atau buka langsung di peramban Chrome/Edge/Firefox).
3. Buka **Chrome DevTools** (`F12` atau `Ctrl + Shift + I`):
   - Klik ikon **Toggle Device Toolbar** (`Ctrl + Shift + M`) untuk menguji responsivitas pada berbagai resolusi (*iPhone SE, iPad Air, 1080p Desktop*).
   - Klik tombol **Hamburger Navbar** untuk memastikan menu expand/collapse berjalan mulus.
   - Klik tombol **Detail Proyek** dan **Pratinjau Sertifikat** untuk menguji modal dialog.
   - Uji tombol submit pada formulir layanan untuk melihat animasi umpan balik validasi visual.

---
