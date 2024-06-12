//import PropTypes from 'prop-types';
import { getUsername, clearUserDetails, getAccountType } from '../../src/utils';
import { useState, useEffect } from 'react';

import Navbar from '../Navbar';
import SidePanel from './SidePanel';
import MainPanel from './MainPanel';
import CustomerAdditionalDetails from './CustomerAdditionalDetails';
import ServiceCenterAdditionalDetails from './ServiceCenterAdditionalDetails';

import GeneralIcon from './assets/general_icon.png';
import DetailsIcon from './assets/profile_icon.png';

const ProfileEdit = () => {
    const accountType = getAccountType();

    const SidePanelButtons = [
        {
            'title': "General",
            'icon': GeneralIcon,
        },
        ...(accountType !== 'Admin' ? [{
            'title': "Additional Details",
            'icon': DetailsIcon,
        }] : []),
    ]

    const [page, setPage] = useState(SidePanelButtons[0].title);

    const [authStatus, setAuthStatus] = useState(null);
    
    useEffect(() => {
        if ( getUsername() === null ) {
            if ( authStatus !== false ) setAuthStatus(false);
            return;
        }
    
        fetch('http://localhost:3000/authenticate', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            if ( response.status === 200 )
                setAuthStatus(true);
            else { 
                clearUserDetails();
                setAuthStatus(false);
            }
        })
        .catch(error => {
            console.error(error);
        });
    }, [authStatus]);


    if ( authStatus === null )
        return (
            <div className="h-screen w-screen flex items-center justify-center text-center">
                <h1 className="text-3xl font-bold">Loading...</h1>
            </div>
        );
    else if ( authStatus === false )
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-between text-center">
                <Navbar showAccountButtons={true} showSearchBar={true} />
                <div className="h-full w-full flex flex-col items-center justify-center text-center">
                    <h1 className="text-3xl font-bold">Error! Unauthorized Access. Code: 401</h1>
                </div>
            </div>
        );

    return (
        <div className='flex flex-col h-screen w-screen items-center justify-between'>
            <Navbar showAccountButtons={true} showSearchBar={true} />
            <div className="flex flex-row w-full h-full">
                <SidePanel setPageType={setPage} pageType={page} buttonNames={SidePanelButtons}  />
                {page === 'General' ?
                    <MainPanel />
                 : accountType === 'Customer' ? (
                     <CustomerAdditionalDetails />
                 )
                 : accountType === 'Service Center' ? (
                     <ServiceCenterAdditionalDetails />
                 )
                 : null
                }
            </div>
        </div>
    );
}

export default ProfileEdit;