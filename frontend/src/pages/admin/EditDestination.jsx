import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDestinationByIdApi, updateDestinationApi } from '../../apis/Api';

const EditDestination = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState({
    destinationName: '',
    district: '',
    price: '',
    map: '',
    description:'',
    destinationImageUrl: '',
  });
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    getDestinationByIdApi(id).then((res) => {
      if (res.data.success) {
        setDestination(res.data.destination);
        setImage(res.data.destination.destinationImageUrl);
      } else {
        toast.error("Could not fetch destination details.");
        navigate('/admin-country');
      }
    });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDestination({ ...destination, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('destinationName', destination.destinationName);
    formData.append('district', destination.district);
    formData.append('price', destination.price);
    formData.append('description', destination.description);
    formData.append('map', destination.map);
    if (imageFile) {
      formData.append('destinationImageUrl', imageFile);
    }

    updateDestinationApi(id, formData)
      .then((response) => {
        if (response.data.success) {
          toast.success("Destination updated successfully.");
          navigate('/add');
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(error => toast.error("Error updating destination: " + error.message));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-1/3 shadow-lg rounded-md bg-white">
        <form className="space-y-6 p-4" onSubmit={handleSubmit}>
          <h3 className="text-center text-2xl font-semibold">Edit Destination</h3>
          <input type="text" name="destinationName" value={destination.destinationName} onChange={handleChange} placeholder="Destination Name" className="w-full p-2 border rounded" required />
          <input type="text" name="district" value={destination.district} onChange={handleChange} placeholder="District" className="w-full p-2 border rounded" required />
          <input type="number" name="price" value={destination.price} onChange={handleChange} placeholder="Price (NRS)" className="w-full p-2 border rounded" required />
          <input type="text" name="map" value={destination.map} onChange={handleChange} placeholder="Google Maps URL" className="w-full p-2 border rounded" />
          <input type="text" name="description" value={destination.description} onChange={handleChange} placeholder="Google Maps URL" className="w-full p-2 border rounded" />

          <div>
            <label htmlFor="destinationImage" className="block text-sm font-medium text-gray-900">Destination Image</label>
            <input type="file" onChange={handleImageChange} accept="image/*" className="w-full p-2 border rounded" />
            {image && <img src={image} alt="Preview" className="mt-2 w-32 h-32 rounded" />}
          </div>
          <button type="submit" className="w-full bg-[#54A15D] hover:bg-green-700 text-white py-2 px-4 rounded">Update Destination</button>
        </form>
      </div>
    </div>
  );
};

export default EditDestination;
