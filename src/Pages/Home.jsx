

import React, { useState } from 'react';
import Header from '../components/Header';
import girl from '../assets/girl.png';
import LatestJobs from '../components/LatestJobs';
import Footer from '../components/Footer';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  
  // Function to handle keyword input
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  // Function to handle location input (if you want to add location filtering)
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    // Can pass the filters (keyword, location) to LatestJobs component
    console.log("Searching for", keyword, "in", location);
  };

  return (
    <div>
      <Header />
      <div className="main d-flex text-black" style={{ minHeight: '100vh', overflowX: 'hidden' }}>
        {/* Left Section */}
        <div className="col-lg-6 d-flex flex-column justify-content-center" style={{ paddingLeft: '80px' }}>
          <h1 className="mb-3">
            Got Talent? <br /> Meet Opportunity
          </h1>
          <p className="mb-0">
            Company reviews, Salaries, Interviews, Jobs.
          </p>
          <div className="search-bar">
            <div className="search-input">
              <i className="fa fa-search"></i>
              <input
                type="text"
                placeholder="Job title or keywords"
                className="input-field"
                value={keyword}
                onChange={handleKeywordChange} // Update keyword state
              />
            </div>
            <div className="location-input">
              <i className="fa fa-map-marker-alt"></i>
              <input
                type="text"
                placeholder="Location"
                className="input-field"
                value={location}
                onChange={handleLocationChange} // Update location state
              />
            </div>
            <button className="search-button" onClick={handleSearchClick}>Search</button>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-lg-6 d-flex justify-content-center align-items-center">
          <img style={{ height: '80%' }} src={girl} alt="Girl Illustration" className="img-fluid" />
        </div>
      </div>

      {/* Pass filters (keyword, location) to LatestJobs component */}
      <LatestJobs keyword={keyword} location={location} />

      <Footer />
    </div>
  );
};

export default Home;




