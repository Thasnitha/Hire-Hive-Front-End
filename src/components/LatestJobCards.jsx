

import React from 'react';

const LatestJobCards = ({ job }) => {
  return (
    <div style={{minHeight:'250px'}} className="card shadow-sm p-4 mb-3 ">
      <div>
        <h6 className="mb-2">{job.companyName}</h6> {/* Assuming the job object contains companyName */}
        <p className="mb-3 text-muted">{job.location}</p> {/* Display location */}
      </div>
      <div>
        <h6 className="mb-2">{job.title}</h6> {/* Display job title */}
        {/* <p className="mb-3 text-muted">
          {job.description}
        </p>  */}
      </div>
      <div className="d-flex justify-content-between mt-3">
        <div
          style={{ minWidth: '100px', fontSize: '14px', cursor: 'pointer' }}
          className="card text-primary text-center py-2 shadow-sm"
        >
          {job.position} Positions {/* Display number of positions */}
        </div>
        <div
          style={{ minWidth: '100px', fontSize: '14px', cursor: 'pointer' }}
          className="card text-danger text-center py-2 shadow-sm"
        >
          {job.jobType} {/* Display job type (e.g., Part-Time, Full-Time) */}
        </div>
        <div
          style={{ minWidth: '100px', fontSize: '14px', cursor: 'pointer' }}
          className="card text-success text-center py-2 shadow-sm"
        >
          {job.salary} LPA {/* Display salary */}
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;
