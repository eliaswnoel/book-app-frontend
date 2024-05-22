import React, { useState } from "react";
import axios from 'axios';

const ReviewModal = ({ onClose, fetchReviews}) => {
    const [newReview, setNewReview] = useState({
        title: "",
        image: "",
        review: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReview(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:4000/reviews`, newReview);
            setNewReview({
                title: "",
                image: "",
                review: ""
            });
            fetchReviews();
            onClose(); // Close the modal after adding a review
        } catch (error) {
            console.error('Error adding review:', error);
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
                        value={newReview.title}
                        onChange={handleChange}
                        placeholder="Review Title"
                    />
                    <input 
                        type="text"
                        name='image'
                        value={newReview.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                    />
                    <textarea 
                        name="review"
                        value={newReview.review}
                        onChange={handleChange}
                        placeholder="Review Content"
                    />
                    <button type="submit">Add Review</button>
                </form>
                </div>
            </div>
        </div>
    );
}

export default ReviewModal;