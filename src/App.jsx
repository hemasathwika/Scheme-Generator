// import { useState } from "react";

import SchemeSetup from "./components/SchemeSetup/SchemeSetup";
import CourseForm from "./components/CourseForm/CourseForm";
import DocumentPage from "./components/DocumentPage/DocumentPage";

import SyllabusGenerator from "./components/Syllabus/SyllabusGenerator";

import "./App.css";
import { useEffect, useState } from "react";

function App() {

  // =====================================================
  // GENERATOR SELECTION
  // =====================================================

  // const [generator, setGenerator] = useState(null);
const [generator, setGenerator] = useState(() => {
  const path = window.location.pathname;

  if (path.startsWith("/syllabus")) {
    return "syllabus";
  }

  if (path.startsWith("/scheme")) {
    return "scheme";
  }

  return null;
});

// =====================================================
// BROWSER HISTORY NAVIGATION
// =====================================================

useEffect(() => {

  const handlePopState = () => {

    const path = window.location.pathname;

    if (path === "/" || path === "") {

      setGenerator(null);
      setSchemeData(null);
      setCourses([]);

      return;
    }

    if (path.startsWith("/syllabus")) {

      setGenerator("syllabus");

      return;
    }

    if (path.startsWith("/scheme")) {

      setGenerator("scheme");

    }

  };

  window.addEventListener(
    "popstate",
    handlePopState
  );

  return () => {

    window.removeEventListener(
      "popstate",
      handlePopState
    );

  };

}, []);

  // =====================================================
  // SCHEME DATA
  // =====================================================

  const [schemeData, setSchemeData] = useState(null);

  const [courses, setCourses] = useState([]);


  //new add on pratyusha 
  // =====================================================
// BACK TO HOME
// =====================================================

const handleBackToHome = () => {
  setGenerator(null);
  setSchemeData(null);
  setCourses([]);
};

  // =====================================================
  // SCHEME SETUP
  // =====================================================

  const handleSetupComplete = (data) => {

    console.log("Scheme setup data:", data);

    setSchemeData(data);
  };


  // =====================================================
  // ADD COURSE
  // =====================================================

  const handleAddCourse = (course) => {

    setCourses((previousCourses) => [
      ...previousCourses,
      course,
    ]);
  };





if (!generator) {

  return (
    <div className="generator-selection">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="landing-header">

        <div className="landing-brand">

          <img
            src="/assets/atria-logo.png"
            alt="Atria Institute of Technology"
          />

          <div className="brand-text">

            <span className="brand-name">
              ATRIA INSTITUTE OF TECHNOLOGY
            </span>

            <span className="brand-location">
              Bengaluru
            </span>

          </div>

        </div>


        <div className="system-label">
          Academic Document Generation System
        </div>

      </header>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="landing-main">


        {/* =================================================
            HERO SECTION
        ================================================= */}

        <section className="hero-section">

          <div className="hero-badge">
            CURRICULUM MANAGEMENT SYSTEM
          </div>


          <h1>
            Atria Curriculum
            <span> Generator</span>
          </h1>


          <p className="hero-description">
            Create, manage and prepare structured academic
            curriculum documents with a consistent,
            professional institutional format.
          </p>


          <div className="hero-line"></div>

        </section>



        {/* =================================================
            FEATURES
        ================================================= */}

        <section className="feature-strip">

          <div className="feature-item">

            <div className="feature-number">
              01
            </div>

            <div>

              <h3>
                Structured
              </h3>

              <p>
                Organize academic information in a
                standardized format.
              </p>

            </div>

          </div>


          <div className="feature-item">

            <div className="feature-number">
              02
            </div>

            <div>

              <h3>
                Flexible
              </h3>

              <p>
                Enter semester, course and assessment
                information based on your requirements.
              </p>

            </div>

          </div>


          <div className="feature-item">

            <div className="feature-number">
              03
            </div>

            <div>

              <h3>
                Print Ready
              </h3>

              <p>
                Preview your document and generate a
                professional A4 PDF.
              </p>

            </div>

          </div>

        </section>



        {/* =================================================
            GENERATOR SECTION
        ================================================= */}

        <section className="generator-section">

          <div className="section-heading">

            <h2>
              What would you like to prepare?
            </h2>

          </div>


          <div className="generator-cards">


            {/* =========================================
                SCHEME CARD
            ========================================== */}

            <div className="generator-card scheme-card">

              <div className="card-top">

                <div className="card-icon scheme-icon">
                  S
                </div>

                <span className="card-label">
                  MODULE 01
                </span>

              </div>


              <h2>
                Scheme Generator
              </h2>


              <p>
                Prepare the Scheme of Teaching and
                Evaluation with course details, student
                learning hours, assessment information,
                credits and semester-wise curriculum data.
              </p>


              <div className="card-features">

                <span>
                  ✓ Semester based
                </span>

                <span>
                  ✓ Course management
                </span>

                <span>
                  ✓ A4 landscape preview
                </span>

                <span>
                  ✓ PDF ready
                </span>

              </div>


              <button
                onClick={() => setGenerator("scheme")}
              >
                Open Scheme Generator

                <span className="button-arrow">
                  →
                </span>

              </button>

            </div>



            {/* =========================================
                SYLLABUS CARD
            ========================================== */}

            <div className="generator-card syllabus-card">

              <div className="card-top">

                <div className="card-icon syllabus-icon">
                  Y
                </div>

                <span className="card-label">
                  MODULE 02
                </span>

              </div>


              <h2>
                Syllabus Generator
              </h2>


              <p>
                Prepare structured course syllabus
                documents containing course information,
                learning outcomes, modules, references
                and other academic details.
              </p>


              <div className="card-features">

                <span>
                  ✓ Course based
                </span>

                <span>
                  ✓ Structured content
                </span>

                <span>
                  ✓ Document preview
                </span>

                <span>
                  ✓ PDF ready
                </span>

              </div>


              {/* <button
                onClick={() => setGenerator("syllabus")}
              > */}
              <button
  onClick={() => {

    window.history.pushState(
      {},
      "",
      "/syllabus"
    );

    setGenerator("syllabus");

  }}
>
                Open Syllabus Generator

                <span className="button-arrow">
                  →
                </span>

              </button>

            </div>

          </div>

        </section>



        {/* =================================================
            WHAT YOU CAN PREPARE
        ================================================= */}

        <section className="document-types-section">

          <div className="section-heading">

            <span>
              ACADEMIC DOCUMENTS
            </span>

            <h2>
              What you can prepare
            </h2>

            <p>
              Create structured curriculum documents using
              dedicated modules designed for academic preparation.
            </p>

          </div>


          <div className="document-type-grid">


            {/* =========================================
                SCHEME DOCUMENT
            ========================================== */}

            <div className="document-type-card">

              <div className="document-type-icon scheme-document-icon">
                S
              </div>


              <div className="document-type-content">

                <h3>
                  Scheme of Teaching and Evaluation
                </h3>

                <p>
                  Prepare semester-wise scheme information
                  with course details, teaching departments,
                  student learning hours, assessment
                  information and credits.
                </p>


                <div className="document-tags">

                  <span>
                    Semester
                  </span>

                  <span>
                    Courses
                  </span>

                  <span>
                    SLT
                  </span>

                  <span>
                    Assessment
                  </span>

                  <span>
                    Credits
                  </span>

                </div>

              </div>

            </div>



            {/* =========================================
                SYLLABUS DOCUMENT
            ========================================== */}

            <div className="document-type-card">

              <div className="document-type-icon syllabus-document-icon">
                Y
              </div>


              <div className="document-type-content">

                <h3>
                  Course Syllabus
                </h3>

                <p>
                  Prepare detailed course syllabus
                  documents with structured academic
                  information and course-related content.
                </p>


                <div className="document-tags">

                  <span>
                    Course Details
                  </span>

                  <span>
                    Outcomes
                  </span>

                  <span>
                    Modules
                  </span>

                  <span>
                    References
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* =================================================
            KEY CAPABILITIES
        ================================================= */}

        <section className="capabilities-section">

          <div className="section-heading">

            <span>
              BUILT FOR ACADEMIC WORK
            </span>

            <h2>
              Key capabilities
            </h2>

          </div>


          <div className="capability-grid">


            <div className="capability-card">

              <div className="capability-icon">
                ✓
              </div>

              <h3>
                Structured Data Entry
              </h3>

              <p>
                Enter academic information through
                organized forms instead of manually
                formatting documents.
              </p>

            </div>



            <div className="capability-card">

              <div className="capability-icon">
                ↗
              </div>

              <h3>
                Live Preview
              </h3>

              <p>
                Review the formatted document before
                generating the final document.
              </p>

            </div>



            <div className="capability-card">

              <div className="capability-icon">
                A4
              </div>

              <h3>
                A4 Document Format
              </h3>

              <p>
                Preview academic documents in a
                structured print-ready page layout.
              </p>

            </div>



            <div className="capability-card">

              <div className="capability-icon">
                PDF
              </div>

              <h3>
                PDF Generation
              </h3>

              <p>
                Generate the completed document as a
                PDF after reviewing the final preview.
              </p>

            </div>

          </div>

        </section>



        {/* =================================================
            BEFORE YOU BEGIN
        ================================================= */}

        <section className="before-section">

          <div className="before-content">


            {/* LEFT SIDE */}

            <div className="before-heading">

              <span>
                QUICK CHECK
              </span>

              <h2>
                Before you begin
              </h2>

              <p>
                Keep the required academic information
                ready before starting the document
                preparation process.
              </p>

            </div>



            {/* RIGHT SIDE */}

            <div className="before-list">


              <div className="before-item">

                <span className="before-check">
                  01
                </span>

                <div>

                  <h3>
                    Semester Information
                  </h3>

                  <p>
                    Select the semester and provide
                    the required scheme information.
                  </p>

                </div>

              </div>



              <div className="before-item">

                <span className="before-check">
                  02
                </span>

                <div>

                  <h3>
                    Course Details
                  </h3>

                  <p>
                    Keep course codes, titles, course
                    types and department information ready.
                  </p>

                </div>

              </div>



              <div className="before-item">

                <span className="before-check">
                  03
                </span>

                <div>

                  <h3>
                    Hours & Assessment
                  </h3>

                  <p>
                    Enter learning hours, duration,
                    CIA, SEE, total marks and credits
                    as applicable.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* =================================================
            HOW IT WORKS
        ================================================= */}

        <section className="workflow-section">

          <div className="section-heading">

            <h2>
              Prepare your document in a few steps
            </h2>

          </div>


          <div className="workflow">


            {/* STEP 1 */}

            <div className="workflow-step">

              <div className="step-circle">
                1
              </div>

              <h3>
                Enter Details
              </h3>

              <p>
                Provide the required academic
                information.
              </p>

            </div>


            <div className="workflow-connector"></div>


            {/* STEP 2 */}

            <div className="workflow-step">

              <div className="step-circle">
                2
              </div>

              <h3>
                Add Courses
              </h3>

              <p>
                Enter course and assessment details.
              </p>

            </div>


            <div className="workflow-connector"></div>


            {/* STEP 3 */}

            <div className="workflow-step">

              <div className="step-circle">
                3
              </div>

              <h3>
                Preview
              </h3>

              <p>
                Review the formatted document.
              </p>

            </div>


            <div className="workflow-connector"></div>


            {/* STEP 4 */}

            <div className="workflow-step">

              <div className="step-circle">
                4
              </div>

              <h3>
                Download
              </h3>

              <p>
                Generate the final PDF document.
              </p>

            </div>

          </div>

        </section>


      </main>



      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="landing-footer">

        <div>
          Atria Institute of Technology
        </div>

        <div>
          Curriculum & Academic Document Generator
        </div>

        <div>
          2026
        </div>

      </footer>

    </div>
  );
}

  // =====================================================
  // SYLLABUS GENERATOR
  // =====================================================


  

//pratyusha code
  if (generator === "syllabus") {

  return (
    <SyllabusGenerator
      onBack={handleBackToHome}
    />
  );
}


  // =====================================================
  // SCHEME SETUP
  // =====================================================




//pratyusha code 
if (!schemeData) {

  return (
    <div className="scheme-module-page">

      <button
        className="back-home-button"
        onClick={handleBackToHome}
      >
        ← Back to Home
      </button>

      <SchemeSetup
        onContinue={handleSetupComplete}
      />

    </div>
  );
}

  // =====================================================
  // SCHEME GENERATOR
  // =====================================================




  //pratyusha code 
  return (
  <div className="scheme-module-page">

    {/* =================================================
        BACK TO HOME
    ================================================= */}

    <div className="module-navigation">

      <button
        className="back-home-button"
        onClick={handleBackToHome}
      >
        ← Back to Home
      </button>

    </div>


    {/* =================================================
        SCHEME GENERATOR
    ================================================= */}

    <div className="app">

      {/* Course Entry Section */}

      <CourseForm
        onAddCourse={handleAddCourse}
      />


      {/* A4 Preview */}

      <DocumentPage
        schemeData={{
          ...schemeData,
          courses: courses,
        }}
      />

    </div>

  </div>
);
}


export default App;