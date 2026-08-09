


// import { useState } from "react";
// import "./SchemeSetup.css";

// function SchemeSetup({ onContinue }) {
//   const [formData, setFormData] = useState({
//     institutionName: "",
//     program: "",
//     department: "",
//     schemeYear: "",
//     academicYear: "",
//     semester: "",
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormData((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (
//       !formData.institutionName ||
//       !formData.program ||
//       !formData.department ||
//       !formData.schemeYear ||
//       !formData.academicYear ||
//       !formData.semester
//     ) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     onContinue(formData);
//   };

//   return (
//     <div className="scheme-setup">

//       <div className="scheme-setup-card">

//         <h1>Scheme Generator</h1>

//         <p className="setup-description">
//           Enter the scheme details to create your document.
//         </p>

//         <form onSubmit={handleSubmit}>

//           <div className="form-group">
//             <label>Institution Name</label>

//             <input
//               type="text"
//               name="institutionName"
//               value={formData.institutionName}
//               onChange={handleChange}
//               placeholder="Enter institution name"
//             />
//           </div>

//           <div className="form-group">
//             <label>Program</label>

//             <input
//               type="text"
//               name="program"
//               value={formData.program}
//               onChange={handleChange}
//               placeholder="Example: Bachelor of Engineering"
//             />
//           </div>

//           <div className="form-group">
//             <label>Department</label>

//             <input
//               type="text"
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               placeholder="Example: Computer Science and Engineering"
//             />
//           </div>

//           <div className="form-group">
//             <label>Scheme Year</label>

//             <input
//               type="text"
//               name="schemeYear"
//               value={formData.schemeYear}
//               onChange={handleChange}
//               placeholder="Example: 2024"
//             />
//           </div>

//           <div className="form-group">
//             <label>Academic Year</label>

//             <input
//               type="text"
//               name="academicYear"
//               value={formData.academicYear}
//               onChange={handleChange}
//               placeholder="Example: 2024-25"
//             />
//           </div>

//           <div className="form-group">
//             <label>Semester</label>

//             <select
//               name="semester"
//               value={formData.semester}
//               onChange={handleChange}
//             >
//               <option value="">
//                 -- Select Semester --
//               </option>

//               <option value="III SEMESTER">III SEMESTER</option>
//               <option value="IV SEMESTER">IV SEMESTER</option>
//               <option value="V SEMESTER">V SEMESTER</option>
//               <option value="VI SEMESTER">VI SEMESTER</option>
//               <option value="VII SEMESTER">VII SEMESTER</option>
//               <option value="VIII SEMESTER">VIII SEMESTER</option>
//             </select>
//           </div>

//           <button type="submit">
//             Continue
//           </button>

//         </form>

//       </div>

//     </div>
//   );
// }

// export default SchemeSetup;

import { useState } from "react";

import "./SchemeSetup.css";

function SchemeSetup({ onContinue }) {
  const [formData, setFormData] = useState({
    institutionName: "",
    program: "",
    department: "",
    schemeYear: "",
    academicYear: "",
    semester: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.institutionName ||
      !formData.program ||
      !formData.department ||
      !formData.schemeYear ||
      !formData.academicYear ||
      !formData.semester
    ) {
      alert("Please fill in all fields.");
      return;
    }

    console.log("Sending scheme data:", formData);

    onContinue(formData);
  };

  return (
    <div className="scheme-setup">

      <div className="scheme-setup-card">

        <h1>Scheme Generator</h1>

        <p className="setup-description">
          Enter the basic information for the scheme.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Institution */}
          <div className="form-group">
            <label htmlFor="institutionName">
              Institution Name
            </label>

            <input
              id="institutionName"
              type="text"
              name="institutionName"
              value={formData.institutionName}
              onChange={handleChange}
              placeholder="Enter institution name"
            />
          </div>

          {/* Program */}
          <div className="form-group">
            <label htmlFor="program">
              Program
            </label>

            <input
              id="program"
              type="text"
              name="program"
              value={formData.program}
              onChange={handleChange}
              placeholder="Example: Bachelor of Engineering"
            />
          </div>

          {/* Department */}
          <div className="form-group">
            <label htmlFor="department">
              Department
            </label>

            <input
              id="department"
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Example: Computer Science and Engineering"
            />
          </div>

          {/* Scheme Year */}
          <div className="form-group">
            <label htmlFor="schemeYear">
              Scheme Year
            </label>

            <input
              id="schemeYear"
              type="text"
              name="schemeYear"
              value={formData.schemeYear}
              onChange={handleChange}
              placeholder="Example: 2024"
            />
          </div>

          {/* Academic Year */}
          <div className="form-group">
            <label htmlFor="academicYear">
              Academic Year
            </label>

            <input
              id="academicYear"
              type="text"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              placeholder="Example: 2024-25"
            />
          </div>

          {/* Semester */}
          <div className="form-group">
            <label htmlFor="semester">
              Semester
            </label>

            <select
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
            >
              <option value="">
                -- Select Semester --
              </option>

              <option value="I SEMESTER">
                I SEMESTER
              </option>

              <option value="II SEMESTER">
                II SEMESTER
              </option>

              <option value="III SEMESTER">
                III SEMESTER
              </option>

              <option value="IV SEMESTER">
                IV SEMESTER
              </option>

              <option value="V SEMESTER">
                V SEMESTER
              </option>

              <option value="VI SEMESTER">
                VI SEMESTER
              </option>

              <option value="VII SEMESTER">
                VII SEMESTER
              </option>

              <option value="VIII SEMESTER">
                VIII SEMESTER
              </option>
            </select>
          </div>

          <button type="submit">
            Continue
          </button>

        </form>

      </div>

    </div>
  );
}

export default SchemeSetup;