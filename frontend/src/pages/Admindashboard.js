import React, { useState, useEffect } from "react";
import { FaGraduationCap, FaChalkboardTeacher, FaChartPie, FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const data = [
  { name: "Jan", web1: 100, web2: 90, web3:50 },
  { name: "Feb", web1: 95, web2: 70, web3:100 },
  { name: "Mar", web1: 80, web2: 100 ,web3:87},
  { name: "Apr", web1: 78, web2: 90 ,web3:77},
  { name: "May", web1: 89, web2: 97 ,web3:67},
]

function Admindashboard() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (todoText.trim() !== "") {
      setTodos([...todos, { text: todoText, isEditing: false }]);
      setTodoText("");
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const editTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isEditing = true;
    setTodos(updatedTodos);
  };

  const saveTodo = (index, newText) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = newText;
    updatedTodos[index].isEditing = false;
    setTodos(updatedTodos);
  };
  const notificationStyle = {
    backgroundColor: "#FF5733",
    color: "#FFFFFF",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
    marginLeft: "50px",
    width: "800px",
    marginTop: "10px",
  };
  const scheduleStyle = {
    backgroundColor: "#007BFF",
    color: "#FFFFFF",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
    marginLeft: "50px",
    width: "800px",
  };
  const schedule = [
    {
      day: "Monday",
      startTime: "7:30 AM",
      endTime: "5:00 PM",
    },
    {
      day: "Friday",
      startTime: "7:30 AM",
      endTime: "5:00 PM",
    },
  ];
  return (
    <div className="container mx-auto p-4 w-2/3">
      <h1 className="b-10" style={{ fontWeight: "bold", marginLeft: "30px", fontSize: "50px", color: "#333" }}>
        Dashboard
      </h1>
      <div className="grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-2 lg:grid-cols-4 p-4" style={{ width: "900px" }}>
        {/* ...existing boxes */}
        <div className="schooltheme shadow-md">
          <div className="box-wrapper" style={{ maxWidth: "800px" }}>
            <Link to="/adminstudent" className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6 h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaGraduationCap size={24} />
                  <span className="flex-grow">Students</span>
                </div>
                <span className="text-lg font-semibold">300+</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="schooltheme shadow-md">
          <div className="box-wrapper" style={{ maxWidth: "800px" }}>
            <Link to="/teacher" className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6 h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaChalkboardTeacher size={24} />
                  <span className="flex-grow">Active teachers</span>
                </div>
                <span className="text-lg font-semibold">30</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="schooltheme shadow-md">
          <div className="box-wrapper" style={{ maxWidth: "800px" }}>
            <Link to="/sections" className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6 h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaChartPie size={24} />
                  <span className="flex-grow">Sections</span>
                </div>
                <span className="text-lg font-semibold">20</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="schooltheme shadow-md">
          <div className="box-wrapper" style={{ maxWidth: "800px" }}>
            <Link to="/attendance" className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6 h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaUserCheck size={24} />
                  <span className="flex-grow">Attendance</span>
                </div>
                <span className="text-lg font-semibold">90%</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* LineChart container with shadow */}
      <div className="schooltheme shadow-md mt-4" style={{ width: "450px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", marginLeft: "20px" }}>
        <div className="box-wrapper">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1 className="b-10" style={{ fontWeight: "bold", marginLeft: "20px", fontSize: "30px", color: "#333" }}>
                Attendance For this Yr
              </h1>
              <LineChart width={400} height={200} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="web1" stroke="#8884d8" />
                <Line type="monotone" dataKey="web2" stroke="#82ca9d" />
                <Line type="monotone" dataKey="web3" stroke="#d7b7a9" />
              </LineChart>
            </div>
            <div>
              <p style={{marginLeft: "100px", fontWeight: "bold", fontSize: "20px", color: "#333" }}>●Webdev1 90%</p>
              <p style={{marginLeft: "100px", fontWeight: "bold", fontSize: "20px", color: "#333" }}>●Webdev2 90%</p>
              <p style={{marginLeft: "100px", fontWeight: "bold", fontSize: "20px", color: "#333" }}>●Webdev3 90%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="schooltheme shadow-md mt-4" style={{ width: "450px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", marginLeft: "20px" }}>
        <div className="box-wrapper">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1 className="b-10" style={{ fontWeight: "bold", marginLeft: "20px", fontSize: "30px", color: "#333" }}>
                Attendance For this Yr
              </h1>
              <LineChart width={400} height={200} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="web1" stroke="#8884d8" />
                <Line type="monotone" dataKey="web2" stroke="#82ca9d" />
                <Line type="monotone" dataKey="web3" stroke="#d7b7a9" />
              </LineChart>
            </div>
            <div>
              <p style={{marginLeft: "100px", fontWeight: "bold", fontSize: "20px", color: "#333" }}>●Webdev1 90%</p>
              <p style={{marginLeft: "100px", fontWeight: "bold", fontSize: "20px", color: "#333" }}>●Webdev2 90%</p>
              <p style={{marginLeft: "100px", fontWeight: "bold", fontSize: "20px", color: "#333" }}>●Webdev3 90%</p>
            </div>
          </div>
        </div>
      </div>


      <div style={notificationStyle}>
        <strong>Important:</strong> You have a new notification!
      </div>
      <div style={scheduleStyle}>
        <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "5px" }} />
        <strong>Schedule:</strong>
        {schedule.map((item, index) => (
          <p key={index}>
            {item.day}: {item.startTime} - {item.endTime}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Admindashboard;
