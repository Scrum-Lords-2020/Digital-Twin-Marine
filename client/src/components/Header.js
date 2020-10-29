import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import logo from '../imgs/DTM_Logo.webp'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Header.css'
import { NavDropdown } from 'react-bootstrap';

class Header extends React.Component{
    render(){
        return(
                <Container fluid className="bigContainer">
                <Row id="bootstrap-overrides">
                    
                    <Col></Col> 

                    <Col xs={12}>
                    <Navbar expand="lg"  className="justify-content between">
                        <Image src={logo} fluid></Image>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" aria-expanded="false" label></Navbar.Toggle>
                        {/*<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                         </button> */}
                        <Navbar.Collapse id="navbarTogglerDemo02">
                        <Nav style={{display: "flex", alignItems: "center", textAlign: "center"}}className="ml-auto">
                            <Nav.Link href="index.html">HOME</Nav.Link>
                            <NavDropdown style={{ height: "30px"}} id="basic-nav-dropdown" title="ABOUT">
                                <NavDropdown.Item href="#">ABOUT US</NavDropdown.Item>
                                <NavDropdown.Item href="#">FAQ</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#">SERVICES</Nav.Link>
                            <Nav.Link href="#">CONTACT US</Nav.Link>
                            
                                <Button href="login.html" style={{width: "80px", height: "40px", marginRight: "5px"}}variant="info">LOGIN</Button>
                            
                            
                                <Button style={{width: "150px", height: "42px"}} variant="primary">REQUEST DEMO</Button>
                            
                            
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