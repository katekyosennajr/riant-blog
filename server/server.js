// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
// Configure CORS to accept requests from the frontend origin (set CLIENT_ORIGIN in Render/Vercel)
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:3000";
app.use(cors({ origin: clientOrigin }));
app.use(express.json());

// Koneksi ke MongoDB (jika MONGO_URI diset)
const mongoURI = process.env.MONGO_URI;

function startServer() {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
  });
}

if (mongoURI) {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("✅ MongoDB connected successfully");
      startServer();
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err);
      // Jangan langsung exit; beri tahu dan tetap coba jalankan server untuk debugging lokal
    });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error (event):', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });
} else {
  console.warn('MONGO_URI not provided. Starting server without DB connection (use .env or set MONGO_URI).');
  // start server even without DB so API root works and developer can see errors
  startServer();
}
// Gunakan routes dan model terpisah
const articleRoutes = require("./routes/articleRoutes");
app.use("/api/articles", articleRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});
