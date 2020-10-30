import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import './Login.css'
import axios from 'axios'

class Login extends Component{
    constructor(){
        super();
        this.state = {
            email: "",
            password: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        // get our form data from state
        const {email, password } = this.state;
        //Make login post request and check for errors
        axios.post('http://localhost:5000/api/users/login', {
            email: email,
            password: password
        })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    }
    //Set states for email and password
    onChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
        this.setState({ [e.target.name]: e.target.value });
      }

    render(){
        return(
            <Container id="signin-container" style={{marginTop: "10%"}}>
                <h1>Login</h1>
                <p>Hello! Log in with your email.</p>
                <Row>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group id="formEmail" controlID="formEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                name="email" 
                                type="email" 
                                placeholder="example@gmail.com"
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        <Form.Group controlID="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                name="password"
                                type="password"
                                placeholder="Password" 
                                onChange={this.onChange}
                            />
                            <a href="forgotpwd.html"><Form.Text>Forgot Password?</Form.Text></a>
                        </Form.Group>
                        <Form.Group controlID="submitter">
                            <Form.Control style={{backgroundColor: "#00315c", color: "white"}} type="submit" value="LOG IN" />
                        </Form.Group>
                    </Form>
                </Row>
                <p>Don't have an account? <a href="signup.html">Sign Up</a></p>
            </Container>
        );
    }
}

export default Login;