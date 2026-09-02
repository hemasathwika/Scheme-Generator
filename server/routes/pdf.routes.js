import express from "express";
import { generateSyllabusPDF } from "../controllers/pdf.controller.js";

const router = express.Router();

router.post("/syllabus", generateSyllabusPDF);

export default router;