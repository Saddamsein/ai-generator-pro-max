# AI Generator Pro Max — panduan Bahasa Indonesia

Website ini menggunakan API OpenAI sungguhan melalui backend Node.js. API key tidak ditaruh di browser.

## Yang dibutuhkan
- Node.js 20 atau lebih baru.
- API key OpenAI API dari https://platform.openai.com/api-keys.
- Akses API dan billing yang aktif. ChatGPT Plus/Free tidak otomatis mencakup biaya API.

## Menjalankan di komputer
1. Ekstrak ZIP ini.
2. Buka terminal di folder hasil ekstrak.
3. Jalankan `npm install`.
4. Atur environment variable `OPENAI_API_KEY` di terminal/server. Jangan masukkan key ke `public/index.html`, dan jangan kirim key ke siapa pun.
   - macOS/Linux: `export OPENAI_API_KEY="API_KEY_ANDA"`
   - Windows PowerShell: `$env:OPENAI_API_KEY="API_KEY_ANDA"`
5. Jalankan `npm start`.
6. Buka `http://localhost:3000`.

Model default: `gpt-6.1-sol`. Jika model itu tidak tersedia untuk akun API Anda, atur environment variable `OPENAI_MODEL` ke model yang tersedia untuk akun Anda.

## Agar website bisa diakses publik
Deploy seluruh folder ini ke hosting yang mendukung Node.js (misalnya Render atau layanan sejenis), lalu atur:
- Build/install command: `npm install`
- Start command: `npm start`
- Environment variable: `OPENAI_API_KEY` = API key Anda
- Opsional: `OPENAI_MODEL` = nama model yang tersedia

Jangan pernah membuat API key terlihat di HTML/JavaScript frontend atau repositori publik. Batasi akses dan pantau penggunaan API untuk mencegah tagihan tak terduga.

## Fitur
- Konsep poster/banner
- Caption media sosial
- Ucapan resmi
- Artikel
- Prompt gambar AI berbentuk teks
- Ide kreatif
- Asisten serbaguna
- Salin hasil dan unduh TXT

Catatan: fitur prompt gambar menghasilkan teks prompt, bukan file gambar. Untuk menghasilkan gambar secara langsung, perlu integrasi endpoint/model gambar dan UI tambahan.
