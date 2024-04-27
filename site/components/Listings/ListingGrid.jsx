import ListingCard from './ListingCard.jsx'
import GridCards from '../GridCards.jsx';

import { PropTypes } from 'prop-types'


function ListingsGrid({listings, cols, className, isFeatured}) {
    const elements = listings.map(
        (listElem) => {
            return <ListingCard
                        key={listElem.id}
                        title={listElem.title}
                        thumbnail={listElem.thumbnail}
                        price={listElem.price} 
                        isFeatured={isFeatured}
                    />
        }
    );
    return (
        <GridCards list_Cards={elements} cols={cols} className={className} />
    );
}

ListingsGrid.propTypes = {
    listings: PropTypes.array.isRequired,
    cols: PropTypes.number.isRequired,
    className: PropTypes.string,
    isFeatured: PropTypes.bool,
};
ListingCard.defaultProps = {
    className: '',
    isFeatured: false,
}


export default ListingsGrid;