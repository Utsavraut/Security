// // import React from "react";
// // import { Outlet, useNavigate } from "react-router-dom";

// // const AdminRoutes = () => {
// //   const admin = JSON.parse(localStorage.getItem("admin"));
// //   const navigate = useNavigate();

// //   if (!admin) {
// //     navigate("/");
// //     return null;
// //   }
// //   return <Outlet />;
// // };

// // export default AdminRoutes;


import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminRoutes = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
  return user!= null && user.isAdmin==true?<Outlet/> : navigate('/login')
} 

export default AdminRoutes
