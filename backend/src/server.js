import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import notesRoutes from "./routes/nodesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Connexion à MongoDB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
  });
});
// Middleware
app.use(cors({
    origin: "http://localhost:5173"  // ✅ corrigé
}));
app.use(express.json());
app.use(rateLimiter);


// Routes
app.use("/api/notes", notesRoutes);

