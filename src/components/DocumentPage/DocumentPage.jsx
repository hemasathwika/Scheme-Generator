import SchemeHeader from "../SchemeHeader/SchemeHeader";
import SchemeTable from "../SchemeTable/SchemeTable";

import "./DocumentPage.css";

function DocumentPage({ schemeData }) {

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="document-wrapper">

      {/* Download button - not part of A4 */}
      <div className="document-actions">
        <button
          className="download-button"
          onClick={handleDownload}
        >
          Download PDF
        </button>
      </div>


      {/* A4 DOCUMENT */}
      <div className="document-page">

        <div className="document-content">

          {/* Header */}
          <SchemeHeader
            schemeData={schemeData}
          />

          {/* Semester */}
          <div className="semester-title">
            {schemeData.semester}
          </div>

          {/* Scheme Table */}
          <SchemeTable
            courses={schemeData.courses}
          />

        </div>

      </div>

    </div>
  );
}

export default DocumentPage;