import React from 'react'
import { Router, Route, Navigation } from 'react-router'
import { history } from 'react-router/lib/BrowserHistory'
import classNames from 'classnames'

import HelloWorld from 'components/HelloWorld'
import Highlight from 'components/Highlight'
import Timer from 'components/Timer'
import NestedExample from 'components/NestedExample'
import ClickMe from 'components/ClickMe'
import Dropdown from 'components/Dropdown'
import Todo from 'components/Todo'
import TodoFlux from 'components/TodoFlux'
import Mon from 'components/Mon'
import Swapper from 'components/Swapper'

require('./styles/index.scss');
require('./styles/syntax.scss');

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

      <CodeSlide
        value={
`import React from 'react'

const HelloMessage = React.createClass({
  render() {
    return (
      <div className="hello-world">
        Hello {this.props.name}
      </div>
    )
  }
});

React.render(
  <HelloMessage name="Chris" />,
  document.getElementById('example')
)
`
        }>
        <HelloWorld name={ 'Chris' } />
      </CodeSlide>,

      <CodeSlide
        title='Component lifecycle and state'
        value={
`import React from 'react'

const Timer = React.createClass({
  getInitialState() {
    return {secondsElapsed: 0};
  },

  tick() {
    this.setState({
      secondsElapsed: this.state.secondsElapsed + 1
    });
  },

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  },

  componentWillUnmount() {
    clearInterval(this.interval);
  },

  render() {
    return (
      <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
    );
  }
});

React.render(
  <Timer />,
  document.getElementById('example')
)
`}>
      <Timer />
      </CodeSlide>,

      <CodeSlide
        title='Nested components'
        value={
`import React from 'react'

const Message = React.createClass({
  render() {
    var text = this.props.text
    return <li>{ text }</li>
  }
});

const MessageList = React.createClass({
  getDefaultProps() {
    return { messages: [] }
  },

  render () {
    var ms = this.props.messages
      , messages = ms.map( text => <Message text={ text } /> )

    return (
      <ul className="nested">
        { messages }
      </ul>
    )
  }
})

export default MessageList
`}>
        <NestedExample messages={ ['Prep slides', 'Book Hotel', 'Rehearse talk' ] } />
      </CodeSlide>,

      <CodeSlide
        title='Form handlers'
        value={
`import React from 'react'
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
`}>
      <Dropdown />
      </CodeSlide>,

      <CodeSlide
        title='Form Handlers'
        value={
`import React from 'react'

const TodoList = React.createClass({
  render() {
    var items = this.props.items.map( (text, i) => {
      return <li key={i + text}>{text}</li>
    })

    return <ul>{ items }</ul>;
  }
})

const Todo = React.createClass({
  getInitialState() {
    return { items: [], text: '' };
  },

  onChange(e) {
    this.setState({ text: e.currentTarget.value });
  },

  handleSubmit(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },

  render() {
    return (
      <div className='todos'>
        <h3>Todo</h3>

        <TodoList items={ this.state.items } />

        <form onSubmit={ this.handleSubmit }>
          <input onChange={ this.onChange } value={ this.state.text } />
          <button>
            { 'Add #' + (this.state.items.length + 1) }
          </button>
        </form>
      </div>
    );
  }
});

export defaults Todo
`}>
      <Todo />
      </CodeSlide>,

      <Slide>
        <h1>So that's it</h1>
        <h3>TODO: gif of thumbs up?</h3>
      </Slide>,

      <Slide>
        <h1>React is efficient</h1>
        <h3>TODO: gif of video game?</h3>
      </Slide>,

      <DbmonSlide />,

      <Slide>
        <h1>A note about performance</h1>
      </Slide>,

      <Slide>
        <h1>Diffs FTW</h1>
      </Slide>,

      <DiffSlide />,

      <Slide>
        <h1>Flux</h1>
        <h3>TODO: Find a good background gif for flux...things</h3>
      </Slide>,

      <Slide>
        <h1 className='title'>The Ideal MVC</h1>
        <img src={ '/app/images/ideal-mvc.png' } className='diagram' />
      </Slide>,

      <Slide>
        <h1 className='title'>Slightly less ideal MVC</h1>
        <img src={ '/app/images/less-ideal-mvc.png' } style={{ paddingTop: '1.3em' }} className='diagram' />
      </Slide>,

      <Slide>
        <h1 className='title'>Oh Crap MVC</h1>
        <img src={ '/app/images/oh-snap-mvc.png' } className='diagram' />
      </Slide>,

      <Slide>
        <h1 className='title'>We're f****d MVC</h1>
        <img src={ '/app/images/fucked-mvc.png' } className='diagram' />
      </Slide>,

      <Slide>
        <h1>Flux is an answer</h1>
      </Slide>,

      <Slide>
        <h1 className='title'>One way data flow</h1>
        <img src={ '/app/images/flux.png' } className='diagram' />
      </Slide>,

      <Slide>
        <h1>Flux is just a pattern</h1>
      </Slide>,

      <Slide>
        <h1>Components</h1>
        <h2>Just normal react stuff</h2>
      </Slide>,

      <Slide>
        <h1>Actions</h1>
        <h2>Originate from the client or the server</h2>
      </Slide>,

      <Slide>
        <h1>Dispatcher</h1>
        <h2>Implicit</h2>
      </Slide>,

      <Slide>
        <h1>Stores</h1>
        <h2>The canonical set of data on the client</h2>
      </Slide>,

      <Slide>
        <h1>Data is shared</h1>
        <h2>Don't let things get out of synch</h2>
      </Slide>,

      <TodoFluxSlide />,

      <CodeSlide
        title='Flux Todo Form'
        value={
`const TodoForm = React.createClass({
  getInitialState() {
    return { text: '' };
  },

  onChange(e) {
    this.setState({ text: e.currentTarget.value });
  },

  handleSubmit(e) {
    e.preventDefault();
    TodoActions.create( this.state.text )
    this.setState({ text: '' })
  },

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input onChange={ this.onChange } value={ this.state.text }>
        <button>
          { 'Add #' + (this.props.items.length + 1) }
        </button>
      </form>
    )
  }
})
`}>
      </CodeSlide>,

      <CodeSlide
        title='TodoActions'
        value={
`
var TodoActions = Reflux.createActions({
  'load': { asyncResult: true },
  'create': { asyncResult: true },
  'update': { asyncResult: true }
})

TodoActions.load.listen( => {
  ajax( 'todos.json' )
    .then( this.completed )
    .catch( this.failed )
})

TodoActions.create.listen( todo => {
  ajax({ url: 'todos.json', method: 'POST', data: todo })
    .then( this.completed )
    .catch( this.failed )
})

TodoActions.update.listen( todo => {
  ajax({ url: \`todos.json/\${todo.id}\`, method: 'PUT', data: todo })
    .then( this.completed )
    .catch( this.failed )
})
`}>
      </CodeSlide>,

      <CodeSlide
        title='TodoStore'
        value={
`var _todos = {}

var TodoStore = Reflux.createStore({
  listenables: [ TodoActions ],

  list() {
    return _.values( _todos )
  },

  onLoadCompleted( todos ) {
    _todos = todos

    this.trigger( this.list() )
  },

  onCreateCompleted( todo ) {
    _todos[todo.id] = todo

    this.trigger( this.list() )
  },

  onUpdateCompleted( todo ) {
    _todo[todo.id] = _.merge(_todo[todo.id], todo)

    this.trigger( this.list() )
  },

  getInitialState() {
    return this.list()
  }
})
`}>
      </CodeSlide>,

      <CodeSlide
        title='Flux Todo App'
        value={
`const TodoFlux = React.createClass({
  mixins: [ Reflux.connect(TodoStore, 'items') ],

  componentWillMount() {
    TodoActions.load()
  },

  render() {
    return (
      <div className='todo-flux'>
        <TodoProgress items={ this.state.items } />
        <div className='todos'>
          <h3>Todo Flux</h3>
          <TodoList items={ this.state.items } />
          <TodoForm items={ this.state.items } />
        </div>
      </div>
    );
  }
});
`}>

      </CodeSlide>,

      <CodeSlide
        title='Todo List'
        value={
`const TodoItem = React.createClass({
  handleClick() {
    TodoActions.complete( this.props.item.id )
  },

  render() {
    var todo      = this.props.item
      , text      = todo.text
      , id        = todo.id
      , completed = todo.completed
      , className = classNames('todo', { 'completed': completed })
      , symbol = completed ? {  } : null

    return (
      <li className={ className }>
        <button onClick={ this.handleClick }>
          &#x2713;
        </button>
        <span className='todo-text'>{ text }</span>
      </li>
    )
  }
});

const TodoList = React.createClass({
  render() {
    var items = this.props.items.map( item => {
      return <TodoItem key={ item.id } item={ item } />
    })

    return <ul className='todos'>{ items }</ul>;
  }
})
`}>
      </CodeSlide>,

      <CodeSlide
        title='Todo Progress'
        value={
`const TodoProgress = React.createClass({
  render() {
    var items = this.props.items
      , value = items.filter( item => item.completed ).length
      , max   = items.length

    return (
      <div className='progress'>
        <h3>Progress { value } of { max }</h3>
        <progress value={ value } max={ max }/>
      </div>
    )
  }
})
`}>
      </CodeSlide>,

      <Slide>
        <h1>Benefits of Flux</h1>
        <h3>TODO: is this where I add the picture from twitter?</h3>
      </Slide>,

      <Slide>
        <h1>Actions can come from anywhere</h1>
      </Slide>,

      <Slide>
        <h1>Bring your own transport</h1>
      </Slide>,

      <Slide>
        <h1>Data stays in synch</h1>
      </Slide>,

      <Slide>
        <h1>Isomorphic Apps</h1>
      </Slide>,

      <Slide>
        <h1>Don't be afraid to do some stuff yourself</h1>
        <h2>(seriously this isn't that hard)</h2>
      </Slide>,

      <Slide>
        <h1>How to get started</h1>
        <h3>I need this so bad!!!</h3>
      </Slide>,

      <Slide>
        <h1>Webpack</h1>
        <h2>The latest hotness</h2>
        <h3>TODO: show off a webpack config?</h3>
      </Slide>,

      <CodeSlide
        title='webpack config'
        value={
`var webpack = require('webpack')
  , path = require('path')
  , node_modules_dir = path.resolve(__dirname, 'node_modules')
  , HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [ path.resolve(__dirname, 'app/index.jsx') ]
  },
  output: {
    path: __dirname + '/build',
    filename: "bundle.js",
    hash: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [ 'babel' ]
      },
      {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer!sass'
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My cool app'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.json', '.jsx', '.scss', '.css']
  }
};
`}>
      </CodeSlide>,

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
        <h1>I got you this thing</h1>
        <h2>
          <a href="http://github.com/keathley/webpack-react-skeleton">
            github.com/keathley/webpack-react-skeleton
          </a>
        </h2>
        <h3>TODO: gif of satisfied</h3>
      </Slide>,

      <Slide>
        <h1>Thanks!</h1>
        <h2>Twitter: @ChrisKeathley</h2>
        <h2>Github: Keathley</h2>
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
  getInitialState: function() {
    return { rendered: false };
  },

  render() {
    var theme = this.props.theme
    var value = this.props.value

    return (
      <Slide className='code-slide' {...this.props}>
        <Highlight className='javascript linenos'>
          { value }
        </Highlight>
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

const DbmonSlide = React.createClass({
  render() {
    return (
      <Slide className='dbmon' {...this.props}>
        <h1>DBMON</h1>
        <div className='flex'>
          <Mon name='ember' title='Ember' />
          <Mon name='angular' title='Angular' />
          <Mon name='react' title='React' />
        </div>
      </Slide>
    )
  }
})

const DiffSlide = React.createClass({
  render() {
    return (
      <CodeSlide
        {...this.props}
        value={
`var React = require('react');

var Swapper = React.createClass({
  getInitialState: function() {
    return {
      data: [
        { name: 'Python', score: 3 },
        { name: 'Ruby', score: 5 },
        { name: 'Go', score: 20 },
        { name: 'Node', score: 10 },
        { name: 'Elixir', score: 5 },
        { name: 'Rust', score: 11 },
        { name: 'Clojure', score: 3 }
      ]
    };
  },

  rescore() {
    var newData = this.state.data.map( lang => {
      lang.score = Math.random() * 20|0
      return lang
    })
    this.setState({ data: newData })
  },

  componentDidMount() {
    this.interval = setInterval(this.rescore, 3000);
  },

  componentWillUnmount() {
    clearInterval(this.interval);
  },

  render() {
    var data   = this.state.data
      , sorted = data.sort( (a, b) => a.score - b.score )
      , langs  = sorted.map( lang => <li key={ lang.name }>{ lang.name }</li> )

    return (
      <div className='swapper'>
        <ol>
          { langs }
        </ol>
      </div>
    );
  }

});

module.exports = Swapper;
`}>
        <Swapper />
      </CodeSlide>
    )
  }
})

const TodoFluxSlide = React.createClass({
  render() {
    return (
      <Slide {...this.props} className='code-slide todo-flux-slide'>
        <TodoFlux />
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
