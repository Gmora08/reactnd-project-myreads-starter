import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import './App.css'

export default class BooksList extends Component {

  constructor(props){
  	super(props);
  	this.state = {};
    this.renderBookListItem = this.renderBookListItem.bind(this)
    this.changeShelf = this.changeShelf.bind(this)
  }

  static propTypes = {
    updateBook: PropTypes.func.isRequired,
    shelfValue: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.shape({
      backgroundImage: PropTypes.string, title: PropTypes.string, author: PropTypes.string
    })).isRequired,
  };

  changeShelf(e, id) {
    const book = this.props.books.filter((b) => b.id === id)
    this.props.updateBook(book[0], e.target.value)
  }

  renderBookListItem(book, index) {
    return (
      <li key={index}>
        <Book
          id={book.id}
          backgroundImage={book.imageLinks.smallThumbnail}
          title={book.title}
          author={book.authors[0]}
          shelfValue={this.props.shelfValue}
          changeShelf={this.changeShelf}
        />
      </li>
    )
  }

  render () {
    return (
      <ol className="books-grid">
        { this.props.books.map(this.renderBookListItem) }
      </ol>
    )
  }
}
