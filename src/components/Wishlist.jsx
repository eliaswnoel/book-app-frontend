import { useEffect, useState } from "react";
import axios from 'axios';
import WishlistModal from './WishlistModal'

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    useEffect(() => {
        fetchWishlistItems();
    }, [] );

    //Fetch Wishlist items
    const fetchWishlistItems = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/wishlist`)
            setWishlistItems(response.data);
        } catch (error) {
            console.error('Error fetching wishlist items:', error);
        }
    };


    //Handle Delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/wishlist/${id}`);
            fetchWishlistItems();    
        } catch (error) {
            console.error('Error deleting wishlist:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div>
            <h1>Wishlist</h1>
            <button onClick={openModal}>Add New Item</button>

            <ul className="wishlistGrid">
                {wishlistItems.map(item => (
                    <li key={item._id}>
                        <h2>{item.title}</h2>
                        <p>Author: {item.author}</p>
                        <img src={item.image} alt={`${item.title} by ${item.author}`} />
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {/* Render the modal if isModalOpen is true */}
            {isModalOpen && <WishlistModal onClose={closeModal} fetchWishlistItems={fetchWishlistItems} />}
        </div>
    );
}

export default Wishlist;