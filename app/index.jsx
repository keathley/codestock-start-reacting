import React from 'react'
import { Router, Route, Navigation } from 'react-router'
import { history } from 'react-router/lib/BrowserHistory'
import classNames from 'classnames'

import AceEditor from 'components/ace'
import HelloWorld from 'components/HelloWorld'

// require('font-awesome-webpack');
require('./styles/index.scss');

const LEFT  = 37
const RIGHT = 39
const SPACE = 32

const App = React.createClass({
  mixins: [ Navigation ],

  getInitialState: function() {
    return {
      nextTheme: 'tomorrow_night',
      currentTheme: 'xcode'
    };
  },

  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown, false);
  },

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  },

  handleKeyDown(event) {
    if ( event.keyCode == LEFT || event.keyCode == RIGHT ) {
      var key   = event.keyCode
        , id    = this.props.params.id ? parseInt(this.props.params.id) : 0
        , newId = key == LEFT ? Math.max(0, id - 1) : (id + 1)
        , newId = newId === 0 ? '' : newId

      this.transitionTo('/' + newId)
    } else if ( event.keyCode == SPACE && event.ctrlKey ) {
      this.setState({
        currentTheme: this.state.nextTheme,
        nextTheme: this.state.currentTheme
      })
    }
  },

  slides() {
    return [
      <CSTitleSlide />,

      <ProfileSlide />,

      <C5Slide />,

      <Slide>
        <h1>Poll</h1>
        <h2>Who is...</h2>
        <ul>
          <li>Mac vs. Windows</li>
          <li>familiar with React</li>
          <li>using a client side framework</li>
          <li>using jquery</li>
          <li>compiling es6</li>
          <li>using webpack</li>
        </ul>
        <h3>TODO: Add visualization here?</h3>
        <h3>TODO: I wanna add myself into that graph?</h3>
      </Slide>,

      <Slide>
        <h1>
          Let's talk about:
        </h1>
        <ul>
          <li>React</li>
          <li>Flux</li>
          <li>How you can use it</li>
          <li>(well...how you can implement it.  YMMV with managers)</li>
        </ul>
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
        <h1>
          Facebook
        </h1>
        <h3>TODO: get image of facebook</h3>
        <h3>TODO: get image of dom with react</h3>
      </Slide>,

      <Slide>
        <h1>Simple Apis for elegant solutions</h1>
        <ul>
          <li>Only State and Props</li>
          <li>One way data binding</li>
          <li>Never uses the word transclude</li>
        </ul>
        <aside>
          People assume that 'just the view layer means it can't do anything'
          or that it's not as powerful as Angular or something.
        </aside>
      </Slide>,

      <Slide>
        <h1>Show component</h1>
        <h3>TODO: Might need this to be interactable?</h3>
        <h3>TODO: Split diff of component and working thing?</h3>
      </Slide>,

      <CodeSlide
        theme={ this.state.currentTheme }
        value={
`import React from 'react'

const HelloMessage = React.createClass({
  render() {
    return <div>Hello {this.props.name}</div>;
  }
);

React.renderComponent(
  <HelloMessage name="Chris" />,
  mountNode
);`
        }>
        <HelloWorld name={ 'Chris' } />
      </CodeSlide>,

      <Slide>
        <h1>Nested Components</h1>
        <h3>TODO: Whatever the interaction was before do that again</h3>
        <h3>TODO: Talk about props here</h3>
      </Slide>,

      <Slide>
        <h1>Components with inner children</h1>
        <h3>TODO: ditto</h3>
      </Slide>,

      <Slide>
        <h1>Dropdown component with State</h1>
        <h3>TODO: build components</h3>
      </Slide>,

      <Slide>
        <h1>Component LifeCycle</h1>
        <h3>TODO: Timer component</h3>
      </Slide>,

      <Slide>
        <h1>Form Handlers</h1>
        <h3>TODO: Todo app?</h3>
      </Slide>,

      <Slide>
        <h1>So that's it</h1>
        <h3>TODO: gif of thumbs up?</h3>
      </Slide>,

      <Slide>
        <h1>React is efficient</h1>
        <h3>TODO: gif of video game?</h3>
      </Slide>,

      <Slide>
        <h1>Efficient Rendering</h1>
        <h3>TODO: Get DBMON up in this business</h3>
        <h3>TODO: Build a slider to show off refresh rates</h3>
      </Slide>,

      <Slide>
        <h1>A note about performance</h1>
        <h3>TODO: background gif...I got nothing for this</h3>
        <aside>
          Perf isn't everything but not having to worry about perf is
          really compelling.
        </aside>
      </Slide>,

      <Slide>
        <h1>Diffs FTW</h1>
        <h3>
          TODO: Maybe I can show how only the updated pieces change.
          TODO: Might be a good place to show off how the immutable data
          stuff works.  like show how to just change data and see what updates
        </h3>
      </Slide>,

      <Slide>
        <h1>Even more awesomeness</h1>
      </Slide>,

      <Slide>
        <h1>TODO: Move stuff around on the page</h1>
      </Slide>,

      <Slide>
        <h1>TODO: Wrap existing jquery code</h1>
      </Slide>,

      <Slide>
        <h1>TODO: Nested views with React Router</h1>
      </Slide>,

      <Slide>
        <h1>TODO: you just need something to compile jsx</h1>
        <aside>
          You don't have to do anything besides compile JSX when your assets
          go through your CI build and get minified and hashed.
        </aside>
      </Slide>,

      <Slide>
        <h1>Flux</h1>
        <h3>TODO: Find a good background gif for flux...things</h3>
      </Slide>,

      <Slide>
        <h1>The problem with MVC</h1>
        <h3>TODO: Idealized diagram of MVC</h3>
        <h3>TODO: Show how it becomes a ridiculous mess</h3>
        <aside>
          MVC works OK.  But models don't really have a place on the client.
          Ember gets the closest with its classical take on MVC.  Ember just
          doesn't appeal to me as an applications developer.

          ON top of that we don't really know where events are going to be
          coming from on the web.  We want to be able to get updates from the
          server whenever we want.
        </aside>
      </Slide>,

      <Slide>
        <h1>Flux is an answer</h1>
        <aside>
          Flux is just a pattern.  Not an implmentation.  But it's simple.
          so never fear.
        </aside>
      </Slide>,

      <Slide>
        <h1>One way data flow</h1>
        <h3>TODO: Show the diagram from above but fluxified</h3>
        <h3>TODO: Show code attached to each piece</h3>
      </Slide>,

      <Slide>
        <h1>Components</h1>
      </Slide>,

      <Slide>
        <h1>Actions</h1>
        <aside>
          They can come from teh server or the client.  That's the point.
        </aside>
      </Slide>,

      <Slide>
        <h1>Dispatcher</h1>
        <aside>
          Implicit
        </aside>
      </Slide>,

      <Slide>
        <h1>Stores</h1>
        <h3>TODO: business time gif?</h3>
        <aside>
          Where your data lives.  You do business stuff here.
          Anything can listen
        </aside>
      </Slide>,

      <Slide>
        <h1>Back to components</h1>
      </Slide>,

      <Slide>
        <h1>Data is shared</h1>
        <aside>
          Updates are then shared amongst components
        </aside>
      </Slide>,

      <Slide>
        <h1>Data is shared</h1>
        <h3>TODO: App that has a progress where things can get ticked off?</h3>
      </Slide>,

      <Slide>
        <h1>
          On those previous slides it might be cool to see the data flow
        </h1>
        <h3>TODO: Crowd Participation?</h3>
      </Slide>,

      <Slide>
        <h1>Bring your own transport</h1>
        <h3>TODO: gif</h3>
      </Slide>,

      <Slide>
        <h1>Actions from anywhere</h1>
        <h3>TODO: Example of people updating the application with me</h3>
      </Slide>,

      <Slide>
        <h1>Benefits of Flux</h1>
        <h3>TODO: is this where I add the picture from twitter?</h3>
      </Slide>,

      <Slide>
        <h1>Benefits of Flux</h1>
        <ul>
          <li>Actions can come from anywhere</li>
          <li>Data can be accessed from anywhere</li>
          <li>Use whatever transport you like (yay websockets)</li>
          <li>Use whatever transport you like</li>
          <li>Emphasizes one-way binding</li>
          <li>Isomorphic apps</li>
        </ul>
      </Slide>,

      <Slide>
        <h1>Isomorphic Apps</h1>
        <h3>TODO: show off the react-router-mega-demo</h3>
      </Slide>,

      <Slide>
        <h1>Don't be afraid to do some stuff yourself</h1>
        <h2>(seriously this isn't that hard)</h2>
      </Slide>,

      <Slide>
        <h1>Testing</h1>
        <h2>Dude idk just use whatevs</h2>
      </Slide>,

      <Slide>
        <h1>I need this so bad!!!</h1>
        <h3>TODO: gif of tongue phone</h3>
      </Slide>,

      <Slide>
        <h1>Webpack</h1>
        <h2>The latest hotness</h2>
        <h3>TODO: show off a webpack config?</h3>
      </Slide>,

      <Slide>
        <h1>Gulp, Grunt...other stuff...</h1>
      </Slide>,

      <Slide>
        <h1>Babel</h1>
        <h3>TODO: gif of something...babel-ish</h3>
      </Slide>,

      <Slide>
        <h1>"Chris that sounds great but..."</h1>
        <h3>todo: moar gifs</h3>
      </Slide>,

      <Slide>
        <h1>But if that still isn't easy enough for you...</h1>
        <h3>TODO: billy mays gif (but wait there's more)</h3>
      </Slide>,

      <Slide>
        <h1>Webpack react skeleton</h1>
        <h3>TODO: gif of satisfied</h3>
      </Slide>,

      <Slide>
        <h1>Demo how easy it is to get started.</h1>
      </Slide>,

      <Slide>
        <h1>Thanks!</h1>
        <h2>Twitter: @ChrisKeathley</h2>
        <h3>TODO: Create closing picture</h3>
        <aside>
          Tweet at me or find me in the halls if you wanna talk about this more.
        </aside>
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
        <div className='container'>
          { this.props.children }
        </div>
      </section>
    )
  }
})

const CodeSlide = React.createClass({
  render() {
    var theme = this.props.theme
    var value = this.props.value

    return (
      <Slide className='code-slide' {...this.props}>
        <AceEditor mode="javascript" theme={ theme } value={ value } />
        <div className='example'>
          { this.props.children }
        </div>
      </Slide>
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
