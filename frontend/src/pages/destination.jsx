import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getDestinationApi } from '../apis/Api';
import { Link } from 'react-router-dom';

// Sample data for destinations
// const destinations = [
//   { name: "Fewa Tal", location: "Pokhara", price: "Rs. 7000", image: "assets/images/fewa.png" },
//   { name: "Rara Lake", location: "Mugu", price: "Rs. 7000", image: "assets/images/rara.png" },
//   { name: "Mustang", location: "Manang", price: "Rs. 7000", image: "assets/images/mus.png" },
//   { name: "Shey Phoksundo", location: "Dolpa", price: "Rs. 7000", image: "assets/images/shey.png" },
//   { name: "Tilicho", location: "Manang", price: "Rs. 7000", image: "assets/images/til.png" },
//   { name: "Annapurna Base Camp", location: "Kaski", price: "Rs. 7000", image: "assets/images/abc.png" }

// ];

// Component for individual destination cards
const DestinationCard = ({ destination }) => {
  return (
    <Link to={`/desc/${destination?._id}`} className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="relative">
        <img src={destination?.destinationImageUrl} alt={destination?.destinationName} className="w-full h-48 object-cover" />
        <span className="absolute top-2 left-2 bg-[#54A15D] text-white py-1 px-3 text-xs rounded">3 Days 4 Nights</span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-xl mb-1">{destination?.destinationName}</h3>
        <p className="text-gray-700 text-base mb-3">{destination?.district}</p>
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-[#54A15D] hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition-colors duration-300"
            aria-label={`Book now for ${destination?.destinationName}`}>
            <span>See More</span>
            {/* <svg className="fill-current w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M0 0l10 10 10-10H0z"/>
              </svg> */}
          </button>
          <span className="text-lg font-semibold text-[#54A15D]">Rs.{destination?.price}</span>
        </div>
      </div>
    </Link>
  );
};

// Main component for the Explore Top Destinations page
const Dest = () => {
  const [destinations, setDestinations] = useState([]);
  useEffect(() => {
    getDestinationApi().then((res) => {
      if (res.data.success) {
        setDestinations(res.data.destinations)
      } else {
        toast.error(res.data.message)
      }
    })
  }, [])
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-cover h-64 bg-center flex items-center justify-center" style={{ backgroundImage: "url('assets/images/dest.png')" }}>
        {/* Header is disabled */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {destinations?.map(destination => (
          <DestinationCard key={destination.name} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default Dest;
