import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginCard from './LoginCard';
import LoginBgImage from './LoginBgImage';
import { StoreUserDetails } from '../../src/utils';

function Login() {
    const [accountType, setAccountType] = useState('Customer');
    const [email, setEmail] = useState(null);
    
    const navigate = useNavigate();
    // const { setUserDetails, profilePicBase64 } = useContext(UserContext);

    function verifyEmail() {
        const emailElem = document.getElementById('email');
        const email = emailElem.value;

        fetch('http://localhost:3000/verifyEmail', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, accountType })
        })
        .then(response => response.json())
        .then(data => {
            const { emailExists } = data;

            if ( emailExists ) {
                setEmail(email);
                
                emailElem.readOnly = true;
                emailElem.classList.add('bg-gray-400');

                document.getElementById('customer_account_type-btn').disabled = true;
                document.getElementById('service_center_account_type-btn').disabled = true;
            }
            else
                alert('Please enter a valid email');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    function verifyPass() {
        const pass = document.getElementById('password').value;

        fetch('http://localhost:3000/verifyCredentials', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, pass })
        })
        .then(response => response.json().then(
                json_returned => {
                    return {
                        'status': response.status,
                        ...json_returned,
                    };
                }
            )
        )
        .then(async json_returned => {
            if ( json_returned.status != 200 ) {
                alert(`Authentication Failed. ${json_returned.message}`);
                return;
            }
            
            const { username, display_name, profile_pic } = json_returned;
            console.log(json_returned)

            StoreUserDetails(username, display_name, accountType, profile_pic);

            navigate(-1);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <div className='flex flex-row w-full'>
            <LoginBgImage accountType={accountType} />
            <div className="bg-gray-200 flex flex-col h-screen justify-evenly items-center w-1/2 text-lg">
                <LoginCard
                    accountStateHook={[accountType, setAccountType]}
                    email={email}
                    verifyEmail={verifyEmail}
                    verifyPass={verifyPass}
                />
            </div>
        </div>
    )
}

export default Login;
