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
            HEADER
        ================================================= */}

        {/* <div className="syllabus-header">

          <div className="syllabus-logo-box">
            <img
              src="/assets/atria-logo.png"
              alt="Atria Institute of Technology"
            />
          </div>


          <div className="syllabus-header-title">

            <div className="institution-name">
              Atria Institute of Technology
            </div>

            <div className="document-title">
              SYLLABUS
            </div>

            <div className="document-subtitle">
              OUTCOME BASED EDUCATION (OBE)
            </div>

          </div>

        </div> */}

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
            ABBREVIATIONS
        ================================================= */}

        {/* <section className="syllabus-section">

          <h2 className="section-title">
            COURSE TERMINOLOGY
          </h2>


          <div className="terminology-grid">

            <div>
              <strong>L</strong> - Lecture
            </div>

            <div>
              <strong>T</strong> - Tutorial
            </div>

            <div>
              <strong>P</strong> - Practical
            </div>

            <div>
              <strong>S</strong> - Self Study
            </div>

            <div>
              <strong>CL</strong> - Cognitive Level
            </div>

            <div>
              <strong>PL</strong> - Psychomotor Level
            </div>

          </div>

        </section> */}

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

        <section className="syllabus-section">

          <h2 className="section-title">
            COURSE OUTCOMES
          </h2>


          <table className="co-table">

            <thead>
              <tr>
                <th>CO</th>
                <th>
                  Course Outcome: At the end of the course,
                  the students will be able to
                </th>
                <th>CL</th>
                <th>PL</th>
              </tr>
            </thead>


            <tbody>

              {outcomes.map(
                (outcome, index) => (

                  <tr key={index}>

                    <td>
                      {outcome.code ||
                        `CO${index + 1}`}
                    </td>

                    <td className="text-left">
                      {outcome.description ||
                        outcome.outcome ||
                        "-"}
                    </td>

                    <td>
                      {outcome.cl || "-"}
                    </td>

                    <td>
                      {outcome.pl || "-"}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </section>


        {/* =================================================
            ASSESSMENT MAPPING
        ================================================= */}

        <section className="syllabus-section">

          <h2 className="section-title">
            CO – ASSESSMENT MAPPING
          </h2>


          <AssessmentMappingPreview
            data={
              syllabusData.assessmentMapping
            }
            outcomes={outcomes}
          />

        </section>


        {/* =================================================
            COURSE CONTENTS
        ================================================= */}

        <section className="syllabus-section">

          <h2 className="section-title">
            COURSE CONTENTS
          </h2>


          {modules.map(
            (module, index) => (

              <div
                className="module-preview"
                key={index}
              >

                <div className="module-title">
                  Module {module.moduleNumber ||
                    index + 1}
                </div>


                <div className="module-meta">

                  <span>
                    <strong>CO:</strong>{" "}
                    {module.co || "-"}
                  </span>

                  <span>
                    <strong>CL:</strong>{" "}
                    {module.cl || "-"}
                  </span>

                  <span>
                    <strong>PL:</strong>{" "}
                    {module.pl || "-"}
                  </span>

                </div>


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

              </div>

            )
          )}

        </section>


        {/* =================================================
            PRACTICAL COMPONENTS
        ================================================= */}

        {(practical.partA?.length > 0 ||
          practical.partB?.length > 0) && (

          <section className="syllabus-section">

            <h2 className="section-title">
              PRACTICAL COMPONENTS
            </h2>


            {practical.partA?.length > 0 && (

              <div className="practical-preview">

                <h3>
                  PART – A: CONVENTIONAL EXPERIMENTS
                </h3>


                {practical.partA.map(
                  (experiment, index) => (

                    <div
                      className="experiment-preview"
                      key={index}
                    >

                      <strong>
                        {experiment.number ||
                          index + 1}.{" "}
                        {experiment.title ||
                          "Experiment"}
                      </strong>


                      <p>
                        {experiment.description ||
                          "-"}
                      </p>

                    </div>

                  )
                )}

              </div>

            )}


            {practical.partB?.length > 0 && (

              <div className="practical-preview">

                <h3>
                  PART – B: TYPICAL OPEN-ENDED
                  EXPERIMENTS
                </h3>


                {practical.partB.map(
                  (experiment, index) => (

                    <div
                      className="experiment-preview"
                      key={index}
                    >

                      <strong>
                        {experiment.number ||
                          index + 1}.{" "}
                        {experiment.title ||
                          "Experiment"}
                      </strong>


                      <p>
                        {experiment.description ||
                          "-"}
                      </p>

                    </div>

                  )
                )}

              </div>

            )}

          </section>

        )}


        {/* =================================================
            LEARNING RESOURCES
        ================================================= */}

        <section className="syllabus-section">

          <h2 className="section-title">
            SUGGESTED LEARNING RESOURCES
          </h2>


          <ReferenceList
            title="Text Books"
            items={references.textbooks}
          />


          <ReferenceList
            title="Reference Books"
            items={references.referenceBooks}
          />


          <ReferenceList
            title="Reference Web Links"
            items={references.webLinks}
          />

        </section>


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
   ASSESSMENT MAPPING
========================================================= */

// function AssessmentMappingPreview({
//   data,
//   outcomes,
// }) {

//   if (!data) {
//     return (
//       <p className="empty-preview">
//         No assessment mapping entered.
//       </p>
//     );
//   }


//   /*
//     This safely displays the current mapping data
//     while we finalize the exact mapping structure.
//   */

//   if (Array.isArray(data)) {

//     return (
//       <table className="mapping-table">

//         <tbody>

//           {data.map((row, index) => (

//             <tr key={index}>

//               {Object.values(row).map(
//                 (value, valueIndex) => (

//                   <td key={valueIndex}>
//                     {String(value || "-")}
//                   </td>

//                 )
//               )}

//             </tr>

//           ))}

//         </tbody>

//       </table>
//     );
//   }


//   return (
//     <div className="mapping-data">

//       {Object.entries(data).map(
//         ([key, value]) => (

//           <div
//             className="mapping-row"
//             key={key}
//           >

//             <strong>
//               {key}
//             </strong>

//             <span>
//               {typeof value === "object"
//                 ? JSON.stringify(value)
//                 : String(value || "-")}
//             </span>

//           </div>

//         )
//       )}

//     </div>
//   );
// }


function AssessmentMappingPreview({
  data,
  outcomes,
}) {

  if (!data) {
    return (
      <p className="empty-preview">
        No assessment mapping entered.
      </p>
    );
  }


  // =====================================================
  // ASSESSMENT MAPPING TABLE
  // =====================================================

  let mappingRows = [];


  /*
    The Assessment Mapping component currently stores
    the mapping in an object where each CO contains:

    cie1
    cie2
    assignment
    see
  */

  if (
    typeof data === "object" &&
    !Array.isArray(data)
  ) {

    mappingRows = Object.entries(data).map(
      ([co, mapping]) => ({
        co,
        cie1: mapping?.cie1 || "",
        cie2: mapping?.cie2 || "",
        assignment:
          mapping?.assignment || "",
        see: mapping?.see || "",
      })
    );

  }


  /*
    If the data is already an array,
    support that structure as well.
  */

  else if (Array.isArray(data)) {

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


  if (mappingRows.length === 0) {

    return (
      <p className="empty-preview">
        No assessment mapping entered.
      </p>
    );

  }


  return (
    <table className="mapping-table">

      <thead>

        <tr>

          <th>
            CO
          </th>

          <th>
            CIE 1
          </th>

          <th>
            CIE 2
          </th>

          <th>
            Assignment
          </th>

          <th>
            SEE
          </th>

        </tr>

      </thead>


      <tbody>

        {mappingRows.map(
          (row, index) => (

            <tr key={index}>

              <td>
                {row.co}
              </td>

              <td>
                {row.cie1 || "—"}
              </td>

              <td>
                {row.cie2 || "—"}
              </td>

              <td>
                {row.assignment || "—"}
              </td>

              <td>
                {row.see || "—"}
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