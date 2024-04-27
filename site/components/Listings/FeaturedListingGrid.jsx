import PropTypes from 'prop-types';

import ListingGrid from "./ListingGrid";
import FeaturedListingElements from './Data/FeaturedListsData.js'

function FeaturedListingsGrid({cols}) {
    return (
        <ListingGrid listings={FeaturedListingElements} cols={cols} />
    );
}

FeaturedListingsGrid.propTypes = {
    cols: PropTypes.number.isRequired,
};

export default FeaturedListingsGrid;