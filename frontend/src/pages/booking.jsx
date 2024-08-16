import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBookingApi, getDestinationByIdApi } from '../apis/Api';
import { toast } from 'react-toastify';

const BookingForm = () => {
  const { id: destinationId } = useParams();
  const userData = localStorage.getItem("user");
  const userId = userData ? JSON.parse(userData)._id : null;
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    userId: userId,
    destinationId: destinationId,
    datefrom: '',
    dateto: '',
    address: '',
    contact: ''
  });

  const [title, setTitle] = useState('Loading...');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    getDestinationByIdApi(destinationId)
      .then(response => {
        if (response.data.success) {
          setTitle(response.data.destination.destinationName);
        } else {
          toast.error('Destination details could not be fetched.');
        }
      })
      .catch(error => {
        toast.error('Error fetching destination details: ' + error.message);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching data
      });
  }, [destinationId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!formData.datefrom || !formData.dateto || !formData.address || !formData.contact) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const response = await createBookingApi(formData);
      if (response.data.success) {
        toast.success('Booking successful!');
        navigate(`/desc/${destinationId}`)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Booking failed: ' + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg relative">
        <div className="text-right">
          <button className="text-lg">&times;</button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <h2 className="text-lg font-bold">{title}</h2>
            <form onSubmit={handleBooking} className="space-y-4">
              <input
                type="date"
                name="datefrom"
                value={formData.datefrom}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="date"
                name="dateto"
                value={formData.dateto}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact No:"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
                Submit Booking
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
