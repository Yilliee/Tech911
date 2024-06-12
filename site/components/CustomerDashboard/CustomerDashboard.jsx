import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Navbar from '../Navbar';
import DashboardCard from '../Dashboard/DashboardCard';

function CustomerDashboard() {
    const [ordersList, setOrdersList] = useState([null]);

    useEffect(() => {
        if ( ! ordersList || ordersList.length !== 1 || ordersList[0] !== null )
            return;
    
        document.title = "Dashboard";

        fetch('http://localhost:3000/getUsersOrders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        .then(response => response.json().then(json_returned => {
            return {
                status: response.status,
                ...json_returned,
            }
        }))
        .then(response_json => {
            ( response_json.status === 401 ) ?
                setOrdersList(null)
              : setOrdersList(response_json.orderList.map(order => ({
                        'Order ID':         order.id,
                        'Title':            order.service_title,
                        'Service Type':     order.service_type,
                        'Service By' :      order.service_center_name,
                        'Quantity':         order.quantity,
                        'Price':            order.total_cost,
                        'Status':           order.status,
                        'Reviewed':         order.review_id ? "True" : "False",
                        'Timestamp':        order.order_timestamp,
                        'Reservation Time': order.reservation_time
                })));
        })
        .catch(error => {
            console.error(error);
        });
    }, [ordersList]);

    if ( ! ordersList )
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-between text-center">
                <Navbar showAccountButtons={true} showSearchBar={true} />
                <div className="h-full w-full flex flex-col items-center justify-center text-center">
                    <h1 className="text-3xl font-bold">Error! Unauthorized Access. Code: 401</h1>
                </div>
            </div>
        );
    else if ( ordersList.length === 1 && ordersList[0] === null )
        return  (
            <div className="h-screen w-screen flex items-center justify-center text-center">
                <h1 className="text-3xl font-bold text-center items-center">Loading...</h1>
            </div>
        );

    function FilterKeys(filteredKeys, obj, useReservationTimestamp) {
        return obj.map(order => {
            return filteredKeys.reduce((result, key) => {
                if ( key === 'Date' || key === 'Time' ) {
                    const [start, length] = (key === 'Date') ? [0, 10] : [11, 5];
                    result[key] = order[useReservationTimestamp ? 'Reservation Time' : 'Timestamp'].substr(start, length)
                }
                else
                    result[key] = order[key];

                return result;
                }, {})
            })
    }

    const UpcomingOrders = FilterKeys(
        ['Order ID', 'Title', 'Date', 'Time', 'Quantity'],
        ordersList.filter(order => order['Reservation Time'] > new Date().toISOString()),
        true
    );

    const ReviewsPending = FilterKeys(
        ['Order ID', 'Title', 'Date', 'Quantity', 'Status'],
        ordersList.filter(order => (order['Reviewed'] === "False" && order['Status'] === 'Completed')),
        false
    );

    const OrderHistory = FilterKeys(
        ['Order ID', 'Title', 'Service Type', 'Date', 'Service By',
         'Quantity', 'Price', 'Status', 'Reviewed'],
        ordersList,
        false
    );

    return (
        <div className="flex flex-col h-full w-full">
            <Navbar showAccountButtons={true} showSearchBar={true} />
            <div className="flex-inline flex-col justify-center items p-4 h-full w-full">
                <div className="flex flex-row w-full">
                    <OrderTable
                        Title='Upcoming Bookings'
                        Entries={UpcomingOrders}
                        entriesPerPage={5}
                        className='mr-2' />
                    <OrderTable
                        Title='Pending Reviews'
                        Entries={ReviewsPending}
                        entriesPerPage={5}
                        className='ml-2' />
                </div>
                <OrderTable
                    Title='Order History'
                    Entries={OrderHistory}
                    entriesPerPage={5} />
            </div>
        </div>
    )
}

function OrderTable({Title, Entries, entriesPerPage, className}) {
    return ( 
        <div className={`flex flex-col justify-start bg-gray-200 rounded-3xl my-2 w-full ${className}`}>
            <h2 className="p-4 text-left font-bold text-2xl border-b-2 border-black">{Title}</h2>
            {(Entries.length > 0) && <DashboardCard Table={Entries} MaxEntriesPerPage={entriesPerPage}/>}
        </div>
    )
}
OrderTable.propTypes = {
    Title: PropTypes.string.isRequired,
    Entries: PropTypes.array.isRequired,
    entriesPerPage: PropTypes.number,
    className: PropTypes.string
};
OrderTable.defaultProps = {
    entriesPerPage: 5,
    className: ''
}

export default CustomerDashboard;