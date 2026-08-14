// import "./SyllabusPreview.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import "./SyllabusPreview.css";

function SyllabusPreview({ syllabusData, onEdit }) {
  const course = syllabusData?.courseInformation || {};
  const outcomes = syllabusData?.courseOutcomes || [];
  const modules = syllabusData?.modules || [];
  const practical = syllabusData?.practicalComponents || {};
  const references = syllabusData?.references || {};

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

    const element = document.querySelector(
      ".syllabus-a4-page"
    );

    if (!element) {
      alert("Syllabus preview not found.");
      return;
    }

    try {

      const canvas = await html2canvas(
        element,
        {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
        }
      );


      const imageData =
        canvas.toDataURL("image/png");


      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });


      const pageWidth =
        pdf.internal.pageSize.getWidth();

      const pageHeight =
        pdf.internal.pageSize.getHeight();


      const imageWidth = pageWidth;

      const imageHeight =
        (canvas.height * imageWidth) /
        canvas.width;


      let heightLeft = imageHeight;

      let position = 0;


      // First page

      pdf.addImage(
        imageData,
        "PNG",
        0,
        position,
        imageWidth,
        imageHeight
      );


      heightLeft -= pageHeight;


      // Additional pages

      while (heightLeft > 0) {

        position =
          heightLeft - imageHeight;

        pdf.addPage();

        pdf.addImage(
          imageData,
          "PNG",
          0,
          position,
          imageWidth,
          imageHeight
        );

        heightLeft -= pageHeight;
      }


      pdf.save("syllabus.pdf");

    } catch (error) {

      console.error(
        "PDF generation failed:",
        error
      );

      alert(
        "Unable to generate PDF. Please try again."
      );
    }
  };

  return (
    <div className="syllabus-preview-container">

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


      {/* =====================================================
          A4 PORTRAIT PAGE
      ===================================================== */}

      <div className="syllabus-a4-page">

  

        {/* =================================================
    HEADER - LOGO ONLY
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

      {/* ROW 1 - TITLE + SEMESTER */}

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


      {/* ROW 2 - COURSE CODE + CIA */}

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


      {/* ROW 3 - COURSE TYPE + SEE */}

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


      {/* ROW 4 - SLT + TOTAL MARKS */}

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


      {/* ROW 5 - CREDITS + EXAM HOURS */}

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


      {/* ROW 6 - EXAMINATION TYPE */}

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
            CO - ASSESSMENT MAPPING
            ================================================= */}

{/* <section className="assessment-mapping-section">

  <AssessmentMappingPreview
    data={
      syllabusData.assessmentMapping
    }
    outcomes={outcomes}
  />

</section> */}

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
{courseRules.courseContents && (

  <section className="course-contents-section">

    <table className="course-contents-table">

      <thead>

        <tr>
          <th colSpan="3">
            Course Contents
          </th>
        </tr>

      </thead>

      <tbody>

        {modules.map(
          (module, index) => (

            <>

              <tr className="module-header-row">

                <td className="module-title-cell">
                  Module{" "}
                  {module.moduleNumber ||
                    index + 1}
                </td>

                <td className="module-co-cell">
                  <strong>CO:</strong>{" "}
                  {module.co || "-"}
                </td>

                <td className="module-level-cell">

                  <strong>CL:</strong>{" "}
                  {module.cl || "-"}

                  <br />

                  <strong>PL:</strong>{" "}
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

            </>

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
  (validPartA.length > 0 ||
    validPartB.length > 0) && (

    <section className="practical-components-section">

      {/* =================================================
          PRACTICAL TITLE
      ================================================= */}

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

          {/* ==========================================
              PART A HEADING
          =========================================== */}

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


          {/* ==========================================
              PART A EXPERIMENTS
          =========================================== */}

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


          {/* ==========================================
              PART B HEADING
          =========================================== */}

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


          {/* ==========================================
              PART B EXPERIMENTS
          =========================================== */}

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

                  {/* {experiment.title && (

                    <strong>
                      {experiment.title}:
                    </strong>

                  )} */}

                  {experiment.description && (

                    <span>
                      {" "}
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

  <tr className="resource-section-row">

    <td
      colSpan="2"
      className="resource-content-cell"
    >

      <div className="resource-title">
        Text Books
      </div>

      <ol>
        {references.textbooks.map(
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

)}


{/* =================================================
    REFERENCE BOOKS
================================================= */}

{references.referenceBooks?.length > 0 && (

  <tr className="resource-section-row">

    <td
      colSpan="2"
      className="resource-content-cell"
    >

      <div className="resource-title">
        Reference Books
      </div>

      <ol>
        {references.referenceBooks.map(
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

)}


{/* =================================================
    REFERENCE WEB LINKS
================================================= */}

{references.webLinks?.length > 0 && (

  <tr className="resource-section-row">

    <td
      colSpan="2"
      className="resource-content-cell"
    >

      <div className="resource-title">
        Reference Web Links:
      </div>

      <ol>
        {references.webLinks.map(
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

)}

        </tbody>

      </table>

    </section>

)}
       {/* =================================================
    LEARNING RESOURCES FOR NON-PRACTICAL COURSES
================================================= */}

{!courseRules.practicalComponents &&
  (references.textbooks?.length > 0 ||
    references.referenceBooks?.length > 0 ||
    references.webLinks?.length > 0) && (

    <table className="practical-components-table resources-only-table">

      <tbody>

        {/* ==========================================
            TEXT BOOKS
        =========================================== */}

        {references.textbooks?.length > 0 && (

          <tr className="resource-section-row">

            <td
              colSpan="2"
              className="resource-content-cell"
            >

              <div className="resource-title">
                Text Books
              </div>

              <ol>

                {references.textbooks.map(
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

        )}


        {/* ==========================================
            REFERENCE BOOKS
        =========================================== */}

        {references.referenceBooks?.length > 0 && (

          <tr className="resource-section-row">

            <td
              colSpan="2"
              className="resource-content-cell"
            >

              <div className="resource-title">
                Reference Books
              </div>

              <ol>

                {references.referenceBooks.map(
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

        )}


        {/* ==========================================
            REFERENCE WEB LINKS
        =========================================== */}

        {references.webLinks?.length > 0 && (

          <tr className="resource-section-row">

            <td
              colSpan="2"
              className="resource-content-cell"
            >

              <div className="resource-title">
                Reference Web Links:
              </div>

              <ol>

                {references.webLinks.map(
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





/* =========================================================
   ASSESSMENT MAPPING PREVIEW
========================================================= */

function AssessmentMappingPreview({
  data,
  outcomes,
}) {

  if (!data) {
    return (
      <div className="assessment-mapping-table">

        <div className="assessment-mapping-title">
          CO – Assessment Mapping
        </div>

        <div className="empty-preview">
          No assessment mapping entered.
        </div>

      </div>
    );
  }




  let mappingRows = [];


  if (
    typeof data === "object" &&
    !Array.isArray(data)
  ) {

    mappingRows = Object.entries(data).map(
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


  if (Array.isArray(data)) {

    mappingRows = data.map(
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


  return (

    <table className="assessment-mapping-table">

  <thead>

  {/* =================================================
      TITLE
  ================================================= */}

  <tr>
    <th
      colSpan="5"
      className="assessment-mapping-title"
    >
      CO – Assessment Mapping
    </th>
  </tr>


  {/* =================================================
      MAIN GROUP HEADER
  ================================================= */}

  <tr>

    {/* Course Outcomes spans all 3 header rows */}

    <th
      rowSpan="3"
      className="assessment-co-header"
    >
      Course
      <br />
      Outcomes
    </th>


    {/* CIA spans CIE I, CIE II and Assignment */}

    <th
      colSpan="3"
      className="assessment-cia-header"
    >
      Continuous Internal Assessment
    </th>


    {/* SEE only spans the next 2 rows */}

    <th
      rowSpan="2"
      className="assessment-see-header"
    >
      Semester End Exam
    </th>

  </tr>


  {/* =================================================
      ASSESSMENT TYPES
  ================================================= */}

  <tr>

    <th className="assessment-cie-header">
      CIE I
    </th>

    <th className="assessment-cie-header">
      CIE II
    </th>

    <th className="assessment-assignment-header">
      Assignment/
Activities
    
    </th>

  </tr>


  {/* =================================================
      PERCENTAGE
  ================================================= */}

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


      {/* =========================================
          DATA
      ========================================== */}

      <tbody>

        {mappingRows.map(
          (row, index) => (

            <tr key={index}>

              <td className="assessment-co">
                {row.co}
              </td>

              <td>
                {row.cie1 || ""}
              </td>

              <td>
                {row.cie2 || ""}
              </td>

              <td>
                {row.assignment || ""}
              </td>

              <td>
                {row.see || ""}
              </td>

            </tr>

          )
        )}

      </tbody>

    </table>

  );
}
/* =========================================================
   REFERENCES
========================================================= */

function ReferenceList({
  title,
  items = [],
}) {

  if (!items || items.length === 0) {
    return null;
  }


  return (
    <div className="reference-preview">

      <h3>
        {title}
      </h3>


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

    </div>
  );
}


export default SyllabusPreview;