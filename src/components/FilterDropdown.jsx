'use client'
import { useState } from "react";

export default function FilterDropdown({setFilters,filters}) {
  const [isOpen, setIsOpen] = useState(false);

  const filterOptions = ['Name','Email','ID','Date'];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    const newFilter = checked ? filters.concat([name]) : filters.filter((item)=>item!==name);
    setFilters(newFilter);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Filters
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-50 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {/* Checkbox Options */}
            {filterOptions.map((key)=>(
                <label className="flex items-center px-4 py-2 text-sm text-gray-700" key={key}>
                    <input
                    type="checkbox"
                    onChange={handleFilterChange}
                    name={key}
                    className="mr-2"
                    />
                    {key}
                </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
