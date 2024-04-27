import  { useState }  from 'react'
import PropTypes from 'prop-types';

import ArrowKey_LightTheme from './assets/arrow.png'
import ServiceTypes from './Data/ServiceTypeList';

function ServiceTypeList({elements_to_display}) {
    const [startIdx, setStartIdx] = useState(0);

    const total_elements = ServiceTypes.length;
    const elements = ServiceTypes.map(
        (name, idx) => <ServiceTypeCard key={idx} index={idx + 1} type_name={name} />
    );

    function scrollList(count) {
        let new_idx = startIdx + count;

        if ( new_idx < 0 ) new_idx = total_elements - 1;

        setStartIdx(new_idx % total_elements);
    }

    
    return (
            <div className="flex flex-row items-center justify-evenly text-center w-full h-48">
                <img src={ArrowKey_LightTheme} className="mt-4 w-10 rotate-180 rounded-full" onClick={() => scrollList(-1)} />
                {elements.slice(startIdx, Math.min(startIdx + elements_to_display, total_elements))}
                {elements.slice(0, Math.max(startIdx + elements_to_display - ServiceTypes.length, 0))}
                <img src={ArrowKey_LightTheme} className="mt-4 w-10 rounded-full" onClick={() => scrollList(1)} />
            </div>
    );
}

ServiceTypeList.propTypes = {
    elements_to_display: PropTypes.number.isRequired,
};

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