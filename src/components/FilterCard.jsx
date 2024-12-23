

import React, { useState } from "react";
import { Form } from "react-bootstrap";

// Define filter data with fields like Location, Industry, and Salary
const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Kochi", "Hyderabad", "Thiruvanandhapuram", "Mumbai"],
  },
  {
    filterType: "Industry", // Industry corresponds to job.title
    array: ["Front-End Developer", "Backend Developer", "Software Engineer","Application Developer","Mearn Stack Developer"],
  },

];

const FilterCard = ({ setFilters, filters = {} }) => {
  // Function to handle filter changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="p-3 shadow-sm bg-white"
      style={{
        width: "100%",
        position: "sticky",
        top: "100px",
        marginBottom: "50px",
        paddingRight: "30px",
      }}
    >
      <h6 className="mb-3">Filter Jobs</h6>
      <hr className="mt-2" />
      {filterData.map((data, index) => (
        <div key={index} className="mb-3">
          <h6>{data.filterType}</h6>
          <Form>
            {data.array.map((item, idx) => (
              <Form.Check
                type="radio"
                name={data.filterType.toLowerCase()} // Ensure it's "location", "industry", "salary"
                key={idx}
                label={item}
                value={item}
                checked={filters?.[data.filterType.toLowerCase()] === item} // Safely access filters
                onChange={handleChange}
                className="my-1"
                style={{ fontSize: "14px" }}
              />
            ))}
          </Form>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
