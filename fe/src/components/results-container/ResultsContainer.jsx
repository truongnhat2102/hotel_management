import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import HotelViewCard from '../../components/hotel-view-card/HotelViewCard';
import HotelViewCardSkeleton from '../../components/hotel-view-card-skeleton/HotelViewCardSkeleton';
import VerticalFiltersSkeleton from '../../components/vertical-filters-skeleton/VerticalFiltersSkeleton';
import EmptyHotelsState from '../../components/empty-hotels-state/EmptyHotelsState';
import useOutsideClickHandler from '../../hooks/useOutsideClickHandler';
import Checkbox from '../../components/ux/checkbox/Checkbox';

const ResultsContainer = ({
  hotelsResults,
  enableFilters,
  filtersData,
  selectedFiltersState,
  onFiltersUpdate,
  onClearFiltersAction,
  sortingFilterOptions,
  sortByFilterValue,
  onSortingFilterChange,
}) => {
  const isSortingFilterVisible =
    sortingFilterOptions && sortingFilterOptions.length > 0;

  const [isVerticalFiltersOpen, setIsVerticalFiltersOpen] = useState(false);
  const [localFiltersData, setLocalFiltersData] = useState(filtersData);

  const wrapperRef = useRef();
  const buttonRef = useRef();

  useOutsideClickHandler(wrapperRef, (event) => {
    if (!buttonRef.current.contains(event.target)) {
      setIsVerticalFiltersOpen(false);
    }
  });

  useEffect(() => {
    setLocalFiltersData(filtersData);
  }, [filtersData]);

  const toggleVerticalFiltersAction = () => {
    setIsVerticalFiltersOpen((prevState) => !prevState);
  };

  const isActiveFilterSelected = () => {
    return localFiltersData.some((filterGroup) =>
      filterGroup.filters.some((subfilter) => subfilter.isSelected)
    );
  };

  return (
    <div className="relative">
      <div className="flex gap-x-0 md:gap-x-4 items-start mx-2">
        {enableFilters && selectedFiltersState.length > 0 && (
          <div ref={wrapperRef}>
            <div
              className={`hotels-filters__container shadow-lg border w-[240px] z-10 ${isVerticalFiltersOpen ? '' : 'hidden'
                } absolute top-10 left-2 bg-white md:block md:static md:shadow-none`}
              data-testid="vertical-filters"
            >
              <div className="hotels-filters__header flex justify-between items-center py-2 border-b-2  px-4">
                <h4 className="text-base font-bold text-slate-600 uppercase">
                  Filters
                </h4>
                <button
                  className={`text-sm inline-flex items-center px-2.5 py-1.5 border border-gray-300 font-medium rounded text-gray-700 bg-white ${isActiveFilterSelected()
                      ? 'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      : 'cursor-not-allowed'
                    }`}
                  onClick={onClearFiltersAction}
                >
                  Clear
                </button>
              </div>
              {localFiltersData.map((filter) => (
                <div className="border-b-2" key={filter.filterId}>
                  <h4 className="text-base font-bold text-slate-600 my-1 px-2">
                    {filter.title}
                  </h4>
                  {filter.filters.map((subfilter) => (
                    <Checkbox
                      key={subfilter.id}
                      id={subfilter.id}
                      label={subfilter.title}
                      isSelected={subfilter.isSelected}
                      onFiltersUpdate={onFiltersUpdate}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        {enableFilters && filtersData.isLoading && <VerticalFiltersSkeleton />}
        <div className="flex flex-col w-full items-start">
          <div className="flex w-full justify-between px-2 md:px-0">
            {enableFilters && (
              <div className="vertical-filters__toggle-menu block md:hidden">
                <button
                  ref={buttonRef}
                  data-testid="vertical-filters__toggle-menu"
                  onClick={toggleVerticalFiltersAction}
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FontAwesomeIcon icon={faFilter} size="sm" className="mr-1" />{' '}
                  Filters
                </button>
              </div>
            )}
            {isSortingFilterVisible && (
              <Select
                value={sortByFilterValue}
                onChange={onSortingFilterChange}
                options={sortingFilterOptions}
                className="mb-2 w-[180px] text-sm"
              />
            )}
          </div>
          <div className="hotels-results__container mx-2 md:mx-0 flex flex-col gap-y-2 w-full">
            {hotelsResults.isLoading ? (
              Array.from({ length: 5 }, (_, index) => (
                <HotelViewCardSkeleton key={index} />
              ))
            ) : hotelsResults?.data?.length > 0 ? (
              hotelsResults.data.map((room) => (
                <HotelViewCard
                  key={room.room_id}
                  id={room.room_id}
                  title={room.room_title}
                  image={room.room_img1}
                  subtitle={room.room_description}
                  benefits={room.room_status}
                  ratings={room?.feedBacks || []}
                  price={room.room_price}
                />
              ))
            ) : (
              <EmptyHotelsState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsContainer;