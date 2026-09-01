

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
// COMPONENT
// =====================================================

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

  const [currentSection, setCurrentSection] =
    useState("courseInformation");


  // =====================================================
  // MODE
  // =====================================================

  const [mode, setMode] = useState("edit");


  // =====================================================
  // SECTION PATHS
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
  // FIND SECTION FROM URL
  // =====================================================

  const getSectionFromPath = (path) => {

    const matchedSection =
      Object.entries(sectionPaths).find(
        ([, sectionPath]) =>
          sectionPath === path
      );

    if (matchedSection) {
      return matchedSection[0];
    }

    return null;
  };


  // =====================================================
  // NAVIGATE TO SECTION
  // =====================================================

  const navigateToSection = (section) => {

    const path = sectionPaths[section];

    if (!path) {
      return;
    }


    /*
      Do not create a duplicate history entry
      if we are already on the same section.
    */

    if (window.location.pathname !== path) {

      window.history.pushState(
        {},
        "",
        path
      );

    }


    setCurrentSection(section);


    setMode(
      section === "preview"
        ? "preview"
        : "edit"
    );

  };


  // =====================================================
  // INITIAL URL CHECK
  // =====================================================

  useEffect(() => {

    const currentPath =
      window.location.pathname;

    const section =
      getSectionFromPath(currentPath);


    if (section) {

      setCurrentSection(section);

      setMode(
        section === "preview"
          ? "preview"
          : "edit"
      );

      return;

    }


    /*
      If the user enters /syllabus directly,
      start with Course Information.
    */

    if (
      currentPath === "/syllabus" ||
      currentPath === "/"
    ) {

      setCurrentSection(
        "courseInformation"
      );

      setMode("edit");

    }

  }, []);


  // =====================================================
  // BROWSER BACK / FORWARD
  // =====================================================

  useEffect(() => {

    const handlePopState = () => {

      const currentPath =
        window.location.pathname;


      const section =
        getSectionFromPath(currentPath);


      if (section) {

        setCurrentSection(section);

        setMode(
          section === "preview"
            ? "preview"
            : "edit"
        );

        return;

      }


      /*
        If browser goes back to home,
        return control to parent.
      */

      if (
        currentPath === "/" ||
        currentPath === "/syllabus"
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

  const handleCourseInformationComplete = (
    data
  ) => {

    console.log(
      "Syllabus course information:",
      data
    );


    setSyllabusData(
      (previousData) => ({

        ...previousData,

        courseInformation: data,

      })
    );


    navigateToSection(
      "courseOutcomes"
    );

  };


  // =====================================================
  // COURSE OUTCOMES
  // =====================================================

  const handleCourseOutcomesComplete = (
    data
  ) => {

    setSyllabusData(
      (previousData) => ({

        ...previousData,

        courseOutcomes: data,

      })
    );


    const courseType =
      syllabusData
        .courseInformation
        ?.courseType;


    const rules =
      COURSE_TYPE_RULES[courseType];


    if (rules?.assessmentMapping) {

      navigateToSection(
        "assessmentMapping"
      );

    } else if (
      rules?.courseContents
    ) {

      navigateToSection(
        "modules"
      );

    } else if (
      rules?.practicalComponents
    ) {

      navigateToSection(
        "practicalComponents"
      );

    } else {

      navigateToSection(
        "references"
      );

    }

  };


  // =====================================================
  // ASSESSMENT MAPPING
  // =====================================================

  const handleAssessmentMappingComplete = (
    data
  ) => {

    setSyllabusData(
      (previousData) => ({

        ...previousData,

        assessmentMapping: data,

      })
    );


    const courseType =
      syllabusData
        .courseInformation
        ?.courseType;


    const rules =
      COURSE_TYPE_RULES[courseType];


    if (rules?.courseContents) {

      navigateToSection(
        "modules"
      );

    } else if (
      rules?.practicalComponents
    ) {

      navigateToSection(
        "practicalComponents"
      );

    } else {

      navigateToSection(
        "references"
      );

    }

  };


  // =====================================================
  // MODULES
  // =====================================================

  const handleModulesComplete = (
    data
  ) => {

    setSyllabusData(
      (previousData) => ({

        ...previousData,

        modules: data,

      })
    );


    const courseType =
      syllabusData
        .courseInformation
        ?.courseType;


    const rules =
      COURSE_TYPE_RULES[courseType];


    if (rules?.practicalComponents) {

      navigateToSection(
        "practicalComponents"
      );

    } else {

      navigateToSection(
        "references"
      );

    }

  };


  // =====================================================
  // PRACTICAL COMPONENTS
  // =====================================================

  const handlePracticalComponentsComplete = (
    data
  ) => {

    setSyllabusData(
      (previousData) => ({

        ...previousData,

        practicalComponents: data,

      })
    );


    navigateToSection(
      "references"
    );

  };


  // =====================================================
  // REFERENCES
  // =====================================================

  const handleReferencesComplete = (
    data
  ) => {

    setSyllabusData(
      (previousData) => ({

        ...previousData,

        references: data,

      })
    );


    navigateToSection(
      "preview"
    );

  };


  // =====================================================
  // EDIT FROM PREVIEW
  // =====================================================

  const handleEdit = () => {

    /*
      IMPORTANT:
      Use navigateToSection instead of only
      changing React state.

      This keeps browser URL and UI synchronized.
    */

    navigateToSection(
      "courseInformation"
    );

  };


  // =====================================================
  // SAVE CHANGES
  // =====================================================

  const handleSaveChanges = () => {

    navigateToSection(
      "preview"
    );

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

  if (
    currentSection ===
    "courseInformation"
  ) {

    return (

      <div>

        <div
          style={{
            padding: "15px 25px",
            background: "#ffffff",
            borderBottom:
              "1px solid #ddd",
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
            syllabusData
              .courseInformation
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

  if (
    currentSection ===
    "courseOutcomes"
  ) {

    return (

      <CourseOutcomes

        existingData={
          syllabusData.courseOutcomes
        }

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

  if (
    currentSection ===
    "assessmentMapping"
  ) {

    return (

      <AssessmentMapping

        courseOutcomes={
          syllabusData.courseOutcomes
        }

        existingData={
          syllabusData.assessmentMapping
        }

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
  // COURSE CONTENTS
  // =====================================================

  if (
    currentSection ===
    "modules"
  ) {

    return (

      <CourseContents

        courseOutcomes={
          syllabusData.courseOutcomes
        }

        existingData={
          syllabusData.modules
        }

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

  if (
    currentSection ===
    "references"
  ) {

    return (

      <References

        existingData={
          syllabusData.references
        }

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