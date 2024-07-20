import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Layout.css'; // Import custom CSS

function Layout({ children }) {
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Job Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              {/* Add more links as needed */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="content">
        {children}
      </Container>
    </>
  );
}

export default Layout;
