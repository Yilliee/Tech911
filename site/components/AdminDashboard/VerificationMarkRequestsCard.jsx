import PropTypes from 'prop-types';
import DashboardCard from '../Dashboard/DashboardCard';

function VerificationMarkRequestsCard({requests}) {
    return (
        <div className="flex flex-col justify-start bg-gray-200 rounded-3xl m-2 w-full">
            <h2 className="p-4 text-left font-bold text-2xl border-b-2 border-black">Verification Requests</h2>
            <DashboardCard Table={requests} TitleSize={'w-2/6'} MaxEntriesPerPage={5}/>
        </div>
    )
}
VerificationMarkRequestsCard.propTypes = {
    requests: PropTypes.array.isRequired,
};

export default VerificationMarkRequestsCard;