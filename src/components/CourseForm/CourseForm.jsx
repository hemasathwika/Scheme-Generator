import { useState } from "react";

import "./CourseForm.css";

function CourseForm({ onAddCourse }) {

  const initialCourse = {
    courseType: "",
    courseCode: "",
    courseTitle: "",
    teachingDepartment: "",
    questionPaperBoard: "",

    lecture: "",
    tutorial: "",
    practical: "",
    selfStudy: "",
    totalHours: "",

    duration: "",
    cia: "",
    see: "",
    totalMarks: "",

    credits: "",
  };

  const [course, setCourse] = useState(initialCourse);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCourse((previousCourse) => ({
      ...previousCourse,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check required fields
    const emptyField = Object.entries(course).find(
      ([, value]) => value === ""
    );

    if (emptyField) {
      alert("Please fill in all course fields.");
      return;
    }

    const newCourse = {
      ...course,
      id: Date.now(),
    };

    console.log("New course:", newCourse);

    onAddCourse(newCourse);

    // Clear form
    setCourse(initialCourse);
  };

  return (
    <div className="course-form">

      <h2>Enter Course Details</h2>

      <form onSubmit={handleSubmit}>

        <div className="course-form-grid">

          {/* Course Type - DROPDOWN */}
          <div className="form-field">

            <label htmlFor="courseType">
              Course Type
            </label>

            <select
              id="courseType"
              name="courseType"
              value={course.courseType}
              onChange={handleChange}
            >
              <option value="">
                -- Select Course Type --
              </option>

              <option value="IPCC">
                IPCC
              </option>

              <option value="PCC">
                PCC
              </option>

              <option value="PEC">
                PEC
              </option>

              <option value="HSMC/AEC">
                HSMC/AEC
              </option>

              <option value="PCCL">
                PCCL
              </option>

              <option value="PROJ">
                PROJ
              </option>

              <option value="HSMC">
                HSMC
              </option>

            </select>

          </div>


          {/* Course Code */}
          <div className="form-field">

            <label htmlFor="courseCode">
              Course Code
            </label>

            <input
              id="courseCode"
              type="text"
              name="courseCode"
              value={course.courseCode}
              onChange={handleChange}
              placeholder="Enter course code"
            />

          </div>


          {/* Course Title */}
          <div className="form-field course-title-field">

            <label htmlFor="courseTitle">
              Course Title
            </label>

            <input
              id="courseTitle"
              type="text"
              name="courseTitle"
              value={course.courseTitle}
              onChange={handleChange}
              placeholder="Enter course title"
            />

          </div>


          {/* Teaching Department */}
          <div className="form-field">

            <label htmlFor="teachingDepartment">
              Teaching Department (TD)
            </label>

            <input
              id="teachingDepartment"
              type="text"
              name="teachingDepartment"
              value={course.teachingDepartment}
              onChange={handleChange}
              placeholder="Enter teaching department"
            />

          </div>


          {/* PSB */}
          <div className="form-field">

            <label htmlFor="questionPaperBoard">
              Question Paper Setting Board (PSB)
            </label>

            <input
              id="questionPaperBoard"
              type="text"
              name="questionPaperBoard"
              value={course.questionPaperBoard}
              onChange={handleChange}
              placeholder="Enter PSB"
            />

          </div>


          {/* Theory Lecture */}
          <div className="form-field">

            <label htmlFor="lecture">
              Theory Lecture
            </label>

            <input
              id="lecture"
              type="number"
              name="lecture"
              value={course.lecture}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />

          </div>


          {/* Tutorial */}
          <div className="form-field">

            <label htmlFor="tutorial">
              Tutorial
            </label>

            <input
              id="tutorial"
              type="number"
              name="tutorial"
              value={course.tutorial}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />

          </div>


          {/* Practical */}
          <div className="form-field">

            <label htmlFor="practical">
              Practical / Drawing
            </label>

            <input
              id="practical"
              type="number"
              name="practical"
              value={course.practical}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />

          </div>


          {/* Self Study */}
          <div className="form-field">

            <label htmlFor="selfStudy">
              Self-Study
            </label>

            <input
              id="selfStudy"
              type="number"
              name="selfStudy"
              value={course.selfStudy}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />

          </div>


          {/* Total Hours */}
          <div className="form-field">

            <label htmlFor="totalHours">
              Total Hours
            </label>

            <input
              id="totalHours"
              type="number"
              name="totalHours"
              value={course.totalHours}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />

          </div>


          {/* Duration */}
          <div className="form-field">

            <label htmlFor="duration">
              Duration in Hours
            </label>

            <input
              id="duration"
              type="number"
              name="duration"
              value={course.duration}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />

          </div>


          {/* CIA */}
          <div className="form-field">

            <label htmlFor="cia">
              CIA Marks
            </label>

            <input
              id="cia"
              type="number"
              name="cia"
              value={course.cia}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />

          </div>


          {/* SEE */}
          <div className="form-field">

            <label htmlFor="see">
              SEE Marks
            </label>

            <input
              id="see"
              type="number"
              name="see"
              value={course.see}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />

          </div>


          {/* Total Marks */}
          <div className="form-field">

            <label htmlFor="totalMarks">
              Total Marks
            </label>

            <input
              id="totalMarks"
              type="number"
              name="totalMarks"
              value={course.totalMarks}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />

          </div>


          {/* Credits */}
          <div className="form-field">

            <label htmlFor="credits">
              Credits
            </label>

            <input
              id="credits"
              type="text"
              name="credits"
              value={course.credits}
              onChange={handleChange}
              placeholder="Enter credits"
            />

          </div>

        </div>


        <button
          type="submit"
          className="add-course-button"
        >
          + Add Course
        </button>

      </form>

    </div>
  );
}

export default CourseForm;