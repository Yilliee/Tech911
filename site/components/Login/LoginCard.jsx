import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AccountTypeChooser from "./AccountTypeChooser";
import LoginForm from "./LoginForm";


function LoginCard({accountStateHook, email, verifyEmail, verifyPass}) {
    const [accountType, setAccountType] = accountStateHook;

    return (
        <div className="flex flex-col justify-center w-1/2 min-w-96 min-h-96 border-gray-100 border-2 bg-white rounded-3xl">
            <h1 className="text-3xl text-center font-bold mt-8 mb-0 mx-4 pb-4 border-b-2 border-gray-400">Log in</h1>
            <h2 className="font-bold text-2xl text-center my-4 border-gray">Account Type</h2>
            <AccountTypeChooser accountType={accountType} setAccountType={setAccountType} />
            <LoginForm email={email} verifyEmail={verifyEmail} verifyPass={verifyPass} />
            <Link to='/register' className="flex flex-row justify-center items-center">
                <h1 className="text-center text-lg font-bold mb-4">Don&apos;t have an account?</h1>
                <h1 className="text-center text-lg font-bold mb-4 ml-2 text-blue-500">Sign up</h1>
            </Link>
        </div>
    );
}
LoginCard.propTypes = {
    accountStateHook: PropTypes.array.isRequired,
    email: PropTypes.string,
    verifyEmail: PropTypes.func.isRequired,
    verifyPass: PropTypes.func.isRequired,
};

export default LoginCard;