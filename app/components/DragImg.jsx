import React from 'react'

const DragImg = React.createClass({
  getInitialState() {
    return { top: 0, left: 0 };
  },

  getDefaultProps() {
    return { top: '0', left: '0', width: 0, height: 0 }
  },

  componentDidMount() {
    var top  = this.props.top
      , left = this.props.left

    this.setState({ top: top, left: left })
  },

  handleMouseMove(e) {
    var y = e.clientY - ((this.props.height / 2)|0)
      , x = e.clientX - ((this.props.width / 2)|0)



    this.setState({ top: y, left: x })
  },

  handleMouseUp() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseMove);
  },

  handleClick(e) {
    e.preventDefault()
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  },

  render () {
    var styles = {
      position: 'fixed',
      top: this.state.top,
      left: this.state.left
    }

    return (
      <div onMouseDown={ this.handleClick } style={ styles } >
        <img src={ this.props.src } />
      </div>
    )
  }
})

export default DragImg
