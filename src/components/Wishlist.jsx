import { useEffect, useState } from "react";
import axios from 'axios';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [newItem, setNewItem] = useState({
        title: "",
        author: "",
        image: ""
    });
    
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

    //Handle Change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewItem(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    //Handle Submit
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
        } catch (error) {
            console.error('Error adding item to wishlist:', error);
        }
    };

    return (
        <div>
            <h1>Wishlist</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={newItem.title} onChange={handleChange} />
                </div>
                <div>
                    <label>Author:</label>
                    <input type="text" name="author" value={newItem.author} onChange={handleChange} />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="text" name="image" value={newItem.image} onChange={handleChange} />
                </div>
                <button type="submit">Add to Wishlist</button>
            </form>
            <ul>
                {wishlistItems.map(item => (
                    <li key={item._id}>
                        <h2>{item.title}</h2>
                        <p>Author: {item.author}</p>
                        <img src={item.image} alt={`${item.title} by ${item.author}`} onClick={() => handleImageClick(item)} />
                        {expandedItem === item && <p>{item.description}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wishlist;