import React, { Component } from 'react';
import { 
    Container, 
    Form, 
    FormControl, 
    InputGroup, 
    Nav, 
    Navbar, 
    Button, 
    NavDropdown,
    Card,
    CardColumns
} from 'react-bootstrap';

class Dashboard extends Component {
    render() {
        return(
            <Container>
                <FilterBar />
                <CardView vessels={VESSELS}/>
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
                        <NavDropdown.Item eventKey="name">Name</NavDropdown.Item>
                        <NavDropdown.Item eventKey="imo">IMO</NavDropdown.Item>
                        <NavDropdown.Item eventKey="type">Type</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
}

class CardView extends Component {
    render() {
        const cards = VESSELS.map((vessel) => <VesselCard vessel={vessel}/>);
        return (
            <CardColumns>
                {cards}
            </CardColumns>
        );
    }
}

class VesselCard extends Component {
    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{this.props.vessel.name}</Card.Title>
                    <Card.Text>IMO #: {this.props.vessel.imo}</Card.Text>
                    <Card.Text>Service Type: {this.props.vessel.type}</Card.Text>
                    <Card.Text>Files: {this.props.vessel.fileCount} attachments</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

const VESSELS = [
    {name: 'USS Foo', imo: 123456, type: 'Marketing', fileCount: 3},
    {name: 'USS Bar', imo: 325234, type: 'Fun boat', fileCount: 4},
    {name: 'USS Bin', imo: 234567, type: 'Cargo', fileCount: 2},
    {name: 'USS Baz', imo: 765348, type: 'Marketing', fileCount: 3},
    {name: 'USS Far', imo: 832341, type: 'Fishing', fileCount: 0}
];

export default Dashboard;