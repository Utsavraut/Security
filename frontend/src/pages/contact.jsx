// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import { contactUsApi } from '../apis/Api'; // Ensure you have this function in your API file

// const UserContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     contact: '',
//     subject: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await contactUsApi(formData);
//       if (response.data.success) {
//         toast.success(response.data.message);
//         setFormData({
//           name: '',
//           email: '',
//           contact: '',
//           subject: '',
//           message: ''
//         });
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error('Error submitting contact form: ' + error.message);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4">
//       {/* Header with background image */}
//       <div className="w-full text-white py-10 px-4 text-center bg-cover bg-center" style={{ backgroundImage: "url('assets/images/condo.png')", height: '300px', marginBottom: '20px' }}>
//       </div>

//       {/* Section for Contact Form and Map */}
//       <div className="flex flex-wrap md:flex-nowrap gap-4">
//         {/* Contact Form */}
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
//           <h2 className="text-2xl font-semibold mb-6">Get in touch with us</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Your name"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Your email"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
//               <input
//                 type="text"
//                 id="contact"
//                 name="contact"
//                 value={formData.contact}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Your contact number"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
//               <input
//                 type="text"
//                 id="subject"
//                 name="subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Subject"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
//               <textarea
//                 id="message"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 rows="4"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Your message"
//                 required
//               ></textarea>
//             </div>
//             <button type="submit" className="w-full bg-[#54A15D] text-white py-2 px-4 rounded hover:bg-[#54A15D]">Send Message</button>
//           </form>
//         </div>

//         {/* Map Embed */}
//         <div className="w-full md:w-1/2">
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.507096028314!2d85.32496041506182!3d27.68702298280124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190954004713%3A0xbaf344120520a16c!2sLittle%20Angels%27%20College!5e0!3m2!1sen!2snp!4v1655214079958!5m2!1sen!2snp"
//             style={{ width: '100%', height: '450px', border: 0 }}
//             allowFullScreen="" 
//             loading="lazy" 
//             referrerPolicy="no-referrer-when-downgrade"
//           ></iframe>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserContactPage;

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import { contactUsApi } from '../apis/Api'; // Ensure you have this function in your API file

const UserContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitize form data
    const sanitizedData = {
      name: DOMPurify.sanitize(formData.name),
      email: DOMPurify.sanitize(formData.email),
      contact: DOMPurify.sanitize(formData.contact),
      subject: DOMPurify.sanitize(formData.subject),
      message: DOMPurify.sanitize(formData.message),
    };

    // Ensure message is not empty after sanitization
    if (!sanitizedData.message.trim()) {
      toast.error('Message is required.');
      return;
    }

    try {
      const response = await contactUsApi(sanitizedData);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          name: '',
          email: '',
          contact: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error submitting contact form: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Header with background image */}
      <div className="w-full text-white py-10 px-4 text-center bg-cover bg-center" style={{ backgroundImage: "url('assets/images/condo.png')", height: '300px', marginBottom: '20px' }}>
      </div>

      {/* Section for Contact Form and Map */}
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-6">Get in touch with us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your contact number"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Subject"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your message"
                required
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-[#54A15D] text-white py-2 px-4 rounded hover:bg-[#54A15D]">Send Message</button>
          </form>
        </div>

        {/* Map Embed */}
        <div className="w-full md:w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.507096028314!2d85.32496041506182!3d27.68702298280124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190954004713%3A0xbaf344120520a16c!2sLittle%20Angels%27%20College!5e0!3m2!1sen!2snp!4v1655214079958!5m2!1sen!2snp"
            style={{ width: '100%', height: '450px', border: 0 }}
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default UserContactPage;
