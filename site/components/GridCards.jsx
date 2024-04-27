import PropTypes from 'prop-types'

// grid-cols-5 grid-cols-4 grid-cols-3 grid-cols-2

function GridCards({list_Cards, cols}) {
    return (
        <div className={
            `w-screen grid grid-cols-${cols} place-items-center`
        }>
            {list_Cards}
        </div>
    );
}


GridCards.propTypes = {
    list_Cards: PropTypes.array.isRequired,
    cols: PropTypes.number.isRequired,
}

export default GridCards;