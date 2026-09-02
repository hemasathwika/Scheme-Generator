import puppeteer from "puppeteer";
import fs from "fs/promises";
import path from "path";

export const generatePDF = async (html) => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();

    /*
     * ============================================================
     * 1. LOAD EXISTING SYLLABUS CSS
     * ============================================================
     *
     * We are reusing the same CSS that is used by the React
     * syllabus preview.
     *
     * Project structure:
     *
     * Project Root
     * ├── public/
     * ├── src/
     * │   └── components/
     * │       └── Syllabus/
     * │           └── SyllabusPreview/
     * │               └── SyllabusPreview.css
     * └── server/
     *     └── services/
     *         └── puppeteer.service.js
     */

    const cssPath = path.resolve(
      process.cwd(),
      "../src/components/Syllabus/SyllabusPreview/SyllabusPreview.css"
    );

    const css = await fs.readFile(cssPath, "utf-8");

    /*
     * ============================================================
     * 2. LOAD ATRIA LOGO
     * ============================================================
     *
     * React normally loads:
     *
     * /assets/atria-logo.png
     *
     * But Puppeteer renders the HTML independently.
     *
     * Therefore, we convert the logo into a Base64 data URI so
     * Puppeteer can display it inside the generated PDF.
     */

    const logoPath = path.resolve(
      process.cwd(),
      "../public/assets/atria-logo.png"
    );

    const logoBuffer = await fs.readFile(logoPath);

    const logoBase64 = logoBuffer.toString("base64");

    const logoDataUri = `data:image/png;base64,${logoBase64}`;

    /*
     * Replace the browser path of the Atria logo with the
     * Base64 image.
     */

    const htmlWithLogo = html.replace(
      /src=["']\/assets\/atria-logo\.png["']/g,
      `src="${logoDataUri}"`
    );

    /*
     * ============================================================
     * 3. COMPLETE HTML DOCUMENT
     * ============================================================
     *
     * The HTML received from React contains the syllabus
     * document.
     *
     * We add:
     *
     * - Existing SyllabusPreview CSS
     * - PDF-specific pagination CSS
     * - A4 configuration
     */

    const completeHTML = `
      <!DOCTYPE html>

      <html lang="en">

        <head>

          <meta charset="UTF-8" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <title>Syllabus</title>

          <style>

            /*
             * ==================================================
             * EXISTING SYLLABUS PREVIEW CSS
             * ==================================================
             */

            ${css}


            /*
             * ==================================================
             * PDF PAGE CONFIGURATION
             * ==================================================
             */

            @page {
              size: A4;
              margin: 0;
            }


            /*
             * ==================================================
             * HTML / BODY
             * ==================================================
             */

            html,
            body {
              margin: 0;
              padding: 0;
              background: #ffffff;
            }


            body {
              font-family: "Times New Roman", serif;
            }


            /*
             * ==================================================
             * A4 DOCUMENT
             * ==================================================
             *
             * Important:
             *
             * Do NOT force a fixed height of 297mm.
             *
             * The content should be allowed to grow naturally.
             * Chromium will then determine where the physical
             * PDF pages should be created.
             */

            .syllabus-a4-page {
              width: 210mm;
              min-height: 297mm;
              height: auto;

              margin: 0;

              box-sizing: border-box;

              background: #ffffff;
            }


            /*
             * ==================================================
             * GENERAL PAGE BREAK BEHAVIOUR
             * ==================================================
             *
             * Small complete items should stay together.
             */

            .practical-experiment-row,
            .resource-section-row {
              break-inside: avoid;
              page-break-inside: avoid;
            }


            /*
             * ==================================================
             * COURSE OUTCOME TABLE
             * ==================================================
             */

            .course-outcomes-table tr {
              break-inside: avoid;
              page-break-inside: avoid;
            }


            /*
             * ==================================================
             * ASSESSMENT MAPPING
             * ==================================================
             */

            .assessment-mapping-table tr {
              break-inside: avoid;
              page-break-inside: avoid;
            }


            /*
             * ==================================================
             * COURSE CONTENTS TITLE
             * ==================================================
             *
             * Keep the title with the beginning of the table.
             */

            .course-contents-title {
              break-after: avoid;
              page-break-after: avoid;
            }


            /*
             * ==================================================
             * MODULE HEADER
             * ==================================================
             *
             * The module heading should remain with the beginning
             * of its content.
             */

            .module-header-row {
              break-after: avoid;
              page-break-after: avoid;
            }


            /*
             * ==================================================
             * MODULE CONTENT
             * ==================================================
             *
             * Important:
             *
             * Long module content is allowed to continue onto
             * another page.
             *
             * We intentionally DO NOT use:
             *
             * break-inside: avoid;
             *
             * here.
             */

            .module-content-row {
              break-inside: auto;
              page-break-inside: auto;
            }

            .module-content {
              break-inside: auto;
              page-break-inside: auto;
            }


            /*
             * ==================================================
             * PRACTICAL COMPONENTS
             * ==================================================
             *
             * Keep the heading with the following content when
             * possible.
             */

            .practical-components-title {
              break-after: avoid;
              page-break-after: avoid;
            }


            /*
             * ==================================================
             * PRACTICAL EXPERIMENTS
             * ==================================================
             *
             * A short experiment should not be split between
             * two pages.
             */

            .practical-experiment-row {
              break-inside: avoid;
              page-break-inside: avoid;
            }


            /*
             * ==================================================
             * REFERENCES
             * ==================================================
             *
             * Keep each reference entry together.
             */

            .resource-section-row {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .resource-section-row td {
              break-inside: avoid;
              page-break-inside: avoid;
            }


            /*
             * ==================================================
             * FOOTER
             * ==================================================
             */

            .syllabus-footer {
              break-inside: avoid;
              page-break-inside: avoid;
            }

          </style>

        </head>


        <body>

          ${htmlWithLogo}

        </body>

      </html>
    `;


    /*
     * ============================================================
     * 4. LOAD HTML INTO PUPPETEER
     * ============================================================
     */

    await page.setContent(completeHTML, {
      waitUntil: "networkidle0",
    });


    /*
     * ============================================================
     * 5. WAIT FOR ALL IMAGES
     * ============================================================
     *
     * This is important for the Atria logo.
     *
     * Puppeteer should not generate the PDF until all images
     * have finished loading.
     */

    await page.evaluate(async () => {
      const images = Array.from(document.images);

      await Promise.all(
        images.map((img) => {
          if (img.complete) {
            return Promise.resolve();
          }

          return new Promise((resolve) => {
            img.addEventListener("load", resolve);
            img.addEventListener("error", resolve);
          });
        })
      );
    });


    /*
     * ============================================================
     * 6. GENERATE PDF
     * ============================================================
     */

    const pdfBuffer = await page.pdf({
      format: "A4",

      printBackground: true,

      /*
       * Tell Puppeteer to respect @page { size: A4; }
       */

      preferCSSPageSize: true,

      margin: {
        top: "0mm",
        right: "0mm",
        bottom: "0mm",
        left: "0mm",
      },
    });


    /*
     * ============================================================
     * 7. RETURN PDF
     * ============================================================
     */

    return pdfBuffer;

  } finally {

    /*
     * Always close the browser.
     *
     * This prevents Chromium processes from remaining open
     * after PDF generation.
     */

    await browser.close();
  }
};