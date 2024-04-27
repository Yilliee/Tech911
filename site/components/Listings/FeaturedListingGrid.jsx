import PropTypes from 'prop-types';

import ListingGrid from "./ListingGrid";

function FeaturedListingsGrid({featuredListings, cols, className}) {
    return (
        <ListingGrid
            listings={featuredListings}
            cols={cols}
            className={className}
            isFeatured={true}
        />
    );
}

FeaturedListingsGrid.propTypes = {
    featuredListings: PropTypes.array.isRequired,
    cols: PropTypes.number.isRequired,
    className: PropTypes.string,
};
FeaturedListingsGrid.defaultProps = {
    className: '',
};

export default FeaturedListingsGrid;