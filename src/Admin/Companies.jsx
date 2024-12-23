
import React, { useState } from 'react';
import Header from '../components/Header';
import CompaniesTable from './CompaniesTable';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import search from '../assets/serach.png'

const Companies = () => {
    const [filterKeyword, setFilterKeyword] = useState(''); // State to hold the filter keyword
  
    const navigate=useNavigate()
   
    const handleFilterChange = (e) => {
      setFilterKeyword(e.target.value);
    };
  return (
    <Container style={{ marginTop: '100px', marginLeft: '80px' }}>
      {/* Header Component */}
      <Header />

      {/* Filter and Add New Company Section */}
      <Row className="align-items-center justify-content-between my-4">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Filter by Name"
            className="shadow-sm"
            value={filterKeyword}
            onChange={handleFilterChange} 
          />
        </Col>
        <Col md="auto">
          <Button onClick={()=>navigate("/admin/companies/create")} variant="info" className="text-white shadow-sm">
            New Company
          </Button>
        </Col>
      </Row>

      {/* Companies Table */}
      <CompaniesTable filterKeyword={filterKeyword} />
    </Container>
  );

  }
export default Companies;

