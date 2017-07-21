import React from 'react'
import PropTypes from 'prop-types'
import BookActions from './BookActions'
import './App.css'

const bookActions = [
  { value: 'none', text: 'Move too...' },
  { value: 'currentlyReading', text: 'Currently Reading' },
  { value: 'wantToRead', text: 'Want to Read' },
  { value: 'read', text: 'Read' },
  { value: 'none', text: 'None' },
]

const Book = ({ backgroundImage, title, author }) => (
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
      <BookActions actions={bookActions} />
    </div>
    <div className="book-title">{title}</div>
    <div className="book-authors">{author}</div>
  </div>
)

Book.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
}

export default Book;
