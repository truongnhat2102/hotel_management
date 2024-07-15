import React, { useState } from 'react'
import Toast from '../../../components/ux/toast/Toast';
import Select from 'react-select';

const ChangePasswordUser = ({ userDetails }) => {
    const [oldPassword, setOldPassword] = useState(userDetails.password);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [toastMessage, setToastMessage] = useState('');

    const clearToastMessage = () => {
        setToastMessage('');
      };

      const handleCancelClick = () => {
        // setIsEditMode(!isEditMode);
      };

    const handleSaveClick = async () => {
        if (newPassword !== confirmPassword) {
          setToastMessage('New password and confirm password do not match');
          return;
        }
    
        const passwordChangeDTO = {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword
        };
    
        try {
          const response = await fetch(`http://localhost:8080/user/changePassword/${userDetails.user_id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(passwordChangeDTO)
          });
    
          if (!response.ok) {
            const errorText = await response.text(); // Get error message from the response
            setToastMessage(`HTTP error! status: ${response.status}, message: ${errorText}`);
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
          }
    
        } catch (error) {
          console.error('Error changing password:', error);
        }
      };

    return (
        <div className="bg-white shadow sm:rounded-lg flex flex-col">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-xl leading-6 font-medium text-gray-900">
                    Change password
                </h3>
                <p className="mt-1 max-w-2xl text-gray-500">
                    Change password for security your account
                </p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <>
                        <TextField
                            label="Old Password"
                            type='password'
                            value={oldPassword}
                            onChange={setOldPassword}
                        />
                        <TextField
                            label="New password"
                            type='password'
                            value={newPassword}
                            onChange={setNewPassword}
                        />
                        <TextField
                            label="Confirm new password"
                            type='password'
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                        />

                    </>
                </dl>
            </div>
            <div className="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">

                <>
                    <button
                        onClick={handleCancelClick}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveClick}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Save
                    </button>
                </>
            </div>
            {toastMessage && (
                <div className="m-2">
                    <Toast
                        type={toastMessage.type}
                        message={toastMessage.message}
                        dismissError={clearToastMessage}
                    />
                </div>
            )}
        </div>
    )
}

const TextField = ({
    label,
    value,
    onChange,
    type = 'text',
    isSelectable,
    selectableData,
}) => (
    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 sm:mt-0 sm:col-span-2">
            {isSelectable ? (
                <Select
                    options={selectableData}
                    value={selectableData.find((country) => country.value === value)}
                    onChange={(selectedOption) => onChange(selectedOption.value)}
                />
            ) : (
                <input
                    type={type}
                    className="mt-1 border py-1 px-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm md:text-base  rounded-md"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
        </dd>
    </div>
);

export default ChangePasswordUser
