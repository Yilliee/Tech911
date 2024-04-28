import { useState } from 'react';
import Navbar from './Navbar'
import PropTypes from 'prop-types';
import FeaturedListingGrid from '../Listings/FeaturedListingGrid';
import ListingsGrid from '../Listings/ListingGrid';
import ListingElements from '../Listings/Data/ListsData';
import FiltersPanel from './FiltersPanel';

const SearchPage = () => {
    const [listings, setListings] = useState(ListingElements);
    
    const nonfeaturedListings = listings.filter(listing => ! listing.isFeatured);
    const featuredListings = listings.filter(listing => listing.isFeatured);

    const deviceTypes = [...new Set(ListingElements.map(listing => listing.DeviceType))];
    const serviceTypes = [...new Set(ListingElements.map(listing => listing.serviceType))];
    const MaxPrice = Math.ceil(Math.max(...ListingElements.map(listing => listing.price)));

    function searchTextChanged(searchText) {
        const filteredListings = ListingElements.filter((listing) => {
            return listing.title.toLowerCase().includes(searchText.toLowerCase());
        });

        setListings(filteredListings);
    }

    function applyFilters(price, serviceFilters, deviceFilters) {
        const filteredListings = ListingElements.filter((listing) => {
            return (listing.price <= price) && serviceFilters[listing.serviceType] && deviceFilters[listing.DeviceType];
        });

        setListings(filteredListings);
    }
    return (
        <div>
            <Navbar onTextChange={searchTextChanged}/>
            <div className="flex flex-row w-full">
                <FiltersPanel
                    deviceTypes={deviceTypes}
                    serviceTypes={serviceTypes}
                    MaxPrice={MaxPrice}
                    onApply={applyFilters} />
                <div className="col-md-9 w-full">
                    <div className='border-b-2 border-black'>
                        <FeaturedListingGrid featuredListings={featuredListings} cols={5} />
                    </div>
                    <NonFeaturedListingGrid listings={nonfeaturedListings} cols={5} />
                </div>
            </div>
        </div>
    );
}

function NonFeaturedListingGrid({listings, cols}) {
    return (
        <ListingsGrid listings={listings} cols={cols}/>
    );
}

NonFeaturedListingGrid.propTypes = {
    listings: PropTypes.arrayOf(PropTypes.object).isRequired,
    cols: PropTypes.number.isRequired,
};

export default SearchPage;

// TODO : Add pages with max rows per page = 8 or 10 something