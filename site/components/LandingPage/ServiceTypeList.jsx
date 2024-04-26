import PropTypes from 'prop-types';
import LandingPageHeading from './LandingPageHeading'
import ServiceTypes from './Data/ServiceTypeList';


function ServiceTypeList() {

    const components = ServiceTypes.map(
        (name, idx) => <ServiceTypeCard key={idx} index={idx + 1} type_name={name} />
    );
    
    return (
        <div className="flex flex-col items-center justify-evenly text-center w-screen bg-gray-300 h-96">
            <LandingPageHeading text="Services we offer" />
            <div className="flex flex-row items-center justify-evenly text-center w-screen h-48">
                {components}
            </div>
        </div>
    );
}
function ServiceTypeCard({index, type_name}) {
    return (
        <div className="mx-4 flex flex-col items-center">
            <div className='z-10 w-10 h-10 bg-blue-600 text-white font-bold rounded-full flex items-center text-center justify-center'>
                {index}
            </div>
            <div className="-mt-5 w-48 min-h-16 p-4 bg-black text-white font-bold border-black border-2 rounded-3xl flex items-center text-center justify-center">
                {type_name}
            </div>
        </div>
    );
}

ServiceTypeCard.propTypes = {
    index: PropTypes.number.isRequired,
    type_name: PropTypes.string.isRequired,
};

export default ServiceTypeList;