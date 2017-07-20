import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import './App.css'

export default class BooksList extends Component {

  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
      backgroundImage: PropTypes.string, title: PropTypes.string, author: PropTypes.string
    })).isRequired,
  };

  renderBookListItem(book, index) {
    return (
      <li key={index}>
        <Book
          backgroundImage={book.backgroundImage}
          title={book.title}
          author={book.author}
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
