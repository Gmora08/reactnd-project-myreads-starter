import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const SearchBooksResults = (props) => {
  const noBooksMessage = (searchParam) => {
    if (searchParam.length > 0 ) {
      return <p>{`No books for search term ${props.searchParam}`}</p>
    }
    return null;
  }

  return (
    <div className="search-books-results">
      {
        props.searchedBooks.length ?
        (
          <ol className="books-grid">
            {
              props.searchedBooks.map((book, index) => {
                const thumbnail = book.imageLinks ? book.imageLinks.smallThumbnail : null
                return (
                  <li key={index}>
                    <Book
                      id={book.id}
                      backgroundImage={thumbnail}
                      title={book.title}
                      author={book.authors}
                      shelfValue={book.shelf}
                      changeShelf={props.changeShelf}
                    />
                  </li>
                )
              })
            }
          </ol>
        )
        : noBooksMessage(props.searchParam)
      }
    </div>
  )
}

SearchBooksResults.propTypes = {
  searchedBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeShelf: PropTypes.func.isRequired,
  searchParam: PropTypes.string.isRequired,
}

export default SearchBooksResults
