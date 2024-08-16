import React, { useState, useEffect } from 'react';
import { getUserBookingApi, updatePasswordApi } from '../apis/Api'; // Make sure you import the correct API functions
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [bookings, setBookings] = useState([]);
  const userData = localStorage.getItem("user");
  const userId = userData ? JSON.parse(userData)._id : null;

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getUserBookingApi(userId);
      if (response.data.success) {
        setBookings(response.data.bookings);
      } else {
        console.error('Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await updatePasswordApi(userId, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (response.data.success) {
        toast.success('Password updated successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error updating password: ' + error.message);
    }
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">My Profile</h1>
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
          <form onSubmit={handleSubmitPasswordChange} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#54A15D] focus:border-[#54A15D]"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#54A15D] focus:border-[#54A15D]"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#54A15D] focus:border-[#54A15D]"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit" className="w-full bg-[#54A15D] hover:bg-[#54A15D] text-white font-bold py-2 px-4 rounded">
              Change Password
            </button>
          </form>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">My Bookings</h2>
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Dates
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 font-bold whitespace-no-wrap">
                          {booking.destinationId.destinationName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {formatDate(booking.datefrom)} - {formatDate(booking.dateto)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
