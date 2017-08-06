import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooksResults from './SearchBooksResults'
import Loader from './Loader'

export default class SearchBooks extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timeout: null,
      searchParam: '',
      isSearchingBooks: false,
      searchedBooks: [],
      books: [],
    };
    this.searchBooks = this.searchBooks.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.changeShelf = this.changeShelf.bind(this)
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(res => (
      this.setState({ books: res })
    ))
    .catch(console.log)
  }

  handleChange(event) {
    if (event.target.value.length > 0) {
      window.clearTimeout(this.state.timeout)
      this.setState({
        timeout: window.setTimeout(this.searchBooks, 500),
        searchParam: event.target.value,
        isSearchingBooks: true,
      })
    } else {
      this.setState({ isSearchingBooks: false, searchParam: '' })
      window.clearTimeout(this.state.timeout)
    }
  }

  searchBooks() {
    BooksAPI.search(this.state.searchParam, 20)
    .then((res) => {
      if (res.error) {
        this.setState({ isSearchingBooks: false, searchedBooks: [] })
        return false;
      }
      const books = res.map((book) => {
        const index = this.state.books.findIndex(b => b.id === book.id)
        if (index !== -1) {
          return this.state.books[index]
        } else {
          book.shelf = "none"
        }
        return book
      })
      this.setState({ searchedBooks: books, isSearchingBooks: false })
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
      this.props.history.push('/')
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
        {
          this.state.isSearchingBooks ?
          (
            <Loader />
          )
          :
            <SearchBooksResults
              searchParam={this.state.searchParam}
              changeShelf={this.changeShelf}
              searchedBooks={this.state.searchedBooks}
            />
        }
      </div>
    );
  }

}
