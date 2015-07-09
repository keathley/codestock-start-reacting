var React = require('react/addons');
var TransitionGroup = React.addons.CSSTransitionGroup;

var Swapper = React.createClass({
  getInitialState: function() {
    return {
      data: [
        { name: 'Python', score: 3 },
        { name: 'Ruby', score: 5 },
        { name: 'Go', score: 20 },
        { name: 'Node', score: 10 },
        { name: 'Elixir', score: 5 },
        { name: 'Rust', score: 11 },
        { name: 'Clojure', score: 3 }
      ]
    };
  },

  rescore() {
    var newData = this.state.data.map( lang => {
      lang.score = Math.random() * 20|0
      return lang
    })
    this.setState({ data: newData })
  },

  componentDidMount() {
    this.interval = setInterval(this.rescore, 3000);
  },

  componentWillUnmount() {
    clearInterval(this.interval);
  },

  render() {
    var data   = this.state.data
      , sorted = data.sort( (a, b) => a.score - b.score )
      , langs  = sorted.map( lang => <li key={ lang.name }>{ lang.name }</li> )

    return (
      <div className='swapper'>
        <ol>
          { langs }
        </ol>
      </div>
    );
  }

});

module.exports = Swapper;
