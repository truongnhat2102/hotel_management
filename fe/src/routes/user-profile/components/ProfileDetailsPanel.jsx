import React, { useState, useEffect } from 'react';
import Toast from '../../../components/ux/toast/Toast';
import Select from 'react-select';


const ProfileDetailsPanel = ({ userDetails, setCurrentUser }) => {
  // states to manage the edit mode and user details
  const [isEditMode, setIsEditMode] = useState(false);
  const [userId, setUserId] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setUserGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [idCard, setIdCard] = useState('');
  const [avatar, setAvatar] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [nationality, setNationality] = useState('');
  const [countries, setCountries] = useState([]);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const [toastMessage, setToastMessage] = useState('');

  const clearToastMessage = () => {
    setToastMessage('');
  };

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleCancelClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveClick = async () => {
    setIsEditMode(false);


    const updatedUserDetails = {
      "user_fullname": firstName + ' ' + lastName,
      "user_phoneNumber": phoneNumber,
      "user_gender": gender,
      "user_email": email,
      "user_id": userId,
      "user_age": age,
      "user_idCard": idCard,
      "user_ava": avatar,
      "username": userDetails.username,
      "password": userDetails.password,
      "user_status": userDetails.user_status
    };

    console.log(JSON.stringify(userDetails))
    const response = await fetch('http://localhost:8080/user/edit-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUserDetails)
    });

    if (response.ok) {
      setCurrentUser(updatedUserDetails);
      setToastMessage({
        type: 'success',
        message: response.status,
      });
    } else {
      // revert to original state
      const names = userDetails.user_fullname.split(' ');
      setFirstName(names[0] || '');
      setLastName(names[1] || '');
      setEmail(userDetails.user_email || '');
      setPhoneNumber(userDetails.user_phoneNumber || '');
      setNationality(userDetails.country || '');
      setDateOfBirth(userDetails.user_dob || '');
      setUserGender(userDetails.user_gender || '');
      setAge(userDetails.user_age || '');
      setAvatar(userDetails.user_ava || '');
      setUsername(userDetails.username || '');
      setIdCard(userDetails.user_idCard || '');
      setToastMessage({
        type: 'error',
        message: 'Oops, something went wrong. Please try again later.',
      });
    }

    setIsEditMode(false);
  };

  // effect to set initial state of user details
  useEffect(() => {
    console.log(userDetails.user_fullname)
    if (userDetails) {
      setUserId(userDetails.user_id)
      const names = userDetails?.user_fullname?.split(' ');
      setFirstName(names[0] || '');
      setLastName(names[1] || '');
      setEmail(userDetails.user_email || '');
      setPhoneNumber(userDetails.user_phoneNumber || '');
      setNationality(userDetails.country || '');
      setDateOfBirth(userDetails.user_dob || '');
      setUserGender(userDetails.user_gender || '');
      setAge(userDetails.user_age || '');
      setAvatar(userDetails.user_ava || '');
      setUsername(userDetails.username || '');
      setIdCard(userDetails.user_idCard || '');
    }
  }, [userDetails]);

  return (
    <div className="bg-white shadow sm:rounded-lg flex flex-col">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-xl leading-6 font-medium text-gray-900">
          Personal details
        </h3>
        <p className="mt-1 max-w-2xl text-gray-500">
          Keep your details current to ensure seamless communication and
          services
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {isEditMode ? (
            // Editable fields
            <>
            <TextField
              label="Firstname"
              value={firstName}
              onChange={(value) => setFirstName(value)}
            />
            <TextField
              label="Lastname"
              value={lastName}
              onChange={(value) => setLastName(value)}
            />
            <TextField
              label="Age"
              type="number"
              value={age}
              onChange={(value) => setAge(value)}
            />
            <TextField
              label="Gender"
              value={gender}
              onChange={(value) => setUserGender(value)}
              isSelectable={true}
              selectableData={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]}
            />
            <TextField
              label="Phone number"
              type="tel"
              value={phoneNumber}
              onChange={(value) => setPhoneNumber(value)}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(value) => setEmail(value)}
            />
            <TextField
              label="ID Card"
              value={idCard}
              onChange={(value) => setIdCard(value)}
            />
            <TextField
              label="Avatar URL"
              value={avatar}
              onChange={(value) => setAvatar(value)}
            />
          </>
          ) : (
            // Display fields
            <>
              <DisplayField label="Firstname" value={firstName} />
              <DisplayField label="Lastname" value={lastName} />
              <DisplayField label="Email address" value={email} verified={isEmailVerified} />
              <DisplayField label="Phone number" value={phoneNumber || 'Add your phone number'} verified={isPhoneVerified} />
              <DisplayField label="Age" value={age || 'Enter your age'} />
              <DisplayField label="Gender" value={gender || 'Specify your gender'} />
              {/* <DisplayField label="User Status" value={stat || 'Status not set'} /> */}
              <DisplayField label="ID Card Number" value={idCard || 'ID not added'} />
            </>
          )}
        </dl>
      </div>
      <div className="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
        {isEditMode ? (
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
        ) : (
          <button
            onClick={handleEditClick}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit
          </button>
        )}
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
  );
};

const DisplayField = ({ label, value, verified }) => (
  <div
    className={`bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${verified ? 'bg-gray-50' : ''
      }`}
  >
    <dt className="font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-gray-900 sm:mt-0 sm:col-span-2">
      {value}{' '}
      {verified && <span className="text-green-500 font-medium">Verified</span>}
    </dd>
  </div>
);

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

export default ProfileDetailsPanel;
