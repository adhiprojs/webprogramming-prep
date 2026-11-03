import PropTypes from 'prop-types';

function BookCard({ bookTitle, authorName, availabilityStatus }) {
  return (
    <div id="book-card">
      <h2>{bookTitle}</h2>
      <p>Author: {authorName}</p>
      <p>Status: {availabilityStatus}</p>
    </div>
  );
}

BookCard.propTypes = {
  bookTitle: PropTypes.string,
  authorName: PropTypes.string,
  availabilityStatus: PropTypes.string,
};

export default BookCard;
