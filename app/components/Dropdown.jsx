import React from 'react'
import classNames from 'classnames'

const Dropdown = React.createClass({
  getInitialState: function() {
    return { expanded: false }
  },

  handleClick() {
    this.setState({ expanded: !this.state.expanded })
  },

  render () {
    var expanded = this.state.expanded
      , className = classNames('dropdown', { 'expanded': expanded })

    return (
      <div className={ className }>
        <button onClick={ this.handleClick }>
          Toggle
        </button>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    )
  }
})

export default Dropdown
