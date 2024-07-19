import HeroCover from './components/hero-cover/HeroCover';
// import { networkAdapter } from '../../services/NetworkAdapter';
import { useState, useEffect, useCallback } from 'react';
import { MAX_GUESTS_INPUT_VALUE } from '../../utils/constants';
import { formatDate } from '../../utils/date-helpers';
import { useNavigate } from 'react-router-dom';
import Carousel from './components/carousel/Carousel';
import CardInfo from './components/card-info/CardInfo';
import { swiperExample } from '../../utils/mock-data';
import img1 from '../../assests/logos/voco-1024x682.jpeg';

const infoCard = [
  {
    id: 1,
    title: 'Come on in',
    description:
      'Hosted service. Extra touches. Locally-inspired treats that make you feel right at home, on the house. We specialize in memorable first impressions and personalized experiences.',
    url: 'https://digital.ihg.com/is/image/ihg/voco-brand-refresh-lp-hallmark-usen-lvp-1440x206',
  },
  {
    id: 2,
    title: 'Me time',
    description:
      'Take a break from the day-to-day. Our extra cozy bedding, tempting room service, premium bathroom amenities, smart TVs, and fast Wi-Fi enable you to make some time for you.',
    url: 'https://digital.ihg.com/is/image/ihg/voco-brand-refresh-lp-hallmark-img-2-usen-lvp-1440x206',
  },
  {
    id: 3,
    title: 'voco life',
    description:
      'From AM to PM, we make it easy to savor the small indulgences in moments tailor-made for you, from sipping your morning coffee to delighting in a delicious meal and kicking off a great evening with friends.',
    url: 'https://digital.ihg.com/is/image/ihg/voco-brand-refresh-lp-hallmark-img-3-usen-lvp-1440x206',
  },
];

const Home = () => {
  const navigate = useNavigate();

  // State variables
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
  const [locationInputValue, setLocationInputValue] = useState('pune');
  const [numGuestsInputValue, setNumGuestsInputValue] = useState('');
  const [popularDestinationsData, setPopularDestinationsData] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });
  const [hotelsResults, setHotelsResults] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });
  const [top10room, setTop10Rooms] = useState([]);

  // State for storing available cities
  const [availableCities, setAvailableCities] = useState([]);

  const [filteredTypeheadResults, setFilteredTypeheadResults] = useState([]);

  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);

  const onDatePickerIconClick = () => {
    setisDatePickerVisible(!isDatePickerVisible);
  };

  const onLocationChangeInput = async (newValue) => {
    setLocationInputValue(newValue);
  };


  function queryResults(query, availableCities) {
    const filteredResults = availableCities.filter((city) =>
      city.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTypeheadResults(filteredResults);
  }

  const onNumGuestsInputChange = (numGuests) => {
    if (
      (numGuests < MAX_GUESTS_INPUT_VALUE && numGuests > 0) ||
      numGuests === ''
    ) {
      setNumGuestsInputValue(numGuests);
    }
  };

  const onDateChangeHandler = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const onSearchButtonAction = () => {
    const numGuest = Number(numGuestsInputValue);
    const checkInDate = formatDate(dateRange[0].startDate) ?? '';
    const checkOutDate = formatDate(dateRange[0].endDate) ?? '';
    const city = locationInputValue;
    navigate('/hotels', {
      state: {
        numGuest,
        checkInDate,
        checkOutDate,
        city,
      },
    });
  };

  useEffect(() => {

    const getInitialData = async () => {
      const popularDestinationsResponse = {
        data: [
          {
            code: 1211,
            name: 'Mumbai',
            imageUrl: '/images/cities/mumbai.jpg',
          },
          {
            code: 1212,
            name: 'Bangkok',
            imageUrl: '/images/cities/bangkok.jpg',
          },
          {
            code: 1213,
            name: 'London',
            imageUrl: '/images/cities/london.jpg',
          },
          {
            code: 1214,
            name: 'Dubai',
            imageUrl: '/images/cities/dubai.jpg',
          },
          {
            code: 1215,
            name: 'Oslo',
            imageUrl: '/images/cities/oslo.jpg',
          },
        ],
        errors: []
      };
      const hotelsResultsResponse =
        await fetch("http://localhost:8080/api/room");

      const top5RoomsResponse = await fetch("http://localhost:8080/admin/top10rooms");
      const data = await top5RoomsResponse.json();
      console.log(data);
      setTop10Rooms(data);
      setAvailableCities(['pune', 'bangalore', 'mumbai']);


      if (popularDestinationsResponse) {
        setPopularDestinationsData({
          isLoading: false,
          data: popularDestinationsResponse.data,
          errors: popularDestinationsResponse.errors,
        });
      }
      if (hotelsResultsResponse) {
        setHotelsResults({
          isLoading: false,
          data: hotelsResultsResponse.json(),
          errors: hotelsResultsResponse.errors,
        });
      }
    };
    getInitialData();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <HeroCover
        locationInputValue={locationInputValue}
        numGuestsInputValue={numGuestsInputValue}
        locationTypeheadResults={filteredTypeheadResults}
        isDatePickerVisible={isDatePickerVisible}
        setisDatePickerVisible={setisDatePickerVisible}
        onLocationChangeInput={onLocationChangeInput}
        onNumGuestsInputChange={onNumGuestsInputChange}
        dateRange={dateRange}
        onDateChangeHandler={onDateChangeHandler}
        onDatePickerIconClick={onDatePickerIconClick}
        onSearchButtonAction={onSearchButtonAction}
      />
      <div className="w-full mt-[32px]">
        <Carousel data={swiperExample} />
      </div>

      {/* show top room */}
      <TopRooms rooms={top10room} />

      <div className="w-full flex flex-col items-center my-8">
        <p className="text-3xl font-medium text-slate-700 text-center my-2">
          We call our hotels voco
        </p>
        <div className="w-[40px] h-[3px] text-center bg-orange-300"></div>
        <p className="text-center mt-3 max-w-[700px]">
          voco, it means ‘to invite' and ‘call together’ originating from Latin
          – representing our thoughtful, unstuffy and charming nature. While the
          destinations celebrate the individualism of each hotel and location,
          they are united by voco’s unique character and style. Embrace the
          local feel, personal touches and laid-back attitude to create moments
          you’ll remember long after checkout.
        </p>
      </div>
      <div className="w-full flex justify-between gap-[20px] bg-gray-100 py-8 mx-2">
        {infoCard?.map((item) => (
          <CardInfo
            key={item.id}
            title={item.title}
            imageUrl={item.url}
            description={item.description}
          />
        ))}
      </div>
      <div style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: 'auto'
      }}>
        <div>
          <h1 style={{
            color: '#333',
            marginBottom: '0.5rem'
          }}>Step-by-step sustainability</h1>
          <p style={{
            color: '#666',
            fontSize: '16px'
          }}>We believe the journey to sustainability is a gradual one, and step by step, we are working hard to
            ensure that every day – and every stay – bring us closer to a more sustainable future.</p>
        </div>

        <div className="flex flex-col md:flex-row mt-5 bg-white shadow-xl rounded-lg overflow-hidden">
    <div className="max-w-sm w-full md:w-1/3">
        <img src={img1} alt="Pouring water into glass" className="w-full h-auto object-cover" />
    </div>
    <div className="p-5 flex-grow">
        <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">🚿</span>
            <p className="text-md text-gray-700">Aerated shower heads can help reduce water consumption compared to a standard shower head.</p>
        </div>
        <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">🧴</span>
            <p className="text-md text-gray-700">Large format plant-based bathroom amenities, reducing plastic waste.</p>
        </div>
        <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">🛏️</span>
            <p className="text-md text-gray-700">The filling of our indulgent bedding is made from 100% recycled materials.</p>
        </div>
        <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">🍶</span>
            <p className="text-md text-gray-700">Filtered water in reusable glass bottles where possible to help reduce single use plastic.</p>
        </div>
    </div>
</div>
      </div>
    </div >
  );
};

function TopRooms({ rooms }) {
  return (
    <div className="w-full my-8">
      <h2 className="text-2xl font-bold text-center">Top 5 Rooms</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {rooms.map((room) => (
          <div key={room.room.room_id} className="bg-white shadow rounded p-4 max-w-sm">
            {/* Ensure image source and alt text are correctly assigned */}
            <img src={room.room.room_img1} alt={room.room.room_name} className="w-full h-48 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-2">{room.room.room_name}</h3>
            <p className="text-gray-600">{room.room.room_description}</p>
            <p className="text-orange-500 font-bold">{room.room.room_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
