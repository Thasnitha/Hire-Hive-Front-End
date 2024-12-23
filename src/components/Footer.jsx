
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div >
      <div style={{ height: '300px',marginRight:'100px' }} className="mt-5 container w-100">
        <div className="d-flex justify-content-around">
          {/* Introduction */}
          <div style={{ width: '400px' }}>
            <h5>
              
 
<i class="fa-brands fa-hive"></i>Hire <span className="">Hive</span>
            </h5>
            <p>
              Hire Hive is a job portal app connecting job seekers and employers.
            
            </p>
          </div>
          {/* Links */}
          <div className="d-flex flex-column">
            <h5>Links</h5>
            <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
              Home
            </Link>
            <Link to={'/login'} style={{ textDecoration: 'none', color: 'black' }}>
              Login
            </Link>
            <Link to={'/register'} style={{ textDecoration: 'none', color: 'black' }}>
              Register
            </Link>
          </div>
          {/* Contact */}
          <div className="d-flex flex-column">
            <h5>Contact</h5>
            <div className="d-flex">
              <div className="d-flex justify-content-between mt-3">
                <a
                  className="text-info me-3"
                  href="https://x.com/?lang=en-in&mx=2"
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                >
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a
                  className="text-info me-3"
                  href="https://www.instagram.com/"
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  className="text-info me-3"
                  href="https://www.facebook.com/"
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a
                  className="text-info me-3"
                  href="https://www.linkedin.com/feed/"
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a
                  className="text-info"
                  href="https://github.com/dashboard"
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                >
                  <i className="fa-brands fa-github"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <p style={{paddingTop:'100px',marginLeft:'230px'}}        className="text-center mt-3"> &copy;2024 Your company all right reserved</p>
      </div>
    </div>
  );
};

export default Footer;
