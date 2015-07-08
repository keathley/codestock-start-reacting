import React from 'react'

const HellWorld = React.createClass({
  render () {
    return (
      <div className='hello-world'>Hello { this.props.name }</div>
    )
  }
})

export default HellWorld
