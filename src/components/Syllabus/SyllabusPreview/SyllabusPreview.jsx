
import { Fragment } from "react";
import html2pdf from "html2pdf.js";
import "./SyllabusPreview.css";

// =====================================================
// COURSE TYPE RULES
// =====================================================

const COURSE_TYPE_RULES = {
  IPCC: {
    assessmentMapping: true,
    courseContents: true,
    practicalComponents: true,
  },

  PCC: {
    assessmentMapping: true,
    courseContents: true,
    practicalComponents: false,
  },

  PCCL: {
    assessmentMapping: false,
    courseContents: false,
    practicalComponents: true,
  },

  PEC: {
    assessmentMapping: true,
    courseContents: true,
    practicalComponents: false,
  },

  HSMC: {
    assessmentMapping: true,
    courseContents: true,
    practicalComponents: false,
  },

  AEC: {
    assessmentMapping: true,
    courseContents: true,
    practicalComponents: false,
  },

  ETC: {
    assessmentMapping: true,
    courseContents: true,
    practicalComponents: false,
  },

  PROJ: {
    assessmentMapping: false,
    courseContents: false,
    practicalComponents: false,
  },

  NCMC: {
    assessmentMapping: false,
    courseContents: false,
    practicalComponents: false,
  },
};


// =====================================================
// MAIN COMPONENT
// =====================================================

function SyllabusPreview({ syllabusData, onEdit }) {

  const course =
    syllabusData?.courseInformation || {};

  const outcomes =
    syllabusData?.courseOutcomes || [];

  const modules =
    syllabusData?.modules || [];

  const practical =
    syllabusData?.practicalComponents || {};

  const references =
    syllabusData?.references || {};


  // =====================================================
  // VALID PRACTICAL DATA
  // =====================================================

  const validPartA =
    (practical.partA || []).filter(
      (experiment) =>
        experiment?.title?.trim() ||
        experiment?.description?.trim()
    );


  const validPartB =
    (practical.partB || []).filter(
      (experiment) =>
        experiment?.title?.trim() ||
        experiment?.description?.trim()
    );


  // =====================================================
  // COURSE TYPE RULES
  // =====================================================

  const courseRules =
    COURSE_TYPE_RULES[course.courseType] || {
      assessmentMapping: true,
      courseContents: true,
      practicalComponents: false,
    };




// =====================================================
// DOWNLOAD PDF
// =====================================================

const handleDownloadPDF = async () => {
  const source = document.querySelector(".syllabus-a4-page");

  if (!source) {
    alert("Syllabus preview not found.");
    return;
  }

  let pdfWrapper = null;

  try {
    // =================================================
    // CREATE TEMPORARY PDF AREA
    // =================================================

    pdfWrapper = document.createElement("div");

    pdfWrapper.style.position = "fixed";
    pdfWrapper.style.left = "-100000px";
    pdfWrapper.style.top = "0";
    pdfWrapper.style.width = "210mm";
    pdfWrapper.style.background = "#ffffff";
    pdfWrapper.style.zIndex = "-9999";
    pdfWrapper.style.visibility = "visible";

    document.body.appendChild(pdfWrapper);


    // =================================================
    // CREATE HEADER
    // =================================================

    const header = source
      .querySelector(".syllabus-header")
      ?.cloneNode(true);


    // =================================================
    // CREATE FOOTER
    // =================================================

    const footer = source
      .querySelector(".syllabus-footer")
      ?.cloneNode(true);


    // =================================================
    // CREATE BODY
    // =================================================

    const body = document.createElement("div");

    body.className = "pdf-body-content";


    // Copy everything except header/footer/toolbar

    Array.from(source.children).forEach((element) => {

      if (
        element.classList.contains("syllabus-header") ||
        element.classList.contains("syllabus-footer") ||
        element.classList.contains("syllabus-toolbar")
      ) {
        return;
      }

      body.appendChild(element.cloneNode(true));
    });


    // =================================================
    // BODY STYLING
    // =================================================

    body.style.width = "210mm";
    body.style.boxSizing = "border-box";
    body.style.padding = "12mm";
    body.style.margin = "0";
    body.style.background = "#ffffff";
    body.style.color = "#000000";
    body.style.fontFamily = '"Times New Roman", Times, serif';
    body.style.fontSize = "14pt";
    body.style.lineHeight = "1.35";
    body.style.overflow = "visible";


    // =================================================
    // HEADER STYLING
    // =================================================

    if (header) {

      header.style.width = "210mm";
      header.style.boxSizing = "border-box";
      header.style.padding = "12mm 12mm 0 12mm";
      header.style.margin = "0";
      header.style.background = "#ffffff";
      header.style.color = "#000000";
      header.style.overflow = "visible";
    }


    // =================================================
    // FOOTER STYLING
    // =================================================

    if (footer) {

      footer.style.width = "210mm";
      footer.style.boxSizing = "border-box";
      footer.style.padding = "0 12mm 8mm 12mm";
      footer.style.margin = "0";
      footer.style.background = "#ffffff";
      footer.style.color = "#000000";
      footer.style.overflow = "visible";
    }


    // =================================================
    // APPEND TEMPORARY ELEMENTS
    // =================================================

    if (header) {
      pdfWrapper.appendChild(header);
    }

    pdfWrapper.appendChild(body);

    if (footer) {
      pdfWrapper.appendChild(footer);
    }


    // =================================================
    // WAIT FOR RENDER
    // =================================================

    await new Promise((resolve) => {

      requestAnimationFrame(() => {

        requestAnimationFrame(resolve);

      });

    });


    // =================================================
    // WAIT FOR IMAGES
    // =================================================

    const images = Array.from(
      pdfWrapper.querySelectorAll("img")
    );


    await Promise.all(

      images.map((img) => {

        if (img.complete) {
          return Promise.resolve();
        }

        return new Promise((resolve) => {

          img.onload = resolve;
          img.onerror = resolve;

        });

      })

    );


    // =================================================
    // IMPORT LIBRARIES
    // =================================================

    const html2canvasModule = await import(
      "html2canvas"
    );

    const html2canvas =
      html2canvasModule.default;


    const jsPDFModule = await import(
      "jspdf"
    );

    const { jsPDF } = jsPDFModule;


    // =================================================
    // A4 DIMENSIONS
    // =================================================

    const A4_WIDTH = 210;
    const A4_HEIGHT = 297;


    // =================================================
    // RENDER HEADER
    // =================================================

    let headerCanvas = null;

    if (header) {

      headerCanvas = await html2canvas(
        header,
        {
          scale: 2,

          useCORS: true,

          allowTaint: true,

          backgroundColor: "#ffffff",

          logging: false,

          scrollX: 0,

          scrollY: 0,

          windowWidth: header.scrollWidth,

          windowHeight: header.scrollHeight,
        }
      );

    }


    // =================================================
    // RENDER FOOTER
    // =================================================

    let footerCanvas = null;

    if (footer) {

      footerCanvas = await html2canvas(
        footer,
        {
          scale: 2,

          useCORS: true,

          allowTaint: true,

          backgroundColor: "#ffffff",

          logging: false,

          scrollX: 0,

          scrollY: 0,

          windowWidth: footer.scrollWidth,

          windowHeight: footer.scrollHeight,
        }
      );

    }


    // =================================================
    // RENDER BODY
    // =================================================

    const bodyCanvas = await html2canvas(
      body,
      {
        scale: 2,

        useCORS: true,

        allowTaint: true,

        backgroundColor: "#ffffff",

        logging: false,

        scrollX: 0,

        scrollY: 0,

        windowWidth: body.scrollWidth,

        windowHeight: body.scrollHeight,
      }
    );


    // =================================================
    // PIXEL / MM CONVERSION
    // =================================================

    const bodyWidthMM = A4_WIDTH - 24;

    const pixelsPerMM =
      bodyCanvas.width / bodyWidthMM;


    // =================================================
    // HEADER HEIGHT
    // =================================================

    const headerHeightMM =
      headerCanvas
        ? headerCanvas.height / pixelsPerMM
        : 0;


    // =================================================
    // FOOTER HEIGHT
    // =================================================

    const footerHeightMM =
      footerCanvas
        ? footerCanvas.height / pixelsPerMM
        : 0;


    // =================================================
    // AVAILABLE BODY HEIGHT
    // =================================================

    const topMarginMM = 12;

    const bottomMarginMM = 8;

    const availableBodyHeightMM =
      A4_HEIGHT -
      topMarginMM -
      bottomMarginMM -
      headerHeightMM -
      footerHeightMM;


    // =================================================
    // BODY HEIGHT IN PIXELS
    // =================================================

    const bodyPageHeightPx =
      Math.floor(
        availableBodyHeightMM *
        pixelsPerMM
      );


    // =================================================
    // CREATE PDF
    // =================================================

    const pdf = new jsPDF({

      unit: "mm",

      format: "a4",

      orientation: "portrait",

      compress: true,

    });


    // =================================================
    // SPLIT BODY INTO PAGES
    // =================================================

    let currentY = 0;

    let pageNumber = 0;


    while (
      currentY <
      bodyCanvas.height
    ) {

      if (pageNumber > 0) {

        pdf.addPage();

      }


      // ===============================================
      // DETERMINE CURRENT SLICE
      // ===============================================

      const remainingHeight =
        bodyCanvas.height -
        currentY;


      const sliceHeight =
        Math.min(
          bodyPageHeightPx,
          remainingHeight
        );


      // ===============================================
      // CREATE PAGE SLICE
      // ===============================================

      const pageCanvas =
        document.createElement("canvas");

      pageCanvas.width =
        bodyCanvas.width;

      pageCanvas.height =
        sliceHeight;


      const context =
        pageCanvas.getContext("2d");


      context.fillStyle =
        "#ffffff";

      context.fillRect(
        0,
        0,
        pageCanvas.width,
        pageCanvas.height
      );


      context.drawImage(

        bodyCanvas,

        0,
        currentY,

        bodyCanvas.width,
        sliceHeight,

        0,
        0,

        pageCanvas.width,
        pageCanvas.height

      );


      // ===============================================
      // ADD HEADER
      // ===============================================

      if (headerCanvas) {

        const headerWidthMM =
          A4_WIDTH - 24;

        const headerHeight =
          headerHeightMM;


        pdf.addImage(

          headerCanvas,

          "PNG",

          12,

          0,

          headerWidthMM,

          headerHeight

        );

      }


      // ===============================================
      // ADD BODY
      // ===============================================

      const bodyWidthMMForPDF =
        A4_WIDTH - 24;


      const sliceHeightMM =
        sliceHeight /
        pixelsPerMM;


      pdf.addImage(

        pageCanvas,

        "PNG",

        12,

        topMarginMM +
          headerHeightMM,

        bodyWidthMMForPDF,

        sliceHeightMM

      );


      // ===============================================
      // ADD FOOTER
      // ===============================================

      if (footerCanvas) {

        const footerWidthMM =
          A4_WIDTH - 24;


        pdf.addImage(

          footerCanvas,

          "PNG",

          12,

          A4_HEIGHT -
            bottomMarginMM -
            footerHeightMM,

          footerWidthMM,

          footerHeightMM

        );

      }


      // ===============================================
      // NEXT BODY POSITION
      // ===============================================

      currentY += sliceHeight;

      pageNumber++;

    }


    // =================================================
    // FILE NAME
    // =================================================

    const courseCode =
      course?.courseCode?.trim() ||
      "Syllabus";


    // =================================================
    // SAVE PDF
    // =================================================

    pdf.save(
      `Syllabus-${courseCode}.pdf`
    );


  } catch (error) {

    console.error(
      "PDF GENERATION ERROR:",
      error
    );


    alert(
      "PDF generation failed. Please check the browser console."
    );

  } finally {

    // =================================================
    // REMOVE TEMPORARY DOM
    // =================================================

    if (pdfWrapper) {

      pdfWrapper.remove();

    }

  }
};

  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="syllabus-preview-container">


      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="syllabus-toolbar">

        <button
          type="button"
          className="preview-edit-button"
          onClick={onEdit}
        >
          Edit
        </button>


        <button
          type="button"
          className="preview-download-button"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>

      </div>


      {/* =================================================
          A4 PAGE
      ================================================= */}

      <div className="syllabus-a4-page">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="syllabus-header">

          <img
            className="syllabus-logo"
            src="/assets/atria-logo.png"
            alt="Atria Institute of Technology"
          />

        </div>


        {/* =================================================
            COURSE INFORMATION
        ================================================= */}

        <section className="syllabus-section course-information-section">

          <table className="course-info-table">

            <tbody>

              {/* ROW 1 */}

              <tr>

                <th className="course-title-label">
                  Title of the Course:
                </th>

                <td className="course-title-value">
                  {course.courseTitle || "-"}
                </td>

                <th className="semester-label">
                  Semester:
                </th>

                <td className="semester-value">
                  {course.semester || "-"}
                </td>

              </tr>


              {/* ROW 2 */}

              <tr>

                <th>
                  Course Code:
                </th>

                <td>
                  {course.courseCode || "-"}
                </td>

                <th>
                  CIA Marks
                </th>

                <td>
                  {course.ciaMarks || "-"}
                </td>

              </tr>


              {/* ROW 3 */}

              <tr>

                <th>
                  Course Type:
                </th>

                <td>
                  {course.courseType || "-"}
                </td>

                <th>
                  SEE Marks
                </th>

                <td>
                  {course.seeMarks || "-"}
                </td>

              </tr>


              {/* ROW 4 */}

              <tr>

                <th>
                  Student Learning Hours
                  <br />
                  (L:T:P:S)
                </th>

                <td>
                  {course.studentLearningHours || "-"}
                </td>

                <th>
                  Total Marks
                </th>

                <td>
                  {course.totalMarks || "-"}
                </td>

              </tr>


              {/* ROW 5 */}

              <tr>

                <th>
                  Credits
                </th>

                <td>
                  {course.credits || "-"}
                </td>

                <th>
                  Exam Hours
                </th>

                <td>
                  {course.examHours || "-"}
                </td>

              </tr>


              {/* ROW 6 */}

              <tr>

                <th>
                  Examination Type (SEE)
                </th>

                <td colSpan="3">
                  {course.examinationType || "-"}
                </td>

              </tr>

            </tbody>

          </table>

        </section>


        {/* =================================================
            COURSE TERMINOLOGY
        ================================================= */}

        <section className="terminology-section">

          <table className="terminology-table">

            <tbody>

              <tr>

                <td>
                  <strong>L</strong> - Lecture
                </td>

                <td>
                  <strong>T</strong> - Tutorial
                </td>

                <td>
                  <strong>P</strong> - Practical
                </td>

                <td>
                  <strong>S</strong> - Self Study
                </td>

                <td>
                  <strong>CL</strong> - Cognitive Level
                </td>

                <td>
                  <strong>PL</strong> - Psychomotor Level
                </td>

              </tr>

            </tbody>

          </table>

        </section>


        {/* =================================================
            COURSE OUTCOMES
        ================================================= */}

        <table className="co-table">

          <thead>

            <tr>

              <th className="co-code-header">
                COs
              </th>

              <th className="co-description-header">
                Course Outcome: At the end of the course,
                the students will be able to
              </th>

              <th className="co-level-header">
                CL
                <br />
                <span>(Highest Level)</span>
              </th>

              <th className="co-level-header">
                PL
                <br />
                <span>(Highest Level)</span>
              </th>

            </tr>

          </thead>


          <tbody>

            {outcomes.map(
              (outcome, index) => (

                <tr key={index}>

                  <td className="co-code">
                    {outcome.code ||
                      `CO${index + 1}`}
                  </td>

                  <td className="co-description">
                    {outcome.description ||
                      outcome.outcome ||
                      "-"}
                  </td>

                  <td className="co-level">
                    {outcome.cl || "-"}
                  </td>

                  <td className="co-level">
                    {outcome.pl || "-"}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>


        {/* =================================================
            ASSESSMENT MAPPING
        ================================================= */}

        {courseRules.assessmentMapping && (

          <section className="assessment-mapping-section">

            <AssessmentMappingPreview
              data={
                syllabusData.assessmentMapping
              }
              outcomes={outcomes}
            />

          </section>

        )}


        {/* =================================================
            COURSE CONTENTS
        ================================================= */}

        {/* {courseRules.courseContents && (

          <section className="course-contents-section">

            <table className="course-contents-table">

              <thead>

                <tr>

                  <th colSpan="3">
                    Course Contents
                  </th>

                </tr>

              </thead>


              <tbody> */}

              {courseRules.courseContents && (

  <section className="course-contents-section">

    <div className="course-contents-title">
      Course Contents
    </div>

    <table className="course-contents-table">

      <tbody>

                {modules.map(
                  (module, index) => (

                    <Fragment key={index}>

                      <tr className="module-header-row">

                        <td className="module-title-cell">

                          Module{" "}

                          {module.moduleNumber ||
                            index + 1}

                        </td>


                        <td className="module-co-cell">

                          <strong>
                            CO:
                          </strong>{" "}

                          {module.co || "-"}

                        </td>


                        <td className="module-level-cell">

                          <strong>
                            CL:
                          </strong>{" "}

                          {module.cl || "-"}

                          <br />

                          <strong>
                            PL:
                          </strong>{" "}

                          {module.pl || "-"}

                        </td>

                      </tr>


                      <tr className="module-content-row">

                        <td colSpan="3">

                          <div className="module-content">

                            {module.content || "-"}

                          </div>


                          {module.textbookReference && (

                            <div className="module-reference">

                              <strong>
                                Textbook Reference:
                              </strong>{" "}

                              {module.textbookReference}

                            </div>

                          )}

                        </td>

                      </tr>

                    </Fragment>

                  )
                )}

              </tbody>

            </table>

          </section>

        )}


        {/* =================================================
            PRACTICAL COMPONENTS
        ================================================= */}

        {courseRules.practicalComponents &&
          (
            validPartA.length > 0 ||
            validPartB.length > 0
          ) && (

            <section className="practical-components-section">

              <table className="practical-components-table">

                <colgroup>

                  <col className="practical-number-column" />

                  <col className="practical-description-column" />

                </colgroup>


                <thead>

                  <tr>

                    <th
                      colSpan="2"
                      className="practical-main-title"
                    >
                      PRACTICAL COMPONENTS OF{" "}
                      {course.courseType || ""}
                    </th>

                  </tr>

                </thead>


                <tbody>


                  {/* PART A */}

                  {validPartA.length > 0 && (

                    <tr>

                      <th
                        colSpan="2"
                        className="practical-part-title"
                      >
                        PART – A: CONVENTIONAL EXPERIMENTS
                      </th>

                    </tr>

                  )}


                  {validPartA.map(
                    (experiment, index) => (

                      <tr
                        key={`partA-${index}`}
                        className="practical-experiment-row"
                      >

                        <td className="practical-number-cell">

                          {experiment.number ||
                            index + 1}.

                        </td>


                        <td className="practical-description-cell">

                          {experiment.title && (

                            <strong>
                              {experiment.title}
                            </strong>

                          )}

                          {experiment.description && (

                            <div>
                              {experiment.description}
                            </div>

                          )}

                        </td>

                      </tr>

                    )
                  )}


                  {/* PART B */}

                  {validPartB.length > 0 && (

                    <tr>

                      <th
                        colSpan="2"
                        className="practical-part-title"
                      >
                        PART – B: TYPICAL OPEN-ENDED EXPERIMENTS
                      </th>

                    </tr>

                  )}


                  {validPartB.map(
                    (experiment, index) => (

                      <tr
                        key={`partB-${index}`}
                        className="practical-experiment-row"
                      >

                        <td
                          colSpan="2"
                          className="practical-part-b-content"
                        >

                          {experiment.description && (

                            <span>
                              {experiment.description}
                            </span>

                          )}

                        </td>

                      </tr>

                    )
                  )}


                  {/* =================================================
                      TEXT BOOKS
                  ================================================= */}

                  {references.textbooks?.length > 0 && (

                    <ResourceRow
                      title="Text Books"
                      items={references.textbooks}
                    />

                  )}


                  {/* =================================================
                      REFERENCE BOOKS
                  ================================================= */}

                  {references.referenceBooks?.length > 0 && (

                    <ResourceRow
                      title="Reference Books"
                      items={references.referenceBooks}
                    />

                  )}


                  {/* =================================================
                      WEB LINKS
                  ================================================= */}

                  {references.webLinks?.length > 0 && (

                    <ResourceRow
                      title="Reference Web Links:"
                      items={references.webLinks}
                    />

                  )}

                </tbody>

              </table>

            </section>

          )}


        {/* =================================================
            RESOURCES FOR NON-PRACTICAL COURSES
        ================================================= */}

        {!courseRules.practicalComponents &&
          (
            references.textbooks?.length > 0 ||
            references.referenceBooks?.length > 0 ||
            references.webLinks?.length > 0
          ) && (

            <table className="practical-components-table resources-only-table">

              <tbody>

                {references.textbooks?.length > 0 && (

                  <ResourceRow
                    title="Text Books"
                    items={references.textbooks}
                  />

                )}


                {references.referenceBooks?.length > 0 && (

                  <ResourceRow
                    title="Reference Books"
                    items={references.referenceBooks}
                  />

                )}


                {references.webLinks?.length > 0 && (

                  <ResourceRow
                    title="Reference Web Links:"
                    items={references.webLinks}
                  />

                )}

              </tbody>

            </table>

          )}


        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="syllabus-footer">
          Atria Institute of Technology
        </div>


      </div>

    </div>

  );
}


// =====================================================
// RESOURCE ROW
// =====================================================

function ResourceRow({
  title,
  items = [],
}) {

  if (!items || items.length === 0) {
    return null;
  }


  return (

    <tr className="resource-section-row">

      <td
        colSpan="2"
        className="resource-content-cell"
      >

        <div className="resource-title">
          {title}
        </div>


        <ol>

          {items.map(
            (item, index) => (

              <li key={index}>

                {typeof item === "object"
                  ? item.title || "-"
                  : item}

              </li>

            )
          )}

        </ol>

      </td>

    </tr>

  );
}


// =====================================================
// ASSESSMENT MAPPING PREVIEW
// =====================================================

function AssessmentMappingPreview({
  data,
  outcomes,
}) {

  if (!data) {

    return (

      <table className="assessment-mapping-table">

        <tbody>

          <tr>

            <td
              colSpan="5"
              className="assessment-mapping-title"
            >
              CO – Assessment Mapping
            </td>

          </tr>

          <tr>

            <td colSpan="5">
              No assessment mapping entered.
            </td>

          </tr>

        </tbody>

      </table>

    );

  }


  let mappingRows = [];


  // -----------------------------------------------------
  // OBJECT FORMAT
  // -----------------------------------------------------

  if (
    typeof data === "object" &&
    !Array.isArray(data)
  ) {

    mappingRows =
      Object.entries(data).map(
        ([co, mapping]) => ({

          co,

          cie1:
            mapping?.cie1 || "",

          cie2:
            mapping?.cie2 || "",

          assignment:
            mapping?.assignment || "",

          see:
            mapping?.see || "",

        })
      );

  }


  // -----------------------------------------------------
  // ARRAY FORMAT
  // -----------------------------------------------------

  if (Array.isArray(data)) {

    mappingRows =
      data.map(
        (mapping, index) => ({

          co:
            mapping?.co ||
            `CO${index + 1}`,

          cie1:
            mapping?.cie1 || "",

          cie2:
            mapping?.cie2 || "",

          assignment:
            mapping?.assignment || "",

          see:
            mapping?.see || "",

        })
      );

  }


  // =====================================================
  // TABLE
  // =====================================================

  return (

    <table className="assessment-mapping-table">

      <thead>

        <tr>

          <th
            colSpan="5"
            className="assessment-mapping-title"
          >
            CO – Assessment Mapping
          </th>

        </tr>


        <tr>

          <th
            rowSpan="3"
            className="assessment-co-header"
          >
            Course
            <br />
            Outcomes
          </th>


          <th
            colSpan="3"
            className="assessment-cia-header"
          >
            Continuous Internal Assessment
          </th>


          <th
            rowSpan="2"
            className="assessment-see-header"
          >
            Semester End Exam
          </th>

        </tr>


        <tr>

          <th className="assessment-cie-header">
            CIE I
          </th>

          <th className="assessment-cie-header">
            CIE II
          </th>

          <th className="assessment-assignment-header">
            Assignment/
            <br />
            Activities
          </th>

        </tr>


        <tr>

          <th>
            15%
          </th>

          <th>
            15%
          </th>

          <th>
            20%
          </th>

          <th>
            50%
          </th>

        </tr>

      </thead>


      <tbody>

        {mappingRows.map(
          (row, index) => (

            <tr key={index}>

              <td className="assessment-co">
                {row.co}
              </td>

              <td>
                {row.cie1}
              </td>

              <td>
                {row.cie2}
              </td>

              <td>
                {row.assignment}
              </td>

              <td>
                {row.see}
              </td>

            </tr>

          )
        )}

      </tbody>

    </table>

  );
}


export default SyllabusPreview;