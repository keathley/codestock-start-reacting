// Attribution: https://github.com/akiran/react-highlight/blob/master/index.jsx
var hljs = require('highlight.js');
var React = require('react');

var Highlight = React.createClass({
  getDefaultProps: function () {
    return {
      innerHTML: false,
      className: ""
    };
  },

  componentDidMount: function () {
    this.highlightCode();
  },

  highlightCode: function () {
    var domNode = this.getDOMNode();
    var nodes = domNode.querySelectorAll('pre code');
    if (nodes.length > 0) {
      for (var i = 0; i < nodes.length; i=i+1) {
        hljs.highlightBlock(nodes[i]);
      }
    }
  },
  render: function () {
    if (this.props.innerHTML) {
      return <div dangerouslySetInnerHTML={{__html: this.props.children}} className={this.props.className || null}></div>;
    } else {
      return <pre className='code'><code className={this.props.className}>{this.props.children}</code></pre>;
    }
  }
});

module.exports = Highlight;
