import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import './Login.css'
class Login extends Component{
    render(){
        return(
            <Container id="signin-container" style={{marginTop: "10%"}}>
                <h1>Login</h1>
                <p>Hello! Log in with your email.</p>
                <Row>
                    <Form >
                        <Form.Group id="formEmail" controlID="formEmail" >
                            <Form.Label >Email Address</Form.Label>
                            <Form.Control  type="email" placeholder="example@gmail.com" />
                        </Form.Group>
                        <Form.Group controlID="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control  type="password" placeholder="Password" />
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