import React, { Component } from 'react';
import { Player } from 'video-react';

class IndexComponent extends Component {
 
  componentDidMount(){
      let newTimeStamps = [];
      for(let i = 10; i <= 300; i = i + 10){
          newTimeStamps.push(i);
      }

      this.setState({timeStamps: newTimeStamps} )
  }

  render() {
  debugger;

    let timeButtons = (this.state && this.state.timeStamps) ? 
                          this.state.timeStamps.map((number, index) =>
                            <button key={index} type="button" className="btn btn-default">index</button>
                          ) : null

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
               <div>
                  <Player
                      playsInline
                      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    />
                </div>
                <div className="time-stamps-row">
                    <div className="btn-group" role="group">
                      {timeButtons}
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}


export default IndexComponent;
