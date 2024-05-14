import { useEffect, useState, useCallback } from "react";
import axios from 'axios'

const Book = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:4000/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    return (
        <div>
            {books.map((book, index) => (
                <div key={index}>
                    <h2>{book.name}</h2>
                    <img src={book.image} alt={book.name} />
                    <p>Review: {book.review}</p>
                    <p>Rating: {book.rating}</p>
                </div>
            ))}
        </div>
    );
}

export default Book;