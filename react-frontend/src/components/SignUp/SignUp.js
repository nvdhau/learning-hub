import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { API_CREATE_USER } from '../../config/endpoints-conf';
 
// import './Login.scss';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
            fullname: ''
        }

        this.handleCreateAccount = this.handleCreateAccount.bind(this);
    }

    handleCreateAccount (e) {
        const bodyData = {
            email: e.target.email.value,
            password: e.target.password.value,
            fullname: e.target.fullname.value,
            username: e.target.fullname.value.replace(/\s/g, '').toLowerCase()
        }

        console.log(bodyData);

        // call api to sign up
        fetch(API_CREATE_USER, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        })
        .then(res => {
            console.log(res);
            // if(res.ok) {
            //     toast.success("Successfully submitted complaint.");
            // } else {
            //     toast.error("An error occurred when submitting the complaint.");
            // }
        })
        .catch(err => {
            console.log(err);
            // console.log(`Submit error: ${err}`);
            // toast.error("An error occurred when submitting the complaint.");
        });

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
                                            <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2"><span>SignUp - Online Learning Douglas</span></h6>
                                        </div>
                                        <div className="card-content">
                                            <div className="card-body">
                                                <Form className="form-horizontal form-simple" noValidate onSubmit={this.handleCreateAccount}>
                                                    <FormGroup>
                                                        <fieldset className="form-group position-relative has-icon-left mb-0">
                                                            <Input 
                                                                id="email"
                                                                type="email" 
                                                                className="form-control form-control-lg input-lg"
                                                                name="email"
                                                                placeholder="Your email"
                                                                />
                                                            <div className="form-control-position">
                                                                <i className="la la-envelope"></i>
                                                            </div>
                                                        </fieldset>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <fieldset className="form-group position-relative has-icon-left mb-0">
                                                            <Input 
                                                                id="password"
                                                                type="password" 
                                                                className="form-control form-control-lg input-lg"
                                                                name="password"
                                                                placeholder="Your password"
                                                                />
                                                            <div className="form-control-position">
                                                                <i className="la la-key"></i>
                                                            </div>
                                                        </fieldset>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <fieldset className="form-group position-relative has-icon-left mb-0">
                                                            <Input 
                                                                id="fullname"
                                                                type="text" 
                                                                className="form-control form-control-lg input-lg"
                                                                name="fullname"
                                                                placeholder="Full name"
                                                                />
                                                            <div className="form-control-position">
                                                                <i className="la la-user"></i>
                                                            </div>
                                                        </fieldset>
                                                    </FormGroup>
                                                    <Button 
                                                        type="submit"
                                                        className="btn btn-info btn-lg btn-block"
                                                    ><i className="ft-user"></i> Create Account</Button>
                                                    <Link to="/login" className="btn btn-default btn-lg btn-block"><i className="ft-back"></i> Back to Login</Link>
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

export default SignUp;