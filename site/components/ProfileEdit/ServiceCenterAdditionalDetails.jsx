/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import verifiedIcon from './assets/verified_icon_green.png';
import processingIcon from './assets/pending_icon.png';
import rejectedIcon from './assets/failed_icon.png';
import applyIcon from './assets/apply_icon.png'

function ServiceCenterAdditionalDetails() {
    const [verificationStatus, setVerificationStatus] = useState(undefined);

    function applyForVerification() {
        fetch('http://localhost:3000/applyForVerification', {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => {
            if ( response.status === 200 ) {
                setVerificationStatus('Processing');
                return;
            }
            alert('Failed to apply for verification');
        })
        .catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        if ( verificationStatus !== undefined ) return;

        fetch('http://localhost:3000/getVerificationStatus', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setVerificationStatus(data.status.verification_status);
        })
        .catch(error => {
            console.error(error);
        });
    }, [verificationStatus]);

    console.log(verificationStatus)

    if ( verificationStatus === undefined )
        return (
            <div className="h-full w-full flex items-center justify-center text-center">
                <h1 className="text-3xl font-bold">Loading...</h1>
            </div>
        );

    const verificationVisual =
    (verificationStatus === 'Processed' ) ?
        (<div className="flex flex-col items-center mt-4 ml-4">
            <img src={verifiedIcon} alt="Tick Icon" className="w-72 h-72 rounded-full mr-2" />
            <p className="text-green-500 text-4xl font-bold mt-8">Verified</p>
        </div>)
    : (verificationStatus === 'Processing') ?
        (<div className="flex flex-col items-center mt-4 ml-4">
            <img src={processingIcon} alt="Tick Icon" className="w-72 h-72 rounded-full mr-2" />
            <p className="text-black text-4xl font-bold mt-8">Processing...</p>
        </div>)
    : (verificationStatus === 'Failed') ?
        (<div className="flex flex-col items-center mt-4 ml-4">
            <img src={rejectedIcon} alt="Cross Icon" className="w-72 h-72 rounded-full mr-2" />
            <p className="text-red-500 text-4xl font-bold mt-8">Rejected</p>
        </div>)
    :
        (<div className="flex flex-col items-center mt-4 ml-4">
            <img src={applyIcon} alt="Tick Icon" className="w-72 h-72 rounded-full mr-2" />
            <p className="text-gray-500 text-4xl font-bold mt-8">Not Applied</p>
        </div>);

    return (
        <div className="flex flex-col h-full w-full mr-6">
           <div className="flex flex-col justify-center items-center bg-gray-200 rounded-2xl h-full w-full px-10 my-6">
                <h1 className="font-bold text-5xl my-16">Verification Status</h1>
                {verificationVisual}
                {(verificationStatus === null || verificationStatus === 'Failed') &&
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl mt-16 w-2/6"
                        onClick={applyForVerification}>
                            Apply for Verification
                    </button>
                }
            </div>
        </div>
    )
}

export default ServiceCenterAdditionalDetails;