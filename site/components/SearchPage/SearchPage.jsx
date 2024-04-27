import { useState } from 'react';
import Navbar from './Navbar'
import PropTypes from 'prop-types';
import FeaturedListingGrid from '../Listings/FeaturedListingGrid';
import ListingsGrid from '../Listings/ListingGrid';
import ListingElements from '../Listings/Data/ListsData';

const PriceSlider = ({currPrice, setCurrPrice, maxPrice}) => {
    function sliderChange(e) {
        setCurrPrice(parseFloat(e.target.value));
    }

    return (
        <label className='inline-block w-full'>
          $ 0 <input className="w-32" type="range" min="0" max={maxPrice} defaultValue={currPrice} onChange={sliderChange}/> $ {currPrice}
        </label>
    );
}
PriceSlider.propTypes = {
    currPrice: PropTypes.number.isRequired,
    setCurrPrice: PropTypes.func.isRequired,
    maxPrice: PropTypes.number.isRequired,
};

function FiltersPanel({deviceTypes, serviceTypes, onApply}) {
    const MaxPrice = 1000;
    
    const [currPrice, setCurrPrice] = useState(MaxPrice);
    const [serviceFilters, setServiceFilters] = useState(new Map(serviceTypes.map(type => [type, true])));
    const [deviceFilters, setDeviceFilters] = useState(new Map(deviceTypes.map(type => [type, true])));

    function servieTypeSelected(idx) {
        const newServiceFilters = new Map(serviceFilters);
        newServiceFilters.set(idx, !newServiceFilters.get(idx));
        setServiceFilters(newServiceFilters);
    }
    function deviceTypeSelected(idx) {
        const newDeviceFilters = new Map(deviceFilters);
        newDeviceFilters.set(idx, !newDeviceFilters.get(idx));
        setDeviceFilters(newDeviceFilters);
    }

    return (
        <div className="inline-block w-72 ml-4">
            <h1 className='font-bold text-2xl p-2'>Filters:</h1>

            <div className='border-x-2 border-gray-200 px-2'>
                
                <div className="border-t-2 py-2 pr-4">
                    <h3 className="text-xl font-bold">Price:</h3>
                    <PriceSlider
                        currPrice={currPrice}
                        setCurrPrice={setCurrPrice}
                        maxPrice={MaxPrice}
                    />
                </div>

                <div className="border-t-2 py-2 pr-4">
                    <h3 className="text-xl font-bold">Service Types:</h3>
                    <div className="flex flex-col pl-4">
                        {Array.from(serviceFilters.entries()).map(
                            ([serviceType, isSelected]) => (  
                                <label key={serviceType}>
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => servieTypeSelected(serviceType)} /> {serviceType}
                                </label>
                            )
                        )}
                    </div>
                </div>

                <div className="border-y-2 py-2 pr-4">
                    <h3 className="text-xl font-bold">Device Types:</h3>
                    <div className="flex flex-col pl-4">
                        {Array.from(deviceFilters.entries()).map(
                            ([deviceType, isSelected]) => (  
                                <label key={deviceType}>
                                    <input 
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => deviceTypeSelected(deviceType)}/> {deviceType}
                                </label>
                            )
                        )}
                    </div>
                </div>

            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl m-4"
                onClick={() => onApply(currPrice, Object.fromEntries(serviceFilters), Object.fromEntries(deviceFilters))}
            >
                Apply Filters
            </button>
        </div>
    );
}
FiltersPanel.propTypes = {
    deviceTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    serviceTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    onApply: PropTypes.func.isRequired,
};

const SearchPage = () => {
    const [listings, setListings] = useState(ListingElements);
    
    const nonfeaturedListings = listings.filter(listing => ! listing.isFeatured);
    const featuredListings = listings.filter(listing => listing.isFeatured);

    const deviceTypes = [...new Set(ListingElements.map(listing => listing.DeviceType))];
    const serviceTypes = [...new Set(ListingElements.map(listing => listing.serviceType))];
    
    function searchTextChanged(searchText) {
        const filteredListings = ListingElements.filter((listing) => {
            return listing.title.toLowerCase().includes(searchText.toLowerCase());
        });

        setListings(filteredListings);
    }

    function applyFilters(price, serviceFilters, deviceFilters) {
        const filteredListings = ListingElements.filter((listing) => {
            if ( ! (Math.ceil(listing.price) <= price) && serviceFilters[listing.serviceType] && deviceFilters[listing.DeviceType] )
                console.log(listing.price, price, serviceFilters[listing.serviceType], deviceFilters[listing.DeviceType]);
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