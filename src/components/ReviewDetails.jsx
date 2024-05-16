import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

    if (!review) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{review.title}</h2>
            <img src={review.image} alt={review.title} />
            <p>{review.review}</p>
            <p>Date: {new Date(review.date).toLocaleDateString()}</p>
        </div>
    );
}

export default ReviewDetails;