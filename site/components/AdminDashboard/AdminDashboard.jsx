import { useEffect, useState } from 'react';
import Navbar from '../Navbar.jsx';
import PaymentRequests from './PaymentRequestsCard';
import VerificationMarkRequests from './VerificationMarkRequestsCard';
import { getPictureURLFromBase64 } from '../../src/utils.js';

function AdminDashboard() {
    const [verificationRequestList, setVerificationRequestList] = useState(null);
    const [paymentRequestList, setPaymentRequestList] = useState(null);

    function updatePaymentVerification(order_id, approved) {
        fetch('http://localhost:3000/updatePaymentRequests', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'order_id': order_id,
                'status': (approved ? 'Processed' : 'Failed')
            })
        })
        .then(response => {
            if (response.status === 200) {
                setPaymentRequestList(null);
                alert('Payment verification ' + (approved ? 'Approved' : 'Rejected') + ' for order id ' + order_id);
            }
            else {
                alert('Failed to update payment verification status');
            }
        });

    }
    function updateVerificationMarkStatus(user_id, approved) {
        fetch('http://localhost:3000/updateVerificationRequests', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'user_id': user_id,
                'status': (approved ? 'Processed' : 'Failed')
            })
        })
        .then(response => {
            if (response.status === 200) {
                setVerificationRequestList(null);
                alert('Verification ' + (approved ? 'Approved' : 'Rejected') + ' for user id ' + user_id);
            }
            else {
                alert('Failed to update verification request status');
            }
        });
    }

    useEffect(() => {
        if ( verificationRequestList !== null )
            return;

        fetch('http://localhost:3000/getPendingVerificationRequests',
        {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json().then(
            data => ({
                ...data,
                'status': response.status
        })))
        .then(data => setVerificationRequestList(data.status ?
                            data.requests.map(request => ({
                            'User ID': request.id,
                            'Account Name': request.display_name,
                            'Email': request.contact_email,
                            'Phone no.': request.phone_no,
                            'Verify': (
                                <div className='flex flex-row justify-start'>
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl'
                                        onClick={() => updateVerificationMarkStatus(request.id, true)}>
                                            Verify
                                    </button>
                                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl ml-2'
                                        onClick={() => updateVerificationMarkStatus(request.id, false)}>
                                            Reject
                                    </button>
                                </div>
                            ),
                        }))
            : [])
        )
        .catch(error => {
            console.error(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [verificationRequestList]);

    useEffect(() => {
        if ( paymentRequestList !== null )
            return;

        fetch('http://localhost:3000/getPendingPaymentRequests',
        {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json().then(
            data => ({
                ...data,
                'status': response.status
            })))
        .then(data => {
            setPaymentRequestList(data.status ?
            data.requests.map(request => ({
                'Order id': request.order_id,
                'Title':    request.title,
                'Total Cost': request.total_cost,
                'Payment Method': request.payment_method,
                'Payment Proof': <a className='flex flex-col text-blue-500' href={getPictureURLFromBase64(request.payment_proof)} target="_blank" rel="noopener noreferrer">View</a>,
                'Verify': (
                    <div className='flex flex-row justify-start'>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl'
                            onClick={() => updatePaymentVerification(request.order_id, true)}>
                                Verify
                        </button>
                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl ml-2'
                            onClick={() => updatePaymentVerification(request.order_id, false)}>
                                Reject
                        </button>
                    </div>
                ),
            }))
            : [])
    })
        .catch(error => {
            console.error(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentRequestList]);

    if ( verificationRequestList === null || paymentRequestList === null)
        return (
            <div className="h-screen w-screen flex items-center justify-center text-center">
                <h1 className="text-3xl font-bold">Loading...</h1>
            </div>
        );

    return (
        <div className="h-full w-full">
            <Navbar showAccountButtons={true} showSearchBar={false}/>
            <div className="flex flex-col justify-center items">
                <div className="flex flex-row w-full p-12">
                    <VerificationMarkRequests requests={verificationRequestList} />
                </div>
                <div className="flex flex-row w-full p-12">
                    <PaymentRequests approvalRequests={paymentRequestList}/>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;