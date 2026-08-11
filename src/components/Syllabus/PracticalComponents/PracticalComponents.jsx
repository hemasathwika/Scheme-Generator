import { useState } from "react";

import "./PracticalComponents.css";


function PracticalComponents({
  existingData = null,
  onContinue,
  onBack,
}) {

  // =====================================================
  // CREATE EXPERIMENT
  // =====================================================

  const createExperiment = (number) => ({
    number,
    title: "",
    description: "",
    co: "",
    cl: "",
    pl: "",
  });


  // =====================================================
  // INITIAL DATA
  // =====================================================

  const [partA, setPartA] = useState(
    existingData?.partA?.length > 0
      ? existingData.partA
      : [createExperiment(1)]
  );


  const [partB, setPartB] = useState(
    existingData?.partB?.length > 0
      ? existingData.partB
      : [createExperiment(1)]
  );


  // =====================================================
  // UPDATE EXPERIMENT
  // =====================================================

  const handleChange = (
    part,
    index,
    field,
    value
  ) => {

    const setter =
      part === "partA"
        ? setPartA
        : setPartB;


    setter((previousExperiments) =>
      previousExperiments.map(
        (experiment, experimentIndex) =>
          experimentIndex === index
            ? {
                ...experiment,
                [field]: value,
              }
            : experiment
      )
    );
  };


  // =====================================================
  // ADD EXPERIMENT
  // =====================================================

  const handleAddExperiment = (part) => {

    const setter =
      part === "partA"
        ? setPartA
        : setPartB;


    setter((previousExperiments) => {

      const nextNumber =
        previousExperiments.length + 1;


      return [
        ...previousExperiments,
        createExperiment(nextNumber),
      ];

    });
  };


  // =====================================================
  // REMOVE EXPERIMENT
  // =====================================================

  const handleRemoveExperiment = (
    part,
    indexToRemove
  ) => {

    const setter =
      part === "partA"
        ? setPartA
        : setPartB;


    setter((previousExperiments) => {

      const updatedExperiments =
        previousExperiments.filter(
          (_, index) =>
            index !== indexToRemove
        );


      return updatedExperiments.map(
        (experiment, index) => ({
          ...experiment,
          number: index + 1,
        })
      );

    });
  };


  // =====================================================
  // CONTINUE
  // =====================================================

  const handleContinue = () => {

    onContinue({
      partA,
      partB,
    });

  };


  // =====================================================
  // RENDER EXPERIMENT
  // =====================================================

  const renderExperiment = (
    experiment,
    index,
    part
  ) => {

    const experiments =
      part === "partA"
        ? partA
        : partB;


    return (
      <div
        className="experiment-card"
        key={index}
      >

        {/* ==========================================
            EXPERIMENT HEADER
        =========================================== */}

        <div className="experiment-header">

          <h4>
            Experiment {experiment.number}
          </h4>


          {experiments.length > 1 && (

            <button
              type="button"
              className="remove-experiment-button"
              onClick={() =>
                handleRemoveExperiment(
                  part,
                  index
                )
              }
            >
              Remove
            </button>

          )}

        </div>


        {/* ==========================================
            TITLE
        =========================================== */}

        <div className="practical-field">

          <label>
            Experiment Title
          </label>

          <input
            type="text"
            value={experiment.title}
            onChange={(event) =>
              handleChange(
                part,
                index,
                "title",
                event.target.value
              )
            }
            placeholder="Enter experiment title"
          />

        </div>


        {/* ==========================================
            DESCRIPTION
        =========================================== */}

        <div className="practical-field">

          <label>
            Experiment / Problem Statement
          </label>

          <textarea
            value={experiment.description}
            onChange={(event) =>
              handleChange(
                part,
                index,
                "description",
                event.target.value
              )
            }
            placeholder={
              "Enter the complete experiment or problem statement..."
            }
            rows="7"
          />

        </div>


        {/* ==========================================
            CO / CL / PL
        =========================================== */}

        <div className="practical-level-fields">

          <div className="practical-field">

            <label>
              Course Outcome (CO)
            </label>

            <input
              type="text"
              value={experiment.co}
              onChange={(event) =>
                handleChange(
                  part,
                  index,
                  "co",
                  event.target.value
                )
              }
              placeholder="Example: CO1"
            />

          </div>


          <div className="practical-field">

            <label>
              CL (Highest Level)
            </label>

            <select
              value={experiment.cl}
              onChange={(event) =>
                handleChange(
                  part,
                  index,
                  "cl",
                  event.target.value
                )
              }
            >

              <option value="">
                Select CL
              </option>

              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>

            </select>

          </div>


          <div className="practical-field">

            <label>
              PL (Highest Level)
            </label>

            <select
              value={experiment.pl}
              onChange={(event) =>
                handleChange(
                  part,
                  index,
                  "pl",
                  event.target.value
                )
              }
            >

              <option value="">
                Select PL
              </option>

              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>

            </select>

          </div>

        </div>

      </div>
    );
  };


  return (
    <div className="practical-page">

      <div className="practical-card">

        {/* ==========================================
            TITLE
        =========================================== */}

        <h2>
          Practical Components
        </h2>


        <p className="practical-description">

          Add the practical experiments for the
          course.

        </p>


        {/* =================================================
            PART A
        ================================================= */}

        <section className="practical-section">

          <div className="section-heading">

            <div>
              <h3>
                PART – A
              </h3>

              <span>
                Conventional Experiments
              </span>
            </div>

          </div>


          <div className="experiments-list">

            {partA.map(
              (experiment, index) =>
                renderExperiment(
                  experiment,
                  index,
                  "partA"
                )
            )}

          </div>


          <button
            type="button"
            className="add-experiment-button"
            onClick={() =>
              handleAddExperiment("partA")
            }
          >
            + Add Part A Experiment
          </button>

        </section>


        {/* =================================================
            PART B
        ================================================= */}

        <section className="practical-section">

          <div className="section-heading">

            <div>
              <h3>
                PART – B
              </h3>

              <span>
                Typical Open-Ended Experiments
                (Higher CL / PL)
              </span>
            </div>

          </div>


          <div className="experiments-list">

            {partB.map(
              (experiment, index) =>
                renderExperiment(
                  experiment,
                  index,
                  "partB"
                )
            )}

          </div>


          <button
            type="button"
            className="add-experiment-button"
            onClick={() =>
              handleAddExperiment("partB")
            }
          >
            + Add Part B Experiment
          </button>

        </section>


        {/* =================================================
            ACTION BUTTONS
        ================================================= */}

        <div className="practical-actions">

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


export default PracticalComponents;