import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccountType } from '../../src/utils';

import verified_icon from './assets/verified_icon.png';

function ListingPurchaseForm({listing}) {
    const navigate = useNavigate();
    const loggedInAsCustomer = getAccountType() === 'Customer';
    const minQuantity = 1;

    const [dateFailed, setDateFailed] = useState(false);
    const [quantity, setQuantity] = useState(minQuantity);

    function navigateToSignIn(e) {
        e.preventDefault();

        alert('Navigating to sign in page...');

        navigate('/signin');
    }

    function sendData(listing_id, reservation_time, quantity, total_cost, payment_proof_base64) {
        console.log(payment_proof_base64.length);

        fetch('http://localhost:3000/makePurchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                listing_id,
                reservation_time,
                quantity,
                total_cost,
                payment_proof_base64
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            navigate('/');
        })
        .catch(error => console.error(error));
    }

    function makePurchase(e) {
        e.preventDefault();

        const date = new Date(document.getElementById('booking_timestamp').value);
        if ( date <= new Date() ) {
            setDateFailed(true);
            return;
        }

        const payment_proof = document.getElementById('payment_proof').files[0];
        const payment_proof_buffer = new FileReader();
        payment_proof_buffer.onload = function(e) {
            const base64Data = e.target.result;  // Access the result here
            const start_index = base64Data.indexOf('base64,') + 7;

            sendData(listing.id, date.toISOString().substring(0, 19).replace('T', ' '), quantity, listing.price * quantity, base64Data.substring(start_index));
        };

        payment_proof_buffer.readAsDataURL(payment_proof);
    }

    return (
        <form
            onSubmit={(e) => makePurchase(e)}
            className="flex flex-col justify-around mx-auto  bg-gray-100 px-4 py-8 rounded-3xl">
            <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
            <div className="flex flex-row justify-start mb-2">
                <h1 className="text-xl font-bold">{listing.owner_title}</h1>
                {listing.owner_verification_status === 'Processed' &&
                    <img src={verified_icon} alt="Verified" className="h-8 w-8 rounded-full ml-2" />
                }
            </div>
            <p className="text-gray-div600 pt-4">{listing.description}</p>
            <div className="mt-8 flex flex-col">
                <h2 className="text-xl font-bold">Booking Time</h2>
                {dateFailed && <p className="text-red-500">Please select a future date and time</p>}
                <input
                    type="datetime-local"
                    id='booking_timestamp'
                    className="px-2 py-1 border border-gray-300 rounded"
                    min={new Date().toISOString().slice(0, 16)}
                    onChange={() => dateFailed && setDateFailed(false)}
                    required
                />
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-bold">Quantity</h2>
                <input
                    type="number"
                    id="quantity"
                    className="px-2 py-1 border border-gray-300 rounded"
                    defaultValue={quantity}
                    min={minQuantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-bold">Price</h2>
                <p className="px-4 font-mono text-black-500">$ {listing.price}</p>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-bold">Total</h2>
                <p className="px-4 font-mono text-black-500">$ {listing.price * quantity}</p>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-bold">Upload Payment Proof</h2>
                <input
                    type="file"
                    id="payment_proof"
                    accept="image/*"
                    className="px-2 py-1 border border-gray-300 rounded"
                    required
                />
            </div>
            <button type="submit" onClick={loggedInAsCustomer ? null : navigateToSignIn}
                className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
                {loggedInAsCustomer ? 'Buy' : 'Sign In As a Customer to Buy'}
            </button>
        </form>
    )
}
ListingPurchaseForm.propTypes = {
    listing: PropTypes.object.isRequired,
};

export default ListingPurchaseForm;