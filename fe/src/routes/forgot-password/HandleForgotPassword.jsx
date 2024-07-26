import React, { useEffect, useState } from 'react';

const HandleChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [username, setUsername] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [token, setToken] = useState('');

    // Handle input change for all fields
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'newPassword') setNewPassword(value);
        else if (name === 'confirmPassword') setConfirmPassword(value);
    };

    useEffect(() => {
      const url = new URL(window.location.href);
      const token = url.searchParams.get('token');
      const username = url.searchParams.get('username');
      if (token && username) {
        setToken(token);
        setUsername(username)
      } else {
        console.log('Token not found in URL');
      }
    }, []);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessageType('error');
        if (newPassword !== confirmPassword) {
            setMessage("New passwords do not match.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/changePassword?token=${token}&username=${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newPassword: newPassword,
                    confirmPassword: confirmPassword
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Password change success!');
                setMessageType('success');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                throw new Error(data.message || 'Failed to change password.');
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 px-8 py-6 bg-white shadow-lg rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password:
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm New Password:
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                        Change Password
                    </button>
                </div>
            </form>
            {message && (
                <div className={`mt-4 p-4 text-center text-sm font-medium rounded-md text-white ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default HandleChangePassword;