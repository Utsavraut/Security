// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
// import { faFacebookF, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white py-10">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row justify-between">
//           {/* Logo and Description */}
//           <div className="mb-8 md:mb-0 md:w-1/3">
//             <div className="flex items-center mb-4">
//               <img src="/path/to/your/logo.png" alt="Logo" className="h-12 mr-3" />
//               <div className="text-2xl font-bold">NEPAL Traveler</div>
//             </div>
//             <p className="mb-4">
//               Duis rutrum nisl urna. Maecenas vel libero faucibus nisi venenatis hendrerit a id lectus. Suspendissendt
//               molestie turpis nec lacinia vehicula.
//             </p>
//             <p className="text-green-500">Working Day: Monday - Friday (9AM - 5PM)</p>


//              {/* Follow Us */}
//         <div className="flex justify-center mt-8">
//           <h4 className="font-semibold mb-4">Follow Us On :</h4>
//           <div className="flex space-x-4 ml-4">
//             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-green-500 p-3 rounded-full hover:bg-green-600">
//               <FontAwesomeIcon icon={faInstagram} />
//             </a>
//             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-green-500 p-3 rounded-full hover:bg-green-600">
//               <FontAwesomeIcon icon={faFacebookF} />
//             </a>
//             <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="bg-green-500 p-3 rounded-full hover:bg-green-600">
//               <FontAwesomeIcon icon={faWhatsapp} />
//             </a>
//           </div>
//         </div>
//           </div>

//           {/* Quick Links */}
//           <div className="mb-8 md:mb-0 md:w-1/3">
//             <h4 className="font-semibold mb-4">Quick Links</h4>
//             <ul>
//               <li className="mb-2"><a href="#" className="hover:underline">Home</a></li>
//               <li className="mb-2"><a href="#" className="hover:underline">Blog</a></li>
//               <li className="mb-2"><a href="#" className="hover:underline">Contact Us</a></li>
//               <li className="mb-2"><a href="#" className="hover:underline">Destination</a></li>
//             </ul>
//           </div>

//           {/* Contact Us */}
//           <div className="mb-8 md:mb-0 md:w-1/3">
//             <h4 className="font-semibold mb-4">Contact Us</h4>
//             <ul>
//               <li className="flex items-center mb-2">
//                 <FontAwesomeIcon icon={faPhone} className="mr-2" />
//                 <span>+977-9803873543</span>
//               </li>
//               <li className="flex items-center mb-2">
//                 <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
//                 <span>info@nepaltraveller.com</span>
//               </li> 
//               <li className="flex items-center">
//                 <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
//                 <span>Satdobato, Laitpur , Nepal</span>
//               </li>
//             </ul>
//           </div>
//         </div>

       

//         {/* Copyright */}
//         <div className="mt-8 text-center text-gray-500">
//           <p>Copyright 2024 Nepal Traveler | Design By Utsav Raut</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start">
        {/* Logo and Description */}
        <div className="flex flex-col mb-6 md:mb-0 md:w-1/4">
          <div className="flex items-center mb-4">
            <img src="/assets/images/logo.png" alt="Logo" className="h-12 mr-3" />
            
          </div>
          <p>
            Duis rutrum nisl urna. Maecenas vel libero faucibus nisi venenatis hendrerit a id lectus. Suspendissendt
            molestie turpis nec lacinia vehicula.
          </p>
          <p className="mt-4 text-green-500">Working Day: Monday - Friday (9AM - 5PM)</p>
        </div>

        {/* Follow Us */}
        <div className="flex flex-col mb-6 md:mb-0 md:w-1/4 items-center md:items-start">
          <h4 className="font-semibold mb-2">Follow Us On:</h4>
          <div className="flex space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-green-500 p-2 rounded-full hover:bg-green-600">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-green-500 p-2 rounded-full hover:bg-green-600">
              <FontAwesomeIcon icon={faFacebookF} size="lg" />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="bg-green-500 p-2 rounded-full hover:bg-green-600">
              <FontAwesomeIcon icon={faWhatsapp} size="lg" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-6 md:mb-0 md:w-1/4">
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul>
            <li><a href="#" className="hover:text-gray-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300">Blog</a></li>
            <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
            <li><a href="#" className="hover:text-gray-300">Destination</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="md:w-1/4">
          <h4 className="font-semibold mb-2">Contact Us</h4>
          <ul>
            <li className="flex items-center mb-2">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              <span>+880-566-1111-985</span>
            </li>
            <li className="flex items-center mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              <span>info@support.com</span>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              <span>168/170, Avenue 01, Mirpur DOHS, Bangladesh</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-gray-500">
        <p>Copyright © 2024 Nepal Traveler | Design By Utsav Raut</p>
      </div>
    </footer>
  );
};

export default Footer;
