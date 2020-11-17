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
import {VESSELS} from './Dashboard.js'
import './Vessel.css'


function Vessel(props){
    console.log(props);
    return(
        <Container style={{border: "solid 5px green"}}>
            
                <Row id="vessel-header">
                    <Col md={4}><h3><u>Project Details</u></h3></Col>
                    <Col md={{span: 4, offset: 4}}>
                        <Button  id="request-vessel-service" >+ Request a New Service for this Vessel</Button>
                    </Col>
                </Row>
                
                <VesselData vProps={props} />
           
        </Container>
    );
}

function VesselData(props){
    let selected = VESSELS.find(v => v.imo==props.vProps.match.params.id);

    return(
        
        <div id="vessel-data-container">
            <h4>{selected.name}</h4>
            <div id="placeholder-model">
                <h6>Insert 3D Model</h6>
            </div>

            
                <Row id="vessel-details">
                    <Col md={6} ><h5><b>Details - </b>
                     <u><em>IMO #:</em></u> {`${selected.imo}\t`}   
                     <u><em>Service Type:</em></u> {`${selected.type}\t`}
                    </h5></Col>
                    <Col md={3} className="ml-auto" >
                        
                        <Button id="fill-window" block>Fill Browser Window</Button>
                        
                    </Col>
                </Row>
            
        </div>
        
    );
}



export default Vessel;