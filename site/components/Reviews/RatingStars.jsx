import { PropTypes } from 'prop-types';

import filledStar from './assets/filledStar.png'
import emptyStar from './assets/emptyStar.png'

function RatingStars({rating, clickHandler}) {
    const stars = Array.from({ length: 5 }).map((_, index) => (
            <img key={index} src={(index < rating) ? filledStar : emptyStar} onClick={() => clickHandler && clickHandler(index + 1)} className="w-10 h-10" />
        )
    );
    return (
        <div className="flex flex-row items-center justify-center">
            {stars}
        </div>
    );
}
RatingStars.propTypes = {
    rating: PropTypes.number.isRequired,
    clickHandler: PropTypes.func,
};

export default RatingStars;