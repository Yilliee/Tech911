import Navbar from './Navbar';
import PaymentRequests from './PaymentRequestsCard';
import VerificationMarkRequests from './VerificationMarkRequestsCard';

import verificationMarkRequests from './Data/verificationMarkRequests.js';
import paymentApprovalRequests from './Data/paymentRequests.js';

function AdminDashboard() {
    const username = "Yillié";
    return (
        <div className="h-full w-full">
            <Navbar username={username}/>
            <div className="flex flex-col justify-center items">
                <div className="flex flex-row w-full p-12">
                    <VerificationMarkRequests requests={verificationMarkRequests} />
                </div>
                <div className="flex flex-row w-full p-12">
                    <PaymentRequests approvalRequests={paymentApprovalRequests}/>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;