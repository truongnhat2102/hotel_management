import HeroCover from './components/hero-cover/HeroCover';
import PopularLocations from './components/popular-locations/popular-locations';
import { networkAdapter } from 'services/NetworkAdapter';
import { useState, useEffect, useCallback } from 'react';
import { MAX_GUESTS_INPUT_VALUE } from 'utils/constants';
import ResultsContainer from 'components/results-container/ResultsContainer';
import { formatDate } from 'utils/date-helpers';
import { useNavigate } from 'react-router-dom';
import _debounce from 'lodash/debounce';
import Carousel from './components/carousel/Carousel';
import CardInfo from './components/card-info/CardInfo';
import { swiperExample } from 'utils/mock-data';

/**
 * Home component that renders the main page of the application.
 * It includes a navigation bar, hero cover, popular locations, results container, and footer.
 */

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

  // State for storing available cities
  const [availableCities, setAvailableCities] = useState([]);

  const [filteredTypeheadResults, setFilteredTypeheadResults] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(_debounce(queryResults, 1000), []);

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
    // Debounce the queryResults function to avoid making too many requests
    debounceFn(newValue, availableCities);
  };

  /**
   * Queries the available cities based on the user's input.
   * @param {string} query - The user's input.
   * @returns {void}
   *
   */
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

  /**
   * Handles the click event of the search button.
   * It gathers the number of guests, check-in and check-out dates, and selected city
   * from the component's state, and then navigates to the '/hotels' route with this data.
   */
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
    /**
     * Fetches initial data for the Home route.
     * @returns {Promise<void>} A promise that resolves when the data is fetched.
     */
    const getInitialData = async () => {
      const popularDestinationsResponse = await networkAdapter.get(
        '/api/popularDestinations'
      );
      const hotelsResultsResponse =
        await networkAdapter.get('/api/nearbyHotels');

      const availableCitiesResponse = await networkAdapter.get(
        '/api/availableCities'
      );
      if (availableCitiesResponse) {
        setAvailableCities(availableCitiesResponse.data.elements);
      }

      if (popularDestinationsResponse) {
        setPopularDestinationsData({
          isLoading: false,
          data: popularDestinationsResponse.data.elements,
          errors: popularDestinationsResponse.errors,
        });
      }
      if (hotelsResultsResponse) {
        setHotelsResults({
          isLoading: false,
          data: hotelsResultsResponse.data.elements,
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
      <div className="container mx-auto">
        <PopularLocations popularDestinationsData={popularDestinationsData} />
        <div className="my-8">
          <h2 className="text-3xl font-medium text-slate-700 text-center my-2">
            Handpicked nearby rooms for you
          </h2>
          <ResultsContainer
            hotelsResults={hotelsResults}
            enableFilters={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
