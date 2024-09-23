import { Input } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function UpdateModal({ setEdit, id }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('HR');
  const [gender, setGender] = useState('male');
  const [selectedCourses, setSelectedCourses] = useState(new Set());
  const [showDropdown, setShowDropdown] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const degrees = [
    { id: 1, name: "B.Tech" },
    { id: 2, name: "BCA" },
    { id: 3, name: "M.Tech" },
    { id: 4, name: "MCA" },
  ];

  const handleClose = () => setEdit(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const response = await fetch(`https://deals-dray-backend.vercel.app/employees/${id}`);
      if (response.ok) {
        const data = await response.json();
        setName(data.name);
        setEmail(data.email);
        setMobile(data.mobile);
        setDesignation(data.designation);
        setGender(data.gender);
        setSelectedCourses(new Set(data.courses));
      } else {
        console.error("Failed to fetch employee data");
      }
    };

    fetchEmployeeData();
  }, [id]);

  // Email validation
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Mobile number validation (numeric and 10 digits)
  const validateMobile = (mobile) => {
    const mobilePattern = /^[0-9]{10}$/;
    return mobilePattern.test(mobile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Validate mobile number
    if (!validateMobile(mobile)) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Reset error message if validation passes
    setErrorMessage('');

    const employeeData = {
      name,
      email,
      mobile,
      designation,
      gender,
      courses: Array.from(selectedCourses),
    };

    try {
      const response = await fetch(`https://deals-dray-backend.vercel.app/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (response.ok) {
        console.log("Employee updated successfully");
        handleClose();
      } else {
        console.error("Failed to update employee");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleCourse = (course) => {
    setSelectedCourses(prevCourses => {
      const updatedCourses = new Set(prevCourses);
      if (updatedCourses.has(course)) {
        updatedCourses.delete(course);
      } else {
        updatedCourses.add(course);
      }
      return updatedCourses;
    });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm w-full min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Edit employee details: {id}</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              &times;
            </button>
          </div>

          {/* Display Error Message */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {/* Modal Body - Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="sm"
                placeholder="Enter name"
                style={{ color: 'black' }}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="sm"
                placeholder="Enter email"
                style={{ color: 'black' }}
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile</label>
              <Input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                size="sm"
                placeholder="Enter mobile number"
                style={{ color: 'black' }}
              />
            </div>

            {/* Designation Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Designation</label>
              <select
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="mt-2 block w-full border border-gray-300 rounded-md p-2 text-sm text-gray-600"
              >
                <option value="HR" className="text-black">HR</option>
                <option value="Manager" className="text-black">Manager</option>
                <option value="Sales" className="text-black">Sales</option>
              </select>
            </div>

            {/* Gender Radio */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <div className="mt-2 flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="male"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2 text-black">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2 text-black">Female</span>
                </label>
              </div>
            </div>

            {/* Course Dropdown with Checkboxes */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Course</label>
              <div className="relative">
                <div
                  className="mt-2 border border-gray-300 rounded-md p-2 text-sm cursor-pointer text-gray-600"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  Select Courses
                </div>

                {showDropdown && (
                  <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-full">
                    {degrees.map((item) => (
                      <label className="block px-4 py-2" key={item.id}>
                        <input
                          type="checkbox"
                          value={item.name}
                          checked={selectedCourses.has(item.name)}
                          onChange={() => toggleCourse(item.name)}
                        />
                        <span className="ml-2 text-black">{item.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer - Buttons */}
            <div className="flex justify-end items-center space-x-4 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
