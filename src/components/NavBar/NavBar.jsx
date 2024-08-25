import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { CartWidget } from "../CartWidget/CartWidget";
import { Logo } from "../Logo/Logo";

export const NavBar = () => (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container className="d-flex justify-content-between align-items-center">
            <Navbar.Brand as={NavLink} to="/">
                <Logo />
                Zapatillas Center
            </Navbar.Brand>
            <Nav className="mx-auto">
                <Nav.Link as={NavLink} to="/categoria/Deportiva">Deportivas</Nav.Link>
                <Nav.Link as={NavLink} to="/categoria/Urbana">Urbanas</Nav.Link>
                <Nav.Link as={NavLink} to="/genero/Hombre">Hombres</Nav.Link>
                <Nav.Link as={NavLink} to="/genero/Mujer">Mujeres</Nav.Link>
                <Nav.Link as={NavLink} to="/genero/Chicos">Chicos</Nav.Link>
                <Nav.Link as={NavLink} to="/genero/Chicas">Chicas</Nav.Link>
            </Nav>
            <CartWidget />
        </Container>
    </Navbar>
);
