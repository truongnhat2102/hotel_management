import Review from './components/Review';
import React, { useState } from 'react';
import RatingsOverview from './components/RatingsOverview';
import UserRatingsSelector from './components/UserRatingsSelector';
import Toast from '../../../../components/ux/toast/Toast';
import PaginationController from '../../../../components/ux/pagination-controller/PaginationController';
import Loader from '../../../../components/ux/loader/loader';


const UserReviews = ({
  reviewData,
  handlePageChange,
  handlePreviousPageChange,
  handleNextPageChange,
  room_id,
  setReviewData
}) => {
  const [userRating, setUserRating] = useState(0);

  const [userReview, setUserReview] = useState('');

  const [shouldHideUserRatingsSelector, setShouldHideUserRatingsSelector] =
    useState(false);

  const [toastMessage, setToastMessage] = useState('');

  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleRating = (rate) => {
    setUserRating(rate);
  };

  const clearToastMessage = () => {
    setToastMessage('');
  };

  const handleReviewSubmit = async () => {
    console.log(reviewData.data);
    try {
      const response = await fetch('http://localhost:8080/feedback/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount_star: userRating,
          feedbacks_content: userReview,
          username: user.username,
          room_id: room_id,
          room: room_id
        })
      });
      

      if (response.ok) {
        const responseData = await response.json();
        setToastMessage({
          type: 'success',
          message: "Oke",
        });
        setReviewData({
          isLoading: false,
          data: [...reviewData.data, responseData],
        })

      } else {
        setToastMessage({
          type: 'error',
          message: 'Review submission failed',
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setToastMessage({
        type: 'error',
        message: 'Network or server error',
      });
    }
  };

  const handleUserReviewChange = (review) => {
    setUserReview(review);
  };

  const isEmpty = reviewData.data.length === 0;

  return (
    <div className="flex flex-col p-4 border-t">
      <h1 className="text-xl font-bold text-gray-700">User Reviews</h1>
      <div className="flex flex-col md:flex-row py-4 bg-white shadow-sm gap-6">
        {reviewData?.data?.length === 0 ? (
          <div className="w-3/5">
            <span className="text-gray-500 italic">
              Be the first to leave a review!
            </span>
          </div>
        ) : (
          <RatingsOverview
            reviewData = {reviewData}
          />
        )}
        {shouldHideUserRatingsSelector ? null : (
          <UserRatingsSelector
            userRating={userRating}
            isEmpty={isEmpty}
            handleRating={handleRating}
            userReview={userReview}
            handleReviewSubmit={handleReviewSubmit}
            handleUserReviewChange={handleUserReviewChange}
          />
        )}
      </div>
      {toastMessage && (
        <Toast
          type={toastMessage.type}
          message={toastMessage.message}
          dismissError={clearToastMessage}
        />
      )}
      <div>
        {reviewData.isLoading ? (
          <Loader height={'600px'} />
        ) : (
          <div>
            {reviewData.data.map(review => (
              <Review
                key={review.feedback_id}
                reviewerName={review.user.username}
                reviewDate={review.feedback_dateEdit}
                review={review.feedback_comment}
                rating={review.feedback_vote}
                verified={true}
              />
            ))}
          </div>
        )}
      </div>
      {reviewData.data.length > 0 && (
        <PaginationController
          currentPage={1}
          totalPages={1}
          handlePageChange={handlePageChange}
          handlePreviousPageChange={handlePreviousPageChange}
          handleNextPageChange={handleNextPageChange}
        />
      )}
    </div>
  );
};

export default UserReviews;
