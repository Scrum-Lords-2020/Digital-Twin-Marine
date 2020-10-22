import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import './Login.css'
class Login extends Component{
    render(){
        return(
            <Container id="signin-container">
                <h1 style={{textAlign: "center"}}>Sign In</h1>
                <Row>
                    <Form>
                        <Form.Group controlID="formEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="example@gmail.com" />
                        </Form.Group>
                        <Form.Group controlID="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                            <Form.Text>Forgot Password?</Form.Text>
                        </Form.Group>
                        <Form.Group controlID="submit">
                            <Form.Control type="submit"></Form.Control>
                        </Form.Group>
                    </Form>
                </Row>
            </Container>
        );
    }
}

export default Login;