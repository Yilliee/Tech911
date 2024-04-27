import { PropTypes } from 'prop-types'

import filledStar from './assets/filledStar.png'
import emptyStar from './assets/emptyStar.png'

function ReviewCard({thumbnail, rating, description}) {
    return (
        <div className="m-10 w-64 h-92 border-grey-200 border-2 rounded-2xl bg-white">
            <img src={thumbnail} className="block border-b-2 border-black rounded-t-2xl w-64 h-48" />
            <div className="p-2 flex flex-col items-center text-left justify-evenly h-44">
                <RatingStars rating={rating} />
                <p className="font-bold text-base block p-1">{description}</p>
            </div>
        </div>
    )
}
ReviewCard.propTypes = {
    thumbnail: PropTypes.string.isRequired, // Actually a picture
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
};

function RatingStars({rating}) {
    const stars = Array.from({ length: 5 }).map((_, index) => (
            (index < rating) ? 
                <img key={index} src={filledStar} className="w-10 h-10" />
                : <img key={index} src={emptyStar} className="w-10 h-10" />
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
};

export default ReviewCard;