import axios from 'axios';
import React, { useState, useEffect } from "react";
import ReviewModal from './ReviewModal';
import { Link } from 'react-router-dom';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchReviews();
    }, []);

    // Get Reviews
    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/reviews`);
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    //Handle Delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/reviews/${id}`);
            fetchReviews();    
        } catch (error) {
            console.error('Error deleting review:', error);
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
        <h1>My Reviews</h1>
          <button onClick={openModal}>Add New Review</button>
          <div className="reviewslogGrid">
                {reviews.map((review, index) => (     
                <div key={index} className="reviewentry">
                    <Link to={`/reviews/${review._id}`}>
                    <img src={review.image} alt={review.title} className="reviewImage" />
                    </Link>
                <div className="titledate-container">
                    <div className="date">
                    {/* {review.title} */}
                        <p> <span className="date"> {review.title} {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}</span></p>
                     </div>
                </div>
                </div>
            ))}
        </div>
    {isModalOpen && <ReviewModal onClose={closeModal} fetchReviews={fetchReviews}  />}
    </div>
);


}


export default Reviews;