import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/nodesRoutes.js"; // Vérifie bien le nom du fichier
import { connectDB } from "./config/db.js";
// import rateLimiter from "./middleware/rateLimiter.js"; // Désactivé temporairement pour test

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// =======================
// Middlewares
// =======================
app.use(express.json());

// CORS pour le frontend en dev
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:3000", // <-- changer pour ton frontend
    })
  );
}

// Rate limiter désactivé temporairement pour test
// app.use(rateLimiter);

// =======================
// Routes API
// =======================
app.use("/api/notes", notesRoutes);

// =======================
// Servir frontend React en production
// =======================
if (process.env.NODE_ENV === "production") {
  const frontendDist = path.resolve(__dirname, "../frontend/dist");

  app.use(express.static(frontendDist));

  app.use((req, res, next) => {
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.join(frontendDist, "index.html"));
    } else {
      next();
    }
  });
}

// =======================
// Connexion MongoDB et démarrage
// =======================
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server started on PORT: ${PORT}`);
  });
});
