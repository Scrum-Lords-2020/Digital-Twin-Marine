import React, { Component, useState, setState, useEffect, createRef, useRef } from 'react';
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
import { useHistory, Link } from 'react-router-dom'
import {ReactComponent as MenuIcon} from '../imgs/menu.svg'
import './Dashboard.css'




class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "", 
            filter: "",
            viewCards: true,
            viewList: false
        };

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

    setCardView = () => {
        this.setState({
            viewCards: true,
            viewList: false
        });
    }

    setListView = () => {
        this.setState({
            viewCards: false,
            viewList: true
        });
    }

    render() {
    

        return(
            <Container fluid style={{ minHeight: "100vh"}}>
                <FilterBar 
                    searchTerm={this.state.searchTerm}
                    onSearchChange={this.handleSearchChange}
                    filterType={this.state.filter}
                    onFilterChange={this.handleFilterType}
                    setCardView={this.setCardView}
                    setListView={this.setListView}
                    userInfo = {this.props.user}
                />
                <Row>
                    <SideBar 
                     currentPath = {this.props.location.pathname}
                     />
                    <SideBarResponsive />
               
            <Col >
                
                {this.state.viewCards && (
                <CardView 
                    filterType={this.state.filter}
                    vessels={VESSELS}
                    searchTerm={this.state.searchTerm} 
                />
                )}
                {!this.state.viewCards && (
                <ListView
                    filterType={this.state.filter}
                    vessels={VESSELS}
                    searchTerm={this.state.searchTerm} 
                />
                )}
            </Col>
                </Row>
            </Container>
        
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
        this.props.setCardView();
    }

    viewListOnly = () =>{
        this.props.setListView();
    }

   

    render() {
        return (
            <Row id="project-header">
                
                  <Col xl={3} style={{padding: "0"}}>
                        <div id="welcome-message">
                            <p><b>Welcome {this.props.userInfo.name}!</b></p>
                        </div>
                     </Col>   
                
                <Col xl={{span: 5}}  id="change-view">
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
                <Col xl={4} id="search">
                    <Form>
                        <FormControl 
                            placeholder='Search'
                            value={this.props.searchTerm}
                            onChange={this.handleSearchChange} />
                    </Form>
                    <Nav  onSelect={k => this.handleFilterType(k)}>
                    <NavDropdown title={`Filter By: ${this.props.filterType}`} id='filterBy' >
                        <NavDropdown.Item  eventKey="Name">Name</NavDropdown.Item>
                        <NavDropdown.Item  eventKey="IMO">IMO</NavDropdown.Item>
                        <NavDropdown.Item  eventKey="Service Type">Service Type</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Col>
            </Row>


        );
    }
}


class SideBar extends Component {
        constructor(props){
            super(props);
        }
        render(){
        return(
           
            <Col id="sidebar-full" xs={3}  style={{borderRight: "solid 5px #3D4849", margin: "0", minHeight: "100vh"}}>
                <div style={{position: "sticky", top: "0"}}>
              
                    
                    
                    <Row className="sidebar-tab">
                        Projects
                    </Row>
                    <Row id="files-tab" className="sidebar-tab">
                        All Files
                    </Row>
                    <Row id="notifications-tab" className="sidebar-tab"> 
                        Notifications
                    </Row>
                    <Row id="serviceRequests-tab" className="sidebar-tab"> 
                        Service Requests
                    </Row>
                    <Row id="contact-tab" className="sidebar-tab"> 
                        Contact Us
                    </Row>

                </div>
            </Col>
        );
        }
    
    
}

function SideBarResponsive(props){
    const openNav = () => {
        console.log("clicked")
        document.getElementById("mySidenav").style.width = "60%";
        
    }
      
    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
        
    }

    return(
        <div id="container-sidebar-responsive" style={{minHeight: "100vh"}}>
        <div id="mySidenav" className="sidebar-responsive" style={{textDecoration: "underline"}}>
            <a  className="closebtn" onClick={closeNav}>&times;</a>
            <a href="/home/">Projects</a>
            <a href="#">All Files</a>
            <a href="#">Notifications</a>
            <a href="#">Service Requests</a>
            <a href="#">Contact Us</a>
        </div>
        <p style={{fontSize: "30px", pointer: "cursor"}} onClick={openNav}>&#9776;</p>
        </div>
    );
}


function ListView(props) {
    
        const history = useHistory();
        const handleRowClick = (row) => {
        history.push(`/vessel/${row}`);
        } 

        let cards = [];
        const searchTerm = props.searchTerm.toLowerCase();
        let vessels = props.vessels;
        if(props.filterType === "Name"){
            vessels.sort((a,b) => (a.name > b.name) ? 1 : -1);
        }
        if(props.filterType === "IMO"){
            vessels.sort((a,b) => (a.imo > b.imo) ? 1 : -1);
        }
        if(props.filterType === "Service Type"){
            vessels.sort((a,b) => (a.type > b.type) ? 1 : -1);
        }
        vessels.forEach((vessel) => {
            if (vessel.name.toLowerCase().indexOf(searchTerm) === -1){
                return;
            }
            else{
                cards.push(
                    
                    <tr onClick={() => handleRowClick(vessel.imo)}>
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
                <Table striped bordered hover size="sm" style={{marginTop: "5px"}}>
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
function VesselCard(props) {
    
    const history = useHistory();

    function handleClick(imo) {
        
        console.log("switch");
        history.push(`/vessel/${imo}`);
    }
        
        return (
            <Card id="vessel-info" >
                <Link style={{textDecoration: "none", color: "#3D4849"}}to={'/vessel/' + props.vessel.imo} >
                <Card.Body>
                
                    <Card.Title>{props.vessel.name}</Card.Title>
                    <Image id="preview-img" src={require(`../imgs/${props.vessel.imgsrc}.jpg`)} fluid/>
                    <Card.Text><u>IMO #</u>: {props.vessel.imo}</Card.Text>
                    <Card.Text><u>Service Type</u>: {props.vessel.type}</Card.Text>
                    <Card.Text><u>Files</u>: {props.vessel.fileCount} attachments</Card.Text>
                
                </Card.Body>
                </Link>
                
            </Card>
        );
    
}



export const VESSELS = [
    {name: 'Z', imgsrc: "mainboat", imo: 9999, type: 'Marketing', fileCount: 3},
    {name: 'Y', imgsrc: "mainboat", imo: 325234, type: 'Fun boat', fileCount: 4},
    {name: 'X', imgsrc: "mainboat", imo: 234567, type: 'Cargo', fileCount: 2},
    {name: 'W', imgsrc: "mainboat", imo: 765348, type: 'Marketing', fileCount: 3},
    {name: 'V', imgsrc: "mainboat", imo: 832341, type: 'Fishing', fileCount: 0},
    {name: 'U', imgsrc: "mainboat", imo: 832341, type: 'Fishing', fileCount: 0},
    {name: 'T', imgsrc: "mainboat", imo: 1111, type: 'Fishing', fileCount: 0},
    {name: 'C', imgsrc: "mainboat", imo: 832341, type: 'Fishing', fileCount: 0},
    {name: 'B', imgsrc: "mainboat", imo: 832341, type: 'Fishing', fileCount: 0},
    {name: 'A', imgsrc: "mainboat", imo: 456456456, type: 'Fishing', fileCount: 0},
    {name: 'A', imgsrc: "mainboat", imo: 456456456, type: 'Fishing', fileCount: 0},
    {name: 'A', imgsrc: "mainboat", imo: 456456456, type: 'Fishing', fileCount: 0},
    {name: 'A', imgsrc: "mainboat", imo: 456456456, type: 'Fishing', fileCount: 0}
    
];

export default Dashboard;