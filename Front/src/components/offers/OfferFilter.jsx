import React from "react";

const OfferFilter = ({
  searchTerm,
  setSearchTerm,
  searchDepartment,
  setSearchDepartment,
  searchLocation,
  setSearchLocation,
  searchType,
  setSearchType,
}) => {
  return (
    <form className="col-span-1">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium leading-5 text-gray-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
          placeholder="Search by Offer title"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="department" className="block text-sm font-medium leading-5 text-gray-700">
          Department
        </label>
        <input
          id="department"
          type="text"
          value={searchDepartment}
          onChange={(e) => setSearchDepartment(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
          placeholder="Search by department"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block text-sm font-medium leading-5 text-gray-700">
          Location
        </label>
        <input
          id="location"
          type="text"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
          placeholder="Search by location"
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium leading-5 text-gray-700">
          Type
        </label>
        <select
          id="type"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
        >
          <option value="">Select Offer type</option>
          <option value="binome">Binome</option>
          <option value="monome">Monome</option>
        </select>
      </div>
    </form>
  );
};

export default OfferFilter;
