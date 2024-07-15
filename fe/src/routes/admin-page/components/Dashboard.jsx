import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

// Chart.js version 2.x needs this import to register controllers, elements, scales, and plugins
import 'chart.js/auto';



function Dashboard({data, isLoading}) {
    const [detailData, setDetailData] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        totalUsers: 0,
        totalRooms: 0,
        topRoom: { name: '', bookings: 0 }
    });
    
    const [topRoom, setIsTopRoom] = useState([]);
    

    

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Monthly Revenue',
                data: data,
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-summary">
            <h3>Dashboard Summary</h3>
            <div className="summary-item">Total Revenue: ${data.totalRevenue}</div>
            <div className="summary-item">
                Top Room: {detailData.topRoom.name} (Bookings: {detailData.topRoom.bookings})
            </div>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}

export default Dashboard;