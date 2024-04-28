import PropTypes from 'prop-types';
import DashboardCard from '../Dashboard/DashboardCard';

function PaymentRequestsCard({approvalRequests}) {

    function verifyRequest(e, orderid) {
        console.log("Verifying Request for: ", orderid);
    }
    
    approvalRequests.forEach((obj) => {
        obj['Verify Requests'] = <button className="bg-blue-500 text-white" onClick={(e) => verifyRequest(e, obj['Order ID'])}>Verify</button>
    });
    
    const approvalRequestsHeading = approvalRequests.length > 0 ? Object.keys(approvalRequests[0]).map((key) => key[0].toUpperCase() + key.slice(1)) : [];
    const approvalRequestsArr = approvalRequests.map((obj) => Object.values(obj));
    
    return (
        <div className="flex flex-col justify-start bg-gray-200 rounded-3xl m-2 w-full">
            <h2 className="p-4 text-left font-bold text-2xl border-b-2 border-black">Payment Requests</h2>
            <DashboardCard TableHeading={approvalRequestsHeading} TableEntries={approvalRequestsArr} MaxEntriesPerPage={5}/>
        </div>
    )
}
PaymentRequestsCard.propTypes = {
    approvalRequests: PropTypes.array.isRequired,
};

export default PaymentRequestsCard;