import React from 'react'
import { Router, Route, Navigation } from 'react-router'
import { history } from 'react-router/lib/BrowserHistory'

require('./styles/index.scss');

const LEFT  = 37
const RIGHT = 39

const App = React.createClass({
  mixins: [ Navigation ],

  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown, false);
  },

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  },

  handleKeyDown(event) {
    if ( event.keyCode != LEFT && event.keyCode != RIGHT ) return;

    var key   = event.keyCode
      , id    = this.props.params.id ? parseInt(this.props.params.id) : 0
      , newId = key == LEFT ? Math.max(0, id - 1) : (id + 1)
      , newId = newId === 0 ? '' : newId

    this.transitionTo('/' + newId)
  },

  render () {
    return (
      <main className='app'>
        <Slide id={ null } { ...this.props } >
          <h1>First Slide</h1>
        </Slide>

        <Slide id={ 1 } { ...this.props } >
          <h1>Second Slide</h1>
        </Slide>

        <Slide id={ 2 } { ...this.props }>
          <h1>Third Slide</h1>
        </Slide>
      </main>
    )
  }
})

const Slide = React.createClass({
  render() {
    var visible = this.props.id == this.props.params.id
      , styles = { display: (visible ? 'block' : 'none') }

    return (
      <section className="slide" style={ styles }>
        <h1>this is my slide</h1>
        { this.props.children }
      </section>
    )
  }
})

var SlideRoute = {
  name: "slide",
  path: "/:id",
  component: Slide
}

var routes = {
  path: "/",
  component: App,
  childRoutes: [ SlideRoute ]
}

React.render(<Router history={ history } children={ routes } />, document.body)
