import { useState } from 'react';
import PropTypes from 'prop-types';

import PriceFilter from './Filters/PriceFilter';
import ServiceFilter from './Filters/ServiceFilter';
import DeviceFliter from './Filters/DeviceFilter';

function FiltersPanel({deviceTypes, serviceTypes, MinPrice, MaxPrice, onApply}) {
    const [currPrice, setCurrPrice] = useState(MaxPrice);
    const [serviceFilters, setServiceFilters] = useState(new Map(serviceTypes.map(type => [type, true])));
    const [deviceFilters, setDeviceFilters] = useState(new Map(deviceTypes.map(type => [type, true])));

    function serviceTypeSelected(idx) {
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
        <div className="inline-block w-80 ml-4">
            <h1 className='font-bold text-2xl p-2'>Filters:</h1>

            <div className='border-x-2 border-gray-200 items-center pl-2'>
                <PriceFilter
                    currPrice={currPrice}
                    setCurrPrice={setCurrPrice}
                    minPrice={MinPrice}
                    maxPrice={MaxPrice} />
                <ServiceFilter 
                    serviceFilters={serviceFilters}
                    serviceTypeSelected={serviceTypeSelected} />
                <DeviceFliter
                    deviceFilters={deviceFilters}
                    deviceTypeSelected={deviceTypeSelected} />
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
    MinPrice: PropTypes.number,
    MaxPrice: PropTypes.number.isRequired,
    deviceTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    serviceTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    onApply: PropTypes.func.isRequired,
};

FiltersPanel.defaultValues = {
    MinPrice: 0
}

export default FiltersPanel;