import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDestinationApi } from '../apis/Api';
import { toast } from 'react-toastify';

const HomePage = () => {
  const [destinations, setDestinations] = useState([])
  useEffect(() => {
    getDestinationApi().then((res) => {
      if (res.data.success) {
        toast.success(res.data.success)
        setDestinations(res.data.recent)
      } else {
        toast.error('Couldnot fetch')
      }
    })
  }, [])
  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <img src="assets/images/home1.png" alt="Hero" className="w-full h-96 object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-4">Find Your Best Holiday</h1>
          <p className="mb-6">Perfect adventure holidays in Nepal</p>
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 w-64 rounded-l-md focus:outline-none"
            />
            <button className="bg-[#54A15D] hover:bg-[#54A15D] px-4 py-2 rounded-r-md text-white">SEARCH</button>
          </div>
        </div>
      </div>

      {/* Destinations Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className='flex flex-row justify-between'>
            <h2 className="text-3xl font-bold text-center mb-8"></h2>
            <h2 className="text-3xl font-bold text-center mb-8">Popular Destinations</h2>
            <Link to={'/dest'} className="text-xl font-bold text-center mb-8">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations?.map((destination, index) => (
              <Link to={`/desc/${destination?._id}`} key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                  <img src={destination?.destinationImageUrl} alt={destination?.destinationName} className="w-full h-48 object-cover" />
                  <span className="absolute top-2 left-2 bg-[#54A15D] text-white py-1 px-3 text-xs rounded">3 Days 4 Nights</span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{destination?.destinationName}</h3>
                  <p className="text-gray-700 mb-2">{destination?.district}</p>
                  <p className="text-[#54A15D] font-semibold">Starting From Rs. {destination?.price}</p>
                  <button className="mt-4 bg-[#54A15D] hover:bg-[#54A15D] text-white py-2 px-4 rounded-md">See More</button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Book With Us Section */}
      <section className="relative bg-cover bg-center py-16" style={{ backgroundImage: "url('/assets/images/book.png')" }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative container mx-auto px-4 text-white">
          <h2 className="text-4xl font-bold text-center mb-4">Why Book with Us</h2>
          <p className="text-center mb-12">Let your visitors know why they should trust you and book with you. </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start space-x-4">
                <FontAwesomeIcon icon={faCheckCircle} className="text-[#54A15D] mt-1" />
                <div>
                  <h4 className="font-bold">TripAdvisor Multiple Award winning company</h4>
                  <p>We’ve received Certificate of Excellence award from TripAdvisor, the world’s largest travel website.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FontAwesomeIcon icon={faCheckCircle} className="text-[#54A15D] mt-1" />
                <div>
                  <h4 className="font-bold">Local Experts. Middle-man Free Pricing</h4>
                  <p>We’re a local travel agency. When you book with us, you get best possible price, which is middle-man free.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start space-x-4">
                <FontAwesomeIcon icon={faCheckCircle} className="text-[#54A15D] mt-1" />
                <div>
                  <h4 className="font-bold">100% Customizable</h4>
                  <p>Tell us about your trip requirement. We’ll work together to customize your trip to meet your exact requirement so that you have a memorable trip.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FontAwesomeIcon icon={faCheckCircle} className="text-[#54A15D] mt-1" />
                <div>
                  <h4 className="font-bold">No Hidden Charges</h4>
                  <p>We don’t add hidden extra cost. All trips include travel permit, lodging and fooding. There are no surprises with hidden costs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outdoor Activities Section
      <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Outdoor Activities</h2>
          <p className="text-center mb-8">This is the best place to show your other travel packages. </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                  <img src={activity.image} alt={activity.name} className="w-full h-48 object-cover" />
                  {activity.discount && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">{activity.discount}</div>
                  )}
                  <div className="absolute bottom-0 left-0 bg-[#54A15D] text-white px-2 py-1 text-xs font-bold">${activity.price}</div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{activity.name}</h3>
                  <p className="text-gray-700 mb-2">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#54A15D] mr-1" />
                    {activity.locations.join(', ')}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <FontAwesomeIcon icon={faClock} className="text-[#54A15D] mr-1" />
                    {activity.duration}
                  </p>
                  <button className="mt-4 bg-[#54A15D] hover:bg-[#54A15D] text-white py-2 px-4 rounded-md">VIEW DETAIL</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Subscription Section */}
      <section className="relative bg-cover bg-center py-16" style={{ backgroundImage: "url('assets/images/sus.png')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Get 20% OFF Your First <span className="text-[#54A15D]">TRIP!!</span></h2>
          <p className="mb-6">Don't Wanna Miss Something? Subscribe Right Now & Get The Special Discount & Monthly Newsletter.</p>
          <div className="flex justify-center mb-8">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 w-64 rounded-l-md focus:outline-none"
            />
            <button className="bg-[#54A15D] hover:bg-green-600 px-4 py-2 rounded-r-md text-white">Subscribe</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white text-black p-6 rounded-md shadow-md">
              <div className="text-[#54A15D] text-4xl font-bold">500</div>
              <div className="mt-2">Awesome Tour</div>
            </div>
            <div className="bg-white text-black p-6 rounded-md shadow-md">
              <div className="text-[#54A15D] text-4xl font-bold">300</div>
              <div className="mt-2">New Destinations</div>
            </div>
            <div className="bg-white text-black p-6 rounded-md shadow-md">
              <div className="text-[#54A15D] text-4xl font-bold">10</div>
              <div className="mt-2">Year Experience</div>
            </div>
            <div className="bg-white text-black p-6 rounded-md shadow-md">
              <div className="text-[#54A15D] text-4xl font-bold">150</div>
              <div className="mt-2">Best Mountains</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// const destinations = [
//   { name: 'Fewa Tal', location: 'Pokhara', price: '7000', image: '/assets/images/fewa.png' },
//   { name: 'Rara Lake', location: 'Mugu', price: '7000', image: '/assets/images/rara.png' },
//   { name: 'Mustang', location: 'Manang', price: '7000', image: '/assets/images/mus.png' },
//   { name: 'Shey Phoksundo', location: 'Dolpa', price: '7000', image: '/assets/images/shey.png' },
//   { name: 'Tilicho', location: 'Manang', price: '7000', image: '/assets/images/til.png' },
//   { name: 'Annapurna Base Camp', location: 'Kaski', price: '7000', image: '/assets/images/abc.png' }
// ];

const activities = [
  {
    name: 'Paragliding',
    price: '1500',
    image: '/path/to/image1.jpg',
    locations: ['Bhutan', 'India', 'Japan', 'London', 'Maldives', 'Morocco', 'Nepal', 'Paris', 'Prague', 'San Francisco', 'Tibet', 'Venice'],
    duration: '8 Days',
    discount: '12% Off',
  },
  {
    name: 'Tilicho lake Trek',
    price: '1500',
    image: '/path/to/image2.jpg',
    locations: ['Bhutan', 'India', 'Japan', 'London', 'Maldives', 'Morocco', 'Nepal', 'Paris', 'Prague', 'San Francisco', 'Tibet', 'Venice'],
    duration: '11 Days',
    discount: '12% Off',
  },
  {
    name: 'Lake Kayaking',
    price: '1300',
    image: '/path/to/image3.jpg',
    locations: ['Bhutan', 'India', 'Japan', 'London', 'Maldives', 'Morocco', 'Nepal', 'Paris', 'Prague', 'San Francisco', 'Tibet', 'Venice'],
    duration: '15 Days',
    discount: '7% Off',
  },
  {
    name: 'Elephant Ride',
    price: '1700',
    image: '/path/to/image4.jpg',
    locations: ['Bhutan', 'India', 'Japan', 'London', 'Maldives', 'Morocco', 'Nepal', 'Paris', 'Prague', 'San Francisco', 'Tibet', 'Venice'],
    duration: '15 Days',
    discount: '11% Off',
  },
  {
    name: 'Trishuli River Rafting',
    price: '1300',
    image: '/path/to/image5.jpg',
    locations: ['Bhutan', 'India', 'Japan', 'London', 'Maldives', 'Morocco', 'Nepal', 'Paris', 'Prague', 'San Francisco', 'Tibet', 'Venice'],
    duration: '15 Days',
    discount: '24% Off',
  },
  {
    name: 'Tower Bridge, London',
    price: '1200',
    image: '/path/to/image6.jpg',
    locations: ['Bhutan', 'India', 'Japan', 'London', 'Maldives', 'Morocco', 'Nepal', 'Paris', 'Prague', 'San Francisco', 'Tibet', 'Venice'],
    duration: '15 Days',
    discount: '29% Off',
  },
];

export default HomePage;
