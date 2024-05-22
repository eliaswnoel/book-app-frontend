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

    //get first sentence
    const getFirstSentence = (reviewText) => {
        const firstSentence = reviewText.split('. ')[0]; // Split by periods and get the first part
        return firstSentence.length > 100 ? firstSentence.substring(0, 100) + '...' : firstSentence; 
    };

    return (
        <div>
        <h1>My Reviews</h1>
          <button  onClick={openModal} style={{ borderRadius: '50%', backgroundColor: 'white', color: 'white', width: '30px', height: '30px', fontSize: '15px', border: 'none', cursor: 'pointer', justifyContent: 'center', alignItems: 'center' }}>➕</button>

          <div className="reviewslogGrid">
                {reviews.map((review, index) => (     
                <div key={index} className="reviewentry">
                    <Link to={`/reviews/${review._id}`}>
                    <img src={review.image} alt={review.title} className="reviewImage" />
                    </Link>
                <div className="titledate-container">
                    <div className="date">
                        <p> <span className="date"> {review.title} {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}</span></p>
                        <p className="review-first-sentence">{getFirstSentence(review.review)}</p>
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