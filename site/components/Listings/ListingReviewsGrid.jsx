import { useState } from 'react'
import PropTypes from 'prop-types';
import ReviewsGrid from '../Reviews/ReviewsGrid'

function ListingReviews({reviews}) {
    const ReviewsGridCols = 4;
    const ReviewGridRows = 1;
    const ReviewsPerPage = ReviewsGridCols * ReviewGridRows;

    const [currentPage, setCurrentPage] = useState(0);

    const PageCount = Math.ceil(reviews.length / ReviewsPerPage);

    function handlePageChange(pageNo) {
        setCurrentPage(pageNo);
    }

    const pageChangeButtons = Array.from({length: PageCount}, (_, idx) => {
        return (
            <button 
                key={idx} onClick={() => handlePageChange(idx)}
                className={`m-2 p-2 w-12 font-semibold rounded-2xl ${idx === currentPage ? 'bg-black text-white' : 'bg-white text-black' }`}
            >
                {idx + 1}
            </button>
        );
    });

    return (
        <div className='flex flex-col'>
            <h1 className='text-4xl font-bold mt-12 ml-12'>Reviews</h1>
            <ReviewsGrid reviews={reviews.slice(currentPage * ReviewsPerPage, (currentPage + 1) * ReviewsPerPage)} cols={ReviewsGridCols} />
            {reviews.length > ReviewsPerPage && 
                <div className='flex flex-row justify-center'>
                    {pageChangeButtons}
                </div>
            }
        </div>
    );
}
ListingReviews.propTypes = {
    reviews: PropTypes.array.isRequired,
};

export default ListingReviews;