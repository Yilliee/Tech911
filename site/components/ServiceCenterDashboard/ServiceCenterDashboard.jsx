import Navbar from '../Navbar';
import DashboardCard from '../Dashboard/DashboardCard';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function ServiceCenterDashboard() {
    const [serviceCenterOrders, setServiceCenterOrders] = useState(null);
    const [orderStatusList, setOrderStatusList] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/getServiceCenterOrders', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json().then(
            data => ({
                order_details: data,
                status: response.status
            })
        ))
        .then(data => {
            if ( data.status === 200 ) {
                setServiceCenterOrders(data.order_details.map(order => {
                    return {
                        'Order ID': order.order_id,
                        'Timestamp': order.order_timestamp,
                        'Customer Name': order.owner_name,
                        'Quantity': order.quantity,
                        'Reservation Time': order.reservation_time,
                        'Service Type': order.service_type,
                        'Status': order.status,
                        'Status ID': order.status_id,
                        'Title': order.title,
                        'Total Cost': order.total_cost,
                    }
                }));
            }
            else {
                alert('Failed to fetch service center orders. Returned Error Code : ', data.status);
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
    , []);

    useEffect(() => {
        fetch('http://localhost:3000/getOrderStatusList', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json().then(
            data => ({
                status: response.status,
                ...data
            })
        ))
        .then(data => {
            if ( data.status === 200 ) {
                setOrderStatusList(data.status_list);
            }
            else {
                alert('Failed to fetch order status list. Returned Error Code : ', data.status);
            }
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    if ( serviceCenterOrders === null || orderStatusList === null )
        return (
            <div className="h-full w-full flex items-center justify-center text-center">
                <h1 className="text-3xl font-bold">Loading...</h1>
            </div>
        );

    function updateOrderStatus(orderID) {
        const status_id = document.getElementById(`status_select_${orderID}`).value;

        fetch('http://localhost:3000/updateOrderStatus', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                order_id: orderID,
                status_id: status_id
            })
        })
        .then(response => response.json().then(
            data => ({
                status: response.status,
                ...data
            })
        ))
        .then(data => {
            if ( data.status === 200 ) {
                alert('Order Status Updated Successfully');
                window.location.reload();
            }
            else
                alert('Failed to update order status. Returned Error Code : ', data.status);
        })
        .catch(error => {
            console.error(error);
        });
    }

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
            }
        )
    }

    const UpcomingAppointmentsList = FilterKeys(
        ['Order ID', 'Customer Name', 'Service Type', 'Date', 'Time'],
        serviceCenterOrders.filter(
            order => (order['Reservation Time'] > new Date().toISOString()),
            true
    ));
    const OrdersInProgressEntries = FilterKeys(
        ['Order ID', 'Customer Name', 'Service Type', 'Date', 'Status', 'Status ID'],
        serviceCenterOrders.filter(
        order => (order['Status'] !== 'Completed' && (order['Reservation Time'] <= new Date().toISOString())),
        false
    ));

    const OrdersInProgressList = OrdersInProgressEntries.map(
        order => {
            return {
                'Order ID': order['Order ID'],
                'Customer Name': order['Customer Name'],
                'Service Type': order['Service Type'],
                'Date': order['Date'],
                'Status': (
                    <select id={`status_select_${order['Order ID']}`} defaultValue={order['Status ID']}>
                        {orderStatusList.map(({id, name}) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </select>
                ),
                'Save': (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                        onClick={() => updateOrderStatus(order['Order ID'])}    
                    >
                        Save
                    </button>
                )
            }
        }
    );

    const OrderHistoryList = FilterKeys(
        ['Order ID', 'Title', 'Customer Name', 'Date', 'Status', 'Total Cost'],
        serviceCenterOrders,
        false
    );
    
    return (
        <div className="h-full w-full">
            <Navbar showAccountButtons={true} showSearchBar={false}/>
            <div className="flex flex-col justify-center items m-4">
                <UpcomingAppointments appointmentsList={UpcomingAppointmentsList} />
                <OrdersInProgress ordersList={OrdersInProgressList} />
                <OrderHistory orderHistoryList={OrderHistoryList} />
            </div>
        </div>
    )
}

function UpcomingAppointments({appointmentsList}) {

    return (
        <div className="flex flex-col justify-start bg-gray-200 rounded-3xl mt-4 w-full">
            <h2 className="p-4 text-left font-bold text-2xl border-b-2 border-black">Upcoming Appointments</h2>
            <DashboardCard TitleSize='w-2/6' Table={appointmentsList} MaxEntriesPerPage={5}/>
        </div>
    )
}
UpcomingAppointments.propTypes = {
    appointmentsList: PropTypes.array.isRequired,
}

function OrdersInProgress({ordersList}) {
    return (
        <div className="flex flex-col justify-start bg-gray-200 rounded-3xl mt-8 w-full">
            <h2 className="p-4 text-left font-bold text-2xl border-b-2 border-black">Orders In Progress</h2>
            <DashboardCard TitleSize='w-2/6' Table={ordersList} MaxEntriesPerPage={5}/>
        </div>
    )
}
OrdersInProgress.propTypes = {
    ordersList: PropTypes.array.isRequired,
}

function OrderHistory({orderHistoryList}) {
    return (
        <div className="flex flex-col justify-start bg-gray-200 rounded-3xl mt-8 w-auto">
            <h2 className="p-4 text-left font-bold text-2xl border-b-2 border-black">Order History</h2>
            <DashboardCard Table={orderHistoryList} MaxEntriesPerPage={5}/>
        </div>
    )
}
OrderHistory.propTypes = {
    orderHistoryList: PropTypes.array.isRequired,
}


export default ServiceCenterDashboard;