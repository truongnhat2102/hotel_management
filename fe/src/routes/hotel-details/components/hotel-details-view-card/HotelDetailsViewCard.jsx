import HotelBookingDetailsCard from '../hotel-booking-details-card/HotelBookingDetailsCard';
import UserReviews from '../user-reviews/UserReviews';
import React, { useEffect, useState } from 'react';
import ReactImageGallery from 'react-image-gallery';

const HotelDetailsViewCard = ({ hotelDetails }) => {
  const imageDetail = [hotelDetails.room_img1, hotelDetails.room_img2, hotelDetails.room_img3, hotelDetails.room_img4, hotelDetails.room_img5, hotelDetails.room_img6]
  const images = imageDetail.map((image) => ({
    original: image,
    thumbnail: image,
    thumbnailClass: 'h-[80px]',
    thumbnailLoading: 'lazy',
  }));

  const [reviewData, setReviewData] = useState({
    isLoading: true,
    data: [],
  });
  const [currentReviewsPage, setCurrentReviewPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentReviewPage(page);
  };

  const handlePreviousPageChange = () => {
    setCurrentReviewPage((prev) => {
      if (prev <= 1) return prev;
      return prev - 1;
    });
  };

  const handleNextPageChange = () => {
    setCurrentReviewPage((prev) => {
      if (prev >= reviewData.pagination.totalPages) return prev;
      return prev + 1;
    });
  };

  useEffect(() => {
    setReviewData({
      isLoading: true,
      data: [],
    });
    const fetchHotelReviews = async () => {
      try {
        const response = await fetch(`http://localhost:8080/feedback/room/${hotelDetails.room_id}/reviews`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Ensure the response has content before trying to parse it
        const text = await response.text();
        if (!text) {
          console.error('No data returned from the server');
          return;
        }

        const data = JSON.parse(text);
        if (data.length === 0) {
          console.error('No reviews found.');
          return;
        }

        const averageRating = data.reduce((acc, cur) => acc + cur.feedback_vote, 0) / data.length;
        const metadata = {
          averageRating: averageRating,
          ratingsCount: data.length,
          starCounts: 5
        };

        setReviewData({
          isLoading: false,
          data: data,
          metadata: metadata,
          // Assuming pagination details are correctly included in the response
          pagination: response.paging,
        });

      } catch (error) {
        console.error('Failed to fetch hotel reviews:', error.message);
        // Handle the error appropriately in your UI
        setReviewData({
          isLoading: false,
          error: error.message
        });
      }
    };
    fetchHotelReviews();
  }, [hotelDetails.hotelCode, currentReviewsPage]);

  return (
    <div className="flex items-start justify-center flex-wrap md:flex-nowrap container mx-auto p-4">
      <div className="w-[800px] bg-white shadow-lg rounded-lg overflow-hidden">
        <div>
          <div className="relative w-full">
            <ReactImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={false}
            />
            {hotelDetails.discount && (
              <div className="absolute top-0 right-0 m-4 px-2 py-1 bg-yellow-500 text-white font-semibold text-xs rounded">
                15% OFF
              </div>
            )}
          </div>
          <div className="p-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              {hotelDetails.room_name}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {hotelDetails.room_description}
            </p>
            <div className="mt-2 space-y-2">
              {/* {hotelDetails.description.map((line, index) => (
                <p key={index} className="text-gray-700">
                  {line}
                </p>
              ))} */}
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-sm text-gray-600">
                  {/* {hotelDetails.benefits.join(' | ')} */}
                </p>
              </div>
            </div>
          </div>
        </div>
        <UserReviews
          reviewData={reviewData}
          setReviewData={setReviewData}
          handlePageChange={handlePageChange}
          handlePreviousPageChange={handlePreviousPageChange}
          handleNextPageChange={handleNextPageChange}
          room_id={hotelDetails.room_id}
        />
      </div>
      <HotelBookingDetailsCard hotelCode={hotelDetails.room_id} />
    </div>
  );
};

export default HotelDetailsViewCard;
