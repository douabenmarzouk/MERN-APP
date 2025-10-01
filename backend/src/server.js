import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/nodesRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// =======================
// Middlewares
// =======================
app.use(express.json());

// ⚡ CORS configuré pour dev ET prod
// Met l'URL exacte de ton frontend Render dans FRONTEND_URL en prod
const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL || "https://ton-frontend.onrender.com"
    : "http://localhost:3000";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true, // si tu utilises cookies
  })
);

// =======================
// Routes API
// =======================
app.use("/api/notes", notesRoutes);

// =======================
// Servir frontend React en production
// =======================
if (process.env.NODE_ENV === "production") {
  // Chemin correct vers le build React
  const frontendDist = path.resolve(__dirname, "../frontend/dist"); 
  // ou "../frontend/build" si tu utilises CRA

  app.use(express.static(frontendDist));

  // Toutes les autres routes redirigées vers index.html
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.join(frontendDist, "index.html"));
    } else {
      res.status(404).send({ message: "API route not found" });
    }
  });
}

// =======================
// Connexion MongoDB et démarrage
// =======================
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server started on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
