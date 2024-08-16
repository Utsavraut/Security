import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getContactApi } from "../../apis/Api";
import AdminSidebar from "./AdminSidebar";

const AdminContactPage = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await getContactApi();
      if (response.data.success) {
        setContacts(response.data.contacts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching contacts: " + error.message);
    }
  };

  return (
    <AdminSidebar>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">All Contacts</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {contact.name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {contact.email}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {contact.contact}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {contact.subject}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {contact.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default AdminContactPage;
