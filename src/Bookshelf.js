import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BooksList from './BooksList'

export default class MyComponent extends Component {

  static propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <BooksList books={this.props.books} />
        </div>
      </div>
    );
  }

}
