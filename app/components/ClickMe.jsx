import React from 'react'

const ClickMe = React.createClass({
  getInitialState() {
    return { clicked: false }
  },

  handleClick() {
    this.setState({ clicked: !this.state.clicked });
  },

  render() {
    var clickText = this.state.clicked ? 'clicked' : 'have not clicked';

    return (
      <div className='clicks'>
        <button onClick={this.handleClick}>
          You { clickText } this.
        </button>
      </div>
    )
  }
});

export default ClickMe
