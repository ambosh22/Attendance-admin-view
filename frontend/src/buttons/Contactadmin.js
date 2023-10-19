import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles

const containerStyle = {
  padding: "20px",
  backgroundColor: "#f5f5f5",
  border: "1px solid #ccc",
  borderRadius: "5px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  marginLeft: "90px",
  width: "800px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const semesterListStyle = {
  listStyle: "none",
  padding: 0,
};

const semesterItemStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  padding: "10px",
  cursor: "pointer",
};

function Semester() {
  const [selectedSemester, setSelectedSemester] = useState(null);
  const semesters = ["Semester 1", "Semester 2"];

  const handleSemesterClick = (semester) => {
    if (semester === "Semester 1") {
      setSelectedSemester(new Date(2023, 6, 8)); // July 8, 2023
    } else if (semester === "Semester 2") {
      setSelectedSemester(new Date(2023, 10, 8)); // November 8, 2023
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px", color: "#333", textTransform: "uppercase" }}>
        Select a Semester
      </h2>
      <ul style={semesterListStyle}>
        {semesters.map((semester) => (
          <li key={semester}>
            <div
              style={{
                ...semesterItemStyle,
                background: selectedSemester && selectedSemester.toDateString() === new Date(2023, 6, 8).toDateString() && semester === "Semester 1" ? "#007BFF" : selectedSemester && selectedSemester.toDateString() === new Date(2023, 10, 8).toDateString() && semester === "Semester 2" ? "#007BFF" : "transparent",
                color: selectedSemester && selectedSemester.toDateString() === new Date(2023, 6, 8).toDateString() && semester === "Semester 1" ? "#fff" : selectedSemester && selectedSemester.toDateString() === new Date(2023, 10, 8).toDateString() && semester === "Semester 2" ? "#fff" : "#333",
              }}
              onClick={() => handleSemesterClick(semester)}
            >
              {semester}
            </div>
          </li>
        ))}
      </ul>
      {selectedSemester && (
        <div style={{ marginTop: "20px", fontSize: "20px", color: "#007BFF", fontWeight: "bold" }}>
          Selected Semester: {selectedSemester.toDateString()}
        </div>
      )}
      <Calendar value={selectedSemester} onChange={setSelectedSemester} />
    </div>
  );
}

export default Semester;
