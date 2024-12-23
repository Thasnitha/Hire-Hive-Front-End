

import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { UpdateProfileAPI } from "../services/allAPI";
import { updateProfileContext } from "../context/ContextShare";

const UpdateProfileDialog = ({ showModal, handleClose }) => {
  const { setUpdateProfileResponse } = useContext(updateProfileContext);
  const [userDetails, setUserDetails] = useState({
    FullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    skills: "",
    linkedin: "",
  });

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      setUserDetails({
        ...userDetails,
        FullName: user.FullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        password: user.password || "",
        role: user.role || "",
        skills: user.profile?.skills?.join(", ") || "",
        linkedin: user.profile?.linkedin || "",
      });
    }
  }, [showModal]);

  const handleUserUpdate = async () => {
    const { FullName, email, phoneNumber, password, role, skills, linkedin } = userDetails;
    if (FullName && email && phoneNumber && skills) {
      const reqBody = new FormData();
      reqBody.append("FullName", FullName);
      reqBody.append("email", email);
      reqBody.append("phoneNumber", phoneNumber);
      reqBody.append("password", password);
      reqBody.append("role", role);
      reqBody.append("skills", skills);
      reqBody.append("linkedin", linkedin);

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };

        try {
          const result = await UpdateProfileAPI(reqBody, reqHeader);
          if (result.status === 200) {
            alert("Profile updated successfully");
            sessionStorage.setItem("user", JSON.stringify(result.data));
            setUpdateProfileResponse(result.data);
            handleClose();
          }
        } catch (err) {
          console.error(err);
        }
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Update Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Removed Profile Photo Upload Section */}

          {/* Name and Email Fields */}
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group controlId="formName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  value={userDetails.FullName}
                  onChange={(e) => setUserDetails({ ...userDetails, FullName: e.target.value })}
                  type="text"
                  placeholder="Enter your name"
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={userDetails.email}
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  type="email"
                  placeholder="Enter your email"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Phone Number Field */}
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              value={userDetails.phoneNumber}
              onChange={(e) => setUserDetails({ ...userDetails, phoneNumber: e.target.value })}
              type="text"
              placeholder="Enter your phone number"
            />
          </Form.Group>

          {/* Skills Field */}
          <Form.Group className="mb-3" controlId="formSkills">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              value={userDetails.skills}
              type="text"
              placeholder="Enter your skills (comma-separated)"
              onChange={(e) => setUserDetails({ ...userDetails, skills: e.target.value })}
            />
          </Form.Group>

          {/* LinkedIn Field */}
          <Form.Group className="mb-3" controlId="formLinkedIn">
            <Form.Label>LinkedIn Link</Form.Label>
            <Form.Control
              value={userDetails.linkedin}
              type="url"
              placeholder="Enter your LinkedIn profile URL"
              onChange={(e) => setUserDetails({ ...userDetails, linkedin: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="info" onClick={handleUserUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateProfileDialog;




