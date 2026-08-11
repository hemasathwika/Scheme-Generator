import { useState } from "react";

import "./CourseContents.css";


function CourseContents({
  courseOutcomes = [],
  existingData = [],
  onContinue,
  onBack,
}) {

  // =====================================================
  // CREATE FIRST MODULE
  // =====================================================

  const createModule = (number) => ({
    moduleNumber: number,
    co: "",
    cl: "",
    pl: "",
    content: "",
    textbookReference: "",
  });


  // =====================================================
  // INITIAL MODULE DATA
  // =====================================================

  const [modules, setModules] = useState(
    existingData.length > 0
      ? existingData
      : [createModule(1)]
  );


  // =====================================================
  // UPDATE MODULE FIELD
  // =====================================================

  const handleChange = (
    moduleIndex,
    field,
    value
  ) => {

    setModules((previousModules) =>
      previousModules.map(
        (module, index) =>
          index === moduleIndex
            ? {
                ...module,
                [field]: value,
              }
            : module
      )
    );
  };


  // =====================================================
  // ADD MODULE
  // =====================================================

  const handleAddModule = () => {

    setModules((previousModules) => {

      const nextNumber =
        previousModules.length + 1;

      return [
        ...previousModules,
        createModule(nextNumber),
      ];
    });
  };


  // =====================================================
  // REMOVE MODULE
  // =====================================================

  const handleRemoveModule = (
    moduleIndexToRemove
  ) => {

    setModules((previousModules) => {

      const updatedModules =
        previousModules.filter(
          (_, index) =>
            index !== moduleIndexToRemove
        );


      // Re-number remaining modules

      return updatedModules.map(
        (module, index) => ({
          ...module,
          moduleNumber: index + 1,
        })
      );
    });
  };


  // =====================================================
  // CONTINUE
  // =====================================================

  const handleContinue = () => {

    onContinue(modules);
  };


  return (
    <div className="course-contents-page">

      <div className="course-contents-card">

        {/* ==========================================
            TITLE
        =========================================== */}

        <h2>
          Course Contents
        </h2>

        <p className="course-contents-description">

          Add the modules and course content for
          the syllabus.

        </p>


        {/* ==========================================
            MODULES
        =========================================== */}

        <div className="modules-list">

          {modules.map(
            (module, moduleIndex) => (

              <div
                className="module-card"
                key={moduleIndex}
              >

                {/* =================================
                    MODULE HEADER
                ================================== */}

                <div className="module-header">

                  <h3>
                    Module {module.moduleNumber}
                  </h3>


                  {modules.length > 1 && (

                    <button
                      type="button"
                      className="remove-module-button"
                      onClick={() =>
                        handleRemoveModule(
                          moduleIndex
                        )
                      }
                    >
                      Remove
                    </button>

                  )}

                </div>


                {/* =================================
                    CO / CL / PL
                ================================== */}

                <div className="module-level-fields">

                  {/* CO */}

                  <div className="module-field">

                    <label>
                      Course Outcome (CO)
                    </label>

                    <select
                      value={module.co}
                      onChange={(event) =>
                        handleChange(
                          moduleIndex,
                          "co",
                          event.target.value
                        )
                      }
                    >

                      <option value="">
                        Select CO
                      </option>

                      {courseOutcomes.map(
                        (outcome) => (

                          <option
                            key={outcome.code}
                            value={outcome.code}
                          >
                            {outcome.code}
                          </option>

                        )
                      )}

                    </select>

                  </div>


                  {/* CL */}

                  <div className="module-field">

                    <label>
                      CL (Highest Level)
                    </label>

                    <select
                      value={module.cl}
                      onChange={(event) =>
                        handleChange(
                          moduleIndex,
                          "cl",
                          event.target.value
                        )
                      }
                    >

                      <option value="">
                        Select CL
                      </option>

                      <option value="1">
                        1
                      </option>

                      <option value="2">
                        2
                      </option>

                      <option value="3">
                        3
                      </option>

                      <option value="4">
                        4
                      </option>

                      <option value="5">
                        5
                      </option>

                      <option value="6">
                        6
                      </option>

                    </select>

                  </div>


                  {/* PL */}

                  <div className="module-field">

                    <label>
                      PL (Highest Level)
                    </label>

                    <select
                      value={module.pl}
                      onChange={(event) =>
                        handleChange(
                          moduleIndex,
                          "pl",
                          event.target.value
                        )
                      }
                    >

                      <option value="">
                        Select PL
                      </option>

                      <option value="1">
                        1
                      </option>

                      <option value="2">
                        2
                      </option>

                      <option value="3">
                        3
                      </option>

                      <option value="4">
                        4
                      </option>

                      <option value="5">
                        5
                      </option>

                      <option value="6">
                        6
                      </option>

                    </select>

                  </div>

                </div>


                {/* =================================
                    COURSE CONTENT
                ================================== */}

                <div className="module-field">

                  <label>
                    Course Content
                  </label>

                  <textarea
                    value={module.content}
                    onChange={(event) =>
                      handleChange(
                        moduleIndex,
                        "content",
                        event.target.value
                      )
                    }
                    placeholder={
                      "Enter the topics and content covered in this module..."
                    }
                    rows="8"
                  />

                </div>


                {/* =================================
                    TEXTBOOK REFERENCE
                ================================== */}

                <div className="module-field">

                  <label>
                    Text Book Reference
                  </label>

                  <input
                    type="text"
                    value={
                      module.textbookReference
                    }
                    onChange={(event) =>
                      handleChange(
                        moduleIndex,
                        "textbookReference",
                        event.target.value
                      )
                    }
                    placeholder={
                      "Example: 1.1, 1.2, 1.3"
                    }
                  />

                </div>

              </div>

            )
          )}

        </div>


        {/* ==========================================
            ADD MODULE
        =========================================== */}

        <button
          type="button"
          className="add-module-button"
          onClick={handleAddModule}
        >
          + Add Module
        </button>


        {/* ==========================================
            ACTION BUTTONS
        =========================================== */}

        <div className="course-contents-actions">

          <button
            type="button"
            className="back-button"
            onClick={onBack}
          >
            ← Back
          </button>


          <button
            type="button"
            className="continue-button"
            onClick={handleContinue}
          >
            Continue
          </button>

        </div>

      </div>

    </div>
  );
}


export default CourseContents;