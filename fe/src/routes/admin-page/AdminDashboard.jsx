import React, { useState, useRef, useEffect } from 'react';
import Tabs from '../../components/ux/tabs/Tabs';
import TabPanel from '../../components/ux/tab-panel/TabPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars, faUser, faBuilding, faBed, faClipboardList, faCommentAlt, faChartBar } from '@fortawesome/free-solid-svg-icons';
import Dashboard from './components/Dashboard';
import OrderManagement from './components/OrdersManagement';
import RoomManagement from './components/RoomManagement';
import EmployeeManagement from './components/EmployeeManagement';
import UserManagement from './components/UserManagement';
import FeedbackList from './components/FeedbacksManagement';

const fetchRevenueData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({

            });
        }, 1000);
    });
};

function AdminDashboard() {
    const [isTabsVisible, setIsTabsVisible] = useState(true);
    const wrapperRef = useRef(null);
    const buttonRef = useRef(null);

    const [isLoading, setIsLoading] = useState(true);
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);

    const [orders, setOrders] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [users, setUsers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);

    const onTabsMenuButtonAction = () => {
        setIsTabsVisible(!isTabsVisible);
    };

    useEffect = async () => {

        // setMonthlyRevenue([
        //     12000, 15000, 18000, 16000, 20000, 22000,
        //     21000, 23000, 19000, 30000, 25000, 28000
        // ]);
        // setIsLoading(false);

        const orderResponse = await fetch('http://localhost:8080/order');
        if (!orderResponse.ok) {
            console.error(orderResponse.status);
            return;
        }
        const orderData = await orderResponse.json();
        setOrders(orderData);

        const roomResponse = await fetch('http://localhost:8080/api/room')
        if (!roomResponse.ok) {
            console.error(roomResponse.status);
            return;
        }
        const roomData = await roomResponse.json();
        setRooms(roomData);

        const employeeResponse = await fetch('http://localhost:8080/admin/user/ROLE_EMPLOYEE');
        if (!employeeResponse.ok) {
            console.error(employeeResponse.status);
            return;
        }
        const employeeData = await employeeResponse.json();
        setEmployees(employeeData);

        const customerResponse = await fetch('http://localhost:8080/admin/user/ROLE_USER');
        if (!customerResponse.ok) {
            console.error(customerResponse.status);
            return;
        }
        const customerData = await customerResponse.json();
        setCustomers(customerData);

        const feebackResponse = await fetch('http://localhost:8080/feedback');
        if (!feebackResponse.ok) {
            console.error(feebackResponse.status);
            return;
        }
        const feedbackData = await feebackResponse.json();
        setFeedbacks(feedbackData);
        
    };



    return (
        <div className="container mx-auto p-4 my-10 min-h-[530px]">
            <h1>ADMIN DASHBOARD</h1>
            <div className="mx-4">
                <button
                    ref={buttonRef}
                    onClick={onTabsMenuButtonAction}
                    className="block md:hidden items-center px-4 py-1.5 border border-gray-300 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <FontAwesomeIcon
                        icon={isTabsVisible ? faXmark : faBars}
                        size="lg"
                    />
                </button>
            </div>
            <Tabs isTabsVisible={isTabsVisible} wrapperRef={wrapperRef}>
                <TabPanel label="Quick Summary" icon={faChartBar}>
                    {/* <Dashboard isLoading={isLoading} data={monthlyRevenue} /> */}
                </TabPanel>
                <TabPanel label="Total Orders" icon={faClipboardList}>
                    <OrderManagement orderFetch={orders} />
                </TabPanel>
                <TabPanel label="List Rooms" icon={faBuilding}>
                    <RoomManagement fetchRoom={rooms} />
                </TabPanel>
                <TabPanel label="List Employees" icon={faUser}>
                    <EmployeeManagement employeeFetch={employees} />
                </TabPanel>
                <TabPanel label="List Users" icon={faUser}>
                    <UserManagement UserFetch={customers} />
                </TabPanel>
                <TabPanel label="List Feedbacks" icon={faCommentAlt}>
                    <FeedbackList initialFeedbacks={feedbacks} />
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default AdminDashboard;