import { useState } from "react";
import axios from 'axios';

const BookModal = ({ onClose, fetchBooks }) => {
    const [newBook, setNewBook] = useState({
        name: "",
        image: "",
        summary: "",
        rating: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBook(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:4000/books`, newBook);
            setNewBook({
                name: "",
                image: "",
                summary: "",
                rating: 0
            });
            fetchBooks();
            onClose(); // Close the modal after adding a book
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="input-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='name'
                        value={newBook.name}
                        onChange={handleChange}
                        placeholder="Book Title"
                    />
                    <input 
                        type="text"
                        name='image'
                        value={newBook.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                    />
                    <input 
                        type="text"
                        name="summary"
                        value={newBook.summary}
                        onChange={handleChange}
                        placeholder="Book Summary"
                    />
                    <input
                        type="number"
                        name="rating"
                        value={newBook.rating}
                        onChange={handleChange}
                        placeholder="Rating"
                    />
                    <button type="submit">Add Book</button>
                </form>
                </div>
            </div>
        </div>
    );
}

export default BookModal;
