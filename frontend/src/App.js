import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/homepage";
import DescriptionPage from "./pages/description";
import Blogs from "./pages/blogs";
import Dest from "./pages/destination";
import ContactPage from "./pages/contact";
import AdminSidebar from "./pages/admin/AdminSidebar";
import Dashboard from "./pages/admin/Dashboard";
import AdminCountry from "./pages/admin/adddest";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminBooking from "./pages/admin/AdminBooking";
import BookingForm from "./pages/booking";
import ForgotPassword from "./pages/forget";
import ProfilePage from "./pages/profile";
import LandingPage from "./pages/landingpage";
import UserRoutes from "./protected/UserRotes";
import AdminRoutes from "./protected/AdminRoutes";
import EditDestination from './pages/admin/EditDestination';
import About from './pages/Aboutus';
import UserContactPage from './pages/contact';
import AdminContactPage from './pages/admin/ContactPage';

function App() {
  return (
    <Router>
      <ToastContainer />
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const adminRoutes = [
    "/dash",
    "/adminsid",
    "/add",
    "/addblog",
    "/book"
  ];
  const isAdminRoutes = adminRoutes.includes(location.pathname);

  return (
    <>
      {!isAdminRoutes && <Navbar />}

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/desc/:id' element={<DescriptionPage />} />
        <Route path='/blog' element={<Blogs />} />
        <Route path='/dest' element={<Dest />} />
        <Route path='/contact' element={<UserContactPage />} />
        <Route path='/booking/:id' element={<BookingForm />} />
        <Route path='/for' element={<ForgotPassword />} />
        <Route path='/prof' element={<ProfilePage />} />
        <Route path='/about' element={<About />} />

        <Route path='/' element={<LandingPage />} />
        




        <Route element={<AdminRoutes />}>
          <Route path='/adminsid' element={<AdminSidebar />} />
          <Route path='/dash' element={<Dashboard />} />
          <Route path='/adminContact' element={<AdminContactPage/>} />
          <Route path='/add' element={<AdminCountry />} />
          <Route path='/addblog' element={<AdminBlog />} />
          <Route path='/book' element={<AdminBooking />} />
          <Route path='/editdes/:id' element={<EditDestination />} />

        </Route>
      </Routes>

      {!isAdminRoutes && <Footer />}
    </>
  );
}

export default App;
