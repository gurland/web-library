import React, { useContext } from 'react';
import { Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Context } from '../App';

export default function Navbar() {
  const ctx = useContext(Context);

  return (
    <BootstrapNavbar bg="light" expand="lg">
      <BootstrapNavbar.Brand as={Link} to="/">WebLibrary</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/reader">Читалка</Nav.Link>
          {
            ctx.authorized
              ? <Nav.Link as={Link} to="/">Вийти</Nav.Link>
              : (
                <>
                  <Nav.Link as={Link} to="/registration">Реєстрація</Nav.Link>
                  <Nav.Link as={Link} to="/login" >Увійти</Nav.Link>
                </>
              )
          }
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}
