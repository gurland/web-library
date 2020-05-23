import React, { useContext, useCallback } from 'react';
import { Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { deleteFromStorage } from '../helpers';
import { Context } from '../App';

export default function Navbar() {
  const ctx = useContext(Context);
  const history = useHistory();

  const logout = useCallback(() => {
    deleteFromStorage('accessToken');
    ctx.setAuthorized(false);

    history.push('/');
  }, [ctx.authorized])

  return (
    <BootstrapNavbar bg="light" expand="lg">
      <BootstrapNavbar.Brand as={Link} to="/">WebLibrary</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/reader">Читалка</Nav.Link>
          {
            ctx.authorized
              ? <Nav.Link as={Link} to="/" onClick={logout}>Вийти</Nav.Link>
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
