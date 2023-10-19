import React, { useState } from "react";
import { Link } from "react-router-dom"; 

function Setting() {
  const containerStyle = {
    marginLeft: "750px",
    width: "800px",
  };

  const buttonStyle = {
    backgroundColor: "transparent",
    border: "2px solid",
    borderColor: "#007BFF",
    color: "#007BFF",
    fontWeight: "bold",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    margin: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s, transform 0.3s",
    width: "300px",
  };

  const [clickedButton, setClickedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setClickedButton(buttonName);
    setTimeout(() => {
      setClickedButton(null);
    }, 300); 
  };

  return (
    <div className="flex justify-center">
      <div style={containerStyle}>
      
        <Link to="/Contactadmin">
          <button
            style={{
              ...buttonStyle,
              transform: clickedButton === "Contact Admin" ? "scale(0.95)" : "scale(1)",
            }}
            className="hover:bg-green-700 hover:text-white"
            onClick={() => handleButtonClick("Contactadmin")}
          >
            Date Semester
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Setting;
