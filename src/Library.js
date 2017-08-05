import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'

export default class Library extends Component {

  constructor(props){
  	super(props);
  	this.state = {
      isLoadingBooks: true,
      books: {},
    };
    this.getBooks = this.getBooks.bind(this)
    this.updateBook = this.updateBook.bind(this)
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

  updateBook(book, shelf) {
    BooksAPI.update(book, shelf)
    .then(() => {
      this.setState((prevState) => {
        const bookIndex = prevState.books.findIndex(b => (b.id === book.id ))
        prevState.books[bookIndex].shelf = shelf
        return { books: prevState.books }
      })
    })
    .catch(console.log)
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
                  <Bookshelf
                    books={this.state.books}
                    updateBook={this.updateBook}
                    shelfTitle="Currently Reading"
                    type="currentlyReading"
                  />
                  <Bookshelf
                    books={this.state.books}
                    updateBook={this.updateBook}
                    shelfTitle="Want to Read"
                    type="wantToRead"
                  />
                  <Bookshelf
                    books={this.state.books}
                    updateBook={this.updateBook}
                    shelfTitle="Read"
                    type="read"
                  />
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
