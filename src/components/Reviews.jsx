import axios from 'axios';
import React, { useState, useEffect } from "react";
import ReviewModal from './ReviewModal';
import { Link } from 'react-router-dom';
import { FaBook } from 'react-icons/fa'; 

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
          <div className="reviewslogGrid">
  {reviews.map((review, index) => (     
    <div key={index} className="reviewentry">
        <img src={review.image} alt={review.title} className="reviewImage" />
        <h2>{review.title}</h2>
      {/* Container for the review title, date, and notebook icon */}
      <div className="titleAndDateContainer">
        {/* Display title */}
        {/* <h2>{review.title}</h2> */}
        {/* Display date */}
        <div className="date">
          <p> 
            <span className="date">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}</span>
          </p>
        </div>
                  {/* Notebook icon */}
                  <div className="notebookIcon">
                    <Link to={`/reviews/${review._id}`}>
                      <FaBook style={{ fontSize: "24px", color: "blue", cursor: "pointer" }} />
                    </Link>
                  </div>
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