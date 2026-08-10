

// import { useState } from "react";

// import SchemeSetup from "./components/SchemeSetup/SchemeSetup";
// import DocumentPage from "./components/DocumentPage/DocumentPage";

// import "./App.css";

// function App() {

//   const [schemeData, setSchemeData] = useState(null);

//   const handleSetupComplete = (data) => {

//     console.log("Scheme data:", data);

//     setSchemeData(data);
//   };

//   if (!schemeData) {

//     return (
//       <SchemeSetup
//         onContinue={handleSetupComplete}
//       />
//     );
//   }

//   return (
//     <div className="app">

//       <DocumentPage
//         schemeData={schemeData}
//       />

//     </div>
//   );
// }

// export default App;


import { useState } from "react";

import SchemeSetup from "./components/SchemeSetup/SchemeSetup";
import CourseForm from "./components/CourseForm/CourseForm";
import DocumentPage from "./components/DocumentPage/DocumentPage";

import "./App.css";

function App() {
  const [schemeData, setSchemeData] = useState(null);

  const [courses, setCourses] = useState([]);

  // Receives data from Scheme Setup
  const handleSetupComplete = (data) => {
    console.log("Scheme setup data:", data);

    setSchemeData(data);
  };

  // Adds a new course
  const handleAddCourse = (course) => {
    setCourses((previousCourses) => [
      ...previousCourses,
      course,
    ]);
  };

  // Before scheme setup is completed
  if (!schemeData) {
    return (
      <SchemeSetup
        onContinue={handleSetupComplete}
      />
    );
  }

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