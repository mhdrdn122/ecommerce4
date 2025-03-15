import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './style.css';

const Footer = () => {
  return (
    <footer className="footer bg-light-color text-dark-color py-4 shadow-lg">
      <Container>
        <Row className="align-items-start text-center text-md-start">

          {/* Logo and Description */}
          <Col md={3} className="mb-4">
            <h2 className="footer-logo">
              <img 
                style={{ background: "#fff", borderRadius: "10px" }} 
                className='pl-2 pt-2 pb-2 pr-0' 
                src={require('../images/logo.png')} 
                alt="logo"
              />
            </h2>
            <p className="footer-description">An e-commerce platform where you find everything you need at the best prices.</p>
          </Col>

          {/* Quick Links */}
          <Col md={3} className="mb-4">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="list-unstyled">
              <li><a href="#hero" className="footer-link">Home</a></li>
              <li><a href="#category" className="footer-link">Category</a></li>
              <li><a href="#LSP" className="footer-link">Latest Sale Products</a></li>
              <li><a href="#TRP" className="footer-link">Top Rate Products</a></li>
            </ul>
          </Col>

          {/* Social Media */}
          <Col md={3} className="mb-4">
            <h3 className="footer-heading">Follow Us</h3>
            <ul className="list-unstyled gap-3 justify-content-md-start justify-content-center">
              <li>
                <a href="#" className="footer-link">
                  <FontAwesomeIcon icon={faFacebook} className="me-2" /> Facebook
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  <FontAwesomeIcon icon={faTwitter} className="me-2" /> Twitter
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  <FontAwesomeIcon icon={faInstagram} className="me-2" /> Instagram
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact Information */}
          <Col md={3} className="mb-4">
            <h3 className="footer-heading">Contact Us</h3>
            <p className="footer-contact">
              <FontAwesomeIcon icon={faPhone} className="me-2" /> Phone: +123 456 789
            </p>
            <p className="footer-contact">
              <FontAwesomeIcon icon={faEnvelope} className="me-2" /> Email: info@myshop.com
            </p>
            <p className="footer-contact">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" /> Address: 123 Commerce Street, City
            </p>
          </Col>

        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <p className="footer-copyright">© 2025 MyShop. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
