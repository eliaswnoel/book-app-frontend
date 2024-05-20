const BookDetails = ({ book, onClose }) => {
    if (!book) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{book.name}</h2>
                <p>Author: {book.author}</p>
                <p>Summary: {book.summary}</p>
                <p>Rating: {book.rating}</p>
            </div>
        </div>
    );
}

export default BookDetails;