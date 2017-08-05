import React from 'react'
import PropTypes from 'prop-types'

const BookActions = ({ id, actions, value, changeShelf }) => (
  <div className="book-shelf-changer">
    <select value={value} onChange={e => (changeShelf(e, id))}>
      <option value="none" disabled>Move to...</option>
      {
        actions.map((action, index) => (<option key={index} value={action.value}>{action.text}</option>))
      }
    </select>
  </div>
)

BookActions.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeShelf: PropTypes.func.isRequired,
}

export default BookActions;
