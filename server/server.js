import express from "express";
import cors from "cors";
import pdfRoutes from "./routes/pdf.routes.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PDF routes
app.use("/api/pdf", pdfRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Scheme & Syllabus Generator Backend is running!",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});