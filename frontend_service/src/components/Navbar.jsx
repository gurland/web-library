import React from 'react';
import {
  Nav,
  Navbar as BootstrapNavbar,
} from 'react-bootstrap';


export default function Navbar() {
  return (
    <BootstrapNavbar bg="light" expand="lg">
      <BootstrapNavbar.Brand href="/">WebLibrary</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/reader">Читалка</Nav.Link>
          { /* todo change to log in / log out if user logged in */ }
          <Nav.Link href="/registration">Реєстрація</Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}
