import React, { useEffect, useState } from 'react';

const EmployeeDashboard = () => {
    const [rooms, setRooms] = useState([]);
    const [filters, setFilters] = useState({
        status: '',
        price: '',
        type: ''
    });

    useEffect(() => {
        async function fetchRoom() {
            try {
                const roomResponse = await fetch('http://localhost:8080/api/room');
                if (!roomResponse.ok) {
                    console.error('HTTP error:', roomResponse.status);
                    return;
                }
                const roomData = await roomResponse.json();
                setRooms(roomData);
            } catch (error) {
                console.error('Failed to fetch room data:', error);
            }
        }
        fetchRoom();
    }, []);

    const handleCheckIn = room_id => async () => {
        // if (room.room_status === 'Not Empty') {
        //     alert('Can not check in for this room!');
        //     return;
        // }
        const roomResponse = await fetch(`http://localhost:8080/api/room/checkIn/${room_id}`);
        if (!roomResponse.ok) {
            console.error(roomResponse.status);
            return;
        }
        const roomData = await roomResponse.json();
        setRooms(roomData);
        
    };

    const handleCheckOut = room_id => async () => {
        // if (room.room_status === 'Empty') {
        //     alert('Can not check out for this room!');
        //     return;
        // }
        const roomResponse = await fetch(`http://localhost:8080/api/room/checkOut/${room_id}`);
        if (!roomResponse.ok) {
            console.error(roomResponse.status);
            return;
        }
        const roomData = await roomResponse.json();
        setRooms(roomData);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters({
            status: '',
            price: '',
            type: ''
        });
    };

    const filteredRooms = rooms.filter(room => {
        return (filters.status ? room.room_status === filters.status : true)
            && (filters.price ? room.room_price <= parseFloat(filters.price) : true)
            && (filters.type ? room.room_type === filters.type : true);
    });

    return (
        <div className="flex">
            <div className="w-64 p-5 bg-gray-100">
                <h2 className="font-bold text-lg mb-5">Filters</h2>
                <div className="flex flex-col space-y-4 bg-white p-4 shadow rounded-lg">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Status:</label>
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="">All</option>
                            <option value="Empty">Empty</option>
                            <option value="Not Empty">Not Empty</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">
                            Max Price: <span className="font-semibold">${filters.price}</span>
                        </label>
                        <input
                            type="range"
                            name="price"
                            min="0"
                            max="1000000"
                            value={filters.price}
                            onChange={handleFilterChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                    </div>

                    <div className="mb-6">
                        <p className="block text-sm font-medium text-gray-700 mb-2">Room Type:</p>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="type"
                                    value="VIP"
                                    checked={filters.type === "VIP"}
                                    onChange={handleFilterChange}
                                    className="mr-2"
                                />
                                VIP
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="type"
                                    value="Normal"
                                    checked={filters.type === "Normal"}
                                    onChange={handleFilterChange}
                                    className="mr-2"
                                />
                                Normal
                            </label>
                        </div>
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
            <div className="flex-grow p-5">
                <h1 className="text-center text-2xl font-bold mb-5">Room Management Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredRooms.map(room => (
                        <div key={room.room_id} className="p-4 border rounded-lg shadow-lg bg-white">
                            <h4 className="text-lg font-bold">{room.room_name}</h4>
                            <p>Status: <strong>{room.room_status}</strong></p>
                            <p>Price: <strong>${room.room_price}</strong></p>
                            <p>Type: {room.room_type}</p>
                            <p>Capacity: {room.room_amountPeople} people</p>
                            <p>Description: {room.room_description}</p>
                            <div className="flex flex-wrap mt-2">
                                {[room.room_img1, room.room_img2, room.room_img3, room.room_img4, room.room_img5, room.room_img6]
                                    .filter(img => img)
                                    .map((img, index) => (
                                        <img key={index} src={img} alt={`Room Image ${index + 1}`} className="w-20 h-20 m-1 rounded" />
                                    ))}
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
                                    onClick={handleCheckIn(room.room_id)}
                                >
                                    Check In
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                                    onClick={handleCheckOut(room.room_id)}
                                >
                                    Check Out
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EmployeeDashboard;