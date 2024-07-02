import React, { useState } from 'react';

const initialBookings = [
  {
    id: 1,
    guestName: 'John Doe',
    room: '101',
    checkIn: '2024-06-20',
    checkOut: '2024-06-25',
    status: 'Confirmed',
  },
  {
    id: 2,
    guestName: 'Jane Smith',
    room: '102',
    checkIn: '2024-06-21',
    checkOut: '2024-06-24',
    status: 'Pending',
  },
  {
    id: 3,
    guestName: 'James Brown',
    room: '103',
    checkIn: '2024-06-22',
    checkOut: '2024-06-26',
    status: 'Cancelled',
  },
  {
    id: 4,
    guestName: 'Emily Johnson',
    room: '104',
    checkIn: '2024-06-23',
    checkOut: '2024-06-27',
    status: 'Confirmed',
  },
  {
    id: 5,
    guestName: 'Michael Davis',
    room: '105',
    checkIn: '2024-06-24',
    checkOut: '2024-06-28',
    status: 'Pending',
  },
  {
    id: 6,
    guestName: 'Sophia Wilson',
    room: '106',
    checkIn: '2024-06-25',
    checkOut: '2024-06-29',
    status: 'Cancelled',
  },
  {
    id: 7,
    guestName: 'William Martinez',
    room: '107',
    checkIn: '2024-06-26',
    checkOut: '2024-06-30',
    status: 'Confirmed',
  },
  {
    id: 8,
    guestName: 'Olivia Anderson',
    room: '108',
    checkIn: '2024-06-27',
    checkOut: '2024-07-01',
    status: 'Pending',
  },
  {
    id: 9,
    guestName: 'Daniel Garcia',
    room: '109',
    checkIn: '2024-06-28',
    checkOut: '2024-07-02',
    status: 'Cancelled',
  },
  {
    id: 10,
    guestName: 'Ava Lopez',
    room: '110',
    checkIn: '2024-06-29',
    checkOut: '2024-07-03',
    status: 'Confirmed',
  },
  {
    id: 11,
    guestName: 'Ethan Wilson',
    room: '111',
    checkIn: '2024-06-30',
    checkOut: '2024-07-04',
    status: 'Pending',
  },
  {
    id: 12,
    guestName: 'Isabella Brown',
    room: '112',
    checkIn: '2024-07-01',
    checkOut: '2024-07-05',
    status: 'Cancelled',
  },
  {
    id: 13,
    guestName: 'Alexander Taylor',
    room: '113',
    checkIn: '2024-07-02',
    checkOut: '2024-07-06',
    status: 'Confirmed',
  },
  {
    id: 14,
    guestName: 'Mia Moore',
    room: '114',
    checkIn: '2024-07-03',
    checkOut: '2024-07-07',
    status: 'Pending',
  },
  {
    id: 15,
    guestName: 'James Rodriguez',
    room: '115',
    checkIn: '2024-07-04',
    checkOut: '2024-07-08',
    status: 'Cancelled',
  },
  {
    id: 16,
    guestName: 'Emma Garcia',
    room: '116',
    checkIn: '2024-07-05',
    checkOut: '2024-07-09',
    status: 'Confirmed',
  },
  {
    id: 17,
    guestName: 'Lucas Perez',
    room: '117',
    checkIn: '2024-07-06',
    checkOut: '2024-07-10',
    status: 'Pending',
  },
  {
    id: 18,
    guestName: 'Charlotte Hernandez',
    room: '118',
    checkIn: '2024-07-07',
    checkOut: '2024-07-11',
    status: 'Cancelled',
  },
  {
    id: 19,
    guestName: 'Benjamin Gonzalez',
    room: '119',
    checkIn: '2024-07-08',
    checkOut: '2024-07-12',
    status: 'Confirmed',
  },
  {
    id: 20,
    guestName: 'Amelia Martinez',
    room: '120',
    checkIn: '2024-07-09',
    checkOut: '2024-07-13',
    status: 'Pending',
  },
  {
    id: 21,
    guestName: 'Jacob Robinson',
    room: '121',
    checkIn: '2024-07-10',
    checkOut: '2024-07-14',
    status: 'Cancelled',
  },
  {
    id: 22,
    guestName: 'Sophia Thompson',
    room: '122',
    checkIn: '2024-07-11',
    checkOut: '2024-07-15',
    status: 'Confirmed',
  },
  {
    id: 23,
    guestName: 'Logan Wilson',
    room: '123',
    checkIn: '2024-07-12',
    checkOut: '2024-07-16',
    status: 'Pending',
  },
  {
    id: 24,
    guestName: 'Madison Lee',
    room: '124',
    checkIn: '2024-07-13',
    checkOut: '2024-07-17',
    status: 'Cancelled',
  },
  {
    id: 25,
    guestName: 'Gabriel White',
    room: '125',
    checkIn: '2024-07-14',
    checkOut: '2024-07-18',
    status: 'Confirmed',
  },
  {
    id: 26,
    guestName: 'Abigail Perez',
    room: '126',
    checkIn: '2024-07-15',
    checkOut: '2024-07-19',
    status: 'Pending',
  },
  {
    id: 27,
    guestName: 'Carter Flores',
    room: '127',
    checkIn: '2024-07-16',
    checkOut: '2024-07-20',
    status: 'Cancelled',
  },
  {
    id: 28,
    guestName: 'Luna Hill',
    room: '128',
    checkIn: '2024-07-17',
    checkOut: '2024-07-21',
    status: 'Confirmed',
  },
  {
    id: 29,
    guestName: 'Jayden Scott',
    room: '129',
    checkIn: '2024-07-18',
    checkOut: '2024-07-22',
    status: 'Pending',
  },
  {
    id: 30,
    guestName: 'Harper Clark',
    room: '130',
    checkIn: '2024-07-19',
    checkOut: '2024-07-23',
    status: 'Cancelled',
  },
];

const itemsPerPage = 10; // Number of items per page

const BookingTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Slice bookings based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = initialBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const filteredBookings = currentBookings.filter((booking) => {
    const searchFilter = booking.guestName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const checkInFilter = checkInDate
      ? new Date(booking.checkIn) >= new Date(checkInDate)
      : true;
    const checkOutFilter = checkOutDate
      ? new Date(booking.checkOut) <= new Date(checkOutDate)
      : true;
    return searchFilter && checkInFilter && checkOutFilter;
  });

  const totalPages = Math.ceil(initialBookings.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-x-auto">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search by guest name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-4"
        />
        <label className="mr-2">Check-In:</label>
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-4"
        />
        <label className="mr-2">Check-Out:</label>
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Guest Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Room
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Check-In
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Check-Out
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {booking.guestName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.room}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.checkIn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.checkOut}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900 ml-4">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4">
          <button
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingTable;
