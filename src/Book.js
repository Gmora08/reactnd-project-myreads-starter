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
  backgroundImage: PropTypes.string,
  title: PropTypes.string.isRequired,
  author: PropTypes.arrayOf(PropTypes.string),
  shelfValue: PropTypes.string.isRequired,
  changeShelf: PropTypes.func.isRequired,
}

Book.defaultProps = {
  author: [],
  backgroundImage: 'https://www.catswhocode.com/blog/wp-content/uploads/2008/10/ebook-cover1.png',
}

export default Book;
