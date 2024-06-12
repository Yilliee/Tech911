import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import RatingStars from './RatingStars';

const CreateReview = ({listing_id}) => {
    const [userDetails, setUserDetails] = useState([null]);
    const [rating, setRating] = useState(5);
    const [reviewPicBase64, setReviewPicBase64] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/getOrderToBeReviewed', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                listing_id: listing_id
            })
        })
        .then(response => response.json().then(
            data => ({
                status: response.status,
                response_data: data
            })
        ))
        .then(data => {
            setUserDetails(data.status === 200 ? data.response_data : null);
            console.log(data.response_data)
        })
        .catch(error => {
            console.error(error);
        });
    }, [listing_id]);

    console.log(userDetails)
    if ( userDetails === null || userDetails === undefined )
        return null;

    if ( userDetails.length === 0  && userDetails[0] === null ) {
        return (
            <div className="h-screen w-screen flex items-center justify-center text-center">
                <h1 className="text-3xl font-bold">Loading...</h1>
            </div>
        );
    }

    function uploadPicture() {
        // Create a file input element
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if ( ! file ) return;

            document.getElementById('review_pic').src = URL.createObjectURL(file);

            const base64Data = new FileReader();
            base64Data.onload = function(e) {
                setReviewPicBase64(e.target.result.substring(e.target.result.indexOf('base64,') + 7));
            };
            base64Data.readAsDataURL(file);
        });

        // Trigger the file picker dialog
        input.click();
    }

    function addReview(e) {
        e.preventDefault();

        const review = document.getElementById('review').value;

        fetch('http://localhost:3000/addReview', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rating: rating,
                order_id: userDetails.order_id,
                service_listing_id: userDetails.service_listing_id,
                reservation_time: userDetails.reservation_time.replace('Z', ''),
                description: review,
                thumbnail: reviewPicBase64
            })
        })
        .then(response => response.json().then(
            data => ({
                status: response.status,
                response_data: data
            })
        ))
        .then(data => {
            if ( data.status === 200 ) {
                alert("Review added successfully");
                window.location.reload();
            }
            else {
                alert("Error adding review");
            }
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="flex flex-col overflow-hidden justify-start p-4 mt-4 bg-gray-50 text-black border-black border-2 rounded-3xl w-full">
            <h2 className="font-bold text-2xl">Write a Review</h2>
            <form onSubmit={addReview} className="flex flex-col items-start space-y-4 mt-4">
                <RatingStars rating={rating} clickHandler={setRating}/>
                <h2 className="font-semibold text-xl" htmlFor="rating">Review Picture</h2>
                <div className="flex flex-row items-center">
                    <img src="https://via.placeholder.com/150" id='review_pic' className="mx-12 w-52 h-52 rounded-3xl" />
                    <button type="button" className="bg-blue-400 text-white font-bold px-4 py-2 w-64 rounded-3xl hover:shadow-xl" onClick={uploadPicture}>Upload Picture</button>
                </div>
                <h2 className="font-semibold text-xl" htmlFor="review">Review</h2>
                <textarea className="border-2 border-black rounded-2xl p-2 w-full" id="review" name="review" required></textarea>
                <button className="bg-black text-white font-semibold rounded-2xl p-2" type="submit">Submit Review</button>
            </form>
        </div>

    );
};
CreateReview.propTypes = {
    listing_id: PropTypes.number.isRequired,
};

// id => determined by db
// rating => 1-5 
// order_id => sent as a prop
// service_listing_id => sent as a prop
// reservation_time => sent as a prop

export default CreateReview;