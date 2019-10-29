import React from 'react';
import { Component } from 'react';

// import SCSS if any
// import '../sass/HeaderNavigation.scss';

class Events extends Component {

  render () {
      return (
        <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="card shadow-none">
            <div className="card-body">
                <div className="last-blog">
                <h5 className="card-title mb-1">Announcements</h5>
                <hr></hr>
                <div className="row">
                    <div className="col-sm-12">
                    <h4>The emergence and growth of blogs</h4>
                    <p className="mt-1">Many blogs provide commentary on a particular subject or topic digital
                        images.</p>
                    <p className="mt-3">5 hours ago</p>
                    <hr></hr>
                    </div>
                </div>
                </div>
            </div>  
            </div>
        </div> 
      )
  }
}

export default Events;