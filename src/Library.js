import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

export default class Library extends Component {

  static propTypes = {

  };

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf shelfTitle="Currently Reading" />
            <Bookshelf shelfTitle="Want to Read" />
            <Bookshelf shelfTitle="Read" />
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    );
  }
}
