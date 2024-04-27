import ListingCard from './ListingCard.jsx'
import GridCards from '../GridCards.jsx';

import { PropTypes } from 'prop-types'


function ListingsGrid({listings, cols}) {
    const elements = listings.map(
        (listElem) => {
            return <ListingCard
                        key={listElem.id}
                        title={listElem.title}
                        thumbnail={listElem.thumbnail}
                        price={listElem.price} />
        }
    );
    return (
        <GridCards list_Cards={elements} cols={cols} />
    );
}

ListingsGrid.propTypes = {
    listings: PropTypes.array.isRequired,
    cols: PropTypes.number.isRequired,
};



export default ListingsGrid;