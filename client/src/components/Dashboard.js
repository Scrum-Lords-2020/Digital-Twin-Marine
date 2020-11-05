import React, { Component, useState, setState, useEffect } from 'react';
import { 
    Container, 
    Form, 
    FormControl,
    Nav, 
    Navbar,
    NavDropdown,
    Card,
    Row, Col,
    Image,
    Table
} from 'react-bootstrap';
import './Dashboard.css'




class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {searchTerm: "", filter: ""};
        this.handleFilterType = this.handleFilterType.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
      
    }

    handleSearchChange(searchText) {
        this.setState({
            searchTerm: searchText
        });
    }

    handleFilterType(filterType) {
        this.setState({
            filter: filterType
        });

    }

    render() {
        return(
            <div>
            <Container >
                <FilterBar 
                    searchTerm={this.state.searchTerm}
                    onSearchChange={this.handleSearchChange}
                    setViewCards={this.props.setViewCards}
                    setViewList={this.props.setViewList}
                    viewList={this.props.viewList}
                    filterType={this.state.filter}
                    onFilterChange={this.handleFilterType} />
                    {this.props.viewCards['visible'] && (
                <CardView 
                    filterType={this.state.filter}
                    vessels={VESSELS}
                    searchTerm={this.state.searchTerm} 
                />
                )}
                {!this.props.viewCards['visible'] && (
                 <ListView
                 filterType={this.state.filter}
                    vessels={VESSELS}
                    searchTerm={this.state.searchTerm} 
                />
                )}
            </Container>
            </div>
        );
    }
}

class FilterBar extends Component {
    constructor(props) {
        super(props);
        this.handleFilterType = this.handleFilterType.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        
    }
    handleFilterType(k){
        this.props.onFilterChange(k);
    }
    handleSearchChange(e) {
        this.props.onSearchChange(e.target.value);
    }
    viewCardsOnly = () =>{
        this.props.setViewCards({
            visible: true,
        });

        this.props.setViewList({
            visible: false,
        })
    }

    viewListOnly = () =>{
        this.props.setViewCards({
            visible: false,
        });

        this.props.setViewList({
            visible: true,
        });
    }

   

    render() {
        return (
            /*
            <Navbar id="project-header">
                <Nav style={{display: "flex", alignItems: "center", textAlign: "center", border: "solid 5px red", width: "100%"}} className="mr-auto" id="card-list">
                <Navbar.Brand id="project-title"><b>Project List</b></Navbar.Brand>
                   <Nav id="bootstrap-override" variant="pills" defaultActiveKey='card'>
                        <Nav.Item className="pill-1">
                            <Nav.Link eventKey='card'>Card View</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="pill-2">
                            <Nav.Link eventKey='list'>List View</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav id="search">
                    <Form>
                    <FormControl 
                        placeholder='Search'
                        value={this.props.searchTerm}
                        onChange={this.handleSearchChange} />
                    </Form>
                    <NavDropdown title='Filter By' id='filterBy'>
                        <NavDropdown.Item eventKey="name">Name</NavDropdown.Item>
                        <NavDropdown.Item eventKey="imo">IMO</NavDropdown.Item>
                        <NavDropdown.Item eventKey="type">Type</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Nav>
               
            </Navbar>
                    */
            <Row id="project-header">
                <Col lg={6}  id="change-view">
                    <Nav id="bootstrap-override" variant="pills"  defaultActiveKey='card'>
                    <Navbar.Brand id="project-title"><b>Project List</b></Navbar.Brand>
                        <Nav.Item className="pill-1" onClick={this.viewCardsOnly}>
                            <Nav.Link eventKey='card'>Card View</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="pill-2" onClick={this.viewListOnly}>
                            <Nav.Link eventKey='list'>List View</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col lg={6} id="search">
                    <Form>
                        <FormControl 
                            placeholder='Search'
                            value={this.props.searchTerm}
                            onChange={this.handleSearchChange} />
                    </Form>
                    <Nav  onSelect={k => this.handleFilterType(k)}>
                    <NavDropdown title={`Filter By: ${this.props.filterType}`} id='filterBy'>
                        <NavDropdown.Item eventKey="Name">Name</NavDropdown.Item>
                        <NavDropdown.Item eventKey="IMO">IMO</NavDropdown.Item>
                        <NavDropdown.Item eventKey="Service Type">Service Type</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Col>
            </Row>


        );
    }
}

class ListView extends Component {
    render(){
     

        let cards = [];
        const searchTerm = this.props.searchTerm.toLowerCase();
        let vessels = this.props.vessels;
        if(this.props.filterType === "Name"){
            vessels.sort((a,b) => (a.name > b.name) ? 1 : -1);
        }
        if(this.props.filterType === "IMO"){
            vessels.sort((a,b) => (a.imo > b.imo) ? 1 : -1);
        }
        if(this.props.filterType === "Service Type"){
            vessels.sort((a,b) => (a.type > b.type) ? 1 : -1);
        }
        vessels.forEach((vessel) => {
            if (vessel.name.toLowerCase().indexOf(searchTerm) === -1){
                return;
            }
            else{
                cards.push(
                    <tr>
                        <td>{vessel.name}</td>
                        <td>{vessel.imo}</td>
                        <td>{vessel.type}</td>
                        <td>{vessel.fileCount}</td>
                    </tr>
                );
            }

        });
        
        return (
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Vessel Name</th>
                        <th>IMO #</th>
                        <th>Service Type</th>
                        <th># Files</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards}
                    </tbody>
                </Table>
            </div>
        );
    }
}

class CardView extends Component {
    render() {

        let rows = [];
        let cards = [];
        let vessels = this.props.vessels;
        const searchTerm = this.props.searchTerm.toLowerCase();
        if(this.props.filterType === "Name"){
            vessels.sort((a,b) => (a.name > b.name) ? 1 : -1);
        }
        if(this.props.filterType === "IMO"){
            vessels.sort((a,b) => (a.imo > b.imo) ? 1 : -1);
        }
        if(this.props.filterType === "Service Type"){
            vessels.sort((a,b) => (a.type > b.type) ? 1 : -1);
        }
        
        vessels.forEach((vessel) => {
            if (vessel.name.toLowerCase().indexOf(searchTerm) === -1){
                return;
            }
            if(cards.length === 4){
                rows.push(<Row id="card-row" style={{marginBottom: "10px"}}>{cards}</Row>);
                cards = [];
                cards.push(<VesselCard vessel={vessel}/>);
            }
            else{
                cards.push(<VesselCard vessel={vessel}/>);
            }
        });
        rows.push(<Row id="card-row">{cards}</Row>);
        return (
            <div>
            {rows}
            </div>
        );
    }
}

/* Needs to updated to upload vessel info from database */
class VesselCard extends Component {
    render() {
        
        return (
            <Card id="vessel-info" >
                <Card.Body>
                    <Card.Title>{this.props.vessel.name}</Card.Title>
                    <Image id="preview-img" src={require(`../imgs/${this.props.vessel.imgsrc}.jpg`)} fluid/>
                    <Card.Text><u>IMO #</u>: {this.props.vessel.imo}</Card.Text>
                    <Card.Text><u>Service Type</u>: {this.props.vessel.type}</Card.Text>
                    <Card.Text><u>Files</u>: {this.props.vessel.fileCount} attachments</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

const VESSELS = [
    {name: 'Z', imgsrc: "mainboat", imo: 9999, type: 'Marketing', fileCount: 3},
    {name: 'Y', imgsrc: "mainboat", imo: 325234, type: 'Fun boat', fileCount: 4},
    {name: 'X', imgsrc: "mainboat", imo: 234567, type: 'Cargo', fileCount: 2},
    {name: 'W', imgsrc: "mainboat", imo: 765348, type: 'Marketing', fileCount: 3},
    {name: 'V', imgsrc: "mainboat", imo: 832341, type: 'Fishing', fileCount: 0},
    {name: 'U', imgsrc: "mainboat", imo: 832341, type: 'Fishing', fileCount: 0},
    {name: 'T', imgsrc: "mainboat", imo: 1111, type: 'Fishing', fileCount: 0},
    {name: 'C', imgsrc: "mainboat", imo: 832341, type: 'Fishing', fileCount: 0},
    {name: 'B', imgsrc: "mainboat", imo: 832341, type: 'Fishing', fileCount: 0},
    {name: 'A', imgsrc: "mainboat", imo: 456456456, type: 'Fishing', fileCount: 0}
    
    
];

export default Dashboard;