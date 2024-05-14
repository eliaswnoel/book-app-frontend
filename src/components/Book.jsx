import { useEffect, useState, useCallback } from "react";
import axios from 'axios'

const Book = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        name: "",
        image: "",
        summary: "",
        rating: 0
    }) 

    useEffect(() => {
        fetchBooks();
    }, []);

    //Get Books
    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:4000/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    //Handle Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBook(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    //Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/books', newBook);
            // Reset form field after submitting
            setNewBook({
                name: "",
                image: "",
                summary: "",
                rating: 0
            });
            // Refetch the list of books to display the newly added book
            fetchBooks();
        } catch (error) {
            console.error('Error adding book:', error);
        }

};

    return (
        <div>
            {/* add new book form */}
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
            {books.map((book, index) => (
                <div key={index}>
                    <h2>{book.name}</h2>
                    <img src={book.image} alt={book.name} />
                    <p>Summary: {book.summary}</p>
                    <p>Rating: {book.rating}</p>
                </div>
            ))}
        </div>
    );
}

export default Book;