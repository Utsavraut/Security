import React, { useEffect, useState } from "react";
import { getBookingApi } from "../../apis/Api";
import AdminSidebar from "./AdminSidebar";
import { toast } from "react-toastify";

const AdminMessage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openModal = (id) => {
    setIsModalOpen(true);
    setSelectedId(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  // Mock data for demonstration purposes
  const [allMessages, setAllMessages] = useState([]);

  // Simulate deletion action
  const deleteMessage = (id) => {
    setAllMessages(allMessages.filter(message => message.id !== id));
    closeModal();
  };

  useEffect(() => {
    getBookingApi().then((res) => {
      if (res.data.success) {
        setAllMessages(res?.data?.bookings)
      } else {
        toast.error(res?.data?.message)
      }
    })
  }, [])

  return (
    <AdminSidebar>
      <div className="w-full sm:px-6">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Bookings
            </p>
          </div>
        </div>
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-16 w-full text-sm leading-none text-gray-800">
                <th className="font-medium text-left pl-4">User Name</th>
                <th className="font-medium text-left pl-12">Desination</th>
                <th className="font-medium text-left pl-12">Price</th>
                <th className="font-medium text-left pl-12">DateFrom</th>
                <th className="font-medium text-left pl-12">DateTo</th>
                <th className="font-medium text-left pl-12">Phone</th>
              </tr>
            </thead>
            <tbody>
              {allMessages.map((eachData) => (
                <tr key={eachData.id} className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                  <td className="pl-12">{eachData.userId.userName}</td>
                  <td className="pl-12">{eachData.destinationId.destinationName}</td>
                  <td className="pl-20">{eachData.destinationId.price}</td>
                  <td className="pl-20">{new Date(eachData.datefrom).toLocaleDateString()}</td>
                  <td className="pl-20">{new Date(eachData.dateto).toLocaleDateString()}</td>
                  <td className="pl-20">{eachData.contact}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <h2 className="mb-4">Are you sure you want to delete this message?</h2>
              <button onClick={() => deleteMessage(selectedId)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Confirm
              </button>
              <button onClick={closeModal} className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminSidebar>
  );
};

export default AdminMessage;
