
import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  return (
    <Card className="shadow-sm p-3 mb-3 g-3" style={{ width: "300px", height: "390px", overflow: "hidden" }}>
      <Card.Body>
        {/* Top Section */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <small>{new Date(job.createdAt).toLocaleDateString()}</small>
          <Button variant="outline-info" size="sm" className="rounded-circle">
            <i className="fa-regular fa-bookmark"></i>
          </Button>
        </div>

        {/* Middle Section */}
        <div className="d-flex align-items-center gap-2 mb-3">
          <img
            src={job.company.logo  } // Fallback image
            // alt="Company Logo"
            className="rounded-circle"
            style={{ width: "50px", height: "50px" }}
          />
          <div>
            <h6 className="mb-0">{job.company.name}</h6>
            <small className="text-muted">{job.location}</small>
          </div>
        </div>

        {/* Title and Description */}
        <div>
          <h6>{job.title}</h6>
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            {job.description.slice(0, 100)}...
          </p>
        </div>

        {/* Bottom Section */}
        <div className="d-flex justify-content-evenly mt-3 align-items-center">
          {/* <div className=" text-primary text-center py-2 shadow-sm">
            {job.position} Positions
          </div> */}
          <div className=" text-danger text-center py-2 shadow-sm">
            {job.jobType}
          </div>
          <div className=" text-success text-center py-2 shadow-sm">
            {job.salary} LPA
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-evenly mt-3">
          <button onClick={() => navigate(`/jobdescription/${job._id}`)} className="btn btn-light">
            Details
          </button>
          <button onClick={() => navigate(`/jobdescription/${job._id}`)} className="btn btn-info">Apply Now
            </button>

        </div>
      </Card.Body>
    </Card>
  );
};

export default Job;



