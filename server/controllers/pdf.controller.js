import { generatePDF } from "../services/puppeteer.service.js";

export const generateSyllabusPDF = async (req, res) => {
  try {
    const { html } = req.body;

    if (!html) {
      return res.status(400).json({
        success: false,
        message: "HTML content is required.",
      });
    }

    const pdfBuffer = await generatePDF(html);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=syllabus.pdf",
      "Content-Length": pdfBuffer.length,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate PDF.",
    });
  }
};