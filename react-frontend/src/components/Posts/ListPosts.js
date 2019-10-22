import React from 'react';
import { Component } from 'react';

// import SCSS if any
// import '../sass/HeaderNavigation.scss';

class ListPosts extends Component {
  constructor(props) {
    super(props);
  }

  renderListPosts () {
      return (
        <React.Fragment>
            {/* USER POST 1 */}
            <div className="card shadow-none">
            <div className="catd-body">
                <div className="row p-2">
                <div className="col-sm-6">
                    <div className="row">
                    <div className="col-lg-4 col-3">
                        <img src="../../../app-assets/images/portrait/medium/avatar-m-1.png" alt="" className="img-fluid rounded-circle width-50"></img>
                    </div>
                    <div className="col-lg-8 col-7 p-0">
                        <h5 className="m-0">Elaine Dreyfuss</h5>
                        <p>2 hours ago</p>
                    </div>
                    </div>
                </div>
                </div>
                {/* POST CONTENT */}
                <div className="write-post">
                <div className="col-sm-12 px-2">
                    <p>When searching for videos of a different singer, Scooter Braun, a former marketing
                        executive of So So Def Recordings, clicked on one of Bieber's 2007 videos by</p>
                </div>
                <hr className="m-0"></hr>
                <div className="row p-1">
                    <div className="col-6">
                    <div className="row">
                        <div className="col-4 pr-0">
                        <span><i className="ft-heart h4 align-middle danger"></i> 120</span>
                        </div>
                        <div className="col-8 pl-0">
                        <ul className="list-unstyled users-list m-0">
                            <li data-toggle="tooltip" data-popup="tooltip-custom" data-original-title="John Doe"
                                className="avatar avatar-sm pull-up">
                                <img className="media-object rounded-circle" src="../../../app-assets/images/portrait/small/avatar-s-2.png"
                                    alt="Avatar"></img>
                            </li>
                            <li data-toggle="tooltip" data-popup="tooltip-custom" data-original-title="Katherine Nichols"
                                className="avatar avatar-sm pull-up">
                                <img className="media-object rounded-circle" src="../../../app-assets/images/portrait/small/avatar-s-3.png"
                                    alt="Avatar"></img>
                            </li>
                            <li className="avatar avatar-sm">
                                <span className="badge badge-info">+4 more</span>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>    
            </div>
            </div> 

            <div className="card shadow-none">
            <div className="catd-body">
                <div className="row p-2">
                <div className="col-sm-6">
                    <div className="row">
                    <div className="col-lg-4 col-3">
                        <img src="../../../app-assets/images/portrait/medium/avatar-m-1.png" alt="" className="img-fluid rounded-circle width-50"></img>
                    </div>
                    <div className="col-lg-8 col-7 p-0">
                        <h5 className="m-0">Elaine Dreyfuss</h5>
                        <p>2 hours ago</p>
                    </div>
                    </div>
                </div>
                </div>
                {/* POST CONTENT 2 */}
                <div className="write-post">
                <div className="col-sm-12 px-2">
                    <p>When searching for videos of a different singer, Scooter Braun, a former marketing
                        executive of So So Def Recordings, clicked on one of Bieber's 2007 videos by</p>
                </div>
                <hr className="m-0"></hr>
                <div className="row p-1">
                    <div className="col-6">
                    <div className="row">
                        <div className="col-4 pr-0">
                            <span><i className="la la-heart h4 align-middle danger"></i> 120</span>
                        </div>
                        <div className="col-8 pl-0">
                        <ul className="list-unstyled users-list m-0">
                            <li data-toggle="tooltip" data-popup="tooltip-custom" data-original-title="John Doe"
                                className="avatar avatar-sm pull-up">
                                <img className="media-object rounded-circle" src="../../../app-assets/images/portrait/small/avatar-s-2.png"
                                    alt="Avatar"></img>
                            </li>
                            <li data-toggle="tooltip" data-popup="tooltip-custom" data-original-title="Katherine Nichols"
                                className="avatar avatar-sm pull-up">
                                <img className="media-object rounded-circle" src="../../../app-assets/images/portrait/small/avatar-s-3.png"
                                    alt="Avatar"></img>
                            </li>
                            <li className="avatar avatar-sm">
                                <span className="badge badge-info">+4 more</span>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>    
            </div>
            </div>
      </React.Fragment> 
      )
  }

  render() {
    return (
        <div className="col-lg-8 col-md-8 col-sm-12">
            { this.renderListPosts() }
        </div>
    )
  }
}

export default ListPosts;
