import React, { Component } from 'react';
import { Container, Form, FormControl, InputGroup, Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';

class Dashboard extends Component {
    render() {
        return(
            <Container>
                <FilterBar />
            </Container>
        );
    }
}

class FilterBar extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Brand>Project List</Navbar.Brand>
                <Nav variant='pills' defaultActiveKey='card'>
                    <Nav.Item>
                        <Nav.Link eventKey='card'>Card View</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey='list'>List View</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Form inline>
                    <InputGroup>
                        <FormControl placeholder='Search' />
                        <InputGroup.Append>
                            <Button variant="outline-secondary">Search</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
                <Nav>
                    <NavDropdown title='Filter By' id='filterBy'>
                        <NavDropdown.Item eventKey="size">Size</NavDropdown.Item>
                        <NavDropdown.Item eventKey="age">Age</NavDropdown.Item>
                        <NavDropdown.Item eventKey="status">Status</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
}

export default Dashboard;