import PropTypes from 'prop-types';
import DashboardCard from '../Dashboard/DashboardCard';

function VerificationMarkRequestsCard({requests}) {
    function verifyRequest(e, username) {
        console.log("Verifying Request for: ", username);
    }
    
    requests.forEach((obj) => {
        obj['Verify Request'] = <button className="bg-blue-500 text-white" onClick={(e) => verifyRequest(e, obj['username'])}>Verify</button>
    });
    
    const requestsHeading = requests.length > 0 ? Object.keys(requests[0]).map((key) => key[0].toUpperCase() + key.slice(1)) : [];
    const requestsArr = requests.map((obj) => Object.values(obj));
    
    return (
        <div className="flex flex-col justify-start bg-gray-200 rounded-3xl m-2 w-full">
            <h2 className="p-4 text-left font-bold text-2xl border-b-2 border-black">Verification Requests</h2>
            <DashboardCard TableHeading={requestsHeading} TableEntries={requestsArr} MaxEntriesPerPage={5}/>
        </div>
    )
}
VerificationMarkRequestsCard.propTypes = {
    requests: PropTypes.array.isRequired,
};

export default VerificationMarkRequestsCard;