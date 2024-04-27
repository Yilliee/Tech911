import PropTypes from 'prop-types';

function DeviceFliter({deviceFilters, deviceTypeSelected}) {
    return (
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
    )
}
DeviceFliter.propTypes = {
    deviceFilters: PropTypes.instanceOf(Map).isRequired,
    deviceTypeSelected: PropTypes.func.isRequired,
};

export default DeviceFliter;