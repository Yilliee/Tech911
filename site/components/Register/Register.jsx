import { useState } from 'react'; 
import UserFormElementsList from './UserFormElementsList';

function Register() {
    return (
        <div className="bg-gray-400 flex flex-col items-center text-left justify-around h-screen">
            <RegisterCard />
        </div>
    )
}

function RegisterCard() {
    const [accountType, setAccountType] = useState('user');

    function formSubmitHandler(e) {
        e.preventDefault();

        console.log(accountType + ' details submitted');
        // Store user details according to accountType
        // Redirect to main page
    }
  
    return (
        <div className="p-8 flex flex-col items-center rounded-3xl justify-start bg-white">
                <h1 className="font-bold text-4xl min-h-12">Register</h1>
                <div className="py-4 flex flex-col w-1/2 items-center min-w-96 min-h-96 bg-white rounded-3xl">
                    <UserFormElementsList
                        setAccountType={setAccountType}
                        formSubmitHandler={formSubmitHandler}
                    />
                </div>
            </div>
    );
}


export default Register;