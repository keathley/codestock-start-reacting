import React from 'react'

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

export default Todo
