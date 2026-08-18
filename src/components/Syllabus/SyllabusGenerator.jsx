// import { useState } from "react";
import { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation/CourseInformation";
import CourseOutcomes from "./CourseOutcomes/CourseOutcomes";
import AssessmentMapping from "./AssessmentMapping/AssessmentMapping";
import CourseContents from "./CourseContents/CourseContents";
import PracticalComponents from "./PracticalComponents/PracticalComponents";
import References from "./References/References";
import SyllabusPreview from "./SyllabusPreview/SyllabusPreview";

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

  // Future use
  PROJ: {
    assessmentMapping: false,
    courseContents: false,
    practicalComponents: false,
  },

  // Future use
  NCMC: {
    assessmentMapping: false,
    courseContents: false,
    practicalComponents: false,
  },
};



function SyllabusGenerator({ onBack }) {

  // =====================================================
  // CENTRAL SYLLABUS DATA
  // =====================================================

  const [syllabusData, setSyllabusData] = useState({

    courseInformation: null,

    courseOutcomes: [],

    assessmentMapping: null,

    modules: [],

    practicalComponents: {
      partA: [],
      partB: [],
    },

    references: {
      textbooks: [],
      referenceBooks: [],
      webLinks: [],
    },

  });


  // =====================================================
  // CURRENT SECTION
  // =====================================================

  const [currentSection, setCurrentSection] = useState(
    "courseInformation"
  );


  // =====================================================
  // MODE
  // =====================================================

  const [mode, setMode] = useState("edit");
  // =====================================================
// BROWSER HISTORY NAVIGATION
// =====================================================

const sectionPaths = {
  courseInformation:
    "/syllabus/course-information",

  courseOutcomes:
    "/syllabus/course-outcomes",

  assessmentMapping:
    "/syllabus/assessment-mapping",

  modules:
    "/syllabus/modules",

  practicalComponents:
    "/syllabus/practical-components",

  references:
    "/syllabus/references",

  preview:
    "/syllabus/preview",
};


// =====================================================
// CHANGE SECTION + BROWSER URL
// =====================================================

const navigateToSection = (section) => {

  const path =
    sectionPaths[section];

  if (!path) {
    return;
  }

  window.history.pushState(
    {},
    "",
    path
  );

  setCurrentSection(section);

  setMode(
    section === "preview"
      ? "preview"
      : "edit"
  );
};

// =====================================================
// HANDLE BROWSER BACK / FORWARD
// =====================================================

useEffect(() => {

  const handlePopState = () => {

    const currentPath =
      window.location.pathname;

    const matchedSection =
      Object.entries(sectionPaths)
        .find(
          ([, path]) =>
            path === currentPath
        );

    if (matchedSection) {

      const section =
        matchedSection[0];

      setCurrentSection(section);

      setMode(
        section === "preview"
          ? "preview"
          : "edit"
      );

      return;
    }

    if (
      currentPath === "/syllabus" ||
      currentPath === "/"
    ) {

      setCurrentSection(
        "courseInformation"
      );

      setMode("edit");

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
  // COURSE INFORMATION
  // =====================================================

  const handleCourseInformationComplete = (data) => {

    console.log(
      "Syllabus course information:",
      data
    );

    setSyllabusData((previousData) => ({
      ...previousData,
      courseInformation: data,
    }));

    // setCurrentSection("courseOutcomes");
    navigateToSection("courseOutcomes");
  };


  // =====================================================
  // COURSE OUTCOMES
  // =====================================================

  // const handleCourseOutcomesComplete = (data) => {

  //   setSyllabusData((previousData) => ({
  //     ...previousData,
  //     courseOutcomes: data,
  //   }));

  //   setCurrentSection("assessmentMapping");
  // };
const handleCourseOutcomesComplete = (data) => {

  setSyllabusData((previousData) => ({
    ...previousData,
    courseOutcomes: data,
  }));


  const courseType =
    syllabusData.courseInformation?.courseType;

  const rules =
    COURSE_TYPE_RULES[courseType];


  // if (rules?.assessmentMapping) {

  //   setCurrentSection("assessmentMapping");

  // } else if (rules?.courseContents) {

  //   setCurrentSection("modules");

  // } else if (rules?.practicalComponents) {

  //   setCurrentSection("practicalComponents");

  // } else {

  //   setCurrentSection("references");

  // }

  if (rules?.assessmentMapping) {

  navigateToSection("assessmentMapping");

} else if (rules?.courseContents) {

  navigateToSection("modules");

} else if (rules?.practicalComponents) {

  navigateToSection("practicalComponents");

} else {

  navigateToSection("references");

}
};

  // =====================================================
  // ASSESSMENT MAPPING
  // =====================================================

  // const handleAssessmentMappingComplete = (data) => {

  //   setSyllabusData((previousData) => ({
  //     ...previousData,
  //     assessmentMapping: data,
  //   }));

  //   setCurrentSection("modules");
  // };
const handleAssessmentMappingComplete = (data) => {

  setSyllabusData((previousData) => ({
    ...previousData,
    assessmentMapping: data,
  }));


  const courseType =
    syllabusData.courseInformation?.courseType;

  const rules =
    COURSE_TYPE_RULES[courseType];


  // if (rules?.courseContents) {

  //   setCurrentSection("modules");

  // } else if (rules?.practicalComponents) {

  //   setCurrentSection("practicalComponents");

  // } else {

  //   setCurrentSection("references");

  // }

  if (rules?.courseContents) {

  navigateToSection("modules");

} else if (rules?.practicalComponents) {

  navigateToSection("practicalComponents");

} else {

  navigateToSection("references");

}
};

  // =====================================================
  // MODULES
  // =====================================================

  // const handleModulesComplete = (data) => {

  //   setSyllabusData((previousData) => ({
  //     ...previousData,
  //     modules: data,
  //   }));

  //   setCurrentSection("practicalComponents");
  // };

  const handleModulesComplete = (data) => {

  setSyllabusData((previousData) => ({
    ...previousData,
    modules: data,
  }));


  const courseType =
    syllabusData.courseInformation?.courseType;

  const rules =
    COURSE_TYPE_RULES[courseType];


  // if (rules?.practicalComponents) {

  //   setCurrentSection("practicalComponents");

  // } else {

  //   setCurrentSection("references");

  // }

  if (rules?.practicalComponents) {

  navigateToSection("practicalComponents");

} else {

  navigateToSection("references");

}
};


  // =====================================================
  // PRACTICAL COMPONENTS
  // =====================================================

  const handlePracticalComponentsComplete = (data) => {

    setSyllabusData((previousData) => ({
      ...previousData,
      practicalComponents: data,
    }));

    // setCurrentSection("references");

    navigateToSection("references");
  };


  // =====================================================
  // REFERENCES
  // =====================================================

  const handleReferencesComplete = (data) => {

    setSyllabusData((previousData) => ({
      ...previousData,
      references: data,
    }));

    // setMode("preview");
    navigateToSection("preview");
  };


  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = () => {

    setMode("edit");

    setCurrentSection("courseInformation");
  };


  // =====================================================
  // SAVE CHANGES
  // =====================================================

  const handleSaveChanges = () => {

    setMode("preview");
  };


  // =====================================================
  // PREVIEW MODE
  // =====================================================

  if (mode === "preview") {

    return (
      <SyllabusPreview
        syllabusData={syllabusData}
        onEdit={handleEdit}
      />
    );
  }


  // =====================================================
  // COURSE INFORMATION
  // =====================================================

  if (currentSection === "courseInformation") {

    return (
      <div>

        <div
          style={{
            padding: "15px 25px",
            background: "#ffffff",
            borderBottom: "1px solid #ddd",
          }}
        >

          <button
            type="button"
            onClick={onBack}
          >
            ← Back to Generators
          </button>

        </div>


        <CourseInformation
          existingData={
            syllabusData.courseInformation
          }

          onContinue={
            handleCourseInformationComplete
          }
        />

      </div>
    );
  }


  // =====================================================
  // COURSE OUTCOMES
  // =====================================================

  if (currentSection === "courseOutcomes") {

    return (
      <CourseOutcomes
        existingData={
          syllabusData.courseOutcomes
        }

        // onBack={() =>
        //   setCurrentSection(
        //     "courseInformation"
        //   )
        // }

        onBack={() => {
  window.history.back();
}}

        onContinue={
          handleCourseOutcomesComplete
        }
      />
    );
  }


  // =====================================================
  // ASSESSMENT MAPPING
  // =====================================================

  if (currentSection === "assessmentMapping") {

    return (
      <AssessmentMapping
        courseOutcomes={
          syllabusData.courseOutcomes
        }

        existingData={
          syllabusData.assessmentMapping
        }

        // onBack={() =>
        //   setCurrentSection(
        //     "courseOutcomes"
        //   )
        // }
        onBack={() => {
  window.history.back();
}}

        onContinue={
          handleAssessmentMappingComplete
        }
      />
    );
  }


  // =====================================================
  // COURSE CONTENTS / MODULES
  // =====================================================

  if (currentSection === "modules") {

    return (
      <CourseContents
        courseOutcomes={
          syllabusData.courseOutcomes
        }

        existingData={
          syllabusData.modules
        }

        // onBack={() =>
        //   setCurrentSection(
        //     "assessmentMapping"
        //   )
        // }
        onBack={() => {
  window.history.back();
}}

        onContinue={
          handleModulesComplete
        }
      />
    );
  }


  // =====================================================
  // PRACTICAL COMPONENTS
  // =====================================================

  if (
    currentSection ===
    "practicalComponents"
  ) {

    return (
      <PracticalComponents
        existingData={
          syllabusData.practicalComponents
        }

//         onBack={() => {

//   const courseType =
//     syllabusData.courseInformation?.courseType;

//   const rules =
//     COURSE_TYPE_RULES[courseType];


//   if (rules?.courseContents) {

//     setCurrentSection("modules");

//   } else {

//     setCurrentSection("courseOutcomes");

//   }

// }}

onBack={() => {
  window.history.back();
}}

        onContinue={
          handlePracticalComponentsComplete
        }
      />
    );
  }


  // =====================================================
  // REFERENCES
  // =====================================================

  if (currentSection === "references") {

    return (
      <References
        existingData={
          syllabusData.references
        }

        // onBack={() =>
        //   setCurrentSection(
        //     "practicalComponents"
        //   )
        // }
//         onBack={() => {

//   const courseType =
//     syllabusData.courseInformation?.courseType;

//   const rules =
//     COURSE_TYPE_RULES[courseType];


//   if (rules?.practicalComponents) {

//     setCurrentSection(
//       "practicalComponents"
//     );

//   } else if (rules?.courseContents) {

//     setCurrentSection(
//       "modules"
//     );

//   } else if (rules?.assessmentMapping) {

//     setCurrentSection(
//       "assessmentMapping"
//     );

//   } else {

//     setCurrentSection(
//       "courseOutcomes"
//     );

//   }

// }}

onBack={() => {
  window.history.back();
}}

        onContinue={
          handleReferencesComplete
        }
      />
    );
  }


  // =====================================================
  // FALLBACK
  // =====================================================

  return (
    <div
      style={{
        padding: "40px",
        color: "#dc2626",
      }}
    >

      <h2>
        Something went wrong.
      </h2>

      <p>
        Current section:
        {" "}
        {currentSection}
      </p>

    </div>
  );
}


export default SyllabusGenerator;