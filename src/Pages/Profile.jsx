

import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import AppliedJobTable from "../components/AppliedJobTable";
import UpdateProfileDialog from "../components/UpdateProfileDialog";
import { updateProfileContext } from "../context/ContextShare";
import { useNavigate } from "react-router-dom";

// const BASE_URL = "http://localhost:5000"; // Replace with your server's base URL

const Profile = () => {
  const { updateProfileResponse } = useContext(updateProfileContext);
  const [showModal, setShowModal] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();

  // Load user data from sessionStorage
  useEffect(() => {
    const storedProfile = JSON.parse(sessionStorage.getItem("user"));
    if (storedProfile) {
      setUserProfile(storedProfile);
    } else {
      alert("You are not logged in.");
      navigate("/login");
    }
  }, [navigate]);

  // Update profile data when updateProfileResponse changes
  useEffect(() => {
    if (updateProfileResponse) {
      setUserProfile(updateProfileResponse);
      sessionStorage.setItem("user", JSON.stringify(updateProfileResponse));
    }
  }, [updateProfileResponse]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div style={{ marginTop: "100px" }}>
      <Header />
      <Container className="bg-white border border-gray-200 rounded-3 shadow-lg py-5 px-4">
        <Row className="align-items-center mb-4 position-relative">
          {/* <Col xs={12} md={3} className="text-center">
          </Col> */}
          <Col xs={12} md={9}>
            <h1 className="font-weight-bold mb-2">{userProfile?.FullName || "Your Name"}</h1>
            <p className="text-muted">{userProfile?.email || "No email added"}</p>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col>
            {userProfile?.role === "student" ? (
              <>
                <h5 className="mb-3">Skills</h5>
                <div>
                  {userProfile?.profile?.skills
                    ? userProfile.profile.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          bg="info"
                          className="text-white me-2 mb-2 p-2 rounded-pill"
                          style={{ fontSize: "1rem" }}
                        >
                          {skill}
                        </Badge>
                      ))
                    : "No skills added. Click edit to add skills!"}
                </div>
                <AppliedJobTable />
                <div className="mt-4">
                  <h5>Email</h5>
                  <p className="text-muted">{userProfile?.email || "No email added"}</p>
                  <h5>Phone Number</h5>
                  <p className="text-muted">{userProfile?.phoneNumber || "No phone number added"}</p>
                  <h5>LinkedIn</h5>
                  <p className="text-muted">
                    {userProfile?.profile?.linkedin ? (
                      <a
                        href={userProfile.profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {userProfile.profile.linkedin}
                      </a>
                    ) : (
                      "No LinkedIn profile added"
                    )}
                  </p>
                </div>
              </>
            ) : (
              <>
                <h5 className="mb-3">Role</h5>
                <p className="text-muted">Recruiter</p>
              </>
            )}
          </Col>
        </Row>

        {/* Show Edit button only if role is student */}
        {userProfile?.role === "student" && (
          <Button variant="info" onClick={handleShow} className="mt-3">
            <i className="fa-solid fa-pen-to-square"></i> Edit
          </Button>
        )}
      </Container>

      <UpdateProfileDialog
        showModal={showModal}
        handleClose={handleClose}
        userProfile={userProfile}
      />
    </div>
  );
};

export default Profile;




