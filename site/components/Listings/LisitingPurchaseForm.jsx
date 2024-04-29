import PropTypes from 'prop-types';

function ListingPurchaseForm({Data, loggedIn}) {
    function navigateToSignIn(e) {
        e.preventDefault();

        alert('Please sign in to make a purchase');
    }
    function purchaseMade(e) {
        e.preventDefault();

        console.log('Purchase made');
    }

    return (
        <form className="flex flex-col justify-around mx-auto  bg-gray-100 px-4 py-8 rounded-3xl">
            <h1 className="text-3xl font-bold mb-2">{Data.title}</h1>
            <p className="text-gray-600 pt-4">{Data.description}</p>
            <div className="mt-8">
                <h2 className="text-lg font-bold">Options</h2>
                <select className="mt-2 px-2 min-w-36 bg-gray-50" required>
                    <option value="">Select -</option>  
                    {Data.options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div className="mt-8 flex flex-col">
                <h2 className="text-xl font-bold">Booking Time</h2>
                <input type="datetime-local" className="px-2 py-1 border border-gray-300 rounded" min={new Date().toISOString().slice(0, 16)} required />
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-bold">Price</h2>
                <p className="px-4 font-mono text-black-500">{Data.price}</p>
            </div>
            <button type="submit" onClick={loggedIn ? purchaseMade : navigateToSignIn} 
                className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
                {loggedIn ? 'Buy' : 'Sign In to Buy'}
            </button>
        </form>
    )
}
ListingPurchaseForm.propTypes = {
    Data: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
};

export default ListingPurchaseForm;