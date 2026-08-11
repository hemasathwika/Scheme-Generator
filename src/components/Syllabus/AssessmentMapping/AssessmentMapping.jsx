import { useState } from "react";

import "./AssessmentMapping.css";


function AssessmentMapping({
  courseOutcomes = [],
  existingData = null,
  onContinue,
  onBack,
}) {

  // =====================================================
  // ASSESSMENT COMPONENTS
  // =====================================================

  const assessmentComponents = [
    {
      key: "cie1",
      label: "CIE I",
      percentage: "15%",
    },
    {
      key: "cie2",
      label: "CIE II",
      percentage: "15%",
    },
    {
      key: "assignment",
      label: "Assignment / Activities",
      percentage: "20%",
    },
    {
      key: "see",
      label: "Semester End Exam",
      percentage: "50%",
    },
  ];


  // =====================================================
  // CREATE INITIAL MAPPING
  // =====================================================

  const createInitialMapping = () => {

    if (
      existingData &&
      Object.keys(existingData).length > 0
    ) {
      return existingData;
    }


    const initialMapping = {};

    courseOutcomes.forEach((outcome) => {

      initialMapping[outcome.code] = {};

      assessmentComponents.forEach(
        (assessment) => {

          initialMapping[outcome.code][
            assessment.key
          ] = "";

        }
      );

    });


    return initialMapping;
  };


  const [mapping, setMapping] = useState(
    createInitialMapping()
  );


  // =====================================================
  // UPDATE MAPPING
  // =====================================================

  const handleMappingChange = (
    coCode,
    assessmentKey,
    value
  ) => {

    setMapping((previousMapping) => ({

      ...previousMapping,

      [coCode]: {

        ...previousMapping[coCode],

        [assessmentKey]: value,

      },

    }));
  };


  // =====================================================
  // CONTINUE
  // =====================================================

  const handleContinue = () => {

    onContinue(mapping);
  };


  return (
    <div className="assessment-mapping-page">

      <div className="assessment-mapping-card">

        {/* ==========================================
            TITLE
        =========================================== */}

        <h2>
          CO – Assessment Mapping
        </h2>


        <p className="assessment-description">
          Map each Course Outcome with the
          appropriate assessment component.
        </p>


        {/* ==========================================
            ASSESSMENT WEIGHTAGE
        =========================================== */}

        <div className="assessment-weightage">

          {assessmentComponents.map(
            (assessment) => (

              <div
                className="weightage-item"
                key={assessment.key}
              >

                <span>
                  {assessment.label}
                </span>

                <strong>
                  {assessment.percentage}
                </strong>

              </div>

            )
          )}

        </div>


        {/* ==========================================
            MAPPING TABLE
        =========================================== */}

        <div className="mapping-table-wrapper">

          <table className="mapping-table">

            <thead>

              <tr>

                <th>
                  Course Outcomes
                </th>

                {assessmentComponents.map(
                  (assessment) => (

                    <th
                      key={assessment.key}
                    >
                      {assessment.label}
                    </th>

                  )
                )}

              </tr>

            </thead>


            <tbody>

              {courseOutcomes.map(
                (outcome) => (

                  <tr key={outcome.code}>

                    <td className="co-code">
                      {outcome.code}
                    </td>


                    {assessmentComponents.map(
                      (assessment) => (

                        <td
                          key={
                            assessment.key
                          }
                        >

                          <select
                            value={
                              mapping[
                                outcome.code
                              ]?.[
                                assessment.key
                              ] || ""
                            }

                            onChange={(
                              event
                            ) =>
                              handleMappingChange(
                                outcome.code,
                                assessment.key,
                                event.target.value
                              )
                            }
                          >

                            <option value="">
                              -
                            </option>

                            <option value="M1">
                              M1
                            </option>

                            <option value="M2">
                              M2
                            </option>

                            <option value="M3">
                              M3
                            </option>

                            <option value="M4">
                              M4
                            </option>

                            <option value="M5">
                              M5
                            </option>

                          </select>

                        </td>

                      )
                    )}

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>


        {/* ==========================================
            INFORMATION
        =========================================== */}

        <div className="mapping-note">

          <strong>
            Note:
          </strong>

          <span>
            Select the appropriate module mapping
            for each Course Outcome and assessment
            component.
          </span>

        </div>


        {/* ==========================================
            ACTION BUTTONS
        =========================================== */}

        <div className="assessment-actions">

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


export default AssessmentMapping;