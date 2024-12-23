


import React, { useState, useEffect, useContext } from 'react';
import { Container, Nav, Navbar, OverlayTrigger, Popover, Image, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { tokenContext } from '../context/TokenAuth';

const Header = () => {
  const{authorisedUser,setAuthorisedUser}=useContext(tokenContext)
  const navigate=useNavigate()
  const [user, setUser] = useState(null); // State to store user data

  useEffect(() => {
    // Get user data from sessionStorage
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    setUser(storedUser); // Set user from sessionStorage if available
  }, []);

  const handleLogout = () => {
    setUser(null); // Clear user state
    sessionStorage.clear('user');
    setAuthorisedUser(false)
     // Remove user from sessionStorage
     navigate('/login')
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <div className="d-flex align-items-center mb-3">
          <Image
            src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3485.jpg"
            roundedCircle
            className="me-2"
            width="50px"
          />
          <div>
            <strong>{user ? user.FullName : 'User'}</strong>
            <br />
            <small>{user ? user.email : 'No email available'}</small>
          </div>
        </div>
        <hr />
        <Nav.Link>
          <i className="fa-solid fa-user"></i> <Link style={{textDecoration:'none',color:'black'}} to="/profile">View Profile</Link>
        </Nav.Link>
        <Nav.Link className="text-danger" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </Nav.Link>
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="shadow-sm"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1030, // Ensures it stays above other elements on the page
      }}
    >
      <Container>
        {/* Brand Section */}
        <Navbar.Brand href="#">
          <b>
            <Link to={'/'} style={{textDecoration:'none',color:'black'}}>            <i className="fa-brands fa-hive"></i> Hire <span className="text-info">Hive</span>
            </Link>
          </b>
        </Navbar.Brand>

        {/* Toggle for responsive design */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Links Section */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {user && user.role === 'recruiter' ? (
              <>
                <Nav.Link className="text-dark">
                  <Link style={{ color: 'black', textDecoration: 'none' }} to="/admin/companies">
                    <b>Companies</b>
                  </Link>
                </Nav.Link>
                <Nav.Link className="text-dark">
                  <Link style={{ color: 'black', textDecoration: 'none' }} to="/admin/jobs">
                    <b>Jobs</b>
                  </Link>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className="text-dark">
                  <Link style={{ color: 'black', textDecoration: 'none' }} to="/">
                    <b>Home</b>
                  </Link>
                </Nav.Link>
                <Nav.Link className="text-dark">
                  <Link style={{ color: 'black', textDecoration: 'none' }} to="/jobs">
                    <b>Jobs</b>
                  </Link>
                </Nav.Link>
                {/* <Nav.Link className="text-dark">
                  <Link style={{ color: 'black', textDecoration: 'none' }} to="/browse">
                    <b>Browse</b>
                  </Link>
                </Nav.Link> */}
              </>
            )}

            {/* Conditional Login/Sign Up OR Profile */}
            {!user ? (
              <div>
                {/* Login Button */}
                <Link to="/login">
                  <Button className="bg-white border-dark" variant="outline">
                    <b>Login</b>
                  </Button>
                </Link>

                {/* Sign-Up Button */}
                <Link to="/register">
                  <Button className="bg-info text-white ms-2" variant="outline">
                    <b>Sign Up</b>
                  </Button>
                </Link>
              </div>
            ) : (
              <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
                <Image
                  src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3485.jpg"
                  roundedCircle
                  style={{ cursor: 'pointer' }}
                  alt="Profile"
                  width="50px"
                />
              </OverlayTrigger>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

