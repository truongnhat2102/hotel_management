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
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [currentUser, setCurrentUser] = useState(user);

  const wrapperRef = useRef();
  const buttonRef = useRef();

  const [isTabsVisible, setIsTabsVisible] = useState(false);

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

  // effect to set initial state of user bookings data
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    setCurrentUser(user);
    const getInitialData = async () => {
      console.log(user.user_id);
      try {
        const userBookingsDataResponse = await fetch(`http://localhost:8080/order/booking/${user.user_id}`);

        if (userBookingsDataResponse.ok) {
          const text = await userBookingsDataResponse.text();
          try {
            const data = JSON.parse(text);
            setUserBookingsData({
              isLoading: false,
              data: data,
              errors: null,
            });
          } catch (e) {
            console.error("Failed to parse JSON:", e);
            setUserBookingsData({
              isLoading: false,
              data: [],
              errors: "Failed to parse data",
            });
          }
        } else {
          console.error("HTTP Error:", userBookingsDataResponse.status);
          setUserBookingsData({
            isLoading: false,
            data: [],
            errors: `Server responded with status: ${userBookingsDataResponse.status}`,
          });
        }
      } catch (error) {
        console.error("Network error:", error);
        setUserBookingsData({
          isLoading: false,
          data: [],
          errors: "Network error",
        });
      }

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
            <ProfileDetailsPanel userDetails={currentUser} setCurrentUser={setCurrentUser} />
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
