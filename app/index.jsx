import React from 'react'
import { Router, Route, Navigation } from 'react-router'
import { history } from 'react-router/lib/BrowserHistory'
import classNames from 'classnames'

require('font-awesome-webpack');
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
      <CSTitleSlide />,

      <ProfileSlide />,

      <C5Slide />,

      <Slide>
        <h1>
          Let's talk about:
        </h1>
        <ul>
          <li>React</li>
          <li>Flux</li>
          <li>How you can use it</li>
        </ul>
      </Slide>,

      <Slide>
        <h1>Poll</h1>
        <h2>Who is...</h2>
        <ul>
          <li>using jquery</li>
          <li>already using a client side framework</li>
          <li>compiling es6</li>
          <li>familiar with React</li>
          <li>using webpack</li>
        </ul>
        <h3>TODO: Add visualization here?</h3>
        <h3>TODO: I wanna add myself into that graph?</h3>
      </Slide>,

      <Slide>
          <h1>The Problem with Comparisons</h1>
          <h3>TODO: Find a gif for this</h3>
          <aside>
            I'm going to make comparisons but its just for context.
            I love all of these things.  I just wanna give you some reasons
            you might wanna switch to React.

            That being said I'm going to make a bunch of them.
          </aside>
      </Slide>,

      <Slide>
        <h1>
          Let's Talk About React
        </h1>
        <h3>TODO: GIF Background</h3>
      </Slide>,

      <Slide>
        <h1>Simple Apis for elegant solutions</h1>
        <ul>
          <li>Only State and Props</li>
          <li>One way data binding</li>
          <li>Never uses the word transclude</li>
        </ul>
      </Slide>,

      <Slide>
        <h1>TODO: Show component</h1>
      </Slide>,
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
        <div className='container'>
          { this.props.children }
        </div>
      </section>
    )
  }
})

const CSTitleSlide = React.createClass({
  render() {
    return (
      <Slide className='cs-title-slide' {...this.props}>
        <h1 className="session-title">Start Reacting</h1>
        <h2 className='session-details'>
          10:15am / ResultStack (301-D)
        </h2>
        <img src={ '/app/images/title-cropped.png' } alt='title image' />
      </Slide>
    )
  }
})

const ProfileSlide = React.createClass({
  render() {
    return (
      <Slide className='profile-slide' {...this.props}>
        <div className='bio-details'>
          <h1>
            I'm <a href={ 'http://keathley.io' }>Chris Keathley</a>
          </h1>
          <h2>
            <a href={ 'http://github.com/keathley' }>@keathley</a> on the internet
            </h2>
        </div>
      </Slide>
    )
  }
})

const C5Slide = React.createClass({
  render() {
    return (
      <Slide className='c5-slide' {...this.props}>
        <h1>Carbon Five</h1>
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
