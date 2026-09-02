
import { Fragment } from "react";
// import html2pdf from "html2pdf.js";
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
  try {
    const syllabusElement =
      document.getElementById("syllabus-document");

    if (!syllabusElement) {
      alert("Syllabus document not found.");
      return;
    }

    // Get the complete syllabus HTML
    const html = syllabusElement.outerHTML;

    // Send HTML to backend
    const response = await fetch(
      "http://localhost:5000/api/pdf/syllabus",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          html,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to generate PDF."
      );
    }

    // Convert response into PDF blob
    const blob = await response.blob();

    // Create temporary download URL
    const url =
      window.URL.createObjectURL(blob);

    // Create download link
    const link =
      document.createElement("a");

    link.href = url;

    const courseCode =
      course?.courseCode?.trim() ||
      "Syllabus";

    link.download =
      `Syllabus-${courseCode}.pdf`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    // Clean up
    window.URL.revokeObjectURL(url);

  } catch (error) {

    console.error(
      "PDF GENERATION ERROR:",
      error
    );

    alert(
      "PDF generation failed. Please check the browser console."
    );
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

      <div className="syllabus-a4-page" id = "syllabus-document">


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