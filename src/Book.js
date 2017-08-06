import React from 'react'
import PropTypes from 'prop-types'
import BookActions from './BookActions'
import './App.css'

const bookActions = [
  { value: 'currentlyReading', text: 'Currently Reading' },
  { value: 'wantToRead', text: 'Want to Read' },
  { value: 'read', text: 'Read' },
  { value: 'none', text: 'None' },
]

const Book = ({ id, backgroundImage, title, author, shelfValue, changeShelf }) => (
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 188,
          backgroundImage: `url(${backgroundImage})`
        }}
      >
      </div>
      <BookActions id={id} changeShelf={changeShelf} actions={bookActions} value={shelfValue} />
    </div>
    <div className="book-title">{title}</div>
    {
      author.length ? (
        author.map((obj, index) => (<div key={index} className="book-authors">{obj}</div>))
      ) : null
    }
  </div>
)

Book.propTypes = {
  id: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.arrayOf(PropTypes.string),
  shelfValue: PropTypes.string.isRequired,
  changeShelf: PropTypes.func.isRequired,
}

Book.defaultProps = {
  author: [],
}

export default Book;
