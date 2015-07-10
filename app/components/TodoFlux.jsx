import React from 'react'
import Reflux from 'reflux'
import _ from 'lodash'
import classNames from 'classnames'

var _todos = {}

var TodoActions = Reflux.createActions({
  'create': {},
  'complete': {}
})

var TodoStore = Reflux.createStore({
  listenables: [ TodoActions ],

  list() {
    return _.values( _todos )
  },

  onCreate( newText ) {
    var todo = { id: Date.now(), text: newText, completed: false }
    _todos[todo.id] = todo

    this.trigger( this.list() )
  },

  onComplete( id ) {
    _todos[id].completed = !_todos[id].completed

    this.trigger( this.list() )
  },

  getInitialState() {
    return this.list()
  }
})

const TodoProgress = React.createClass({
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

const TodoItem = React.createClass({
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
        { text }
        <button onClick={ this.handleClick }>
          &#x2713;
        </button>
      </li>
    )
  }
})

const TodoList = React.createClass({
  render() {
    var items = this.props.items.map( item => {
      return <TodoItem key={ item.id } item={ item } />
    })

    return <ul className='todos'>{ items }</ul>;
  }
})

const TodoForm = React.createClass({
  getInitialState() {
    return { text: '' };
  },

  onChange(e) {
    this.setState({ text: e.currentTarget.value });
  },

  handleSubmit(e) {
    e.preventDefault();

    console.log( 'submitting', this.state.text);
    TodoActions.create( this.state.text )
    this.setState({ text: '' })
  },

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input onChange={ this.onChange } value={ this.state.text } />
        <button>
          { 'Add #' + (this.props.items.length + 1) }
        </button>
      </form>
    )
  }
})

const TodoFlux = React.createClass({
  mixins: [ Reflux.connect(TodoStore, 'items') ],

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

export default TodoFlux
