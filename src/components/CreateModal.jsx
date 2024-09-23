import { Input } from "@nextui-org/react";
import { useRef, useState } from "react";

export default function CreateModal({ setCreate }) {
  const name = useRef('');
  const email = useRef('');
  const mobile = useRef('');
  const imageInputRef = useRef(null); // Ref for image upload

  const [designation, setDesignation] = useState('HR'); // Default designation
  const [gender, setGender] = useState('male'); // Default gender
  const [selectedCourses, setSelectedCourses] = useState(new Set()); // Selected courses
  const [showDropdown, setShowDropdown] = useState(false); // State for showing/hiding the dropdown

  const [error, setError] = useState(''); // To handle validation errors

  const degrees = [
    { id: 1, name: "B.Tech" },
    { id: 2, name: "BCA" },
    { id: 3, name: "M.Tech" },
    { id: 4, name: "MCA" },
  ];

  const handleClose = () => setCreate(false);

  const validateEmail = (email) => {
    // Basic email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateMobile = (mobile) => {
    // Check if the mobile number is numeric and 10 digits
    return /^\d{10}$/.test(mobile);
  };

  const checkEmailDuplicate = async (email) => {
    try {
      const response = await fetch("https://deals-dray-backend.vercel.app/employees/email-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      return data.exists; // Return true if email exists
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Validations
    if (!validateEmail(email.current.value)) {
      setError('Invalid email format');
      return;
    }
    if (!validateMobile(mobile.current.value)) {
      setError('Mobile number must be 10 digits');
      return;
    }
    
    // File Validation
    const file = imageInputRef.current.files[0];
    if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Only JPG/PNG files are allowed');
      return;
    }

    // Check for duplicate email
    const isDuplicate = await checkEmailDuplicate(email.current.value);
    if (isDuplicate) {
      setError('Email already exists');
      return;
    }

    // Prepare form data for image upload
    const formData = new FormData();
    formData.append("file", imageInputRef.current.files[0]);
    formData.append("upload_preset", "dealsdray");

    try {
      // Upload the image to Cloudinary
      const cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/dqdzhdspe/image/upload", {
        method: 'POST',
        body: formData,
      });

      if (!cloudinaryResponse.ok) {
        const errorData = await cloudinaryResponse.json();
        console.error("Cloudinary upload error:", errorData);
        return;
      }

      const cloudinaryData = await cloudinaryResponse.json();
      const imageUrl = cloudinaryData.secure_url; // The Cloudinary URL
      
      // Prepare employee data with Cloudinary image URL
      const employeeData = {
        name: name.current.value,
        email: email.current.value,
        mobile: mobile.current.value,
        image: imageUrl,  // Use the Cloudinary URL here
        designation,
        gender,
        courses: Array.from(selectedCourses),
      };

      // Make API call to save the employee details in the database
      const response = await fetch("https://deals-dray-backend.vercel.app/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (response.ok) {
        console.log("Employee added successfully");
        handleClose();
      } else {
        console.error("Failed to add employee");
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
            <h2 className="text-xl font-semibold text-gray-800">Add Employee</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              &times;
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Modal Body - Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <Input ref={name} size="sm" placeholder="Enter name" style={{ color: 'black' }} />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input ref={email} size="sm" placeholder="Enter email" style={{ color: 'black' }} />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile</label>
              <Input ref={mobile} size="sm" placeholder="Enter mobile number" style={{ color: 'black' }} />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/jpeg, image/png"
                className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
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
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
);}
