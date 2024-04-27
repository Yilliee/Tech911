import PropTypes from 'prop-types';

function ServiceFilter({serviceFilters, serviceTypeSelected}) {
    return (
        <div className="border-t-2 py-2">
            <h3 className="text-xl font-bold">Service Types:</h3>
            <div className="flex flex-col pl-4">
                {Array.from(serviceFilters.entries()).map(
                    ([serviceType, isSelected]) => (  
                        <label key={serviceType}>
                            <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => serviceTypeSelected(serviceType)} /> {serviceType}
                        </label>
                    )
                )}
            </div>
        </div>
    )
}
ServiceFilter.propTypes = {
    serviceFilters: PropTypes.instanceOf(Map).isRequired,
    serviceTypeSelected: PropTypes.func.isRequired,
};

export default ServiceFilter;