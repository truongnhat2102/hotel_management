import React, { useEffect, useState } from 'react';
import FinalBookingSummary from './components/final-booking-summary/FinalBookingSummary';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getReadableMonthFormat } from '../../utils/date-helpers';
import { useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import Loader from '../../components/ux/loader/loader';
import Toast from '../../components/ux/toast/Toast';

const Checkout = () => {
  const [errors, setErrors] = useState({});

  const location = useLocation();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [toastMessage, setToastMessage] = useState('');

  const { isAuthenticated, userDetails } = useContext(AuthContext);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const [paymentConfirmationDetails, setPaymentConfirmationDetails] = useState({
    isLoading: false,
    data: {},
  });

  const dismissToast = () => {
    setToastMessage('');
  };

  // Form state for collecting user payment and address information
  const [formData, setFormData] = useState({
    email: userDetails?.email ? userDetails?.email : '',
    nameBooker: '',
    phoneNumber: '',
    address: ''
  });
  const room_id = searchParams.get('hotelCode');


  // Format the check-in and check-out date and time
  const checkInDateTime = `${getReadableMonthFormat(
    searchParams.get('checkIn')
  )}, ${location.state?.checkInTime}`;
  const checkOutDateTime = `${getReadableMonthFormat(
    searchParams.get('checkOut')
  )}, ${location.state?.checkOutTime}`;

  useEffect(() => {
    const locationState = location.state;
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    if (!locationState || !checkIn || !checkOut) {
      const hotelCode = searchParams.get('hotelCode');
      navigate(`/hotel/${hotelCode}`);
    }
  }, [location, navigate, searchParams]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = {};

    setErrors(newErrors);

    setIsSubmitDisabled(true);
    setPaymentConfirmationDetails({
      isLoading: true,
      data: {},
    });
    const amount = convertCurrencyToInt(location.state?.total) * 1000;
    const response = await fetch(`http://localhost:8080/vnpay/submitOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "amount": amount,
        "orderInfo": formData.email + ';' + room_id + ";" + checkInDateTime + ";" + checkOutDateTime
      })
    })
    const data = await response.json();
    if (data.redirectUrl) {
      // setPaymentConfirmationDetails({
      //   isLoading: false,
      //   data: ,
      // });
      window.location.href = data.redirectUrl;
      // console.log(data.redirectUrl);
      // const hotelName = searchParams.get('hotelName').replaceAll('-', '_');
      // navigate(`/booking-confirmation?payment=sucess&hotel=${hotelName}`, {
      //   state: {
      //     confirmationData: response.data,
      //   },
      // });
    } else {
      setToastMessage('Payment failed. Please try again.');
      setIsSubmitDisabled(false);
      setPaymentConfirmationDetails({
        isLoading: false,
        data: {},
      });
    }
  };

  function convertCurrencyToInt(currencyString) {
    // Remove all non-digits, except comma and dot
    let numericPart = currencyString.replace("/[^\d.,]/g, ");

    numericPart = numericPart.replace(/,/g, '');

    // Truncate decimal part if present
    const decimalIndex = numericPart.indexOf('.');
    if (decimalIndex !== -1) {
        numericPart = numericPart.substring(0, decimalIndex);
    }

    // Convert to integer
    return parseInt(numericPart, 10);
}

  return (
    <div className="flex flex-col justify-center items-center">
      <FinalBookingSummary
        hotelName={searchParams.get('hotelName').replaceAll('-', ' ')}
        checkIn={checkInDateTime}
        checkOut={checkOutDateTime}
        isAuthenticated={isAuthenticated}
        phone={userDetails?.phone}
        email={userDetails?.email}
        fullName={userDetails?.fullName}
      />
      <div className="relative bg-white border shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg mx-auto">
        {paymentConfirmationDetails.isLoading && (
          <Loader
            isFullScreen={true}
            loaderText={'Payment in progress, hold tight!'}
          />
        )}
        <form
          onSubmit={handleSubmit}
          className={` ${paymentConfirmationDetails.isLoading ? 'opacity-40' : ''
            }`}
        >
          <InputField
            label="Email address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required={true}

          />
          <InputField
            label="Name of booker"
            type="text"
            name="nameBooker"
            value={formData.nameBooker}
            onChange={handleChange}
            placeholder="Name of booker"
            required={true}

          />
          <InputField
            label="Phone Number"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+84 123 456 789"
            required={true}

          />

          <InputField
            label="Address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Street Address"
            required={true}

          />
          <InputField
            label="City"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required={true}

          />

          <div className="flex items-center justify-between">
            <button
              className={`bg-brand hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 ${isSubmitDisabled
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-700'
                }`}
              type="submit"
              disabled={isSubmitDisabled}
            >
              Pay {location.state?.total}
            </button>
          </div>
        </form>

        {toastMessage && (
          <div className="my-4">
            <Toast
              message={toastMessage}
              type={'error'}
              dismissError={dismissToast}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
}) => (
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={name}
    >
      {label}
    </label>
    <input
      className={`shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    // aria-invalid={error ? 'true' : 'false'}
    />
    {/* {error && (
      <p className="text-red-500 text-xs my-1">Please check this field.</p>
    )} */}
  </div>
);

// Validation schema for form fields
const validationSchema = {
  email: (value) => /\S+@\S+\.\S+/.test(value),
  nameOnCard: (value) => value.trim() !== '',
  cardNumber: (value) => /^\d{10}$/.test(value), // Simplistic validation: just check if it has 16 digits.
  expiry: (value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value), // MM/YY format
  cvc: (value) => /^\d{3,4}$/.test(value), // 3 or 4 digits
  address: (value) => value.trim() !== '',
  city: (value) => value.trim() !== '',
  state: (value) => value.trim() !== '',
  postalCode: (value) => /^\d{5}(-\d{4})?$/.test(value),
};

export default Checkout;
