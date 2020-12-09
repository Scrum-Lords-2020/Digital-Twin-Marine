import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import './Login.css'
import axios from 'axios'
import setAuthHeader from '../utils/setAuthHeader'
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'

class Login extends Component{
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            showError: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
        this.updateError = this.updateError.bind(this);
    }

    handleSuccessfulLogin(user) {
        this.props.onSuccessfulLogin(user);
    }

   

    onSubmit(e){
        e.preventDefault();
        this.updateError();
        // get our form data from state
        const {email, password } = this.state;
        //Make login post request and check for errors
        axios.post('/api/users/login', {
            email: email,
            password: password
        })
        .then((response) => {
            /* On Success, sets default axios header with user token, and updates global
               app state */
            const {token} = response.data;
            setAuthHeader(token);
            this.handleSuccessfulLogin(jwt_decode(token));
        }).catch((error) => {
            console.log(error);
            this.setState({
                showError: true
            });
            this.forceUpdate();
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

      updateError(){
        this.setState({
            showError: false
        });
        this.forceUpdate();
    }
      

    render(){
       
        return(
            <Container id="signin-container" style={{marginTop: "10%"}}>
                {this.props.isLoggedIn &&
                    <Redirect to='/home'/>
                }
               
                <h1>Login</h1>
                <p>Hello! Log in with your email.</p>
                {this.state.showError && (
                    <Alert id="login-alert" variant="danger" onClose={() => this.updateError()} dismissible transition>
                        <Alert.Heading>Incorrect username or password, please try again</Alert.Heading>
                    </Alert>
                )}
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