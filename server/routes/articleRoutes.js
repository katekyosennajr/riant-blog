const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// 🔹 GET semua artikel
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 GET artikel by ID
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.json(article);
  } catch (err) {
    res.status(404).json({ message: "Artikel tidak ditemukan" });
  }
});

// 🔹 POST (tambah) artikel baru
router.post("/", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newArticle = new Article({ title, content, author });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🔹 PUT (edit) artikel
router.put("/:id", async (req, res) => {
  try {
    const updated = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🔹 DELETE artikel
router.delete("/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Artikel dihapus" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
