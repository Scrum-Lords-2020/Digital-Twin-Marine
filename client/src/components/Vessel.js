import React, { Component, useState, setState, useEffect } from 'react';
import { 
    Container, 
    Button,
    Nav, 
    Navbar,
    NavDropdown,
    Card,
    Row, Col,
    Image,
    Table
} from 'react-bootstrap';
// import {VESSELS} from './Dashboard.js'
import './Vessel.css'
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Vessel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            vessel: null
        };
    }

    getVessel = () => {
        let id = this.props.id;
        let promise = axios.post('http://localhost:5000/api/vessels/getVessel',{
            ID: id
        });
        return Promise.resolve(promise);
    };

    async componentDidMount() {
        const response = await this.getVessel();
        let vessel = response.data;
        this.setState({
            vessel: vessel
        });
    }

    render(){
        console.log(this.props);
        if(this.state.vessel === null){
            return(<div></div>)
        }
        if(this.props.user.name === undefined){
            return(<Redirect to={'/'} />);
        }
        if(this.props.user['vessels'][this.props.id] !== undefined){
            return(
                <Container style={{border: "solid 5px green"}}>
                    
                        <Row id="vessel-header">
                            <Col md={4}><h3><u>Project Details</u></h3></Col>
                            <Col md={{span: 4, offset: 4}}>
                                <Button  id="request-vessel-service" >+ Request a New Service for this Vessel</Button>
                            </Col>
                        </Row>
                        
                        <VesselData vessel={this.state.vessel} />
                
                </Container>
            );
        }
        else{
            return(
                <Redirect to={'/home'} />
            );
        }
    }

}

function VesselData(props){
    console.log(props)
    let selected = props.vessel;

    return(
        
        <div id="vessel-data-container">
            <h4>{selected.name}</h4>
            <div id="placeholder-model">
                <iframe id="iframe-view" title="iframe-view" height="100%" width="100%" allow="fullscreen" src={selected.modelsrc}/>
            </div>

            
                <Row id="vessel-details">
                    <Col md={6} ><h5><b>Details - </b>
                     <u><em>IMO #:</em></u> {`${selected.IMO}\t`}   
                     <u><em>Service Type:</em></u> {`${selected.type}\t`}
                    </h5></Col>
                    <Col md={3} className="ml-auto" >
                        
                        <Button id="fill-window" block>Fill Browser Window</Button>
                        
                    </Col>
                </Row>
            
        </div>
        
    );
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

export default Vessel;