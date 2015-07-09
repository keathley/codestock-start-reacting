import React from 'react'
import Timer from 'components/Timer';

const HellWorld = React.createClass({
  render () {
    return (
      <div className='hello-world'>
        <h3>
          Hello { this.props.name }
        </h3>
      </div>
    )
  }
})

export default HellWorld
