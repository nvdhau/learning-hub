import React from 'react';
import { Component } from 'react';

// import SCSS if any
import '../sass/HeaderNavigation.scss';

class MenuBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <React.Fragment>
          <div id="my-menu-sidebar" className="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
            <div className="main-menu-content">
              <ul className="navigation navigation-main tags-menu" id="main-menu-navigation" data-menu="menu-navigation">
                <li className="navigation-header"><span data-i18n="nav.category.admin-panels"><i className="la la-tags"></i><strong> # Tags</strong></span>
                </li>
                <li className="nav-item tags"><a><span className="menu-title">csis4280</span></a>
                </li>
                <li className="nav-item tags"><a><span className="menu-title">webapache</span></a>
                </li>
                <li className="nav-item tags"><a><span className="menu-title">linux</span></a>
                </li>
                <li className="nav-item tags"><a><span className="menu-title">studygroup</span></a>
                </li>

                <li className="navigation-header"><span data-i18n="nav.category.admin-panels"><i className="la la-users"></i><strong> # Follow up</strong></span>
                </li>
                <li className="nav-item tags"><a><span className="menu-title">csis4280</span></a>
                </li>
                <li className="nav-item tags"><a><span className="menu-title">webapache</span></a>
                </li>
                <li className="nav-item tags"><a><span className="menu-title">linux</span></a>
                </li>
                <li className="nav-item tags"><a><span className="menu-title">studygroup</span></a>
                </li>
              </ul>
            </div>
          </div>  
        </React.Fragment>
    )
  }
}

export default MenuBar;