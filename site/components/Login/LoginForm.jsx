import { useState } from 'react';

function LoginForm() {
    const [email, setEmail] = useState(null);

    function loginButtonClicked(e) {
        e.preventDefault();
        if ( email == null )
            verifyEmail();
        else
            verifyPass();   
    }

    function verifyEmail() {
        const email = document.getElementById('email');
        console.log(email.value);

        /* Email.verified from db */
        // eslint-disable-next-line no-constant-condition
        if ( true ) {
            setEmail(email.value);
            
            email.readOnly = true;
            email.classList.add('bg-gray-400');

            document.getElementById('customer_account_type-btn').disabled = true;
            document.getElementById('service_center_account_type-btn').disabled = true;
        }
        else
            alert('Please enter a valid email');
    }
    function verifyPass() {
        const pass = document.getElementById('password');
        console.log(pass.value);
    }

    return (
        <form className="flex flex-col justify-between items-center">
            <div className="p-4">
                <p className='px-4 py-2 font-semibold text-xl'>Email</p>
                <input className="border-2 w-72 rounded-3xl h-12 px-4 text-base" type="email" id="email" autoComplete="email" placeholder="Enter email" />
            </div>
            {(email != null) &&
                <div className="p-4 pt-0">
                    <p className='px-4 py-2 font-semibold text-xl'>Password</p>
                    <input className="border-2 w-72 rounded-3xl h-12 px-4 text-base" type="password" id="password" autoComplete='current-password' placeholder="Enter password" />
                </div>
            }
            <button className="bg-blue-500 w-24 h-10 rounded-3xl font-xl font-bold text-white my-10" onClick={loginButtonClicked}>{email ? 'Submit' : 'Next'}</button>
        </form>
    )
}

export default LoginForm;