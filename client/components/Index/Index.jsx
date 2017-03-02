import React, { Component } from 'react';
import { Player } from 'video-react';

class IndexComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {timeStamps:[], videoLength: 0};
  }

  componentDidMount(){
      this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));

      let newTimeStamps = [];
      for(let i = 10; i <= 300; i = i + 10){
          newTimeStamps.push(i);
      }

      this.setState({timeStamps: newTimeStamps} )
  }

  handleStateChange(state, prevState) {

    if(state.duration != prevState.duration)
    {
      let newTimeStamps = [];
      for(let i = 10; i <= state.duration; i = i + 10){
          newTimeStamps.push(i);
      }
      this.setState({
        videoLength: state.duration,
        timeStamps: newTimeStamps
      });
    }
  }

  goToStemp(seconds) {
      this.refs.player.seek(seconds);
  }

  render() {


    let timeButtons = (this.state && this.state.timeStamps) ?
                          this.state.timeStamps.map((number, index) =>
                            <button key={index} type="button"   className="btn btn-default time-stamp-button" onClick={() => this.goToStemp(number)}>{number}</button>
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
                      ref="player"
                      src="/videos/trailer.mp4"
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
