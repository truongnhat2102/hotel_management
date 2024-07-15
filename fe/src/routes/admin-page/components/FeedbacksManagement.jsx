import React, { useState } from 'react';

// Modal component for confirmation of deletion with TailwindCSS
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm mx-auto">
                <p className="text-lg mb-4">Are you sure you want to delete this feedback?</p>
                <div className="flex justify-end gap-4">
                    <button onClick={onConfirm} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                    <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">Cancel</button>
                </div>
            </div>
        </div>
    );
};

// FeedbackItem component with TailwindCSS
const FeedbackItem = ({ feedback, onDelete }) => (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="mb-2">
            <p className="text-sm text-gray-600">Comment: {feedback.feedback_comment}</p>
            <p className="text-sm text-gray-600">Vote: {feedback.feedback_vote}</p>
            <p className="text-sm text-gray-600">Date Edited: {feedback.feedback_dateEdit}</p>
            <p className="text-sm text-gray-600">User: {feedback.user.username}</p>
        </div>
        <button onClick={() => onDelete(feedback.feedback_id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
    </div>
);

// FeedbackList component with TailwindCSS
const FeedbackList = ({ initialFeedbacks }) => {
    const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

    const handleDeleteClick = (feedbackId) => {
        setSelectedFeedbackId(feedbackId);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const confirmDelete = () => {
        setFeedbacks(feedbacks.filter(feedback => feedback.feedback_id !== selectedFeedbackId));
        closeModal();
    };

    return (
        <div className="container mx-auto my-8">
            {feedbacks.map(feedback => (
                <FeedbackItem key={feedback.feedback_id} feedback={feedback} onDelete={handleDeleteClick} />
            ))}
            <DeleteConfirmationModal isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmDelete} />
        </div>
    );
};

export default FeedbackList;