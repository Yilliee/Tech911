import { PropTypes } from 'prop-types'

import RatingStars from './RatingStars'

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

export default ReviewCard;