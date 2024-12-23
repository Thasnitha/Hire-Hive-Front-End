


import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getApplicantsByCompanyAPI } from "../services/allAPI";

const ApplicantsTable = ({ companyId }) => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch applicants from the API
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const reqHeader = { Authorization: `Bearer ${token}` };

        if (companyId) {
          const response = await getApplicantsByCompanyAPI(reqHeader, companyId);
          setApplicants(response?.data?.applicants || []);
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchApplicants();
    }
  }, [companyId]);

  return (
    <div style={{ marginTop: "100px" }}>
      <Button
        variant="link"
        onClick={() => navigate("/admin/companies")}
        style={{ textDecoration: "none", marginBottom: "20px" }}
      >
        <i className="fas fa-arrow-left"></i> Back to Companies
      </Button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Job Title</th>
              <th>Resume</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((application) => (
              <tr key={application._id}>
                <td>{application.applicant?.FullName}</td>
                <td>{application.applicant?.email}</td>
                <td>{application.jobTitle}</td>
                <td>
                  {application.resume ? (
                    <a
                      // href={}
                      // href={`http://localhost:3001${application.resume}`}
                      href={`http://localhost:3001/uploads/${application.resume.split('/').pop()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "blue" }}
                    >
                      View Resume
                    </a>
                  ) : (
                    "No Resume"
                  )}
                </td>
                <td>{new Date(application.appliedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ApplicantsTable;






