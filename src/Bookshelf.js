import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BooksList from './BooksList'

export default class MyComponent extends Component {

  static propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
  };

  render() {
    const books = this.props.books.filter(book => (book.shelf === this.props.type))
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <BooksList books={books} />
        </div>
      </div>
    );
  }

}
