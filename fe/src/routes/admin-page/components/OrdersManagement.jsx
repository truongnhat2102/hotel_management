import React, { useState } from 'react';

function OrderManagement({ orderFetch }) {
    const [orders, setOrders] = useState(orderFetch);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);

    // Function to open the delete confirmation modal
    const handleOpenModal = (order) => {
        setCurrentOrder(order);
        setModalOpen(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // Function to handle deleting an order
    const handleDeleteOrder = (orderId) => {
        fetch(`http://localhost:8080/order/delete/${orderId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log("Order deleted successfully:", data);
            setOrders(orders.filter(order => order.order_id !== orderId));
            handleCloseModal(); // Close the modal after deletion
        })
        .catch(error => {
            console.error('Error deleting the order:', error);
        });
    };

    // Confirmation Modal
    const ConfirmationModal = () => (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-lg">Confirm Deletion</h2>
                <p>Are you sure you want to delete this order?</p>
                <div className="flex justify-around mt-4">
                    <button onClick={() => handleDeleteOrder(currentOrder.order_id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Delete
                    </button>
                    <button onClick={handleCloseModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders.map(order => (
                    <div key={order.order_id} className="p-4 border rounded shadow">
                        <h4 className="text-lg font-bold">{order.user.username}</h4>
                        <p>Status: {order.order_status}</p>
                        <p>Price: {order.order_totalPrice} VND</p>
                        <div className="flex justify-end space-x-2 mt-2">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                onClick={() => handleOpenModal(order)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {modalOpen && <ConfirmationModal />}
        </div>
    );
}

export default OrderManagement;