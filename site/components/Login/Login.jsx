/* eslint-disable no-unused-vars */
import { useState } from 'react';
import PropTypes from 'prop-types';
import LoginCard from './LoginCard';
import LoginBgImage from './LoginBgImage';

function Login() {
    const [accountType, setAccountType] = useState('customer');
    
    return (
        <div className='flex flex-row w-full'>
            <LoginBgImage accountType={accountType} />
            <div className="bg-gray-200 flex flex-col h-screen justify-evenly items-center w-1/2 text-lg">
                <LoginCard accountType={accountType} setAccountType={setAccountType} />
            </div>
        </div>
    )
}

export default Login;
