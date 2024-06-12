import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormElementsList from './FormElementsList';
import UserRequiredDetails from './Data/UserRequiredDetails.js';

function Register() {
    return (
        <div className="bg-gray-400 flex flex-col items-center text-left justify-around h-screen">
            <RegisterCard />
        </div>
    )
}

function RegisterCard() {
    const [accountType, setAccountType] = useState('user');
    const navigate = useNavigate();

    function formSubmitHandler(e) {
        e.preventDefault();

        // Store user details according to accountType
        // Redirect to main page
    }
  
    return (
        <div className="p-8 flex flex-col items-center rounded-3xl justify-start bg-white">
                <h1 className="font-bold text-4xl min-h-12">Register</h1>
                <div className="py-4 flex flex-col w-1/2 items-center min-w-96 min-h-96 bg-white rounded-3xl">
                   <FormElementsList
                        requiredList={UserRequiredDetails}
                        setAccountType={setAccountType}
                        formSubmitHandler={formSubmitHandler}
                    />
                </div>
            </div>
    );
}


export default Register;