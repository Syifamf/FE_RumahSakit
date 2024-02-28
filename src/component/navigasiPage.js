// Navbar.js

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Rumah Sakit XYZ</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Beranda</Nav.Link>
          <Nav.Link href="#services">Layanan</Nav.Link>
          <Nav.Link href="#doctors">Dokter</Nav.Link>
          <Nav.Link href="#appointments">Janji</Nav.Link>
          <Nav.Link href="#contact">Kontak</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
