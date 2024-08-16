import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginUserApi } from "../apis/Api";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
 
  const Validate = () => {
    let isValid = true;
    setUserNameError('');
    setPasswordError('');
 
    if (userName.trim() === "") {
      setUserNameError("UserName is Required");
      isValid = false;
    }
    if (password.trim() === "") {
      setPasswordError("Password is Required");
      isValid = false;
    }
    return isValid;
  }

  const changeUserName = (e) => {
    setUserName(e.target.value);
  };
  
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Validate()) {
      return;
    }
    const data = { userName, password };
    loginUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.userData));
        navigate(res.data.userData.isAdmin ? "/dash" : "/home");
        window.location.reload();
      }
    }).catch((err) => {
      toast.error("Server Error");
      console.error(err.message);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex max-w-4xl">
        <div className="w-1/2 hidden md:block">
          <img src="assets/images/login.png" alt="Nature" className="w-full h-full object-cover"/>
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back 👋</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Username</label>
              <input type="text" placeholder="Enter your username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#54A15D]"
                value={userName} onChange={changeUserName} />
              {userNameError && <p className='text-red-500 text-sm'>{userNameError}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#54A15D]"
                  value={password} onChange={changePassword} />
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 top-3 text-gray-500 cursor-pointer"/>
              </div>
              {passwordError && <p className='text-red-500 text-sm'>{passwordError}</p>}
            </div>
            <div className="flex justify-between items-center">
              <Link to={'/forgetpassword'} className="text-sm text-[#54A15D] hover:underline">Forgot Password?</Link>
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-[#54A15D] hover:bg-[#54A15D] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-400">
              Sign In
            </button>
          </form>
          <div className="my-6 flex items-center justify-center">
            <hr className="w-full border-gray-300"/>
            <span className="absolute bg-white px-4 text-gray-500">OR</span>
          </div>
          <div className="space-y-4">
            <button type="button" className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">
              <img src="assets/images/google.png" alt="Google" className="w-5 h-5 mr-2"/>
              Sign in with Google
            </button>
            <button type="button" className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">
              <img src="assets/images/fb.png" alt="Facebook" className="w-5 h-5 mr-2"/>
              Sign in with Facebook
            </button>
          </div>
          <p className="text-sm text-center text-gray-500 mt-4">
            Don’t have an Account? <Link to={'/signup'} className="text-[#54A15D] hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
 
export default Login;
