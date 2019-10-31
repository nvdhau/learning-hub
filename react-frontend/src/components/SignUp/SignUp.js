import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { accountSignUp } from '../../actions/authenticate';
import { ToastContainer } from 'react-toastify';

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

    componentWillReceiveProps(nextState) {
        if (nextState.auth_message.success) {
            this.props.history.push('/login')
        }
    }

    handleCreateAccount (e) {
        const bodyData = {
            email: e.target.email.value,
            password: e.target.password.value,
            fullName: e.target.fullname.value,
            username: e.target.fullname.value.replace(/\s/g, '').toLowerCase()
        }
        this.props.signUp(bodyData);
        e.preventDefault();
    }

    render () {
        return (
            <React.Fragment>
                <div className="app-content content div-login">
                    <div className="content-wrapper">
                        <div className="content-header row"></div>
                        <div className="content-body">
                            <section className="flexbox-container">
                                <div className="col-12 d-flex align-items-center justify-content-center">
                                    <div className="col-md-4 col-10 box-shadow-2 p-0">
                                        <ToastContainer />
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
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth_message: state.auth.auth_message
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        signUp: payload => dispatch(accountSignUp(payload))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(SignUp);