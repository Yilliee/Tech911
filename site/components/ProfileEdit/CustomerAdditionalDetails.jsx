import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import tickIcon from './assets/tick_icon.png';
import crossIcon from './assets/cross_icon.png';
import GridCards from '../GridCards';

function CustomerAdditionalDetails() {
    const [servicePackageList, setServicePackageList] = useState(null);
    const [oldServicePackage, setOldServicePackage] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);

    useEffect(() => {
        if ( servicePackageList !== null )
            return;

        fetch('http://localhost:3000/getServicePackagesList', {
            method: 'GET'
        })
        .then(response => response.json().then(
            data => ({
                ...data,
                'status': response.status
            })
        ))
        .then(data => {
            setServicePackageList(data.status === 200 ? data.packages : []);
        })
    }, [servicePackageList]);

    useEffect(() => {
        if ( selectedPackage !== null )
            return;

        fetch('http://localhost:3000/getSelectedServicePackage', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json().then(
            data => ({
                ...data,
                'status': response.status
            })
        ))
        .then(data => {
            if ( data.status === 200 ) {
                setSelectedPackage(data.service_package_id);
                setOldServicePackage(data.service_package_id);
            }
            else {
                setSelectedPackage(null);
                setOldServicePackage(null);
            }
        })
    }, [selectedPackage]);

    if ( servicePackageList === null || selectedPackage === null )
        return (
            <div className="h-full w-full flex items-center justify-center">
                <h1 className="text-3xl font-bold">Loading...</h1>
            </div>
        );

    console.log(servicePackageList, selectedPackage);

    function updateServicePackage(e)  {
        e.preventDefault();

        console.log(selectedPackage, oldServicePackage);

        fetch('http://localhost:3000/updateServicePackage', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                'new_package': selectedPackage
            })
        })
        .then(response => response.json())
        .then(data => {
            setOldServicePackage(selectedPackage);
            alert(data.message)
        })
        .catch(error => console.error(error));
    }

    const servicePackageCards = servicePackageList.map((servicePackage, index) => (
                                    <ServicePackageCard
                                        key={index}
                                        package_name={servicePackage.package_name}
                                        description={servicePackage.description}
                                        chat_support={servicePackage.chat_support === 1}
                                        call_support={servicePackage.call_support === 1}
                                        selected={selectedPackage === servicePackage.id}
                                        clickHandler={() => setSelectedPackage(servicePackage.id)}
                                    />
                                ));

    return (
        <div className="flex flex-col h-full w-full mr-6">
           <form onSubmit={updateServicePackage} className="flex flex-col justify-between bg-gray-200 rounded-2xl h-full w-full px-10 my-6">
                <h1 className="font-bold text-3xl mt-8">Service Packages</h1>
                <GridCards list_Cards={servicePackageCards} cols={3} className="w-full" />
                <button
                    type="submit"
                    className={`my-8 w-72 h-12 ${(oldServicePackage != selectedPackage) ? ' bg-blue-500 hover:bg-blue-700' : 'bg-gray-400'} text-white font-bold py-2 px-4 rounded-2xl`}
                    disabled={oldServicePackage === selectedPackage}
                >
                        Save Changes
                </button>
            </form>
        </div>
    )
}


function ServicePackageCard(
    {package_name, description, chat_support, call_support, selected, clickHandler}
) {
    return (
        <div
            className={`flex flex-col w-96 ${selected ? 'bg-green-400' : 'bg-gray-100 hover:shadow-2xl' } border-2 border-black rounded-2xl p-4 my-4`}
            onClick={clickHandler}
        >
            <h1 className="text-2xl font-bold">{package_name}</h1>
            <h2 className="text-lg font-bold text-gray-600">{description}</h2>
            <div className="flex flex-col justify-between w-full mt-2 pr-4">
                <div className="flex flex-row justify-between items-center mt-2">
                    <p className="text-lg font-bold">- Chat support:</p>
                    {chat_support ?
                        <img src={tickIcon} className="w-8 h-8 ml-2" />
                      : <img src={crossIcon} className="w-8 h-8 ml-2" />
                    }
                </div>
                <div className="flex flex-row justify-between items-center mt-2">
                    <p className="text-lg font-bold">- Call support:</p>
                    {call_support ?
                        <img src={tickIcon} className="w-8 h-8 ml-2" />
                      : <img src={crossIcon} className="w-8 h-8 ml-2" />
                    }
                </div>
            </div>
        </div>
    )

}
ServicePackageCard.propTypes = {
    package_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    chat_support: PropTypes.bool.isRequired,
    call_support: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    clickHandler: PropTypes.func,
}

export default CustomerAdditionalDetails;