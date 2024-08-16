// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPhone, faEnvelope, faBars, faTimes, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loggedUser = localStorage.getItem('user');
//     if (loggedUser) {
//       setUser(JSON.parse(loggedUser));
//     }
//   }, []);

//   const handleMobileMenuToggle = () => {
//     setMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const handleProfileClick = () => {
//     navigate('/prof');
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <header>
//       <div className="bg-[#54A15D] py-2">
//         <div className="container mx-auto flex justify-between items-center px-4">
//           <div className="flex space-x-4 text-white">
//             <a href="tel:+1234567890" className="hover:text-gray-300"><FontAwesomeIcon icon={faPhone} /></a>
//             <a href="mailto:info@example.com" className="hover:text-gray-300"><FontAwesomeIcon icon={faEnvelope} /></a>
//             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300"><FontAwesomeIcon icon={faFacebookF} /></a>
//             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300"><FontAwesomeIcon icon={faInstagram} /></a>
//           </div>
//           <div className="flex items-center space-x-4">
//             {user ? (
//               <>
//                 <FontAwesomeIcon icon={faUserCircle} className="text-white cursor-pointer" onClick={handleProfileClick} size="lg" />
//                 <span className="hover:text-gray-300 cursor-pointer text-sm md:text-base font-semibold" onClick={handleProfileClick}>{user.userName}</span>
//                 <FontAwesomeIcon icon={faSignOutAlt} className="text-white cursor-pointer ml-2" onClick={handleLogout} size="lg" />
//               </>
//             ) : (
//               <>
//                 <a href="/login" className="hover:text-gray-300">Login</a>
//                 <span className="text-white">|</span>
//                 <a href="/signup" className="hover:text-gray-300">Signup</a>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="bg-white shadow-md">
//         <div className="container mx-auto flex justify-between items-center py-2 px-4">
//           <div className="flex items-center">
//             <img src="/assets/images/logo.png" alt="Logo" className="h-16 w-48 object-cover" />
//           </div>
//           <nav className="hidden md:flex space-x-8">
//             <Link to="/home" className="text-[#54A15D] font-semibold">HOME</Link>
//             <Link to="/about" className="text-gray-800 hover:text-[#54A15D]">ABOUT US</Link>
//             <Link to="/dest" className="text-gray-800 hover:text-[#54A15D]">DESTINATION</Link>
//             <Link to="/blog" className="text-gray-800 hover:text-[#54A15D]">BLOG</Link>
//             <Link to="/contact " className="text-gray-800 hover:text-[#54A15D]">CONTACT US</Link>
//           </nav>
//           <div className="md:hidden">
//             <button onClick={handleMobileMenuToggle} className="text-gray-800 focus:outline-none">
//               <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
//             </button>
//           </div>
//         </div>
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-white shadow-md">
//             <nav className="flex flex-col space-y-2 p-4">
//               <a href="#" className="text-green-500 font-semibold">HOME</a>
//               <a href="#" className="text-gray-800 hover:text-green-500">ABOUT US</a>
//               <a href="#" className="text-gray-800 hover:text-green-500">DESTINATION</a>
//               <a href="#" className="text-gray-800 hover:text-green-500">BLOG</a>
//               <a href="#" className="text-gray-800 hover:text-green-500">CONTACT US</a>
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faBars, faTimes, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleProfileClick = () => {
    navigate('/prof');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  if (user && user.isAdmin === true) {
    return;
  }

  return (
    <header>
      <div className="bg-[#54A15D] py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex space-x-4 text-white">
            <a href="tel:+1234567890" className="hover:text-gray-300"><FontAwesomeIcon icon={faPhone} /></a>
            <a href="mailto:info@example.com" className="hover:text-gray-300"><FontAwesomeIcon icon={faEnvelope} /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <FontAwesomeIcon icon={faUserCircle} className="text-white cursor-pointer" onClick={handleProfileClick} size="lg" />
                <span className="hover:text-gray-300 cursor-pointer text-sm md:text-base font-semibold" onClick={handleProfileClick}>{user.userName}</span>
                <FontAwesomeIcon icon={faSignOutAlt} className="text-white cursor-pointer ml-2" onClick={handleLogout} size="lg" />
              </>
            ) : (
              <>
                <a href="/login" className="hover:text-gray-300">Login</a>
                <span className="text-white">|</span>
                <a href="/signup" className="hover:text-gray-300">Signup</a>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-2 px-4">
          <div className="flex items-center">
            <img src="/assets/images/logo.png" alt="Logo" className="h-16 w-48 object-cover" />
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/home" className={`${location.pathname === '/home' ? 'text-[#54A15D] font-bold' : 'text-black'}`}>HOME</Link>
            <Link to="/about" className={`${location.pathname === '/about' ? 'text-[#54A15D] font-bold' : 'text-black'} hover:text-[#54A15D]`}>ABOUT US</Link>
            <Link to="/dest" className={`${location.pathname === '/dest' ? 'text-[#54A15D] font-bold' : 'text-black'} hover:text-[#54A15D]`}>DESTINATION</Link>
            <Link to="/blog" className={`${location.pathname === '/blog' ? 'text-[#54A15D] font-bold' : 'text-black'} hover:text-[#54A15D]`}>BLOG</Link>
            <Link to="/contact" className={`${location.pathname === '/contact' ? 'text-[#54A15D] font-bold' : 'text-black'} hover:text-[#54A15D]`}>CONTACT US</Link>
          </nav>
          <div className="md:hidden">
            <button onClick={handleMobileMenuToggle} className="text-gray-800 focus:outline-none">
              <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <nav className="flex flex-col space-y-2 p-4">
              <Link to="/home" className={`${location.pathname === '/home' ? 'text-[#54A15D] font-bold' : 'text-black'}`}>HOME</Link>
              <Link to="/about" className={`${location.pathname === '/about' ? 'text-[#54A15D] font-bold' : 'text-black'} hover:text-[#54A15D]`}>ABOUT US</Link>
              <Link to="/dest" className={`${location.pathname === '/dest' ? 'text-[#54A15D] font-bold' : 'text-black'} hover:text-[#54A15D]`}>DESTINATION</Link>
              <Link to="/blog" className={`${location.pathname === '/blog' ? 'text-[#54A15D] font-bold' : 'text-black'} hover:text-[#54A15D]`}>BLOG</Link>
              <Link to="/contact" className={`${location.pathname === '/contact' ? 'text-[#54A15D] font-bold' : 'text-black'} hover:text-[#54A15D]`}>CONTACT US</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
