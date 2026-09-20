# 🚀 Portofolio & Layanan Interaktif Accessible Berbasis HTML5 dan Modern CSS

> **Tugas Mandiri Mahasiswa (Individual Assignment) - PPW 2026 Week 2**  
> **Repositori**: `ppw-2026-week2-12S24018`

---

## 👨‍🎓 Identitas Mahasiswa

| Parameter | Data Mahasiswa |
|---|---|
| **Nama Lengkap** | Kelvin Yohanes Putra |
| **NIM** | 12S24018 |
| **Program Studi** | Sistem Informasi |
| **Mata Kuliah** | Pengembangan Pasar Web (PPW 2026) |
| **Institusi** | Institut Teknologi Del |

---

## 📋 Deskripsi Singkat Proyek

Aplikasi web portofolio profil profesional tunggal (*Single Page Showcase Webpage*) ini dirancang untuk menyajikan identitas akademik, tabel rekapitulasi capaian dan proyek Sistem Informasi, galeri keahlian terstruktur, serta formulir pemesanan layanan konsultasi IT resmi. Webpage ini dibangun dengan mengutamakan **estetika modern, kepatuhan struktur semantik HTML5, responsivitas multi-perangkat, serta standar aksesibilitas web tinggi (WCAG 2.2 Level AA)**.

---

## ✨ Fitur Utama & Kepatuhan Spesifikasi Teknis (Checklist Requirements)

### 1. 🏗️ Struktur Semantik HTML5 (Bobot 20%)
Dikembangkan sepenuhnya menggunakan tag semantik murni HTML5 tanpa pembungkus `<div>` tanpa makna:
- **`<header>`**: Memuat identitas brand logo "Kelvin Yohanes Putra" dan tombol navigasi utama.
- **`<nav>`**: Navigasi utama dengan aria-label dan indikator link aktif.
- **`<main>`**: Pembungkus utama seluruh seksi halaman dengan ID landas skip-link.
- **Minimal 3 `<section>`**:
  - `section#tentang-saya`: Biografi singkat dan latar belakang Sistem Informasi.
  - `section#portofolio-karya`: Rekapitulasi capaian proyek akademik.
  - `section#formulir-layanan`: Formulir interaktif pemesanan layanan.
- **`<aside>`**: Bilah samping memuat ringkasan identitas akademik (NIM 12S24018), status ketersediaan proyek, dan standar WCAG.
- **`<footer>`**: Hak cipta, identitas mata kuliah, dan metadata kampus.

### 2. 📊 Penyajian Data Tabular & Lists (Bobot 15%)
- **Tabel Data Semantik Lengkap**: Memuat elemen `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, serta atribut `scope="col"` pada `<th>` header dan `scope="row"` pada baris data untuk pembaca layar (screen reader).
- **Dua Jenis HTML Lists**:
  - Unordered List (`<ul>`): Galeri Keahlian Teknis (BPMN, SQL, UI/UX, Web Dev, Audit IT).
  - Ordered List (`<ol>`): Alur Kerja Kerjasama Konsultasi (Pengisian formulir ➔ Analisis ➔ Perancangan ➔ Serah Terima).

### 3. 📝 Komponen Formulir Interaktif & Accessible (Bobot 20%)
- Dikelompokkan secara terstruktur dengan **2 blok `<fieldset>`** dan **`<legend>`**:
  1. *Informasi Identitas & Kontak Klien*
  2. *Detail Kebutuhan & Spesifikasi Layanan*
- Memuat **8 jenis tipe input control**:
  - `type="text"` (Nama Pemesan)
  - `type="email"` (Email Official)
  - `type="tel"` (Nomor WhatsApp / Telepon dengan pola regex `pattern`)
  - `type="number"` (Estimasi Target Durasi Proyek)
  - `type="radio"` (Kategori Utama Layanan Konsultasi)
  - `type="checkbox"` (Layanan Tambahan & Persetujuan Syarat)
  - `<select>` (Pilihan Tipe Skala Entitas Pemesan)
  - `<textarea>` (Deskripsi Detail Kebutuhan Proyek)
- Pasangan `<label for="...">` eksplisit untuk setiap input dan atribut validasi native (`required`, `min`, `max`, `pattern`).

### 4. 🎨 Estetika & Tata Letak CSS Modern (Bobot 25%)
- Berkas CSS eksternal `style.css`.
- Reset Universal Box Sizing (`* { box-sizing: border-box; margin: 0; padding: 0; }`).
- **Skema Warna 60-30-10 (WCAG 2.2 Level AA)**:
  - **60% Dominant Background**: Deep Slate Dark `#0b1329` & `#0f172a`.
  - **30% Secondary Surfaces**: Card Container `#1e293b`, Border `#334155`, Teks `#f8fafc` & `#94a3b8`.
  - **10% Accent CTAs**: Electric Cyan `#0ea5e9` & Emerald Accent `#10b981`.
- Tipografi modern **Google Font 'Plus Jakarta Sans'**.
- Tata letak berbasis **CSS Grid** & **CSS Flexbox**.
- Desain Responsif Penuh melalui Media Queries (`@media (max-width: 768px)` dan `@media (max-width: 480px)`).

### 5. 🌐 Pengelolaan Git & Deployment GitHub Pages (Bobot 20%)
- Kode dikelola menggunakan repositori publik GitHub `ppw-2026-week2-12S24018`.
- Siap dipublikasikan secara live di GitHub Pages.

---

## 📁 Struktur Berkas Proyek

```text
ppw-2026-week2-12S24018/
├── index.html        # Berkas utama struktur semantik HTML5 & WCAG 2.2 AA
├── style.css         # Styling CSS3 modern 
└── README.md         # Dokumentasi resmi proyek
```

---


## 🚀 Langkah Publikasi ke GitHub Pages

1. Pastikan seluruh perubahan kode telah di-commit dan push ke cabang `main` repositori GitHub:
   ```bash
   git add .
   git commit -m "Feat: Implementasi portofolio & formulir layanan accessible kelvin 12S24018"
   git push origin main
   ```
2. Masuk ke halaman repositori di GitHub: `https://github.com/KelvinMarpaung18/ppw-2026-week2-12S24018`.
3. Buka menu **Settings** ➔ **Pages**.
4. Pada bagian **Build and deployment**, pilih **Source**: `Deploy from a branch`.
5. Pada pilihan **Branch**, pilih `main` dan folder `/ (root)`, lalu klik **Save**.
6. Tunggu beberapa saat hingga tautan GitHub Pages diterbitkan secara otomatis (misal: `https://kelvinmarpaung18.github.io/ppw-2026-week2-12S24018/`).

---


