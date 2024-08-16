// AdminSidebar.jsx
import {
    faBlog,
    faBook,
    faCalendarAlt,
    faComments,
    faEnvelope,
    faGlobe,
    faInfoCircle,
    faList,
    faMessage,
    faPhotoFilm,
    faSignOutAlt,
    faTachometerAlt,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import React from "react";
  import { Link } from "react-router-dom";
  
  const AdminSidebar = ({ children }) => {
    const handleLogout = (e) => {
      e.preventDefault();
      localStorage.clear();
      window.location.href = "/";
    };
  
    const sidebarItems = [
      { path: "/dash", label: "Dashboard", icon: faTachometerAlt },
      { path: "/add", label: "Destinations", icon: faGlobe },
      { path: "/book", label: "Bookings", icon: faComments },
      { path: "/adminContact", label: "Contact", icon: faList },
      { path: "/admin-blogs", label: "Blogs", icon: faBlog },
      { path: "/logout", label: "Log Out", icon: faSignOutAlt },
    ];
  
    return (
      <>
        <div className="flex flex-row">
          <div className="w-64 min-h-screen bg-[#54A15D] text-black">
            <div className="flex items-center justify-center h-20 shadow-md">
              <h1 className="text-3xl uppercase font-bold">Nepal traveller</h1>
            </div>
            <ul className="py-4">
              {sidebarItems.map((item, index) => (
                <li
                  key={index}
                  className="pl-6 cursor-pointer py-2 hover:bg-[#ffffff]"
                >
                  <Link to={item.path} onClick={item.path === "/logout" ? handleLogout : "Log Out"}>
                    <FontAwesomeIcon icon={item.icon} className="mr-2" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
  
          <div className="w-full">{children}</div>
        </div>
      </>
    );
  };
  
  export default AdminSidebar;
  