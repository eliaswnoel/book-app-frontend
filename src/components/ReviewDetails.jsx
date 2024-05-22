import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const ReviewDetails = ({ match }) => { 
    const [review, setReview] = useState(null);
    const { id } = useParams(); 
    const history = useHistory();

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
            history.push('/reviews'); // Redirect to reviews list after delete
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    if (!review) {
        return <div>Loading...</div>;
    }

//     return (
//         <div>
//             <h2>{review.title}</h2>
//             <img src={review.image} alt={review.title} />
//             <p>{review.review}</p>
//             <p>Date: {new Date(review.date).toLocaleDateString()}</p>
//         </div>
//     );
// }

return (
    <div>
        <div className="review-details-container">
            <div className="review-image">
                <img src={review.image} alt={review.title} />
            </div>
            <div className="review-content">
                <h2>My Review of "{review.title}"</h2>
                <p>Date: {new Date(review.date).toLocaleDateString()}</p>
                <button onClick={handleDelete}>Delete</button> {/* Delete button */}
            </div>
        </div>
        <div className="written-review">
            <p>{review.review}</p>
        </div>
    </div>
);
}

export default ReviewDetails;
