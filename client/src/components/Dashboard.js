import React, {Component} from 'react';
import { 
    Container, 
    Form, 
    FormControl,
    Nav, 
    Navbar,
    NavDropdown,
    Card,
    Row,
    Col,
    Table
} from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom'
import './Dashboard.css'
import axios from 'axios'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "", 
            filter: "",
            viewCards: true,
            viewList: false,
            vessels: null
        };
    }

    handleSearchChange = (searchText) => {
        this.setState({
            searchTerm: searchText
        });
    };

    handleFilterType = (filterType) => {
        this.setState({
            filter: filterType
        });
    };

    setCardView = () => {
        this.setState({
            viewCards: true,
            viewList: false
        });
    };

    setListView = () => {
        this.setState({
            viewCards: false,
            viewList: true
        });
    };

    /**
     * Returns a promise containing an array of responses from the backend with data on the vessels that the user
     * has access to.
     */
    getVessels = () => {
        let IDs = [];
        for(let[key,value] of Object.entries(this.props.user['vessels']))
            IDs.push(key);
        let promises = [];
        IDs.forEach(id => {
            let promise = axios.post('http://localhost:5000/api/vessels/getVessel',{
                ID: id
            });
            promises.push(promise);
        });
        return Promise.all(promises);
    };

    /**
     * When the dashboard is loaded it makes the asynchronous request to the backend for vessel info. Once the promise
     * is fulfilled it sets state with the data.
     */
    async componentDidMount() {
        const responses = await this.getVessels();
        let vessels = [];
        responses.forEach(response => {
            vessels.push(response.data);
        });
        this.setState({
            vessels: vessels
        });
    }

    /**
     * When this function is first called it loads a blank div until the vessel data has been retrieved. Maybe should
     * replace with a loading symbol?
     */
    render() {
        if (this.state.vessels === null) {
            return(<div></div>);
        } else {
            console.log(this.state.vessels);
            return(
                <div>
                <Container >
                    <FilterBar 
                        searchTerm={this.state.searchTerm}
                        onSearchChange={this.handleSearchChange}
                        filterType={this.state.filter}
                        onFilterChange={this.handleFilterType}
                        setCardView={this.setCardView}
                        setListView={this.setListView}
                    />
                    {this.state.viewCards && (
                    <CardView 
                        filterType={this.state.filter}
                        vessels={this.state.vessels}
                        searchTerm={this.state.searchTerm} 
                    />
                    )}
                    {!this.state.viewCards && (
                    <ListView
                        filterType={this.state.filter}
                        vessels={this.state.vessels}
                        searchTerm={this.state.searchTerm} 
                    />
                    )}
                </Container>
                </div>
            );
        }
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
            /* Keep this for reference
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
            vessels.sort((a,b) => (a.IMO > b.IMO) ? 1 : -1);
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
                    
                    <tr onClick={() => handleRowClick(vessel.IMO)}>
                        <td>{vessel.name}</td>
                        <td>{vessel.IMO}</td>
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
            vessels.sort((a,b) => (a.IMO > b.IMO) ? 1 : -1);
        }
        if(this.props.filterType === "Service Type"){
            vessels.sort((a,b) => (a.type > b.type) ? 1 : -1);
        }
        vessels.forEach(vessel => {
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

function VesselCard(props) {
    return (
        <Card id="vessel-info" >
            <Link style={{textDecoration: "none"}}to={'/vessel/' + props.vessel.IMO} >
            <Card.Body>
            
                <Card.Title>{props.vessel.name}</Card.Title>
                {/* <Image id="preview-img" src={require(`../imgs/${props.vessel.imgsrc}.jpg`)} fluid/> */}
                <Card.Text><u>IMO #</u>: {props.vessel.IMO}</Card.Text>
                <Card.Text><u>Service Type</u>: {props.vessel.type}</Card.Text>
                {/* <Card.Text><u>Files</u>: {props.vessel.fileCount} attachments</Card.Text> */}
            
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
    {name: 'A', imgsrc: "mainboat", imo: 456456456, type: 'Fishing', fileCount: 0}
    
];

export default Dashboard;