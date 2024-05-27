import PropTypes from 'prop-types';

function LoginForm({email, verifyEmail, verifyPass}) {
    function loginButtonClicked(e) {
        e.preventDefault();
        if ( email == null )
            verifyEmail(e);
        else
            verifyPass(e);   
    }

    return (
        <form className="flex flex-col justify-between items-center">
            <div className="p-4" id="email_div">
                <p className='px-4 py-2 font-semibold text-xl'>Email</p>
                <input className="border-2 w-72 rounded-3xl h-12 px-4 text-base" type="email" id="email" autoComplete="email" placeholder="Enter email" />
            </div>
            {(email != null) &&
                <div className="p-4 pt-0">
                    <p className='px-4 py-2 font-semibold text-xl'>Password</p>
                    <input className="border-2 w-72 rounded-3xl h-12 px-4 text-base" type="password" id="password" autoComplete='current-password' placeholder="Enter password" />
                </div>
            }
            <button className="bg-blue-500 w-24 h-10 rounded-3xl font-xl font-bold text-white mb-10" onClick={loginButtonClicked}>{email ? 'Submit' : 'Next'}</button>
        </form>
    )
}
LoginForm.propTypes = {
    email: PropTypes.string,
    verifyEmail: PropTypes.func.isRequired,
    verifyPass: PropTypes.func.isRequired,
}

export default LoginForm;