import { useState } from "react";

import "./References.css";


function References({
  existingData = null,
  onContinue,
  onBack,
}) {

  // =====================================================
  // CREATE REFERENCE ITEM
  // =====================================================

  const createReference = () => ({
    title: "",
  });


  // =====================================================
  // INITIAL DATA
  // =====================================================

  const [textbooks, setTextbooks] = useState(
    existingData?.textbooks?.length > 0
      ? existingData.textbooks
      : [createReference()]
  );


  const [referenceBooks, setReferenceBooks] =
    useState(
      existingData?.referenceBooks?.length > 0
        ? existingData.referenceBooks
        : [createReference()]
    );


  const [webLinks, setWebLinks] = useState(
    existingData?.webLinks?.length > 0
      ? existingData.webLinks
      : [createReference()]
  );


  // =====================================================
  // UPDATE REFERENCE
  // =====================================================

  const handleChange = (
    type,
    index,
    value
  ) => {

    const setter =
      type === "textbooks"
        ? setTextbooks
        : type === "referenceBooks"
        ? setReferenceBooks
        : setWebLinks;


    setter((previousReferences) =>
      previousReferences.map(
        (reference, referenceIndex) =>
          referenceIndex === index
            ? {
                ...reference,
                title: value,
              }
            : reference
      )
    );
  };


  // =====================================================
  // ADD REFERENCE
  // =====================================================

  const handleAdd = (type) => {

    const setter =
      type === "textbooks"
        ? setTextbooks
        : type === "referenceBooks"
        ? setReferenceBooks
        : setWebLinks;


    setter((previousReferences) => [
      ...previousReferences,
      createReference(),
    ]);
  };


  // =====================================================
  // REMOVE REFERENCE
  // =====================================================

  const handleRemove = (
    type,
    indexToRemove
  ) => {

    const setter =
      type === "textbooks"
        ? setTextbooks
        : type === "referenceBooks"
        ? setReferenceBooks
        : setWebLinks;


    setter((previousReferences) => {

      const updatedReferences =
        previousReferences.filter(
          (_, index) =>
            index !== indexToRemove
        );


      // Always keep one input available

      return updatedReferences.length > 0
        ? updatedReferences
        : [createReference()];

    });
  };


  // =====================================================
  // CONTINUE
  // =====================================================

  const handleContinue = () => {

    onContinue({
      textbooks,
      referenceBooks,
      webLinks,
    });

  };


  // =====================================================
  // RENDER REFERENCE SECTION
  // =====================================================

  const renderReferenceSection = (
    title,
    description,
    type,
    references
  ) => {

    return (
      <section className="reference-section">

        <div className="reference-section-header">

          <div>

            <h3>
              {title}
            </h3>

            <p>
              {description}
            </p>

          </div>

        </div>


        <div className="references-list">

          {references.map(
            (reference, index) => (

              <div
                className="reference-item"
                key={index}
              >

                <div className="reference-number">
                  {index + 1}
                </div>


                <input
                  type="text"
                  value={reference.title}
                  onChange={(event) =>
                    handleChange(
                      type,
                      index,
                      event.target.value
                    )
                  }
                  placeholder={
                    type === "webLinks"
                      ? "Enter reference web link"
                      : "Enter book details"
                  }
                />


                <button
                  type="button"
                  className="remove-reference-button"
                  onClick={() =>
                    handleRemove(
                      type,
                      index
                    )
                  }
                >
                  Remove
                </button>

              </div>

            )
          )}

        </div>


        <button
          type="button"
          className="add-reference-button"
          onClick={() =>
            handleAdd(type)
          }
        >
          + Add {title}
        </button>

      </section>
    );
  };


  return (
    <div className="references-page">

      <div className="references-card">

        {/* ==========================================
            TITLE
        =========================================== */}

        <h2>
          Suggested Learning Resources
        </h2>


        <p className="references-description">

          Enter the textbooks, reference books and
          web resources for the course.

        </p>


        {/* ==========================================
            TEXT BOOKS
        =========================================== */}

        {renderReferenceSection(
          "Text Books",
          "Add the prescribed textbooks for the course.",
          "textbooks",
          textbooks
        )}


        {/* ==========================================
            REFERENCE BOOKS
        =========================================== */}

        {renderReferenceSection(
          "Reference Books",
          "Add additional reference books.",
          "referenceBooks",
          referenceBooks
        )}


        {/* ==========================================
            WEB LINKS
        =========================================== */}

        {renderReferenceSection(
          "Reference Web Links",
          "Add useful web resources and URLs.",
          "webLinks",
          webLinks
        )}


        {/* ==========================================
            ACTION BUTTONS
        =========================================== */}

        <div className="references-actions">

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
            Preview Syllabus
          </button>

        </div>

      </div>

    </div>
  );
}


export default References;