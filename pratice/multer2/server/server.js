import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import uploadRoutes from "./src/routes/upload.routes.js";
import cors from 'cors'
import env from 'dotenv'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
env.config({
  path:'./.env'
})
const PORT = process.env.PORT || 3000
const app = express();
app.use(express.json());

app.use(cors())

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/upload", uploadRoutes);

// Default route
app.get("/", (req, res) => res.send("Server running at /upload endpoint"));

app.listen(PORT , () => console.log(`✅ Server running on http://localhost:${PORT}`))
