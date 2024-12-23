


import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Header from "../components/Header";
import { GetAllJobAPI } from "../services/allAPI"; // Assuming you have an API function
import Job from "../components/Job"; // Import Job component
import FilterCard from "../components/FilterCard"; // Import FilterCard component
import search from '../assets/serach.png'


const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [filters, setFilters] = useState({}); // State for filters

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
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

        // Make the API request to get the jobs
        const response = await GetAllJobAPI(reqHeader);
        console.log("Fetched Jobs:", response);

        // Filter jobs based on selected filters
        if (response?.data?.jobs) {
          const filteredJobs = response.data.jobs.filter((job) => {
            // Apply filters to jobs
            let isValid = true;

            if (filters.location && job.location !== filters.location) {
              isValid = false;
            }
            if (filters.industry && job.title !== filters.industry) {
              isValid = false;
            }
            if (filters.salary && !job.salary.includes(filters.salary)) {
              isValid = false;
            }

            return isValid;
          });

          setJobs(filteredJobs); // Set the filtered jobs to state
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]); // Re-run the fetchJobs whenever filters change

  return (
    <Container style={{ paddingBottom: "60%", marginTop: "110px" }}>
      <Header />
      <Row className="px-4">
        <Col md={2}>
          {/* Pass setFilters and filters as props to FilterCard */}
          <FilterCard setFilters={setFilters} filters={filters} />
        </Col>
        <Col md={9}>
          {loading ? (
            <span>Loading jobs...</span>
          ) : jobs.length < 1 ? (
            <span><img src={search} alt="" /></span>
          ) : (
            <Row>
              {jobs.map((job) => (
                <Col md={4} key={job._id}>
                  <Job job={job} /> {/* Pass each job object as a prop to the Job component */}
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Jobs;
