import { useState } from "react";
import axios from 'axios';

const WishlistModal = ({ onClose, fetchWishlistItems }) => {
    const [newItem, setNewItem] = useState({
        title: "",
        author: "",
        image: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewItem(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/wishlist', newItem);
            
            // Reset form fields after submitting
            setNewItem({
                title: "",
                author: "",
                image: ""
            });
            // Refetch the list of wishlist items to display the newly added item
            fetchWishlistItems();
            onClose();
        } catch (error) {
            console.error('Error adding item to wishlist:', error);
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
                            name='title'
                            value={newItem.title}
                            onChange={handleChange}
                            placeholder="Title"
                        />
                        <input
                            type='text'
                            name='author'
                            value={newItem.author}
                            onChange={handleChange}
                            placeholder="Author"
                        />
                        <input
                            type='text'
                            name='image'
                            value={newItem.image}
                            onChange={handleChange}
                            placeholder="Image URL"
                        />
                        <button type="submit">Add to Wishlist</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default WishlistModal;
