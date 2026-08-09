


// import "./SchemeHeader.css";

// function SchemeHeader({ schemeData }) {
//   return (
//     <header className="scheme-header">

//       {/* Left Logo */}
//       <div className="header-logo header-logo-left">

//         <img
//           src="/assets/atria-logo.png"
//           alt="Atria Institute of Technology"
//         />

//       </div>


//       {/* Center Content */}
//       <div className="header-content">

//         <div className="program-title">
//           {schemeData.program}
//         </div>

//         <div className="program-name">
//           in {schemeData.department}
//         </div>

//         <div className="scheme-title">
//           SCHEME OF TEACHING AND EVALUATION{" "}
//           {schemeData.schemeYear}
//         </div>

//         <div className="education-title">
//           OUTCOME BASED EDUCATION (OBE)
//         </div>

//         <div className="education-title">
//           AND
//         </div>

//         <div className="education-title">
//           CHOICE BASED CREDIT SYSTEM (CBCS)
//         </div>

//       </div>


//       {/* Right Logo */}
//       <div className="header-logo header-logo-right">

//         <img
//           src="/assets/anniversary-logo.png"
//           alt="Anniversary"
//         />

//       </div>

//     </header>
//   );
// }

// export default SchemeHeader;




import "./SchemeHeader.css";

function SchemeHeader({ schemeData }) {
  return (
    <header className="scheme-header">

      {/* LEFT BOX - LOGO */}
      <div className="header-box left-box">
        <img
          src="/assets/atria-logo.png"
          alt="Atria Institute of Technology"
        />
      </div>

      {/* CENTER BOX - TEXT */}
      <div className="header-box center-box">

        <div className="program-title">
          {schemeData.program}
        </div>

        <div className="program-name">
          {schemeData.department}
        </div>

        <div className="scheme-title">
          SCHEME OF TEACHING AND EVALUATION {schemeData.schemeYear}
        </div>

        <div className="obe-title">
          OUTCOME BASED EDUCATION (OBE)
        </div>

        <div className="and-title">
          AND
        </div>

        <div className="cbcs-title">
          CHOICE BASED CREDIT SYSTEM (CBCS)
        </div>

      </div>

      {/* RIGHT BOX - ANNIVERSARY LOGO */}
      <div className="header-box right-box">
        <img
          src="/assets/anniversary-logo.png"
          alt="Anniversary"
        />
      </div>

    </header>
  );
}

export default SchemeHeader;