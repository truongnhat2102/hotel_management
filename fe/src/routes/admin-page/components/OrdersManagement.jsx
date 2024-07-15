import React, { useEffect, useState } from 'react';

function OrderManagement({orderFetch}) {
    const [orders, setOrders] = useState(orderFetch);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);

    const handleOpenModal = (order = { name: '', quantity: 0, price: 0 }) => {
        setCurrentOrder(order);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentOrder(null);
    };

    const handleSaveOrder = async (order) => {
        const response = await fetch('http://localhost:8080/order/save', {
            method: 'POST',
            headers: 'application/json',
            body: JSON.stringify(order)
        })
        if (response.ok) {
            if (order.id) {

                setOrders(orders.map(o => o.id === order.id ? order : o));
            } else {
                const newOrder = { ...order, id: orders.length + 1 };
                setOrders([...orders, newOrder]);
            }
        }

        handleCloseModal();
    };

    const handleDeleteOrder = (id) => {
        setOrders(orders.filter(order => order.id !== id));
    };

    

    return (
        <div className="p-5">
            <button
                className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleOpenModal()}
            >
                Add New Order
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders.map(order => (
                    <div key={order.order_id} className="p-4 border rounded shadow">
                        <h4 className="text-lg font-bold">{order.user.username}</h4>
                        <p>Status: {order.order_status}</p>
                        <p>Price: {order.order_totalPrice}VND</p>
                        <div className="flex justify-end space-x-2 mt-2">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                                onClick={() => handleOpenModal(order)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                onClick={() => handleDeleteOrder(order.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {modalOpen && (
                <OrderModal order={currentOrder} onSave={handleSaveOrder} onClose={handleCloseModal} />
            )}
        </div>
    );
}

function OrderModal({ order, onSave, onClose }) {
    const [formData, setFormData] = useState({ ...order });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">{order.id ? 'Edit Order' : 'New Order'}</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSave(formData);
                }}>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Product Name"
                            className="border w-full p-2 rounded"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="Quantity"
                            className="border w-full p-2 rounded"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="border w-full p-2 rounded"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Save
                        </button>
                        <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OrderManagement;