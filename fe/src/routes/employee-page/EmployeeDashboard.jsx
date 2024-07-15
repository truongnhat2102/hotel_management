import React, { useEffect, useState } from 'react'

const EmployeeDashboard = () => {
    const [rooms, setRooms] = useState([]);

    useEffect = async () => {
        const roomResponse = await fetch('http://localhost:8080/api/room')
        if (!roomResponse.ok) {
            console.error(roomResponse.status);
            return;
        }
        const roomData = await roomResponse.json();
        setRooms(roomData);
    }

    const checkIn = async (room_id) => {
        const roomResponse = await fetch(`http://localhost:8080/api/room/checkIn/${room_id}`)
        if (!roomResponse.ok) {
            console.error(roomResponse.status);
            return;
        }
        const roomData = await roomResponse.json();
        setRooms(roomData);
    }

    const checkOut = async (room_id) => {
        const roomResponse = await fetch(`http://localhost:8080/api/room/checkOut/${room_id}`)
        if (!roomResponse.ok) {
            console.error(roomResponse.status);
            return;
        }
        const roomData = await roomResponse.json();
        setRooms(roomData);
    }


    return (
        <div className="p-5">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms.map(room => (
                    <div key={room.room_id} className="p-4 border rounded shadow">
                        <h4 className="text-lg font-bold">{room.room_name}</h4>
                        <p>Status: {room.room_status}</p>
                        <p>Price: ${room.room_price}</p>
                        <p>Type: {room.room_type}</p>
                        <p>Capacity: {room.room_amountPeople} people</p>
                        <p>Description: {room.room_description}</p>
                        <div className="flex flex-wrap">
                            {[room.room_img1, room.room_img2, room.room_img3, room.room_img4, room.room_img5, room.room_img6]
                                .filter(img => img)
                                .map((img, index) => (
                                    <img key={index} src={img} alt={`Room Image ${index + 1}`} className="w-20 h-20 m-1" />
                                ))}
                        </div>
                        <div className="flex justify-end space-x-2 mt-2">

                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                                onClick={checkIn(room.room_id)}
                            >
                                Check In
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                onClick={checkOut(room.room_id)}
                            >
                                Check Out
                            </button>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default EmployeeDashboard
