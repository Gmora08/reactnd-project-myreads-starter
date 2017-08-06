import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

export default class SearchBooks extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timeout: null,
      searchParam: '',
      searchedBooks: [],
    };
    this.searchBooks = this.searchBooks.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.changeShelf = this.changeShelf.bind(this)
  }

  handleChange(event) {
    if (event.target.value.length > 0) {
      window.clearTimeout(this.state.timeout)
      this.setState({
        timeout: window.setTimeout(this.searchBooks, 1000),
        searchParam: event.target.value,
      })
    } else {
      window.clearTimeout(this.state.timeout)
    }
  }

  searchBooks() {
    BooksAPI.search(this.state.searchParam, 20)
    .then((res) => {
      console.log(res);
      this.setState({ searchedBooks: res })
    })
    .catch(console.log)
  }

  changeShelf(e, id) {
    const shelf = e.target.value
    const bookIndex = this.state.searchedBooks.findIndex(b => (b.id === id ))
    BooksAPI.update(this.state.searchedBooks[bookIndex], shelf)
    .then(() => {
      this.setState((prevState) => {
        prevState.searchedBooks[bookIndex].shelf = shelf
        return { searchedBooks: prevState.searchedBooks }
      })
    })
    .catch(console.log)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          {
            this.state.searchedBooks.length ?
            (
              <ol className="books-grid">
                {
                  this.state.searchedBooks.map((book, index) => (
                    <li key={index}>
                      <Book
                        id={book.id}
                        backgroundImage={book.imageLinks.smallThumbnail}
                        title={book.title}
                        author={book.authors}
                        shelfValue={book.shelf}
                        changeShelf={this.changeShelf}
                      />
                    </li>
                  ))
                }
              </ol>
            )
            : null
          }
        </div>
      </div>
    );
  }

}
