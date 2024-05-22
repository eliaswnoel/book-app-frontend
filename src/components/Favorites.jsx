import { useState, useEffect } from "react";
import axios from 'axios';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/favorites/`);
            console.log(response.data)
            setFavorites(response.data);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };



    return (
        <div>
            <h1>My Favorites</h1>
            <div className="favoritesGrid">
                {favorites && favorites.map((favorite, index) => (
                    <div key={index} className="favoriteItem">
                        {favorite &&  (
                            <>
                                <img src={favorite.image} alt={favorite.name} className="favoriteImg" />
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
