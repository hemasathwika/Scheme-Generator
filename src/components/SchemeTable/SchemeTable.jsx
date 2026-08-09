import "./SchemeTable.css";

function SchemeTable({ courses = [] }) {

  // Calculate totals
  const totalCIA = courses.reduce(
    (sum, course) => sum + Number(course.cia || 0),
    0
  );

  const totalSEE = courses.reduce(
    (sum, course) => sum + Number(course.see || 0),
    0
  );

  const totalMarks = courses.reduce(
    (sum, course) => sum + Number(course.totalMarks || 0),
    0
  );

  const totalCredits = courses.reduce(
    (sum, course) => {
      const value = Number(course.credits);

      return sum + (Number.isNaN(value) ? 0 : value);
    },
    0
  );

  return (
    <table className="scheme-table">

      {/* =====================================================
          COLUMN WIDTHS
      ====================================================== */}

      <colgroup>

        <col className="col-sl" />
        <col className="col-course-type" />
        <col className="col-course-code" />
        <col className="col-course-title" />
        <col className="col-department" />
        <col className="col-psb" />

        {/* SLT */}
        <col className="col-slt" />
        <col className="col-slt" />
        <col className="col-slt" />
        <col className="col-slt" />
        <col className="col-slt-total" />

        {/* Assessment */}
        <col className="col-assessment" />
        <col className="col-assessment" />
        <col className="col-assessment" />
        <col className="col-assessment" />

        <col className="col-credits" />

      </colgroup>


      <thead>

        {/* =================================================
            HEADER ROW 1
        ================================================== */}

        <tr className="scheme-header-row-1">

          <th rowSpan="3">
            Sl.<br />
            No.
          </th>

          <th rowSpan="3">
            Course<br />
            Type
          </th>

          <th rowSpan="3">
            Course<br />
            Code
          </th>

          <th rowSpan="3">
            Course Title
          </th>

          <th rowSpan="3">
            Teaching<br />
            Department<br />
            (TD)
          </th>

          <th rowSpan="3">
            Question<br />
            Paper<br />
            Setting<br />
            Board<br />
            (PSB)
          </th>


          {/* STUDENT LEARNING HOURS */}

          <th colSpan="5">
            Student Learning Hours
            <br />
            (SLT)
          </th>


          {/* ASSESSMENT */}

          <th colSpan="4">
            Assessment
            <br />
            Information
          </th>


          <th rowSpan="3">
            Credits
          </th>

        </tr>


        {/* =================================================
            HEADER ROW 2
        ================================================== */}

        <tr className="scheme-header-row-2">

          {/* SLT - 5 columns */}

          <th>
            <div className="vertical-text">
              Theory
              <br />
              Lecture
            </div>
          </th>

          <th>
            <div className="vertical-text">
              Tutorial
            </div>
          </th>

          <th>
            <div className="vertical-text">
              Practical /
              <br />
              Drawing
            </div>
          </th>

          <th>
            <div className="vertical-text">
              Self-Study
            </div>
          </th>

          <th>
            <div className="vertical-text">
              Total
              <br />
              Hours
            </div>
          </th>


          {/* ASSESSMENT - 4 columns */}

          <th>
            <div className="vertical-text">
              Duration in
              <br />
              Hours
            </div>
          </th>

          <th>
            <div className="vertical-text">
              CIA
              <br />
              Marks
            </div>
          </th>

          <th>
            <div className="vertical-text">
              SEE
              <br />
              Marks
            </div>
          </th>

          <th>
            <div className="vertical-text">
              Total
              <br />
              Marks
            </div>
          </th>

        </tr>


        {/* =================================================
            HEADER ROW 3
            L T P S TOT
        ================================================== */}

        <tr className="scheme-header-row-3">

          <th>L</th>

          <th>T</th>

          <th>P</th>

          <th>S</th>

          <th>TOT</th>

        </tr>

      </thead>


      {/* =================================================
          COURSE DATA
      ================================================== */}

      <tbody>

        {courses.map((course, index) => (

          <tr key={course.id || index}>

            <td>
              {index + 1}
            </td>

            <td>
              {course.courseType}
            </td>

            <td className="course-code">
              {course.courseCode}
            </td>

            <td className="course-title">
              {course.courseTitle}
            </td>

            <td>
              {course.teachingDepartment}
            </td>

            <td>
              {course.questionPaperBoard}
            </td>

            {/* SLT */}

            <td>
              {course.lecture}
            </td>

            <td>
              {course.tutorial}
            </td>

            <td>
              {course.practical}
            </td>

            <td>
              {course.selfStudy}
            </td>

            <td>
              {course.totalHours}
            </td>

            {/* Assessment */}

            <td>
              {course.duration}
            </td>

            <td>
              {course.cia}
            </td>

            <td>
              {course.see}
            </td>

            <td>
              {course.totalMarks}
            </td>

            {/* Credits */}

            <td>
              {course.credits}
            </td>

          </tr>

        ))}

      </tbody>


      {/* =================================================
          TOTAL
      ================================================== */}

      <tfoot>

        <tr className="scheme-total-row">

          <td
            colSpan="12"
            className="scheme-total-label"
          >
            Total
          </td>

          <td>
            {totalCIA}
          </td>

          <td>
            {totalSEE}
          </td>

          <td>
            {totalMarks}
          </td>

          <td>
            {totalCredits}
          </td>

        </tr>

      </tfoot>

    </table>
  );
}

export default SchemeTable;