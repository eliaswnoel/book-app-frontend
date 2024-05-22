import { useEffect, useState } from "react";
import axios from 'axios';
import WishlistModal from './WishlistModal'

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [expandedItem, setExpandedItem] = useState(null);
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

    const handleItemClick = (itemId) => {
        setExpandedItem(itemId === expandedItem ? null : itemId);
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

    //handle move to books
    const handleMoveToBooks = async (id) => {
        try {
            const itemToMove = wishlistItems.find(item => item._id === id);
            // Remove item from wishlist
            await axios.delete(`http://localhost:4000/wishlist/${id}`);
            // Add item to books section 
            await axios.post(`http://localhost:4000/books`, itemToMove);
            fetchWishlistItems(); 
        } catch (error) {
            console.error('Error moving item to books:', error);
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
            <button  onClick={openModal} style={{ borderRadius: '50%', backgroundColor: 'white', color: 'white', width: '30px', height: '30px', fontSize: '15px', border: 'none', cursor: 'pointer', justifyContent: 'center', alignItems: 'center' }}>➕</button>

            

            <ul className="wishlistGrid">
                {wishlistItems.map(item => (
                    <li key={item._id} onClick={() => handleItemClick(item._id)}>
                        <h2>{item.title}</h2>
                        <p>Author: {item.author}</p>
                        <img src={item.image} alt={`${item.title} by ${item.author}`} />
                            {expandedItem === item._id && (
                            <div>
                                <button onClick={() => handleDelete(item._id)}>- Delete</button>
                                <button onClick={() => handleMoveToBooks(item._id)}>Move to Books</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {isModalOpen && <WishlistModal onClose={closeModal} fetchWishlistItems={fetchWishlistItems} />}
        </div>
    );
}

export default Wishlist;