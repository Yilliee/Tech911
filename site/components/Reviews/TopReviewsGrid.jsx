import { PropTypes } from 'prop-types'

import ReviewsGrid from './ReviewsGrid'
import reviews from './Data/TopReviewsData.js'

function TopReviewsGrid({cols}) {
    return (
        <ReviewsGrid reviews={reviews} cols={cols} />
    );
}

TopReviewsGrid.propTypes = {
    cols: PropTypes.number.isRequired,
};

export default TopReviewsGrid;