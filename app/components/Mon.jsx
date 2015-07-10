import React from 'react'
import classNames from 'classnames'

const Mon = React.createClass({
  getInitialState: function() {
    return { isOn: false };
  },

  handleClick() {
    this.setState({ isOn: !this.state.isOn })
  },

  render () {
    var props     = this.props
      , title     = props.title
      , name      = props.name
      , isOn      = this.state.isOn
      , className = classNames('mon', { 'running': isOn })
      , url = `http://localhost:8080/01-dbmon/${name}/`

    return (
      <div className={ className }>
        <a href={ url } className='button' target='_blank' onClick={ this.handleClick }>
          { title }
        </a>
      </div>
    )
  }
})

export default Mon
