import React from 'react'
import { Router, Route, Navigation } from 'react-router'
import { history } from 'react-router/lib/BrowserHistory'
import classNames from 'classnames'

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

  slides() {
    return [
      <TitleSlide />,

      <Slide>
        <h1>First Slide</h1>
      </Slide>,

      <Slide>
        <h1>Second Slide</h1>
      </Slide>,

      <Slide>
        <h1>Third Slide</h1>
      </Slide>
    ]
  },

  render () {
    var slides = this.slides().map( (slide, id) => {
      var paramId = parseInt(this.props.params.id)
        , visible = id === (paramId || 0)
        , props = { key: id, visible: visible }

      return React.cloneElement(slide, props)
    })

    return (
      <main className='app'>
        { slides }
      </main>
    )
  }
})

const Slide = React.createClass({
  render() {
    var visible = this.props.visible
      , styles = { display: (visible ? 'block' : 'none') }
      , className = classNames('slide', this.props.className)

    return (
      <section className={ className } style={ styles }>
        { this.props.children }
      </section>
    )
  }
})

const TitleSlide = React.createClass({
  render() {
    return (
      <Slide className='intro-slide' {...this.props}>
        <h1 className="session-title">Start Reacting</h1>
        <h2 className='session-details'>
          10:15am / ResultStack (301-D)
        </h2>
        <img src={ '/app/images/title-cropped.png' } alt='title image' />
      </Slide>
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
