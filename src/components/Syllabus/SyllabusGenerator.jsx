
import { useState } from "react";

import CourseInformation from "./CourseInformation/CourseInformation";
import CourseOutcomes from "./CourseOutcomes/CourseOutcomes";
import AssessmentMapping from "./AssessmentMapping/AssessmentMapping";
import CourseContents from "./CourseContents/CourseContents";


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

    setCurrentSection("courseOutcomes");
  };


  // =====================================================
  // COURSE OUTCOMES
  // =====================================================

  const handleCourseOutcomesComplete = (data) => {

    setSyllabusData((previousData) => ({
      ...previousData,
      courseOutcomes: data,
    }));

    setCurrentSection("assessmentMapping");
  };


  // =====================================================
  // ASSESSMENT MAPPING
  // =====================================================

  const handleAssessmentMappingComplete = (data) => {

    setSyllabusData((previousData) => ({
      ...previousData,
      assessmentMapping: data,
    }));

    setCurrentSection("modules");
  };

  // =====================================================
// UPDATE MODULES
// =====================================================

const handleModulesComplete = (data) => {

  setSyllabusData((previousData) => ({
    ...previousData,
    modules: data,
  }));

  setCurrentSection("practicalComponents");
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
if (currentSection === "modules") {

  return (
    <CourseContents

      courseOutcomes={
        syllabusData.courseOutcomes
      }

      existingData={
        syllabusData.modules
      }

      onBack={() =>
        setCurrentSection(
          "assessmentMapping"
        )
      }

      onContinue={
        handleModulesComplete
      }

    />
  );
}

  // =====================================================
  // PRACTICAL COMPONENTS
  // =====================================================

  const handlePracticalComponentsComplete = (data) => {

    setSyllabusData((previousData) => ({
      ...previousData,
      practicalComponents: data,
    }));

    setCurrentSection("references");
  };


  // =====================================================
  // REFERENCES
  // =====================================================

  const handleReferencesComplete = (data) => {

    setSyllabusData((previousData) => ({
      ...previousData,
      references: data,
    }));

    setMode("preview");
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
  // PREVIEW
  // =====================================================

  if (mode === "preview") {

    return (
      <div
        style={{
          minHeight: "100vh",
          padding: "40px",
          background: "#f5f6f8",
          boxSizing: "border-box",
        }}
      >

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "#ffffff",
            padding: "40px",
            borderRadius: "10px",
            boxShadow:
              "0 4px 15px rgba(0, 0, 0, 0.08)",
          }}
        >

          <h1>
            Syllabus Preview
          </h1>

          <p>
            The final A4 syllabus preview will be
            implemented here.
          </p>


          {/* ==========================================
              TEMPORARY DATA VIEW
          =========================================== */}

          <pre
            style={{
              marginTop: "25px",
              padding: "20px",
              background: "#f3f4f6",
              borderRadius: "6px",
              overflow: "auto",
              fontSize: "13px",
            }}
          >
            {JSON.stringify(
              syllabusData,
              null,
              2
            )}
          </pre>


          {/* ==========================================
              EDIT
          =========================================== */}

          <button
            type="button"
            onClick={handleEdit}
            style={{
              marginTop: "20px",
              marginRight: "10px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              background: "#6b7280",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            Edit
          </button>


          {/* ==========================================
              DOWNLOAD PDF
          =========================================== */}

          <button
            type="button"
            onClick={() => window.print()}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              background: "#1d4ed8",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            Download PDF
          </button>

        </div>

      </div>
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

        onBack={() =>
          setCurrentSection(
            "courseInformation"
          )
        }

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

        onBack={() =>
          setCurrentSection(
            "courseOutcomes"
          )
        }

        onContinue={
          handleAssessmentMappingComplete
        }

      />
    );
  }


  // =====================================================
  // MODULES
  // =====================================================

  if (currentSection === "modules") {

    return (
      <div
        style={{
          minHeight: "100vh",
          padding: "40px",
          background: "#f5f6f8",
          boxSizing: "border-box",
        }}
      >

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "#ffffff",
            padding: "35px",
            borderRadius: "10px",
            boxShadow:
              "0 4px 15px rgba(0, 0, 0, 0.08)",
          }}
        >

          <h2>
            Course Contents
          </h2>

          <p>
            Course Contents / Modules section will be
            implemented next.
          </p>


          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >

            <button
              type="button"
              onClick={() =>
                setCurrentSection(
                  "assessmentMapping"
                )
              }
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                background: "#6b7280",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>


            <button
              type="button"
              onClick={() =>
                handleModulesComplete([])
              }
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                background: "#1d4ed8",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              Continue
            </button>

          </div>

        </div>

      </div>
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
      <div
        style={{
          minHeight: "100vh",
          padding: "40px",
          background: "#f5f6f8",
          boxSizing: "border-box",
        }}
      >

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "#ffffff",
            padding: "35px",
            borderRadius: "10px",
            boxShadow:
              "0 4px 15px rgba(0, 0, 0, 0.08)",
          }}
        >

          <h2>
            Practical Components
          </h2>

          <p>
            Practical Components section will be
            implemented next.
          </p>


          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >

            <button
              type="button"
              onClick={() =>
                setCurrentSection(
                  "modules"
                )
              }
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                background: "#6b7280",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>


            <button
              type="button"
              onClick={() =>
                handlePracticalComponentsComplete({
                  partA: [],
                  partB: [],
                })
              }
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                background: "#1d4ed8",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              Continue
            </button>

          </div>

        </div>

      </div>
    );
  }


  // =====================================================
  // REFERENCES
  // =====================================================

  if (currentSection === "references") {

    return (
      <div
        style={{
          minHeight: "100vh",
          padding: "40px",
          background: "#f5f6f8",
          boxSizing: "border-box",
        }}
      >

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "#ffffff",
            padding: "35px",
            borderRadius: "10px",
            boxShadow:
              "0 4px 15px rgba(0, 0, 0, 0.08)",
          }}
        >

          <h2>
            References
          </h2>

          <p>
            References section will be implemented next.
          </p>


          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >

            <button
              type="button"
              onClick={() =>
                setCurrentSection(
                  "practicalComponents"
                )
              }
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                background: "#6b7280",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>


            <button
              type="button"
              onClick={() =>
                handleReferencesComplete({
                  textbooks: [],
                  referenceBooks: [],
                  webLinks: [],
                })
              }
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                background: "#1d4ed8",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              Preview Syllabus
            </button>

          </div>

        </div>

      </div>
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