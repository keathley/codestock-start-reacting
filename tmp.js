<CodeSlide>
  title='Component lifecycle and state'
  value={
`
var Timer = React.createClass({
  getInitialState: function() {
    return {secondsElapsed: 0};
  },
  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
      <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
    );
  }
});
React.renderComponent(&lt;Timer />, mountNode);
`}>

</CodeSlide>,

<CodeSlide>
  title='Nested components'
  value={
`
var HelloMessage = React.createClass({
  render: function() {
    return (
      <div>
        Hello {this.props.name} its been &lt;Timer /> seconds since you got here
      </div>;
    )
  }
});
`}>
</CodeSlide>,

<CodeSlide>
  title='Form handlers'
  value={
`
var ClickMe = React.createClass({
  getInitialState: function() {
    return { clicked: false }
  },
  handleClick: function() {
    this.setState({ clicked: !this.state.clicked });
  },
  render: function() {
    var clickText = this.state.clicked ? 'clicked' : 'have not clicked';
    return (
      <p onClick={this.handleClick}>
        You {clickText} this.
      </p>
    )
  }
});
`}>

</CodeSlide>
