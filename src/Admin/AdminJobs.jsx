

import React, { useState } from 'react';
import Header from '../components/Header';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminJobTable from './AdminJobTable';

const AdminJobs = () => {
  const [filterKeyword, setFilterKeyword] = useState(''); // State to hold the filter keyword
  const navigate = useNavigate();

  // Handle filter input change
  const handleFilterChange = (e) => {
    setFilterKeyword(e.target.value);
  };

  return (
    <Container style={{ marginTop: '100px', marginLeft: '80px' }}>
      {/* Header Component */}
      <Header />

      {/* Filter and Add New Job Section */}
      <Row className="align-items-center justify-content-between my-4">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Filter by Name"
            className="shadow-sm"
            value={filterKeyword}
            onChange={handleFilterChange} // Update filterKeyword on change
          />
        </Col>
        <Col md="auto">
          <Button onClick={() => navigate('/admin/postJob')} variant="info" className="text-white shadow-sm">
            New Job
          </Button>
        </Col>
      </Row>

      {/* Jobs Table */}
      <AdminJobTable filterKeyword={filterKeyword} /> {/* Pass filterKeyword as a prop */}
    </Container>
  );
};

export default AdminJobs;
