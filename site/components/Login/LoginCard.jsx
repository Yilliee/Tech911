import PropTypes from 'prop-types';

import AccountTypeChooser from "./AccountTypeChooser";
import LoginForm from "./LoginForm";

function LoginCard({setAccountType, accountType}) {
    return (
        <div className="flex flex-col justify-center w-1/2 min-w-96 min-h-96 border-gray-100 border-2 bg-white rounded-3xl">
            <h1 className="text-3xl text-center font-bold mt-8 mb-0 mx-4 pb-4 border-b-2 border-gray-400">Log in</h1>
            <h2 className="font-bold text-2xl text-center my-4 border-gray">Account Type</h2>
            <AccountTypeChooser accountType={accountType} setAccountType={setAccountType} />
            <LoginForm />
        </div>
    );
}
LoginCard.propTypes = {
    setAccountType: PropTypes.func.isRequired,
    accountType: PropTypes.string.isRequired,
};

export default LoginCard;