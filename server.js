import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
app.use(express.json({ limit: "30kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, aiConfigured: Boolean(process.env.OPENAI_API_KEY) });
});

app.post("/api/generate", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ error: "Server belum dikonfigurasi: OPENAI_API_KEY belum diatur." });
    }
    const { typeName = "Konten", tone = "Profesional", prompt } = req.body ?? {};
    if (typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ error: "Instruksi tidak boleh kosong." });
    }
    if (prompt.length > 12000) {
      return res.status(413).json({ error: "Instruksi terlalu panjang. Maksimal 12.000 karakter." });
    }

    const instructions = `Anda adalah asisten kreatif berbahasa Indonesia. Buat ${typeName} berdasarkan instruksi pengguna. Gaya bahasa: ${tone}. Berikan hasil yang berguna, rapi, spesifik, dan siap diedit. Jangan mengaku telah membuat file gambar jika hanya menghasilkan teks. Jika membuat konsep poster, sertakan judul, teks utama, susunan elemen, palet warna, dan format yang disarankan. Jika informasi penting tidak tersedia, gunakan placeholder yang jelas alih-alih mengarang fakta.`;
    const apiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-6.1-sol",
        instructions,
        input: prompt.trim(),
        max_output_tokens: 1800
      })
    });

    const payload = await apiResponse.json();
    if (!apiResponse.ok) {
      console.error("OpenAI API error:", apiResponse.status, payload?.error?.code || payload?.error?.type || "unknown");
      const status = apiResponse.status === 401 ? 502 : 502;
      return res.status(status).json({ error: "Layanan AI menolak permintaan. Periksa API key, akses model, dan saldo/billing API." });
    }
    const text = payload.output_text || (payload.output || [])
      .flatMap(item => item.content || [])
      .filter(item => item.type === "output_text")
      .map(item => item.text)
      .join("\n");
    if (!text) return res.status(502).json({ error: "AI tidak mengembalikan teks. Silakan coba lagi." });
    res.json({ text });
  } catch (err) {
    console.error("Generate error:", err?.message || "unknown");
    res.status(500).json({ error: "Terjadi kesalahan pada server. Silakan coba lagi." });
  }
});

app.listen(PORT, () => console.log(`AI Generator Pro Max berjalan di port ${PORT}`));
