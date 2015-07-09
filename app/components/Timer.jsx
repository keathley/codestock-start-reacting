import React from 'react'

const Timer = React.createClass({
  getInitialState() {
    return { secondsElapsed: 0 };
  },

  tick() {
    this.setState({
      secondsElapsed: this.state.secondsElapsed + 1
    });
  },

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  },

  componentWillUnmount() {
    clearInterval(this.interval);
  },

  render() {
    return (
      <div className='timer'>
        <h3>
          Seconds Elapsed: {this.state.secondsElapsed}
        </h3>
      </div>
    );
  }
})

export default Timer
