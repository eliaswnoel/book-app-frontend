import axios from 'axios';
import React, { useState, useEffect } from "react";
import ReviewModal from './ReviewModal';

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
            <button onClick={openModal}>Add New Review</button>
            {/* List of reviews */}
            <div className="logGrid">
                {reviews.map((review, index) => (
                    <div key={index} className="logItem">
                        <h2>{review.title}</h2>
                        <img src={review.image} alt={review.title} className="logImg" style={{ cursor: "pointer" }} />
                        <div>
                            <p>{review.review}</p>
                            <p>Date: {new Date(review.date).toLocaleDateString()}</p>
                            <button onClick={() => handleDelete(review._id)}>delete review from log</button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Render the modal if isModalOpen is true */}
            {isModalOpen && <ReviewModal onClose={closeModal} fetchReviews={fetchReviews} />}
        </div>
    );
}

export default Reviews;