import React, { Component, useState, setState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import logo from '../imgs/DTM_Logo.webp'
import {ReactComponent as ProfileIcon} from '../imgs/profile-user.svg'
import {ReactComponent as GearIcon} from '../imgs/gear-icon.svg'
import {ReactComponent as LogoutIcon} from '../imgs/logout-icon.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Header.css'
import { Dropdown, NavDropdown, DropdownButton } from 'react-bootstrap';

class Header extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
    }

    render(){
        return(
                <Container fluid className="bigContainer">
                <Row id="bootstrap-overrides">
                    
                    <Col></Col> 

                    <Col xs={12}>
                    <Navbar expand="lg"  className="justify-content between">
                        {/*onClick={() => window.location.href='https://digitaltwinmarine.com/'}*/}
                        <div id="img-container">
                            <a href="https://digitaltwinmarine.com/">
                                <Image src={logo} fluid></Image>
                            </a>
                        </div>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" aria-expanded="false" label></Navbar.Toggle>
                        {/*<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                         </button> */}
                        <Navbar.Collapse id="navbarTogglerDemo02">
                        <Nav style={{display: "flex", alignItems: "center", textAlign: "center"}}className="ml-auto">
                            <Nav.Link href="https://digitaltwinmarine.com/">HOME</Nav.Link>
                            <NavDropdown style={{ height: "30px"}} id="basic-nav-dropdown" title="ABOUT">
                                <NavDropdown.Item href="https://digitaltwinmarine.com/about-us/">ABOUT US</NavDropdown.Item>
                                <NavDropdown.Item href="https://digitaltwinmarine.com/faq/">FAQ</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="https://digitaltwinmarine.com/service/">SERVICES</Nav.Link>
                            <Nav.Link href="https://digitaltwinmarine.com/contact-us/">CONTACT US</Nav.Link>
                            
                            {!this.props.isLoggedIn && (
                                <LoginButtons />
                             )}

                             {this.props.isLoggedIn && (
                                 <AccountIcon 
                                 userInfo={this.props.user}/>
                             )}
                            
                            
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


class LoginButtons extends Component{
    render(){
        return(
            <div>
                <Button href="/" style={{width: "80px", height: "40px", marginRight: "5px"}}variant="info">LOGIN</Button>
                <Button href="https://digitaltwinmarine.com/request-demo/" style={{width: "150px", height: "42px"}} variant="primary">
                    REQUEST DEMO</Button>
            </div>
        );
    }
}

class AccountIcon extends Component{
    constructor(props){
        super(props);
        this.state = { isOpen: false }
    }

    render(){
        const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
            <a
              
              ref={ref}
              onClick={e => {
                e.preventDefault();
                onClick(e);
              }}
            >
              {/* Render custom icon here */}
              <div id="account-info" style={{textDecoration: "none"}}>
              <ProfileIcon style={{margin: "0px 5px 0px 5px"}}/>
              <div id="display-info">
                    <h6 >{this.props.userInfo.name}</h6>
                    <h6>Client</h6>
                </div>
            </div>
              {children}
            </a>
          ));


          this.handleOpen = () => {
            this.setState({ isOpen: true })
          }
        
          this.handleClose = () => {
             this.setState({ isOpen: false })
          }

        return(
            <Dropdown alignRight id="account-dropdown" renderMenu
            onMouseEnter = { this.handleOpen }
            onMouseLeave = { this.handleClose }
            show={ this.state.isOpen }>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" >
                    
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    <Dropdown.Item >
                        <div>
                        <ProfileIcon style={{width: "19px", height: "19px"}} />  My Profile
                        </div>
                    </Dropdown.Item>

                    <Dropdown.Item >
                        <div>
                       <GearIcon style={{width: "19px", height: "19px"}} /> Settings
                       </div>
                    </Dropdown.Item>

                    <Dropdown.Item >
                        <div>
                       <LogoutIcon style={{width: "20px", height: "20px"}} /> Logout
                       </div>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}


export default Header;