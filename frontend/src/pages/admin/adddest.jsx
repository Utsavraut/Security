import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createDestinationApi, getDestinationApi, getDestinationByIdApi,deleteDestinationApi } from '../../apis/Api';
import AdminSidebar from './AdminSidebar';
import { useNavigate } from 'react-router-dom';

const AdminCountry = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [destinationName, setDestinationName] = useState('');
  const [description, setDescription] = useState('')
  const [district, setDistrict] = useState('');
  const [map, setMap] = useState('')
  const [price, setPrice] = useState('');
  const [destinationImageUrl, setDestinationImageUrl] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await getDestinationApi();
        if (response.data.success) {
          setDestinations(response.data.destinations);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error('Failed to fetch destinations');
        console.error(error);
      }
    };


    fetchDestinations();
  }, []);
  const handleDeleteDestination = async (destinationId) => {
    try {
      const response = await deleteDestinationApi(destinationId);
      
      if (response.data.success) {
        // Filter out the deleted destination from the destinations array
        const updatedDestinations = destinations.filter(dest => dest.id !== destinationId);
        setDestinations(updatedDestinations);
        toast.success('Destination deleted successfully');
      } else {
        toast.error('Failed to delete destination');
      }
    } catch (error) {
      toast.error('Error deleting destination: ' + error.message);
    }
  };

  const handleEditClick = async (destinationId) => {
  
    try {
      const response = await getDestinationByIdApi(destinationId);
      if (response.data.success) {
        navigate(`/editdes/${destinationId}`); // Navigate to the edit page
      } else {
        toast.error('Failed to fetch destination details for editing');
      }
    } catch (error) {
      toast.error('Error fetching destination details: ' + error.message);
    }
  };


  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const handleFileChange = (event) => setDestinationImageUrl(event.target.files[0]);

  const handleAddDestination = async () => {
    if (!destinationName || !district || !price || !destinationImageUrl) {
      console.log('Fields:', { destinationName, district, price, destinationImageUrl });
      toast.error('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('destinationName', destinationName);
    formData.append('district', district);
    formData.append('price', price);
    formData.append('description', description)
    formData.append('destinationImage', destinationImageUrl)
    formData.append('map', map)

    try {
      const response = await createDestinationApi(formData);
      if (response.data.success) {
        toast.success('Destination added successfully');
        setDestinations([...destinations, {
          id: response.data.id,
          destinationName,
          district,
          price,
          destinationImageUrl: URL.createObjectURL(destinationImageUrl)
        }]);
        setIsModalOpen(false);
        setDestinationName('');
        setDistrict('');
        setPrice('');
        setDestinationImageUrl(null);
        setDescription('')
        setMap('')
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to add destination');
      console.error(error);
    }
  };

  return (
    <AdminSidebar>
      <div className="w-full sm:px-6">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Destinations
            </p>
            <div>
              <button
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
                onClick={toggleModal}
              >
                Add Destination
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white px-4 md:px-10 py-5">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">Destination Name</th>
                <th scope="col" className="py-3 px-6">District</th>
                <th scope="col" className="py-3 px-6">Image</th>
                <th scope="col" className="py-3 px-6">Price (NRS)</th>
                <th scope="col" className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((dest) => (
                <tr key={dest.id} className="bg-white border-b">
                  <td className="py-4 px-6">{dest.destinationName}</td>
                  <td className="py-4 px-6">{dest.district}</td>
                  <td className="py-4 px-6"><img src={dest.destinationImageUrl} alt="Destination" className="w-10 h-10 rounded-full" /></td>
                  <td className="py-4 px-6">NRS {dest.price}</td>
                  <td className="py-4 px-6">
                    <FontAwesomeIcon icon={faEdit} onClick={() => handleEditClick(dest._id)} className="text-blue-500 mr-2 cursor-pointer" />
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteDestination(dest._id)} className="text-red-500 cursor-pointer" />
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button onClick={toggleModal} className="text-gray-800 bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                  <span className="sr-only">Close modal</span>X
                </button>
              </div>
              <form className="space-y-6 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">Add New Destination</h3>
                <div>
                  <label htmlFor="destinationName" className="block text-sm font-medium text-gray-700">Destination Name</label>
                  <input
                    type="text"
                    name="destinationName"
                    id="destinationName"
                    className="mt-1 block w-full border-2 border-gray-400 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Enter destination name"
                    value={destinationName}
                    onChange={(e) => setDestinationName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
                  <input
                    type="text"
                    name="district"
                    id="district"
                    className="mt-1 block w-full border-2 border-gray-400 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Enter district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (NRS)</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="mt-1 block w-full border-2 border-gray-400 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea className='mt-1 block w-full border-2 border-gray-400 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm' onChange={(e) => setDescription(e.target.value)}>{description}</textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Map</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-2 border-gray-400 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    onChange={(e) => setMap(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700">Image</label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="flex items-center justify-end">
                  <button type="button" className="bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500 text-white font-bold rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleAddDestination}>Add Destination</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminSidebar>
  );
};

export default AdminCountry;
