import React, { useState, useEffect } from "react";

function UserAccount() {
  // Generate fake teacher data
  const initialTeachers = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: `Teacher ${index + 1}`,
    email: `teacher${index + 1}@example.com`,
    password: "",
  }));

  // State to manage the list of teachers and input fields
  const [teachers, setTeachers] = useState(
    JSON.parse(localStorage.getItem("teachers")) || initialTeachers
  );
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [editingTeacher, setEditingTeacher] = useState(null);
  const [isAdminEdit, setIsAdminEdit] = useState(false); // Determines whether admin is in edit mode

  // Function to handle adding a new teacher
  const addTeacher = () => {
    // Ensure that all fields are filled
    if (newTeacher.name && newTeacher.email && newTeacher.password) {
      // Create a new teacher object
      const teacher = {
        id: teachers.length + 1, // Generate a unique ID
        ...newTeacher,
      };

      // Add the new teacher to the list
      setTeachers([...teachers, teacher]);

      // Clear the input fields
      setNewTeacher({
        name: "",
        email: "",
        password: "fakepassword",
      });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const editTeacher = (teacherId) => {
    if (isAdminEdit) {
      const updatedTeachers = teachers.map((teacher) =>
        teacher.id === teacherId ? editingTeacher : teacher
      );
      setTeachers(updatedTeachers);
      setEditingTeacher(null);
      setIsAdminEdit(false);
    } else {
      setIsAdminEdit(true);
      setEditingTeacher(teachers.find((teacher) => teacher.id === teacherId));
    }
  };

  // Function to handle deleting a teacher
  const deleteTeacher = (teacherId) => {
    const updatedTeachers = teachers.filter((teacher) =>
      teacher.id !== teacherId
    );
    setTeachers(updatedTeachers);
    setEditingTeacher(null);
    setIsAdminEdit(false);
  };

  // Use useEffect to update local storage whenever the teachers state changes
  useEffect(() => {
    localStorage.setItem("teachers", JSON.stringify(teachers));
  }, [teachers]);

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        <h1
          className="b-10"
          style={{
            fontWeight: "bold",
            marginLeft: "30px",
            fontSize: "50px",
            color: "#333",
          }}
        >
          Accounts
        </h1>
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="font-bold">Teachers</div>
            <div className="flex gap-4">
              {/* Add Teacher Form */}
              <input
                type="text"
                placeholder="Name"
                value={newTeacher.name}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Email"
                value={newTeacher.email}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                value={newTeacher.password}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, password: e.target.value })
                }
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addTeacher}
              >
                Add Teacher
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-10 py-3 text-left font-medium text-gray-900">
                  ID
                </th>
                <th className="whitespace-nowrap px-10 py-3 text-left font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Email
                </th>
                <th className="whitespace-nowrap px-10 py-3 text-left font-medium text-gray-900">
                  Password
                </th>
                <th className="whitespace-nowrap px-10 py-3 text-left font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td className="whitespace-nowrap px-10 py-2 text-gray-900">
                    {teacher.id}
                  </td>
                  <td className="whitespace-nowrap px-10 py-2 text-gray-700">
                    {isAdminEdit && editingTeacher?.id === teacher.id ? (
                      <input
                        type="text"
                        value={editingTeacher.name}
                        onChange={(e) =>
                          setEditingTeacher({
                            ...editingTeacher,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      teacher.name
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {isAdminEdit && editingTeacher?.id === teacher.id ? (
                      <input
                        type="text"
                        value={editingTeacher.email}
                        onChange={(e) =>
                          setEditingTeacher({
                            ...editingTeacher,
                            email: e.target.value,
                          })
                        }
                      />
                    ) : (
                      teacher.email
                    )}
                  </td>
                  <td className="whitespace-nowrap px-10 py-2 text-gray-700">
                    {isAdminEdit && editingTeacher?.id === teacher.id ? (
                      <input
                        type="password"
                        value={editingTeacher.password}
                        onChange={(e) =>
                          setEditingTeacher({
                            ...editingTeacher,
                            password: e.target.value,
                          })
                        }
                      />
                    ) : (
                      teacher.password
                    )}
                  </td>
                  <td className="whitespace-nowrap px-10 py-2 text-gray-700">
                    {isAdminEdit && editingTeacher?.id === teacher.id ? (
                      <button
                        onClick={() => editTeacher(teacher.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 text-xs rounded mr-2"
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => editTeacher(teacher.id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTeacher(teacher.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 text-xs rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
