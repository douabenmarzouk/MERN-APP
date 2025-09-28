import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/nodesRoutes.js"; // Vérifie bien le nom du fichier
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middlewares
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

// Routes API
app.use("/api/notes", notesRoutes);

// =======================
// 🔹 Servir frontend React en production
// =======================
if (process.env.NODE_ENV === "production") {
  const frontendDist = path.resolve(__dirname, "../frontend/dist");

  // Servir fichiers statiques (JS, CSS, images…)
  app.use(express.static(frontendDist));

  // Middleware pour toutes les autres routes qui ne sont pas /api
  app.use((req, res, next) => {
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.join(frontendDist, "index.html"));
    } else {
      next();
    }
  });
}

// =======================
// 🔹 Connexion MongoDB et démarrage
// =======================
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server started on PORT: ${PORT}`);
  });
});
