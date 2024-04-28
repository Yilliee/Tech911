import Navbar from './Navbar';
import DashboardCard from '../Dashboard/DashboardCard';
import BookingEntries from '../Dashboard/Data/UpcomingBooking';
import PendingReviewsEntries from '../Dashboard/Data/ReviewsPending';
import OrderHistoryEntries from '../Dashboard/Data/OrderHistoryEntries';

function ServiceCenterDashboard() {
    const username = "Yillié";
    return (
        <div className="h-full w-full">
            <Navbar username={username}/>
            <div className="flex flex-col justify-center items">
                {/* <h1 className="flex flex-col items-center mt-8 mb-4 text-left font-bold text-4xl">Welcome, {username}!</h1> */}
                <div className="flex flex-row w-full">
                    <UpcomingAppointments />
                    <ReviewRepliesPending />
                </div>
                <OrderHistory />
            </div>
        </div>
    )
}

function UpcomingAppointments() {
    return (
        <div className="flex flex-col justify-start bg-gray-200 rounded-3xl m-2 w-full">
            <h2 className="p-4 text-left font-bold text-2xl border-b-2 border-black">Upcoming Appointments</h2>
            <DashboardCard TableHeading={BookingEntries[0]} TableEntries={BookingEntries.slice(1)} MaxEntriesPerPage={5}/>
        </div>
    )
}

function ReviewRepliesPending() {
    return (
        <div className="flex flex-col justify-start bg-gray-200 rounded-3xl m-2 w-full">
            <h2 className="p-4 text-left font-bold text-2xl border-b-2 border-black">Reviews Pending</h2>
            <DashboardCard TableHeading={PendingReviewsEntries[0]} TableEntries={PendingReviewsEntries.slice(1)} MaxEntriesPerPage={5}/>
        </div>
    )
}

function OrderHistory() {
    return (
        <div className="flex flex-col justify-start bg-gray-200 rounded-3xl m-2 w-auto">
            <h2 className="p-4 text-left font-bold text-2xl border-b-2 border-black">Order History</h2>
            <DashboardCard TitleSize='w-5/6' TableHeading={OrderHistoryEntries[0]} TableEntries={OrderHistoryEntries.slice(1)} MaxEntriesPerPage={5}/>
        </div>
    )
}

export default ServiceCenterDashboard;