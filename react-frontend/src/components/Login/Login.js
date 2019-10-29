import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.handleLogin = this.handleLogin.bind(this);
    }
    
    handleLogin (e) {
        console.log(e.target.username.value);
        console.log(e.target.password.value);

        // call api to login

        e.preventDefault();
    }

    render () {
        return (
            <div className="app-content content div-login">
                <div className="content-wrapper">
                    <div className="content-header row"></div>
                    <div className="content-body">
                        <section className="flexbox-container">
                            <div className="col-12 d-flex align-items-center justify-content-center">
                                <div className="col-md-4 col-10 box-shadow-2 p-0">
                                    <div className="card border-grey border-lighten-3 m-0">
                                        <div className="card-header border-0">
                                            <div className="card-title text-center">
                                                <div className="p-1"><img src="../../../app-assets/images/logo/logo-dark.png" alt="branding logo"></img></div>
                                            </div>
                                            <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2"><span>Login - Online Learning Douglas</span></h6>
                                        </div>
                                        <div className="card-content">
                                            <div className="card-body">
                                                <Form className="form-horizontal form-simple" onSubmit={this.handleLogin}>
                                                    <FormGroup>
                                                        <fieldset className="form-group position-relative has-icon-left mb-0">
                                                            <Input 
                                                                id="username"
                                                                type="text" 
                                                                className="form-control form-control-lg input-lg"
                                                                name="username"
                                                                required
                                                                />
                                                            <div className="form-control-position">
                                                                <i className="ft-user"></i>
                                                            </div>
                                                        </fieldset>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <Input 
                                                                    id="password"
                                                                    type="password"
                                                                    className="form-control form-control-lg input-lg"
                                                                    name="password"
                                                                    required
                                                                    />
                                                            <div className="form-control-position">
                                                                <i className="la la-key"></i>
                                                            </div>
                                                        </fieldset>
                                                    </FormGroup>
                                                    <button type="submit" className="btn btn-info btn-lg btn-block"><i className="ft-unlock"></i> Login</button>
                                                    <Link to="/signup" className="btn btn-primary btn-lg btn-block"><i className="ft-user"></i> SignUp</Link>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;