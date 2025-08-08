import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/kirim", async (req, res) => {
  try {
    // Terima data dari Wemos
    const data = req.body;

    // Kirim ke InfinityFree (HTTPS)
    const response = await fetch("https://matthzz.rf.gd/tambah_murid.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data)
    });

    const text = await response.text();
    res.send(text); // Balas ke Wemos
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(10000, () => {
  console.log("Proxy Render jalan di port 10000");
});
