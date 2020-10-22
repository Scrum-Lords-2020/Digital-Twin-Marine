import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Header.css'
import { NavDropdown } from 'react-bootstrap';

class Header extends React.Component{
    render(){
        return(
                <Container fluid="md" className="bigContainer">
                <Row>
                    
                    <Col></Col> 

                    <Col xs={12}>
                    <Navbar expand="lg" className="justify-content between w-100">
                        <Navbar.Brand href="#index">
                            <Image src="mainboat.jpg" fluid></Image>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarTogglerDemo02" aria-expanded="false" label></Navbar.Toggle>
                        {/*<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                         </button> */}
                        <Navbar.Collapse id="navbarTogglerDemo02">
                        <Nav className="ml-auto">
                            <Nav.Link href="index.html">HOME</Nav.Link>
                            <NavDropdown title="ABOUT">
                                <NavDropdown.Item href="#">ABOUT US</NavDropdown.Item>
                                <NavDropdown.Item href="#">FAQ</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#">SERVICES</Nav.Link>
                            <Nav.Link href="#">CONTACT US</Nav.Link>
                            <Nav.Link href="login.html">
                                <Button variant="info">LOGIN</Button>
                            </Nav.Link>
                            <Nav.Link href="#">
                                <Button variant="primary">REQUEST DEMO</Button>
                            </Nav.Link>
                            
                        </Nav>
                        
                        </Navbar.Collapse>

                    </Navbar>

                    </Col>

                    
                    <Col></Col> 

                </Row>
            </Container>
      
        );
    }
}

export default Header;