import React from 'react';
import { Component } from 'react';

import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
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
                                                <form className="form-horizontal form-simple" action="index.html" novalidate>
                                                    <fieldset className="form-group position-relative has-icon-left mb-0">
                                                        <input type="text" className="form-control form-control-lg input-lg" id="user-name" placeholder="Your Username" required></input>
                                                        <div className="form-control-position">
                                                            <i className="ft-user"></i>
                                                        </div>
                                                    </fieldset>
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="password" className="form-control form-control-lg input-lg" id="user-password" placeholder="Enter Password" required></input>
                                                        <div className="form-control-position">
                                                            <i className="la la-key"></i>
                                                        </div>
                                                    </fieldset>
                                                    <button type="submit" className="btn btn-info btn-lg btn-block"><i className="ft-unlock"></i> Login</button>
                                                </form>
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