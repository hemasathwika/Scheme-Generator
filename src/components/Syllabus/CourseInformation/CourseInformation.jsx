import { useState } from "react";

import "./CourseInformation.css";

function CourseInformation({ onContinue, existingData }) {

  const [formData, setFormData] = useState(
    existingData || {
      courseTitle: "",
      semester: "",
      courseCode: "",
      courseType: "",
      ciaMarks: "",
      seeMarks: "",
      studentLearningHours: "",
      totalMarks: "",
      credits: "",
      examHours: "",
      examinationType: "",
    }
  );


  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };


  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = (event) => {

    event.preventDefault();

    onContinue(formData);
  };


  return (
    <div className="syllabus-course-information">

      <div className="course-information-card">

        <h2>
          Course Information
        </h2>


        <form onSubmit={handleSubmit}>

          {/* ==========================================
              COURSE TITLE
          =========================================== */}

          <div className="form-group">

            <label>
              Title of the Course
            </label>

            <input
              type="text"
              name="courseTitle"
              value={formData.courseTitle}
              onChange={handleChange}
              placeholder="Enter course title"
              required
            />

          </div>


          {/* ==========================================
              SEMESTER
          =========================================== */}

          <div className="form-group">

            <label>
              Semester
            </label>

            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Semester
              </option>

              <option value="I">
                I
              </option>

              <option value="II">
                II
              </option>

              <option value="III">
                III
              </option>

              <option value="IV">
                IV
              </option>

              <option value="V">
                V
              </option>

              <option value="VI">
                VI
              </option>

              <option value="VII">
                VII
              </option>

              <option value="VIII">
                VIII
              </option>

            </select>

          </div>


          {/* ==========================================
              COURSE CODE
          =========================================== */}

          <div className="form-group">

            <label>
              Course Code
            </label>

            <input
              type="text"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              placeholder="Enter course code"
              required
            />

          </div>


          {/* ==========================================
              COURSE TYPE
          =========================================== */}

          <div className="form-group">

            <label>
              Course Type
            </label>

            <select
              name="courseType"
              value={formData.courseType}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Course Type
              </option>

              <option value="IPCC">
                IPCC
              </option>

              <option value="PCC">
                PCC
              </option>

              <option value="PCCL">
                PCCL
              </option>

              <option value="PEC">
                PEC
              </option>

              <option value="OEC">
                OEC
              </option>

              <option value="HSMC">
                HSMC
              </option>

              <option value="AEC">
                AEC
              </option>

              <option value="PROJ">
                PROJ
              </option>

              <option value="NCMC">
                NCMC
              </option>

            </select>

          </div>


          {/* ==========================================
              CIA MARKS
          =========================================== */}

          <div className="form-group">

            <label>
              CIA Marks
            </label>

            <input
              type="number"
              name="ciaMarks"
              value={formData.ciaMarks}
              onChange={handleChange}
              placeholder="Enter CIA marks"
              min="0"
              required
            />

          </div>


          {/* ==========================================
              SEE MARKS
          =========================================== */}

          <div className="form-group">

            <label>
              SEE Marks
            </label>

            <input
              type="number"
              name="seeMarks"
              value={formData.seeMarks}
              onChange={handleChange}
              placeholder="Enter SEE marks"
              min="0"
              required
            />

          </div>


          {/* ==========================================
              STUDENT LEARNING HOURS
          =========================================== */}

          <div className="form-group">

            <label>
              Student Learning Hours (L:T:P:S)
            </label>

            <input
              type="text"
              name="studentLearningHours"
              value={formData.studentLearningHours}
              onChange={handleChange}
              placeholder="Example: 42:0:28:56"
              required
            />

          </div>


          {/* ==========================================
              TOTAL MARKS
          =========================================== */}

          <div className="form-group">

            <label>
              Total Marks
            </label>

            <input
              type="number"
              name="totalMarks"
              value={formData.totalMarks}
              onChange={handleChange}
              placeholder="Enter total marks"
              min="0"
              required
            />

          </div>


          {/* ==========================================
              CREDITS
          =========================================== */}

          <div className="form-group">

            <label>
              Credits
            </label>

            <input
              type="number"
              name="credits"
              value={formData.credits}
              onChange={handleChange}
              placeholder="Enter credits"
              min="0"
              step="0.5"
              required
            />

          </div>


          {/* ==========================================
              EXAM HOURS
          =========================================== */}

          <div className="form-group">

            <label>
              Exam Hours
            </label>

            <input
              type="text"
              name="examHours"
              value={formData.examHours}
              onChange={handleChange}
              placeholder="Example: 03"
              required
            />

          </div>


          {/* ==========================================
              EXAMINATION TYPE
          =========================================== */}

          <div className="form-group">

            <label>
              Examination Type (SEE)
            </label>

            <select
              name="examinationType"
              value={formData.examinationType}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Examination Type
              </option>

              <option value="Theory">
                Theory
              </option>

              <option value="Practical">
                Practical
              </option>

              <option value="Theory and Practical">
                Theory and Practical
              </option>

            </select>

          </div>


          {/* ==========================================
              CONTINUE
          =========================================== */}

          <div className="course-information-actions">

            <button
              type="submit"
              className="continue-button"
            >
              Continue
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CourseInformation;