
import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the companyId from the route
import Header from '../components/Header';
import ApplicantsTable from './ApplicantsTable';

const Applicants = () => {
  const { id: companyId } = useParams(); // Extract the companyId from the route

  return (
    <div style={{ marginTop: '100px', paddingLeft: '80px' }}>
      <Header />
      <div>
        <h5>Applicants for Company</h5>
        {/* Pass the companyId to ApplicantsTable */}
        <ApplicantsTable companyId={companyId} />
      </div>
    </div>
  );
};

export default Applicants;
