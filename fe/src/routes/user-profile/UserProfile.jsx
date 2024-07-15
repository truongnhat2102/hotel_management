import React, { useState, useEffect, useRef } from 'react';
import Tabs from '../../components/ux/tabs/Tabs';
import TabPanel from '../../components/ux/tab-panel/TabPanel';
import {
  faAddressCard,
  faHotel,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import PaymentMethodsPanel from './components/PaymentsMethodsPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useOutsideClickHandler from '../../hooks/useOutsideClickHandler';
import { useNavigate } from 'react-router-dom';
import BookingPanel from './components/BookingPanel';
import ProfileDetailsPanel from './components/ProfileDetailsPanel';
import ChangePasswordUser from './components/ChangePasswordUser';


const UserProfile = () => {
  // const { userDetails } = useContext(AuthContext);
  const navigate = useNavigate();

  const wrapperRef = useRef();
  const buttonRef = useRef();

  const [isTabsVisible, setIsTabsVisible] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));
  // Fetch user bookings data
  const [userBookingsData, setUserBookingsData] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });

  // Fetch user payment methods data
  const [userPaymentMethodsData, setUserPaymentMethodsData] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });

  useOutsideClickHandler(wrapperRef, (event) => {
    if (!buttonRef.current.contains(event.target)) {
      setIsTabsVisible(false);
    }
  });

  const onTabsMenuButtonAction = () => {
    setIsTabsVisible(!isTabsVisible);
  };

  // effect to set initial state of user details
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  // effect to set initial state of user bookings data
  useEffect(() => {
    const getInitialData = async () => {
      const userBookingsDataResponse = await fetch(`http://localhost:8080/order/booking/${user.user_id}`);

      const userPaymentMethodsResponse = [
        {
          id: '1',
          cardType: 'Visa',
          cardNumber: '**** **** **** 1234',
          expiryDate: '08/26',
        },
        {
          id: '2',
          cardType: 'MasterCard',
          cardNumber: '**** **** **** 5678',
          expiryDate: '07/24',
        },
        {
          id: '3',
          cardType: 'American Express',
          cardNumber: '**** **** **** 9012',
          expiryDate: '05/25',
        },
      ];
      let data = [];
      if (userBookingsDataResponse.ok) {
        data = await userBookingsDataResponse.json();
      }
      setUserBookingsData({
        isLoading: false,
        data: data,
        errors: userBookingsDataResponse.errors,
      });

      setUserPaymentMethodsData({
        isLoading: false,
        data: userPaymentMethodsResponse,
        errors: userPaymentMethodsResponse.errors,
      })
    };
    getInitialData();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4 my-10 min-h-[530px]">
        <div className="mx-4">
          <button
            ref={buttonRef}
            onClick={onTabsMenuButtonAction}
            className="block md:hidden items-center px-4 py-1.5 border border-gray-300 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FontAwesomeIcon
              icon={isTabsVisible ? faXmark : faBars}
              size="lg"
            />
          </button>
        </div>
        <Tabs isTabsVisible={isTabsVisible} wrapperRef={wrapperRef}>
          <TabPanel label="Personal Details" icon={faAddressCard}>
            <ProfileDetailsPanel userDetails={user} />
          </TabPanel>
          <TabPanel label="Change password" icon={faAddressCard}>
            <ChangePasswordUser userDetails={user} />
          </TabPanel>
          <TabPanel label="Bookings" icon={faHotel}>
            <BookingPanel bookings={userBookingsData.data} />
          </TabPanel>
          <TabPanel label="Payment details" icon={faCreditCard}>
            <PaymentMethodsPanel
              userPaymentMethodsData={userPaymentMethodsData}
              setUserPaymentMethodsData={setUserPaymentMethodsData}
            />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default UserProfile;
