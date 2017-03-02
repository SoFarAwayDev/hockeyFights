import React, { Component } from 'react';

class IndexComponent extends Component {
  render() {


    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand">
                Hockey Fights
              </a>
            </div>
          </div>
        </nav>
        <div className="container content-block">
            <div className="col-md-2">
                <button type="button" className="btn btn-primary">
                  Upload Video
                </button>
            </div>
            <div className="col-md-8">
              Video Frame
            </div>
        </div>
      </div>
    );
  }
}

IndexComponent.defaultProps = {
  items: []
};

export default IndexComponent;
