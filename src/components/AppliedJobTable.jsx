

import React, { useEffect, useState } from "react";
import { Table, Container, Badge } from "react-bootstrap";
import { GETAppliedJobAPI} from "../services/allAPI"; // Import the API function

const AppliedJobTable = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to get the status badge
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "selected":
        return <Badge bg="success">{status}</Badge>;
      case "pending":
        return <Badge bg="warning">{status}</Badge>;
      case "rejected":
        return <Badge bg="danger">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // Fetch applied jobs from the API
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          console.log("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };

        // Call the API to fetch applied jobs
        const response = await GETAppliedJobAPI(reqHeader);
        console.log("Applied Jobs Response:", response);

        if (response.data && response.data.success) {
          setAppliedJobs(response.data.applications); // Extract applications from the response
        } else {
          console.log("Failed to fetch applied jobs.");
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading) {
    return <div>Loading applied jobs...</div>;
  }

  return (
    <Container style={{ marginTop: "50px" }}>
      <h4 className="mb-4">Applied Jobs</h4>
      <Table bordered hover responsive className="shadow-sm">
        <thead className="bg-light">
          <tr>
            <th>Date</th>
            <th>Job Title</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {appliedJobs.length > 0 ? (
            appliedJobs.map((application, index) => (
              <tr key={index}>
                <td>{new Date(application.createdAt).toLocaleDateString()}</td>
                {/* <td>{application.job.title}</td>
                <td>{application.job.company.name}</td> */}
                 <td>{application.job ? application.job.title : 'N/A'}</td>
                 <td>{application.job?.company ? application.job.company.name : 'N/A'}</td>
                {/* <td>{getStatusBadge(application.status)}</td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No applied jobs found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AppliedJobTable;
