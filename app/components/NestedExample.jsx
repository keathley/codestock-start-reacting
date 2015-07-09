import React from 'react'

const Message = React.createClass({
  render() {
    var text = this.props.text
    return <li>{ text }</li>
  }
});

const NestedExample = React.createClass({
  getDefaultProps() {
    return { messages: [] }
  },

  render () {
    var ms       = this.props.messages
      , messages = ms.map( (text, i) => <Message key={ i } text={ text } /> )

    return (
      <ul className="nested">
        { messages }
      </ul>
    )
  }
})

export default NestedExample
