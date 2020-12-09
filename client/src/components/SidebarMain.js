import React, { Component } from 'react';
import { 
    Row,
     Col,
} from 'react-bootstrap';
import './Sidebar.css'



class SidebarMain extends Component {
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


export default SidebarMain;