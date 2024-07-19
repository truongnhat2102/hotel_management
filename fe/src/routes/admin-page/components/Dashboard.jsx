import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function Dashboard({ data }) {
    // Initialize state only if data is available, otherwise set defaults
    const [detailData, setDetailData] = useState({
        totalOrders: data ? data.totalOrders : 0,
        totalRevenue: data ? data.totalRevenue : 0,
        totalUsers: data ? data.totalUsers : 0,
        totalRooms: data ? data.totalRooms : 0,
        topRoom: data && data.topRoom ? data.topRoom : { name: '', bookings: 0 }
    });

    // Assuming data is an object with a monthlyRevenue property that is an array
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Monthly Revenue',
                data: data && data.monthlyRevenue ? data.monthlyRevenue : Array(12).fill(0), // Default to zeros if not available
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    };

    // Render loading state if data is not available
    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-summary">
            <h3>Dashboard Summary</h3>
            <div className="summary-item">Total Revenue: ${detailData.totalRevenue}</div>
            <div className="summary-item">
                Top Room: {detailData.topRoom.name} (Bookings: {detailData.topRoom.bookings})
            </div>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}

export default Dashboard;