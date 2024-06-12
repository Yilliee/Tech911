import CustomerDashboard from "../CustomerDashboard/CustomerDashboard";
import ServiceCenterDashboard from "../ServiceCenterDashboard/ServiceCenterDashboard";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import { getAccountType } from "../../src/utils.js";

function Dashboard() {
    const accountType = getAccountType();

    return (
        <div>
            { accountType === 'Customer' && <CustomerDashboard /> }
            { accountType === 'Service Center' && <ServiceCenterDashboard /> }
            { accountType === 'Admin' && <AdminDashboard /> }
        </div>
    )
}

export default Dashboard;
