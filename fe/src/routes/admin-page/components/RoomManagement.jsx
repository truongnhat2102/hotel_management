import React, { useEffect, useState } from 'react';

function RoomManagement({fetchRoom}) {
    const [rooms, setRooms] = useState(fetchRoom);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);


    const handleOpenModal = (room = { room_name: '', room_capacity: 0 }) => {
        setCurrentRoom(room);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentRoom(null);
    };

    const handleSaveRoom = (room) => {
        const method = room.room_id !== 0 ? false : true;
        fetch('http://localhost:8080/api/room/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(room)
        })
        .then(response => response.json())
        .then(savedRoom => {
            if (method) {
                setRooms([...rooms, savedRoom]);
            } else {
                setRooms(rooms.map(r => r.room_id === savedRoom.room_id ? savedRoom : r));
            }
            handleCloseModal();
        })
        .catch(error => console.error('Error saving room:', error));
    };

    const handleDeleteRoom = (room_id) => {
        fetch(`http://localhost:8080/api/room/delete/${room_id}`, {
            method: 'DELETE',
        })
        .then(() => {
            setRooms(rooms.filter(room => room.room_id !== room_id));
        })
        .catch(error => console.error('Error deleting room:', error));
    };

    return (
        <div className="p-5">
            <button 
                className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleOpenModal()}
            >
                Add New Room
            </button>

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
                                onClick={() => handleOpenModal(room)}
                            >
                                Edit
                            </button>
                            <button 
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                onClick={() => handleDeleteRoom(room.room_id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {modalOpen && (
                <RoomModal room={currentRoom} onSave={handleSaveRoom} onClose={handleCloseModal} />
            )}
        </div>
    );
}

function RoomModal({ room, onSave, onClose }) {
    const [formData, setFormData] = useState({ ...room });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg w-3/4 max-w-4xl">
                <h2 className="text-lg font-semibold mb-4">{room.room_id ? 'Edit Room' : 'New Room'}</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSave(formData);
                }}>
                    <div className="mb-3">
                        <label className="block">Room Name:</label>
                        <input 
                            type="text" 
                            name="room_name" 
                            value={formData.room_name} 
                            onChange={handleChange} 
                            placeholder="Room Name" 
                            className="border w-full p-2 rounded"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block">Price:</label>
                        <input 
                            type="text" 
                            name="room_price" 
                            value={formData.room_price} 
                            onChange={handleChange} 
                            placeholder="Price" 
                            className="border w-full p-2 rounded"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block">Type:</label>
                        <input 
                            type="text" 
                            name="room_type" 
                            value={formData.room_type} 
                            onChange={handleChange} 
                            placeholder="Type" 
                            className="border w-full p-2 rounded"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block">Capacity:</label>
                        <input 
                            type="number" 
                            name="room_amountPeople" 
                            value={formData.room_amountPeople} 
                            onChange={handleChange} 
                            placeholder="Capacity" 
                            className="border w-full p-2 rounded"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block">Description:</label>
                        <textarea 
                            name="room_description" 
                            value={formData.room_description} 
                            onChange={handleChange} 
                            placeholder="Description" 
                            className="border w-full p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Images:</label>
                        {Array.from({ length: 6 }).map((_, index) => {
                            const imgKey = `room_img${index + 1}`;
                            return formData[imgKey] && (
                                <img key={imgKey} src={formData[imgKey]} alt={`Room Image ${index + 1}`} className="w-32 h-32 mr-2 mb-2 inline-block" />
                            );
                        })}
                    </div>
                    <div className="flex justify-between mt-4">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Save
                        </button>
                        <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RoomManagement;