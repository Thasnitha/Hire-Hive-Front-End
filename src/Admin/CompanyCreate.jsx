

import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { registerCompanyAPI } from '../services/allAPI';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompanyCreate = () => {
  const navigate = useNavigate();

  const [companyDetails, setCompanyDetails] = useState({
    name: '',
    description: '',
    location: '',
    website: '',
    logoUrl: '', // This will store the logo URL
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, location, website, logoUrl } = companyDetails;

    if (!name || !description || !location || !logoUrl) {
      toast.error('All fields, including logo URL, are required.');
      return;
    }

    setLoading(true);

    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error('Please login first.');
        setLoading(false);
        return;
      }

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const companyData = {
        name,
        description,
        location,
        website,
        logo: logoUrl, // Pass the URL directly as 'logo'
      };

      const response = await registerCompanyAPI(companyData, reqHeader);

      if (response && response.data && response.data.success) {
        toast.success('Company registered successfully');
        console.log('Before navigating');
navigate('/');
console.log('After navigating');

      } else {
        toast.error(response.data?.message || 'Failed to register company.');
      }
    } catch (error) {
      console.error('Error during company registration:', error);
      toast.error('An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ marginTop: '100px', paddingLeft: '80px' }}>
      <h2 className="text-center mb-4">Register Your Company</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="companyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                name="name"
                value={companyDetails.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="companyDescription">
              <Form.Label>Company Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company description"
                name="description"
                value={companyDetails.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="companyLocation">
              <Form.Label>Company Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company location"
                name="location"
                value={companyDetails.location}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="companyWebsite">
              <Form.Label>Company Website</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter company website (optional)"
                name="website"
                value={companyDetails.website}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="companyLogoUrl">
              <Form.Label>Company Logo URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter logo URL"
                name="logoUrl"
                value={companyDetails.logoUrl}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-between mt-4">
          <Button variant="secondary" type="button" onClick={() => navigate('/admin/companies')}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register Company'}
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default CompanyCreate;

