import React, { useState, useEffect, useCallback } from 'react';
import GlobalSearchBox from '../../components/global-search-box/GlobalSearchbox';
import ResultsContainer from '../../components/results-container/ResultsContainer';
import isEmpty from '../../utils/helpers';
import { MAX_GUESTS_INPUT_VALUE } from '../../utils/constants';
import { formatDate } from '../../utils/date-helpers';
import { useLocation, useSearchParams } from 'react-router-dom';
import { parse } from 'date-fns';
import PaginationController from '../../components/ux/pagination-controller/PaginationController';
import { SORTING_FILTER_LABELS } from '../../utils/constants';

const HotelsSearch = () => {
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
  const [locationInputValue, setLocationInputValue] = useState('pune');
  const [numGuestsInputValue, setNumGuestsInputValue] = useState('');
  const [availableCities, setAvailableCities] = useState([]);
  const [currentResultsPage, setCurrentResultsPage] = useState(1);
  const [filtersData, setFiltersData] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });
  const [hotelsResults, setHotelsResults] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });

  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);
  const [sortByFilterValue, setSortByFilterValue] = useState({
    value: 'default',
    label: 'Sort by',
  });
  const [selectedFiltersState, setSelectedFiltersState] = useState({});

  const [filteredTypeheadResults, setFilteredTypeheadResults] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const sortingFilterOptions = [
    { value: 'default', label: 'Sort by' },
    { value: 'priceLowToHigh', label: SORTING_FILTER_LABELS.PRICE_LOW_TO_HIGH },
    { value: 'priceHighToLow', label: SORTING_FILTER_LABELS.PRICE_HIGH_TO_LOW },
  ];


  const onSortingFilterChange = (selectedOption) => {
    setSortByFilterValue(selectedOption);
  };

  // Assuming you have a function to apply filters to your hotels
  const filterHotels = (allFilters, hotelsData) => {
    const filteredHotels = hotelsData.filter(hotel => {
      return allFilters.every(filterGroup => {
        // Only check filters that are selected
        const selectedFilters = filterGroup.filters.filter(f => f.isSelected);
        if (selectedFilters.length === 0) return true; // No filter selected in this group
        return selectedFilters.some(filter => {
          // Safely access feedbacks if they exist
          if (filterGroup.filterId === 'star_ratings' && hotel.feedbacks && hotel.feedbacks.length > 0) {
            return hotel.feedbacks[0].feedback_vote >= filter.value;
          } else if (filterGroup.filterId === 'propety_type') {
            return hotel.room_type === filter.value;
          }
          return false;
        });
      });
    });
  
    return filteredHotels;
  };

  const onFiltersUpdate = (updatedFilter) => {
    // Update the selected filters state and filter the hotels data
    setSelectedFiltersState((selectedFiltersState) => {
      const newFiltersState = selectedFiltersState.map((filterGroup) => {
        if (filterGroup.filterId === updatedFilter.filterId) {
          return {
            ...filterGroup,
            filters: filterGroup.filters.map((filter) => {
              if (filter.id === updatedFilter.id) {
                return {
                  ...filter,
                  isSelected: !filter.isSelected,
                };
              }
              return filter;
            }),
          };
        }
        return filterGroup;
      });
      // Once the filters are updated, apply them to filter the hotels data
      const filteredHotels = filterHotels(newFiltersState, hotelsResults.data);

      // Update the hotels results state
      
      setHotelsResults({
        isLoading: false,
        data: filteredHotels,
        errors: [],
      });

      return newFiltersState;
    });
  };

  const onDateChangeHandler = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const onSearchButtonAction = () => {
    const activeFilters = getActiveFilters();
    const numGuest = Number(numGuestsInputValue);
    const checkInDate = formatDate(dateRange.startDate) ?? '';
    const checkOutDate = formatDate(dateRange.endDate) ?? '';
    setSearchParams({
      city: locationInputValue,
      numGuests: numGuestsInputValue,
    });
    fetchHotels({
      city: locationInputValue,
      ...activeFilters,
      guests: numGuest,
      checkInDate,
      checkOutDate,
    });
  };

  const getActiveFilters = () => {
    const filters = {};
    selectedFiltersState.forEach((category) => {
      const selectedValues = category.filters
        .filter((filter) => filter.isSelected)
        .map((filter) => filter.value);

      if (selectedValues.length > 0) {
        filters[category.filterId] = selectedValues;
      }
    });
    if (!isEmpty(filters)) {
      return filters;
    }
    return null;
  };

  // Toggles the visibility of the date picker
  const onDatePickerIconClick = () => {
    setisDatePickerVisible(!isDatePickerVisible);
  };

  const onLocationChangeInput = async (newValue) => {
    setLocationInputValue(newValue);
  };


  function queryResults(query, availableCities) {
    const filteredResults = availableCities
      .filter((city) => city.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
    setFilteredTypeheadResults(filteredResults);
  }

  const onNumGuestsInputChange = (numGuests) => {
    if (numGuests < MAX_GUESTS_INPUT_VALUE && numGuests > 0) {
      setNumGuestsInputValue(numGuests);
    }
  };

  const onClearFiltersAction = () => {
    const hasActiveFilters = selectedFiltersState.some((filterGroup) =>
      filterGroup.filters.some((filter) => filter.isSelected)
    );

    if (hasActiveFilters) {
      setSelectedFiltersState(
        selectedFiltersState.map((filterGroup) => ({
          ...filterGroup,
          filters: filterGroup.filters.map((filter) => ({
            ...filter,
            isSelected: false,
          })),
        }))
      );
    }
  };


  const fetchHotels = async (filters) => {
    const hotelsResultsResponse = await fetch(`http://localhost:8080/api/room?checkIn=${dateRange[0].startDate}&checkOut=${dateRange[0].endDate}`);
    if (hotelsResultsResponse) {
      setHotelsResults({
        isLoading: false,
        data: await hotelsResultsResponse.json(),
        errors: [],
        pagination: 1,
      });
    }
  };

  const getVerticalFiltersData = async () => {
    const filtersDataResponse = [
      {
        filterId: 'star_ratings',
        title: 'Star ratings',
        filters: [
          {
            id: '5_star_rating',
            title: '5 Star',
            value: 5,
            
          },
          {
            id: '4_star_rating',
            title: '4 Star',
            value: 4,
            
          },
          {
            id: '3_star_rating',
            title: '3 Star',
            value: 3,
            
          },
        ],
      },
      {
        filterId: 'propety_type',
        title: 'Property type',
        filters: [
          {
            id: 'prop_type_hotel',
            title: 'PRESIDENT',
            value: 'President',
            
          },
          {
            id: 'prop_type_apartment',
            title: 'VIP',
            value: 'VIP',
            
          },
          {
            id: 'prop_type_villa',
            title: 'Normal',
            value: 'Normal',
            
          },
        ],
      },
    ];
    if (filtersDataResponse) {
      setFiltersData({
        isLoading: false,
        data: filtersDataResponse,
        errors: filtersDataResponse.errors,
      });
    }
  };

  const handlePageChange = (page) => {
    setCurrentResultsPage(page);
  };

  const handlePreviousPageChange = () => {
    setCurrentResultsPage((prev) => {
      if (prev <= 1) return prev;
      return prev - 1;
    });
  };

  const handleNextPageChange = () => {
    setCurrentResultsPage((prev) => {
      if (prev >= hotelsResults.pagination.totalPages) return prev;
      return prev + 1;
    });
  };
  const fetchAvailableCities = async () => {

    setAvailableCities(['pune', 'bangalore', 'mumbai']);

  };

  useEffect(() => {
    fetchAvailableCities();
    getVerticalFiltersData();
  }, []);

  useEffect(() => {
    if (searchParams.get('city')) {
      setLocationInputValue(searchParams.get('city'));
    }

    if (searchParams.get('numGuests')) {
      setNumGuestsInputValue(searchParams.get('numGuests'));
    }
  }, [searchParams]);

  useEffect(() => {
    setSelectedFiltersState(
      filtersData.data.map((filterGroup) => ({
        ...filterGroup,
        filters: filterGroup.filters.map((filter) => ({
          ...filter,
          isSelected: false,
        })),
      }))
    );
  }, [filtersData]);

  useEffect(() => {
    if (selectedFiltersState.length > 0) {
      const activeFilters = getActiveFilters();
      if (activeFilters) {
        activeFilters.city = locationInputValue.toLowerCase();
        fetchHotels(activeFilters);
      } else {
        fetchHotels({
          city: locationInputValue,
        });
      }
      console.log(hotelsResults.data.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFiltersState, currentResultsPage, sortByFilterValue]);

  useEffect(() => {
    if (location.state) {
      const { city, numGuest, checkInDate, checkOutDate } = location.state;
      if (numGuest) {
        setNumGuestsInputValue(numGuest.toString());
      }
      setLocationInputValue(city);
      if (checkInDate && checkOutDate) {
        setDateRange([
          {
            startDate: parse(checkInDate, 'dd/MM/yyyy', new Date()),
            endDate: parse(checkOutDate, 'dd/MM/yyyy', new Date()),
            key: 'selection',
          },
        ]);
      }
    }
  }, [location]);

  return (
    <div className="hotels">
      <div className="bg-brand px-2 lg:h-[120px] h-[220px] flex items-center justify-center">
        <GlobalSearchBox
          locationInputValue={locationInputValue}
          locationTypeheadResults={filteredTypeheadResults}
          numGuestsInputValue={numGuestsInputValue}
          isDatePickerVisible={isDatePickerVisible}
          setisDatePickerVisible={setisDatePickerVisible}
          onLocationChangeInput={onLocationChangeInput}
          onNumGuestsInputChange={onNumGuestsInputChange}
          dateRange={dateRange}
          onDateChangeHandler={onDateChangeHandler}
          onDatePickerIconClick={onDatePickerIconClick}
          onSearchButtonAction={onSearchButtonAction}
        />
      </div>
      <div className="my-4"></div>
      <div className="w-[180px]"></div>
      <ResultsContainer
        hotelsResults={hotelsResults}
        enableFilters={true}
        filtersData={filtersData.data}
        onFiltersUpdate={onFiltersUpdate}
        onClearFiltersAction={onClearFiltersAction}
        selectedFiltersState={selectedFiltersState}
        sortByFilterValue={sortByFilterValue}
        onSortingFilterChange={onSortingFilterChange}
        sortingFilterOptions={sortingFilterOptions}
      />
      {hotelsResults.pagination?.totalPages > 1 && (
        <div className="my-4">
          <PaginationController
            currentPage={currentResultsPage}
            totalPages={hotelsResults.pagination?.totalPages}
            handlePageChange={handlePageChange}
            handlePreviousPageChange={handlePreviousPageChange}
            handleNextPageChange={handleNextPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default HotelsSearch;
