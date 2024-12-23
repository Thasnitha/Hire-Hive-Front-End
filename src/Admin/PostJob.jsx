
import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { GEtCompanyAPI, PostJobAPI } from "../services/allAPI"; // Assuming you already have these API functions
import { useNavigate } from "react-router-dom";

const JobRegisterForm = () => {
  const navigate=useNavigate()
  const [companies, setCompanies] = useState([]);
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    experienceLevel: "",
    jobType: "",
    position: "",
    company: "",
  });

  // Fetch companies when the component mounts
  useEffect(() => {
    const fetchCompanies = async () => {
      const token = sessionStorage.getItem("token"); // Get token from sessionStorage
      if (!token) {
        console.log("No token found, please log in.");
        return; // Handle the absence of the token (e.g., redirect to login)
      }
      const reqHeader = { Authorization: `Bearer ${token}` };

      try {
        const response = await GEtCompanyAPI(reqHeader); // Fetch companies from API
        if (response.data) {
          setCompanies(response.data); // Update state with company data
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value, // Dynamically update the state for each field
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("No token found, please log in.");
      return;
    }
  
    const reqHeader = { Authorization: `Bearer ${token}` };
  
    try {
      const response = await PostJobAPI(jobData, reqHeader); // Use postJob API to post the job
      console.log('Job posting response:', response);
  
      // Check if the response data contains a success message or status
      if (response.data && response.data.message === "Job created successfully") {
        alert('Job Created Successfully')
        navigate('/admin/jobs')

        console.log("Job posted successfully:", response.data);

        setJobData({
          title: "",
          description: "",
          requirements: "",
          salary: "",
          location: "",
          experienceLevel: "",
          jobType: "",
          position: "",
          company: "",
        });
      } else {
        console.log("Error posting job:", response.data ? response.data.message : "Unknown error");
      }
    } catch (error) {
      console.error("Error while posting job:", error);
    }
  };
  
  

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="p-4">
            <Card.Body>
              <Card.Title className="text-center mb-4">Post a New Job</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={jobData.title}
                    onChange={handleChange}
                    required
                    placeholder="Job Title"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={jobData.description}
                    onChange={handleChange}
                    required
                    placeholder="Job Description"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Requirements</Form.Label>
                  <Form.Control
                      as="textarea"

                    name="requirements"
                    value={jobData.requirements}
                    onChange={handleChange}
                    required
                    placeholder="Job Requirements"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="text"
                    name="salary"
                    value={jobData.salary}
                    onChange={handleChange}
                    required
                    placeholder="Salary"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={jobData.location}
                    onChange={handleChange}
                    required
                    placeholder="Location"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Experience Level</Form.Label>
                  <Form.Control
                    type="text"
                    name="experienceLevel"
                    value={jobData.experienceLevel}
                    onChange={handleChange}
                    required
                    placeholder="Experience Level"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Job Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="jobType"
                    value={jobData.jobType}
                    onChange={handleChange}
                    required
                    placeholder="Job Type"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    type="number"
                    name="position"
                    value={jobData.position}
                    onChange={handleChange}
                    required
                    placeholder="Position"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    as="select"
                    name="company"
                    value={jobData.company}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a Company</option>
                    {companies.length > 0 ? (
                      companies.map((company) => (
                        <option key={company._id} value={company._id}>
                          {company.name}
                        </option>
                      ))
                    ) : (
                      <option value="">No companies found</option>
                    )}
                  </Form.Control>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                >
                  Post Job
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default JobRegisterForm;
