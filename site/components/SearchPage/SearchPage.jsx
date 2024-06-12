import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from '../Navbar'
import PropTypes from 'prop-types';
import FeaturedListingGrid from '../Listings/FeaturedListingGrid';
import ListingsGrid from '../Listings/ListingGrid';
import FiltersPanel from './FiltersPanel';

const SearchPage = () => {
    const [listingList, setListingList] = useState(null);
    const [listings, setListings] = useState(null);

    const location = useLocation();

    const searchValue = location.state?.searchValue || '';

    useEffect(() => {
        if ( listingList !== null )
            return;
    
        fetch('http://localhost:3000/getListings', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(listingData => {
            const result = listingData.map(listing => (
                {
                    id: listing.id,
                    thumbnail: URL.createObjectURL(new Blob( [new Uint8Array(listing.thumbnail.data)], { type: 'image/jpeg' })),
                    title: listing.title,
                    price: listing.price,
                    serviceType: listing.serviceType,
                    deviceType: listing.deviceType,
                    isFeatured: listing.isFeatured,
                }
            ));

            setListingList(result)
            setListings(result.filter((listing) => {
                return listing.title.toLowerCase().includes(searchValue.toLowerCase());
            }));
        })
        .catch(error => {
                console.log(error);
        });
    }, [listingList, searchValue]);

    if (!listingList) {
        return <div>Loading...</div>;
    }

    const nonfeaturedListings = listings.filter(listing => ! listing.isFeatured);
    const featuredListings = listings.filter(listing => listing.isFeatured);

    const deviceTypes = [...new Set(listingList.map(listing => listing.deviceType))];
    const serviceTypes = [...new Set(listingList.map(listing => listing.serviceType))];
    const MaxPrice = Math.ceil(Math.max(...listingList.map(listing => listing.price)));
    const MinPrice = Math.floor(Math.min(...listingList.map(listing => listing.price)));
    function searchTextChanged(e) {
        const searchText = e.target.value;
        const filteredListings = listingList.filter((listing) => {
            return listing.title.toLowerCase().includes(searchText.toLowerCase());
        });

        setListings(filteredListings);
    }

    function applyFilters(price, serviceFilters, deviceFilters) {
        const filteredListings = listingList.filter((listing) => {
            return (listing.price <= price) && serviceFilters[listing.serviceType] && deviceFilters[listing.deviceType];
        });

        setListings(filteredListings);
    }

    return (
        <div>
            <Navbar showAccountButtons={false} showSearchBar={true} onTextChange={searchTextChanged} initialSearchText={searchValue} />
            <div className="flex flex-row w-full">
                <FiltersPanel
                    deviceTypes={deviceTypes}
                    serviceTypes={serviceTypes}
                    MinPrice={MinPrice}
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