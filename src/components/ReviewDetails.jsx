import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams} from 'react-router-dom';

const ReviewDetails = ({ match }) => { 
    const [review, setReview] = useState(null);
    const { id } = useParams(); 

    useEffect(() => {
        fetchReview();
    }, [id]);

    const fetchReview = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/reviews/${id}`);
            setReview(response.data);
        } catch (error) {
            console.error('Error fetching review:', error);
        }
    };

    //handle delete
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:4000/reviews/${id}`);
            fetchReview();    
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };



    if (!review) {
        return null; 
    }


return (
    <div>
        <div className="review-details-container">
            <div className="review-image">
                <img src={review.image} alt={review.title} />
            </div>
            <div className="review-content">
                <h2>My Review of "{review.title}"</h2>
                <p>Date: {new Date(review.date).toLocaleDateString()}</p>
            </div>
        </div>
        <div className="written-review">
            <p>{review.review}</p>
        </div>
        <div className="review-delete-button">
                <button onClick={handleDelete}>Delete This Review</button>
        </div>
    </div>
);


}



export default ReviewDetails;
