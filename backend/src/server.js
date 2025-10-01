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

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://mern-app-16.onrender.com", // Your frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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