const response = await fetch("http://localhost:5000/api/pdf/syllabus", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: "Times New Roman", serif;
              padding: 30px;
            }

            h1 {
              text-align: center;
            }

            .box {
              border: 1px solid black;
              padding: 20px;
              margin-top: 20px;
            }
          </style>
        </head>

        <body>
          <h1>Scheme & Syllabus Generator</h1>

          <div class="box">
            <h2>PDF Generation Test</h2>
            <p>
              This PDF has been generated using Node.js,
              Express and Puppeteer.
            </p>
          </div>
        </body>
      </html>
    `,
  }),
});

if (!response.ok) {
  const error = await response.text();
  console.error("PDF generation failed:", error);
  process.exit(1);
}

const buffer = Buffer.from(await response.arrayBuffer());

const fs = await import("fs/promises");

await fs.writeFile("test-syllabus.pdf", buffer);

console.log("PDF generated successfully!");
console.log("Saved as: server/test-syllabus.pdf");