import PropTypes from 'prop-types';

function AccountTypeChooser({accountType, setAccountType}) {
    return (
        <div className="flex flex-row items-center justify-center mx-4 border-gray-400 border-b-2 pb-4">
            <button
                className={`mx-2 px-4 h-12 rounded-3xl font-xl font-bold text-white ${accountType === 'Customer' ? 'bg-blue-500' : 'bg-gray-500'}`}
                onClick={() => setAccountType('Customer')}
                type="radio"
                id="customer_account_type-btn"
            >
                Customer
            </button>
            <button
                className={`mx-2 px-4 h-12 rounded-3xl font-xl font-bold text-white ${accountType === 'Service Center' ? 'bg-blue-500' : 'bg-gray-500'}`}
                onClick={() => setAccountType('Service Center')}
                type="radio"
                id="service_center_account_type-btn"
            >
                Service Center
            </button>
            <button
                className={`mx-2 px-4 h-12 rounded-3xl font-xl font-bold text-white ${accountType === 'Admin' ? 'bg-blue-500' : 'bg-gray-500'}`}
                onClick={() => setAccountType('Admin')}
                type="radio"
                id="admin_account_type-btn"
            >
                Admin
            </button>
        </div>
    )
}
AccountTypeChooser.propTypes = {
    accountType: PropTypes.string.isRequired,
    setAccountType: PropTypes.func.isRequired,
};

export default AccountTypeChooser;