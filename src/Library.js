import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'

export default class Library extends Component {

  state = {
    isLoadingBooks: true,
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    BooksAPI.getAll()
    .then((res) => {
      this.setState({ books: res, isLoadingBooks: false })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {
          this.state.isLoadingBooks ?
          (
            <div id="loader">
              <img src="http://www.jordiros.me/glgifomatic/images/loading.gif" alt="loader"/>
            </div>
          )
          :
          (
            <div>
              <div className="list-books-content">
                <div>
                  <Bookshelf books={this.state.books} shelfTitle="Currently Reading" />
                  <Bookshelf books={this.state.books} shelfTitle="Want to Read" />
                  <Bookshelf books={this.state.books} shelfTitle="Read" />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}
