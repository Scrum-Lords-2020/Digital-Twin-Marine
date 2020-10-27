import React, { Component } from 'react';
import { 
    Container, 
    Form, 
    FormControl,
    Nav, 
    Navbar,
    NavDropdown,
    Card,
    CardColumns
} from 'react-bootstrap';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {searchTerm: ""};

        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(searchText) {
        this.setState({
            searchTerm: searchText
        });
    }

    render() {
        return(
            <Container>
                <FilterBar 
                    searchTerm={this.state.searchTerm}
                    onSearchChange={this.handleSearchChange} />
                <CardView 
                    vessels={VESSELS}
                    searchTerm={this.state.searchTerm} 
                />
            </Container>
        );
    }
}

class FilterBar extends Component {
    constructor(props) {
        super(props);

        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(e) {
        this.props.onSearchChange(e.target.value);
    }

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
                    <FormControl 
                        placeholder='Search'
                        value={this.props.searchTerm}
                        onChange={this.handleSearchChange} />
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
        const cards = [];
        const searchTerm = this.props.searchTerm.toLowerCase();
        this.props.vessels.forEach((vessel) => {
            if (vessel.name.toLowerCase().indexOf(searchTerm) === -1)
                return;
            cards.push(<VesselCard vessel={vessel}/>);
        });
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