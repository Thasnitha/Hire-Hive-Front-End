
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllJobAPI, ApplyJobAPI } from "../services/allAPI";
import { Button, Container, Row, Col, Card, Alert, Modal, Form } from "react-bootstrap";

const Jobdescription = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null); // For success/error messages
  const [alertVariant, setAlertVariant] = useState("info");
  const [showModal, setShowModal] = useState(false); // Modal state
  const [resume, setResume] = useState(null); // Resume file state

  const navigate = useNavigate(); // Hook to navigate programmatically

  // Fetch job details by job ID
  useEffect(() => {
    const fetchJobDetails = async () => {
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

        // Fetch all jobs from the API
        const response = await GetAllJobAPI(reqHeader);
        console.log("Fetched Jobs:", response);

        // Find the job by its ID from the API response
        const fetchedJob = response?.data?.jobs.find((job) => job._id === id);
        if (fetchedJob) {
          setJob(fetchedJob);

          // Check if the user has already applied (compare with userId from token)
          const userId = JSON.parse(atob(token.split(".")[1])).userId;
          setIsApplied(fetchedJob.applications.includes(userId));
        } else {
          console.log("Job not found");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleBack = () => {
    navigate("/jobs"); // Navigate to the jobs page
  };

  const handleApply = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setAlertMessage("Please log in to apply for this job.");
        setAlertVariant("danger");
        return;
      }
  
      if (!resume) {
        setAlertMessage("Please upload your resume before applying.");
        setAlertVariant("danger");
        return;
      }
  
      const formData = new FormData();
      formData.append("resume", resume); // Attach the resume file
  
      // Log the job ID and token for debugging
      console.log("Job ID:", id);
      console.log("Token:", token);
  
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
  
      // Make the API call
      const response = await ApplyJobAPI(id, formData, headers);
      console.log("Apply Response:", response);
  
      if (response.data && response.data.success) {
        setIsApplied(true);
        setAlertMessage("You have successfully applied for this job.");
        setAlertVariant("success");
        setShowModal(false); // Close the modal
      } else {
        setAlertMessage(response.data?.message || "An error occurred.");
        setAlertVariant("danger");
      }
    } catch (error) {
      console.error("Error applying for the job:", error);
      setAlertMessage("An error occurred while applying for the job.");
      setAlertVariant("danger");
    }
  };
  

  if (loading) {
    return <div>Loading job details...</div>;
  }

  if (!job) {
    return <div>No job details available</div>;
  }

  return (
    <Container style={{ marginTop: "50px" }}>
      {/* Back Button */}
      <Button variant="secondary" onClick={handleBack} className="mb-3">
        &larr; Back to Jobs
      </Button>

      {/* Alert for success/error messages */}
      {alertMessage && <Alert variant={alertVariant}>{alertMessage}</Alert>}

      <Card className="shadow-sm p-4">
        {/* Job Title */}
        <h3 className="font-weight-bold mb-4">{job.title}</h3>

        {/* Job Info Cards */}
        <Row className="mb-4 text-center">
          <Col>
            <Card className="text-primary shadow-sm py-2">
              <Card.Body>
                <h6 className="font-weight-bold mb-0">{job.position} Positions</h6>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="text-danger shadow-sm py-2">
              <Card.Body>
                <h6 className="font-weight-bold mb-0">{job.jobType}</h6>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="text-success shadow-sm py-2">
              <Card.Body>
                <h6 className="font-weight-bold mb-0">{job.salary} LPA</h6>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Job Description Section */}
        <div>
          <h4 className="mb-3">Job Description</h4>
          <hr />
          <Row className="mb-3">
            <Col md={6}>
              <h6>
                <span className="font-weight-bold">Role:</span>{" "}
                <span className="text-muted">{job.title}</span>
              </h6>
              <h6>
                <span className="font-weight-bold">Location:</span>{" "}
                <span className="text-muted">{job.location}</span>
              </h6>
              <h6>
                <span className="font-weight-bold">Experience:</span>{" "}
                <span style={{color:'red'}} className="text-muted">{job.experienceLevel}</span>
              </h6>
              <h6>
                <span className="font-weight-bold">Salary:</span>{" "}
                <span className="text-muted">{job.salary} LPA</span>
              </h6>
            </Col>
            <Col md={6}>
              <h6>
                <span className="font-weight-bold">Total Applications:</span>{" "}
                <span className="text-muted">{job.applications.length}</span>
              </h6>
              <h6>
                <span className="font-weight-bold">Posted Date:</span>{" "}
                <span className="text-muted">{new Date(job.createdAt).toLocaleDateString()}</span>
              </h6>
            </Col>
          </Row>
            {/* Requirements Section */}
         <Row className="mb-4">
            <Col>
              <h5>Requirements</h5>
             <ul>               {job.requirements && job.requirements.map((req, index) => (
                 <li key={index}>{req}</li>
              ))}
            </ul>
           </Col>
        </Row>
          <h6>
            <span className="font-weight-bold">Description:</span>{" "}
            <span className="text-muted">{job.description}</span>
          </h6>
        </div>

        {/* Apply Button */}
        <div className="text-center mt-4">
          <Button
            variant={isApplied ? "secondary" : "info"}
            disabled={isApplied}
            onClick={() => setShowModal(true)}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </Card>

      {/* Modal for Resume Upload */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Resume</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Upload Resume</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setResume(e.target.files[0])}
                accept=".pdf,.doc,.docx"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="info" onClick={handleApply}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Jobdescription;

