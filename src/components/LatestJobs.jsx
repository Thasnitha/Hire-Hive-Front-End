


import React, { useEffect, useState } from "react";
import LatestJobCards from "./LatestJobCards"; // Import child component
import { Container, Row, Col } from "react-bootstrap";
import { GetAllJobAPI } from "../services/allAPI";
import search from '../assets/serach.png'

const LatestJobs = ({ keyword, location }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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

        const response = await GetAllJobAPI(reqHeader);
        if (response?.data?.jobs) {
          const sortedJobs = response.data.jobs.sort(
            (a, b) => new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now())
          );
          setJobs(sortedJobs);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error.message, error.response?.data || error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const keywordMatch = keyword
      ? job.title.toLowerCase().includes(keyword.toLowerCase())
      : true;
    const locationMatch = location
      ? job.location.toLowerCase().includes(location.toLowerCase())
      : true;

    return keywordMatch && locationMatch;
  });

  return (
    <div style={{ paddingBottom: "5%", paddingLeft: "80px", paddingTop: "50px" }}>
      <Container className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-black">
          <span className="text-info">
            Latest <span className="text-black">&</span> Top
          </span>{" "}
          Job Openings
        </h1>
        <Row className="my-5">
          {loading ? (
            <span>Loading jobs...</span>
          ) : filteredJobs.length === 0 ? (
            <span><img style={{marginLeft:'400px'}} src={search} alt="" /></span>
          ) : (
            filteredJobs.slice(0, 6).map((job, index) => (
              <Col lg={4} md={6} sm={12} key={index}>
                <LatestJobCards job={job} />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
};

export default LatestJobs;

