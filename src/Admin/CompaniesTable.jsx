

import React, { useEffect, useState } from "react";
import { Table, Button, OverlayTrigger, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GEtCompanyAPI } from "../services/allAPI"; // Updated function name

const CompaniesTable = ({ filterKeyword }) => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]); // State to hold company data

  // Fetch companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          console.log("Token not found. Redirecting to login.");
          // Handle token not present, show login prompt or redirect
          return;
        }

        const reqHeader = {
          "Authorization": `Bearer ${token}`,
        };

        const response = await GEtCompanyAPI(reqHeader);
        console.log("Response from API:", response); // Log the response

        if (response && response.data) {
          setCompanies(response.data); // Store the companies in state (the data is already an array)
        } else {
          console.error("Error fetching companies:", response); // Log error response
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []); // Empty dependency array to call once on mount

  // Filter companies based on the filterKeyword
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(filterKeyword.toLowerCase())
  );

  return (
    <div>
      <Table bordered hover className="shadow-sm">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the filtered companies and render them */}
          {filteredCompanies.map((company) => (
            <tr key={company._id}>
              <td>
                <img
                  src={company.logo || "https://via.placeholder.com/50"} // Default if no logo available
                  alt="Company Logo"
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>{company.name}</td>
              <td>{new Date(company.createdAt).toLocaleDateString()}</td> {/* Format the date */}
              <td>
                {/* Action Button with Popover */}
                <OverlayTrigger
                  trigger="click"
                  placement="left"
                  rootClose
                  overlay={
                    <Popover id="popover-basic">
                      <Popover.Body>
                        <div className="d-flex flex-column">
                          {/* Applicants Button */}
                          <Button onClick={() => navigate(`/admin/jobs/${company._id}/applicants`)} variant="light" className="mb-2 d-flex align-items-center">
                            <i className="fas fa-eye me-2"></i> Applicants
                          </Button>
                          {/* Edit Button */}
                          {/* <Button onClick={() => navigate(`/admin/editCompany/${company._id}`)} variant="light" className="d-flex align-items-center">
                            <i className="fas fa-edit me-2"></i> Edit
                          </Button> */}
                        </div>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  {/* Three Dots Icon */}
                  <Button variant="light">
                    <i className="fas fa-ellipsis-v"></i>
                  </Button>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
