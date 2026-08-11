


// import { useState } from "react";

// import SchemeSetup from "./components/SchemeSetup/SchemeSetup";
// import CourseForm from "./components/CourseForm/CourseForm";
// import DocumentPage from "./components/DocumentPage/DocumentPage";

// import "./App.css";

// function App() {
//   const [schemeData, setSchemeData] = useState(null);

//   const [courses, setCourses] = useState([]);

//   // Receives data from Scheme Setup
//   const handleSetupComplete = (data) => {
//     console.log("Scheme setup data:", data);

//     setSchemeData(data);
//   };

//   // Adds a new course
//   const handleAddCourse = (course) => {
//     setCourses((previousCourses) => [
//       ...previousCourses,
//       course,
//     ]);
//   };

//   // Before scheme setup is completed
//   if (!schemeData) {
//     return (
//       <SchemeSetup
//         onContinue={handleSetupComplete}
//       />
//     );
//   }

//   return (
//     <div className="app">

//       {/* Course Entry Section */}
//       <CourseForm
//         onAddCourse={handleAddCourse}
//       />

//       {/* A4 Preview */}
//       <DocumentPage
//         schemeData={{
//           ...schemeData,
//           courses: courses,
//         }}
//       />

//     </div>
//   );
// }

// export default App;









import { useState } from "react";

import SchemeSetup from "./components/SchemeSetup/SchemeSetup";
import CourseForm from "./components/CourseForm/CourseForm";
import DocumentPage from "./components/DocumentPage/DocumentPage";

import SyllabusGenerator from "./components/Syllabus/SyllabusGenerator";

import "./App.css";


function App() {

  // =====================================================
  // GENERATOR SELECTION
  // =====================================================

  const [generator, setGenerator] = useState(null);


  // =====================================================
  // SCHEME DATA
  // =====================================================

  const [schemeData, setSchemeData] = useState(null);

  const [courses, setCourses] = useState([]);


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


  // =====================================================
  // GENERATOR SELECTION SCREEN
  // =====================================================

  if (!generator) {

    return (
      <div className="generator-selection">

        <h1>
          Atria Curriculum Generator
        </h1>


        <div className="generator-cards">

          {/* ===============================
              SCHEME
          =============================== */}

          <div className="generator-card">

            <h2>
              Scheme Generator
            </h2>

            <p>
              Prepare Scheme of Teaching and Evaluation.
            </p>

            <button
              onClick={() => setGenerator("scheme")}
            >
              Open Scheme Generator
            </button>

          </div>


          {/* ===============================
              SYLLABUS
          =============================== */}

          <div className="generator-card">

            <h2>
              Syllabus Generator
            </h2>

            <p>
              Prepare course syllabus documents.
            </p>

            <button
              onClick={() => setGenerator("syllabus")}
            >
              Open Syllabus Generator
            </button>

          </div>

        </div>

      </div>
    );
  }


  // =====================================================
  // SYLLABUS GENERATOR
  // =====================================================

  if (generator === "syllabus") {

    return (
      <SyllabusGenerator
        onBack={() => setGenerator(null)}
      />
    );
  }


  // =====================================================
  // SCHEME SETUP
  // =====================================================

  if (!schemeData) {

    return (
      <SchemeSetup
        onContinue={handleSetupComplete}
      />
    );
  }


  // =====================================================
  // SCHEME GENERATOR
  // =====================================================

  return (
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
  );
}


export default App;