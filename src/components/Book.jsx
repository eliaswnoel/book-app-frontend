import { useState, useEffect } from "react";
import axios from 'axios';
import BookModal from './BookModal'




const Book = ({user}) => {
    const [books, setBooks] = useState([]);
    const [expandedBook, setExpandedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editBook, setEditBook] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    // Get Books
    const fetchBooks = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/books`);
            
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };
    
    const handleImageClick = (book) => {
        setExpandedBook(expandedBook === book ? null : book);
    };



    //Handle Delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/books/${id}`);
            fetchBooks();    
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    //update
    const handleEdit = (book) => {
        setEditBook(book);
        setIsModalOpen(true);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div>
            <h1>Reading Log</h1>
            <button  onClick={openModal} style={{ borderRadius: '50%', backgroundColor: 'white', color: 'white', width: '30px', height: '30px', fontSize: '15px', border: 'none', cursor: 'pointer', justifyContent: 'center', alignItems: 'center' }}>➕</button>
            <div className="logGrid">
                {books.map((book, index) => (
                    <div key={index} className="logItem">
                        <h2>{book.name}</h2>
                        <img src={book.image} alt={book.name} className="logImg" onClick={() => handleImageClick(book)} style={{ cursor: "pointer" }} />
                        {expandedBook === book && (
                            <div>
                                <p>Summary: {book.summary}</p>
                                <p>Rating: {book.rating}</p>
                                <button onClick={() => handleDelete(book._id)}>Delete book from log</button>
                                <button onClick={() => handleEdit(book)}>Update book</button>

                            </div>
                        )}
                    </div>
                ))}
            </div>
            {/* Render the modal if isModalOpen is true */}
            {isModalOpen && <BookModal user={user} onClose={closeModal} fetchBooks={fetchBooks} book={editBook} isEditMode={!!editBook} />}
        </div>
    );
}

export default Book;