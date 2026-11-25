---
name: stock-metadata
description: >-
  Generate and validate Adobe Stock metadata (Title, Keywords, Category,
  Releases, Generative-AI flag) for rendered stock assets and export a
  copy-paste-ready metadata.csv. Use after rendering clips/images, or whenever
  the user needs Adobe Stock titles/keywords/categories, a metadata CSV, or a
  pre-upload validation pass. Enforces Adobe limits (Title <=70 chars,
  Keywords <=50, one of 21 categories).
---

# stock-metadata

Menghasilkan metadata siap-upload untuk **Adobe Stock Contributor** dari aset
hasil render (video Remotion / gambar), lalu mengekspor `metadata.csv` yang
tinggal di-copy-paste ke portal contributor.

> Adobe Stock **tidak punya API/SFTP upload** untuk contributor. File ini hanya
> menyiapkan metadata. Upload tetap manual di `contributor.stock.adobe.com`
> (bulk upload + paste metadata dari CSV, centang "Generative AI", Submit).

## Kapan dipakai
- Setelah batch render selesai dan ada daftar file aset.
- Saat user minta "title/keywords untuk Adobe Stock", "bikin metadata.csv",
  atau "validasi metadata sebelum upload".

## Batasan Adobe Stock (wajib)
- **Title**: maks **70 karakter**. Deskriptif, apa adanya, tanpa keyword
  stuffing, tanpa nama brand/trademark, tanpa "AI" berlebihan.
- **Keywords**: maks **50**. Urut dari paling relevan (10 pertama paling berat).
  Kata atau frasa pendek, bahasa Inggris, tanpa duplikat, tanpa brand.
- **Category**: tepat **satu** dari 21 kategori resmi (lihat bawah).
- **Releases**: `none` bila tidak ada orang/ properti yang dikenali. Untuk
  konten AI abstrak generik → `none`.
- **Generative AI**: wajib ditandai `true` untuk aset hasil AI (Remotion/AI).

### 21 Kategori resmi Adobe Stock
`Animals`, `Buildings and Architecture`, `Business`, `Drinks`,
`The Environment`, `States of Mind`, `Food`, `Graphic Resources`,
`Hobbies and Leisure`, `Industry`, `Landscapes`, `Lifestyle`, `People`,
`Plants and Flowers`, `Culture and Religion`, `Science`, `Social Issues`,
`Sports`, `Technology`, `Transport`, `Travel`.

## Alur kerja
1. **Sumber kebenaran tunggal** = `variations.json` di project Remotion.
   Tiap entri punya `id`, `props` (render), dan `metadata`:
   ```json
   {
     "id": "gradient-blue-01",
     "props": { "from": "#0ea5e9", "to": "#1e3a8a" },
     "metadata": {
       "title": "Abstract blue gradient background motion",
       "keywords": ["abstract", "gradient", "blue", "background", "motion"],
       "category": "Graphic Resources",
       "releases": "none",
       "generative_ai": true
     }
   }
   ```
2. **Generate + validasi CSV** dengan script bawaan:
   ```bash
   node skills/stock-metadata/scripts/gen-metadata.mjs \
     --manifest projects/stock-video/variations.json \
     --out metadata/metadata.csv
   ```
   Script memvalidasi semua batasan, menolak yang melanggar, dan menulis CSV
   dengan escaping benar (kolom `keywords` di-quote, dipisah `, `).
3. **Upload manual**: buka portal → bulk upload file → untuk tiap aset paste
   Title, Keywords, pilih Category, set Releases, **centang "Generative AI"**,
   Submit.

## Format CSV keluaran
Kolom: `filename,title,keywords,category,releases,generative_ai`
- `filename` = `<id>.mp4` (nama file hasil render).
- `keywords` = daftar dipisah `, ` (langsung paste ke field Keywords Adobe).
- `generative_ai` = `true`/`false`.

## Tips kualitas (menaikkan approval)
- Title fokus ke *apa yang terlihat*, bukan promosi.
- 20–40 keyword relevan; hindari spam & kata tak relevan.
- Pisahkan konsep berbeda jadi aset berbeda; jangan campur tema.
- Konsisten kategori dengan isi visual.