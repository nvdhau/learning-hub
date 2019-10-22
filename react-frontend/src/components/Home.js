import React from 'react';
import { Component } from 'react';
import ListPosts from './Posts/ListPosts';
import Events from './Widgets/Events';

// import SCSS if any
// import '../sass/HeaderNavigation.scss';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <React.Fragment>
            <div className="app-content content">
                <div className="content-wrapper">
                    <div className="content-header row">
                        <div className="content-header-left col-md-12 col-12 mb-2">
                            <h3 className="content-header-title">Trending</h3>
                            <div className="content-header-right col-md-12 col-12">
                              <div className="btn float-md-right">   
                                <button className="btn btn-info round box-shadow-2 px-2" id="btnPost" type="button"><i className="ft-plus icon-left"></i> Create Post</button>
                              </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-body">
                      {/* POSTS */}
                      

                      {/* USER FEED */}
                      <section id="user-feed">
                        <div className="row">
                          <ListPosts />   
                          <Events />
                        </div>
                      </section>
                    </div>
                </div>
            </div>
            <footer className="footer footer-static footer-light navbar-border navbar-shadow">
              <p className="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2">
                <span className="float-md-left d-block d-md-inline-block">Copyright  &copy; 2019 
                  <a className="text-bold-800 grey darken-2"> DOUGLAS </a>, All rights reserved. </span>
              </p>    
            </footer>         
        </React.Fragment>
    )
  }
}

export default Home;
