import React, { useState } from "react";

function Report() {
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState({ name: "", report: "" });
  const [editReport, setEditReport] = useState({ index: -1, name: "", report: "" });

  const addReport = () => {
    if (newReport.name && newReport.report) {
      setReports([...reports, newReport]);
      setNewReport({ name: "", report: "" });
    }
  };

  const deleteReport = (index) => {
    const updatedReports = reports.filter((_, i) => i !== index);
    setReports(updatedReports);
  };

  const updateReport = () => {
    if (editReport.index !== -1 && editReport.name && editReport.report) {
      const updatedReports = [...reports];
      updatedReports[editReport.index] = {
        name: editReport.name,
        report: editReport.report,
      };
      setReports(updatedReports);
      setEditReport({ index: -1, name: "", report: "" });
    }
  };

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className="w-11/12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          TEACHER'S ACCOUNT REPORT
        </h1>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newReport.name}
            className="w-1/4 p-2 border border-gray-300 rounded"
            onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Report"
            value={newReport.report}
            className="w-3/4 p-2 border border-gray-300 rounded"
            onChange={(e) => setNewReport({ ...newReport, report: e.target.value })}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
            onClick={addReport}
          >
            Add Report
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {reports.map((report, index) => (
            <div key={index} className="border border-gray-300 p-4 rounded shadow-md">
              {editReport.index === index ? (
                <div>
                  <input
                    type="text"
                    value={editReport.name}
                    onChange={(e) => setEditReport({ ...editReport, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                  <input
                    type="text"
                    value={editReport.report}
                    onChange={(e) => setEditReport({ ...editReport, report: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                  <div className="flex justify-end">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded mr-2"
                      onClick={updateReport}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-2">
                  <div className="font-bold text-xl">Name:</div>
                  <div>{report.name}</div>
                  <div className="font-bold mt-2 text-xl">Report:</div>
                  <div>{report.report}</div>
                  <div className="mt-4">
                    <div className="flex justify-end">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded mr-2"
                        onClick={() => deleteReport(index)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-yellow-500 hover-bg-yellow-700 text-white font-bold p-2 rounded"
                        onClick={() => setEditReport({ index, name: report.name, report: report.report })}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Report;
