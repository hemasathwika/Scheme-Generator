import { useState } from "react";

import "./CourseOutcomes.css";


function CourseOutcomes({
  existingData = [],
  onContinue,
  onBack,
}) {

  // =====================================================
  // INITIAL COURSE OUTCOMES
  // =====================================================

  const [courseOutcomes, setCourseOutcomes] = useState(
    existingData.length > 0
      ? existingData
      : [
          {
            code: "CO1",
            description: "",
            cl: "",
            pl: "",
          },
        ]
  );


  // =====================================================
  // ADD COURSE OUTCOME
  // =====================================================

  const handleAddOutcome = () => {

    setCourseOutcomes((previousOutcomes) => {

      const nextNumber =
        previousOutcomes.length + 1;

      return [
        ...previousOutcomes,

        {
          code: `CO${nextNumber}`,
          description: "",
          cl: "",
          pl: "",
        },
      ];
    });
  };


  // =====================================================
  // REMOVE COURSE OUTCOME
  // =====================================================

  const handleRemoveOutcome = (indexToRemove) => {

    setCourseOutcomes((previousOutcomes) => {

      const updatedOutcomes =
        previousOutcomes.filter(
          (_, index) =>
            index !== indexToRemove
        );


      // Re-number the COs

      return updatedOutcomes.map(
        (outcome, index) => ({
          ...outcome,
          code: `CO${index + 1}`,
        })
      );

    });
  };


  // =====================================================
  // UPDATE OUTCOME
  // =====================================================

  const handleChange = (
    index,
    field,
    value
  ) => {

    setCourseOutcomes(
      (previousOutcomes) =>
        previousOutcomes.map(
          (outcome, outcomeIndex) =>
            outcomeIndex === index
              ? {
                  ...outcome,
                  [field]: value,
                }
              : outcome
        )
    );
  };


  // =====================================================
  // CONTINUE
  // =====================================================

  const handleContinue = () => {

    onContinue(courseOutcomes);
  };


  return (
    <div className="course-outcomes-page">

      <div className="course-outcomes-card">

        {/* ==========================================
            TITLE
        =========================================== */}

        <h2>
          Course Outcomes
        </h2>


        <p className="course-outcomes-description">

          At the end of the course, the students
          will be able to:

        </p>


        {/* ==========================================
            OUTCOME LIST
        =========================================== */}

        <div className="course-outcomes-list">

          {courseOutcomes.map(
            (outcome, index) => (

              <div
                className="outcome-item"
                key={index}
              >

                {/* -----------------------------------
                    OUTCOME HEADER
                ------------------------------------ */}

                <div className="outcome-header">

                  <span className="outcome-code">
                    {outcome.code}
                  </span>


                  {courseOutcomes.length > 1 && (

                    <button
                      type="button"
                      className="remove-outcome-button"
                      onClick={() =>
                        handleRemoveOutcome(index)
                      }
                    >
                      Remove
                    </button>

                  )}

                </div>


                {/* -----------------------------------
                    DESCRIPTION
                ------------------------------------ */}

                <div className="outcome-field">

                  <label>
                    Course Outcome Description
                  </label>

                  <textarea
                    value={outcome.description}
                    onChange={(event) =>
                      handleChange(
                        index,
                        "description",
                        event.target.value
                      )
                    }
                    placeholder="Enter course outcome description"
                    rows="4"
                    required
                  />

                </div>


                {/* -----------------------------------
                    CL / PL
                ------------------------------------ */}

                <div className="outcome-levels">

                  <div className="outcome-field">

                    <label>
                      CL (Highest Level)
                    </label>

                    <select
                      value={outcome.cl}
                      onChange={(event) =>
                        handleChange(
                          index,
                          "cl",
                          event.target.value
                        )
                      }
                      required
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


                  <div className="outcome-field">

                    <label>
                      PL (Highest Level)
                    </label>

                    <select
                      value={outcome.pl}
                      onChange={(event) =>
                        handleChange(
                          index,
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

              </div>

            )
          )}

        </div>


        {/* ==========================================
            ADD OUTCOME
        =========================================== */}

        <button
          type="button"
          className="add-outcome-button"
          onClick={handleAddOutcome}
        >
          + Add Course Outcome
        </button>


        {/* ==========================================
            ACTION BUTTONS
        =========================================== */}

        <div className="course-outcomes-actions">

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


export default CourseOutcomes;