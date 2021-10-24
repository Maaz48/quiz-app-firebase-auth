import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
const NavComp = ({ userName }) => {
    return (
        <div>
            <Navbar>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="m-auto">

                            <Navbar.Brand className="userName">WELCOME TO {userName}</Navbar.Brand>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavComp
