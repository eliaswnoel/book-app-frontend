import { useState } from "react";
import axios from 'axios';


const BookModal = ({ user, onClose, fetchBooks }) => {
    console.log("user", user)
    const [newBook, setNewBook] = useState({
        name: "",
        image: "",
        summary: "",
        rating: 0,
        isFavorite: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const sanitizedValue = name === 'rating' ? Math.min(Math.max(parseInt(value), 1), 5) : value;
        setNewBook(prevState => ({
            ...prevState,
            [name]: sanitizedValue
        }));
    };



    //for favorite
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setNewBook(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:4000/books`, newBook);
            const newBookId = response.data._id;
            console.log(newBookId)
            console.log(newBook.isFavorite)
            if (newBook.isFavorite) {
                const data = { userId: user.id, bookId: newBookId }
                console.log(data)
                await axios.post(`http://localhost:4000/favorites`, data); 
            }
            setNewBook({
                name: "",
                image: "",
                summary: "",
                rating: 0,
                isFavorite: false
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
                    <label>
                            <input
                                type="checkbox"
                                name="isFavorite"
                                checked={newBook.isFavorite}
                                onChange={handleCheckboxChange}
                            />
                            Add to Favorites
                        </label>
                    <button type="submit">Add Book</button>
                </form>
                </div>
            </div>
        </div>
    );
}

export default BookModal;
