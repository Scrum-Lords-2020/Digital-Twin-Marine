import React, { Component } from 'react';
import { 
    Row,
     Col,
} from 'react-bootstrap';
import './Sidebar.css'

class SidebarResponsive extends Component{
     openNav() {
        console.log("clicked")
        document.getElementById("mySidenav").style.width = "60%";
        
    }
      
     closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        
    }
    render(){
    return(
        <div id="container-sidebar-responsive" style={{minHeight: "100vh"}}>
        <div id="mySidenav" className="sidebar-responsive" style={{textDecoration: "underline"}}>
            <a  className="closebtn" onClick={this.closeNav}>&times;</a>
            <a href="/home/">Projects</a>
            <a href="#">All Files</a>
            <a href="#">Notifications</a>
            <a href="#">Service Requests</a>
            <a href="#">Contact Us</a>
        </div>
        <p style={{fontSize: "30px", pointer: "cursor"}} onClick={this.openNav}>&#9776;</p>
        </div>
    );
    }
    }

    export default SidebarResponsive;