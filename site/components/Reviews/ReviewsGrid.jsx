import { PropTypes } from 'prop-types'

import ReviewCard from './ReviewCard.jsx';
import GridCards from '../GridCards.jsx';

function ReviewsGrid({reviews, cols}) {
    const elements = reviews.map(
        (review) => {
            if ( review.description.length > 90 ) {
                review.description = review.description.substring(0, 90) + '...';
            }

            return <ReviewCard
                        key={review.id}
                        name={review.name}
                        thumbnail={review.thumbnail}
                        description={review.description}
                        rating={review.rating} />
        }
    );
    return (
        <GridCards list_Cards={elements} cols={cols} />
    );
}

ReviewsGrid.propTypes = {
    reviews: PropTypes.array.isRequired,
    cols: PropTypes.number.isRequired,
};

export default ReviewsGrid;