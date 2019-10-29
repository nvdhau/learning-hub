import React from 'react';
import { Component } from 'react';

// import SCSS if any
// import '../sass/HeaderNavigation.scss';

class HeaderNavigation extends Component {

  /* Navigation Header */
  renderNavHeader () {
    return (
        <div className="navbar-header">
            <ul className="nav navbar-nav flex-row">
                <li className="nav-item mobile-menu d-md-none mr-auto"><a className="nav-link nav-menu-main menu-toggle hidden-xs"><i className="ft-menu font-large-1"></i></a></li>
                <li className="nav-item">
                    <a className="navbar-brand">
                        <h3 className="brand-text">Online Learning</h3>
                    </a>
                </li>
                <li className="nav-item d-md-none"><a className="nav-link open-navbar-container" data-toggle="collapse" data-target="#navbar-mobile"><i className="la la-ellipsis-v"></i></a></li>
            </ul>
        </div>
    )
  }

  /* Navigation Menu Header */
  renderNavMenuHeader () {
      return (
            <div className="navbar-container content">
                <div className="collapse navbar-collapse" id="navbar-mobile">
                    <ul className="nav navbar-nav mr-auto float-left">
                        <li className="nav-item d-none d-md-block">
                            <a className="nav-link nav-menu-main hidden-xs"><i className="la la-eye"></i>Trending</a>
                        </li>
                        <li className="nav-item d-none d-md-block">
                            <a className="nav-link nav-menu-main hidden-xs"><i className="la la-fire"></i>New</a>
                        </li>
                        <li className="nav-item d-none d-md-block">
                            <a className="nav-link nav-menu-main hidden-xs"><i className="la la-search"></i>Search</a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav float-right">
                        <li className="dropdown dropdown-user nav-item">
                            <a className="dropdown-toggle nav-link dropdown-user-link" data-toggle="dropdown"><span className="mr-1">Hello,<span className="user-name text-bold-700">Admin</span></span><span className="avatar avatar-online"><img src="../../../app-assets/images/portrait/small/avatar-s-1.png" alt="avatar"></img><i></i></span></a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" ><i className="ft-user"></i> Edit Profile</a>
                                <a className="dropdown-item" ><i className="ft-mail"></i> My Posts</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item"><i className="ft-power"></i> Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
      )
  }

  render() {
    return (
        <nav className="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-light bg-info navbar-shadow">
            <div className="navbar-wrapper">
                {/* Navigation Header */}
                { this.renderNavHeader() }

                {/* Navigation Menu Header */}
                { this.renderNavMenuHeader() }
            </div>
        </nav>  
    )
  }
}

export default HeaderNavigation;
