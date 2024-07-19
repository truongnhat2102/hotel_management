import React, { useEffect, useState } from 'react';

function EmployeeManagement({ employeeFetch }) {
    const [employees, setEmployees] = useState(employeeFetch);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentuser, setCurrentuser] = useState(null);

    const handleOpenModal = (user = { user_fullname: '', username: '', password: '', user_age: '', user_gender: '', user_phoneNumber: '', user_idCard: '', user_status: '' }) => {
        setCurrentuser(user);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentuser(null);
    };

    const handleSaveEmployee = async (user) => {
        const response = await fetch('http://localhost:8080/user/save/employee', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        if (response.ok) {
            if (user.user_id != 0) {
                setEmployees(employees.map(e => e.user_id === user.user_id ? user : e));
            } else {
                const newEmployee = { ...user, user_id: Math.max(...employees.map(e => e.user_id)) + 1 };
                setEmployees([...employees, newEmployee]);
            }
        }
        handleCloseModal();
    };

    const handleDeleteEmployee = async (id) => {
        const response = await fetch(`http://localhost:8080/user/delete/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        if (!response.ok) {
            console.error(response.status);
            return;
        }
        setEmployees(employees.filter(employee => employee.user_id !== id));
    };

    return (
        <div className="p-5">
            <button
                className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleOpenModal()}
            >
                Add New Employee
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {employees.map(user => (
                    <div key={user.user_id} className="p-4 border rounded shadow">
                        <h4 className="text-lg font-bold">{user.username}</h4>
                        <p>Name: {user.user_fullname}</p>
                        <p>Age: {user.user_age}</p>
                        <div className="flex justify-end space-x-2 mt-2">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                                onClick={() => handleOpenModal(user)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                onClick={() => handleDeleteEmployee(user.user_id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {modalOpen && (
                <UserModal user={currentuser} onSave={handleSaveEmployee} onClose={handleCloseModal} />
            )}
        </div>
    );
}

function UserModal({ user, onSave, onClose }) {
    const [formData, setFormData] = useState({ ...user });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-lg font-semibold mb-4">{user ? 'Edit User' : 'Add New User'}</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSave(formData);
                }}>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="user_fullname"
                            value={formData.user_fullname}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="block w-full p-2 rounded border"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">Username (Email)</label>
                        <input
                            type="email"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Email"
                            className="block w-full p-2 rounded border"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="block w-full p-2 rounded border"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">Age</label>
                        <input
                            type="number"
                            name="user_age"
                            value={formData.user_age}
                            onChange={handleChange}
                            placeholder="Age"
                            className="block w-full p-2 rounded border"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <input
                            type="text"
                            name="user_gender"
                            value={formData.user_gender}
                            onChange={handleChange}
                            placeholder="Gender"
                            className="block w-full p-2 rounded border"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            name="user_phoneNumber"
                            value={formData.user_phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="block w-full p-2 rounded border"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">ID Card Number</label>
                        <input
                            type="text"
                            name="user_idCard"
                            value={formData.user_idCard}
                            onChange={handleChange}
                            placeholder="ID Card Number"
                            className="block w-full p-2 rounded border"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <input
                            type="text"
                            name="user_status"
                            value={formData.user_status}
                            onChange={handleChange}
                            placeholder="Status"
                            className="block w-full p-2 rounded border"
                        />
                    </div>
                    <div className="flex justify-between">
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

export default EmployeeManagement;