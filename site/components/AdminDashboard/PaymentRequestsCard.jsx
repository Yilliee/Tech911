import PropTypes from 'prop-types';
import DashboardCard from '../Dashboard/DashboardCard';

function PaymentRequestsCard({approvalRequests}) {
    return (
        <div className="flex flex-col justify-start bg-gray-200 rounded-3xl m-2 w-full">
            <h2 className="p-4 text-left font-bold text-2xl border-b-2 border-black">Payment Requests</h2>
            <DashboardCard Table={approvalRequests} TitleSize={'w-2/6'}  MaxEntriesPerPage={5}/>
        </div>
    )
}
PaymentRequestsCard.propTypes = {
    approvalRequests: PropTypes.array.isRequired,
};

export default PaymentRequestsCard;