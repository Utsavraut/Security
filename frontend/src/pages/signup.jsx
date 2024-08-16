

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { toast } from 'react-toastify';
// import { createUserApi } from '../apis/Api';  // Ensure this path is correct

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     userName: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const { userName, email, password, confirmPassword } = formData;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleShowPasswordToggle = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     const dataToSend = {
//       userName,
//       email,
//       password
//     };

//     try {
//       const res = await createUserApi(dataToSend);
//       if (res.data.success) {
//         toast.success('Signup successful!');
//         navigate('/login');  // Adjust if your path is different
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Server error");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-md rounded-lg overflow-hidden flex max-w-4xl">
//         <div className="w-1/2 hidden md:block">
//           <img src="assets/images/signup.png" alt="Signup" className="w-full h-full object-cover" />
//         </div>
//         <div className="w-full md:w-1/2 p-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome To Nepal Traveller👋</h2>
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="userName"
//               value={userName}
//               onChange={handleChange}
//               placeholder="Username"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#54A15D]"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               value={email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#54A15D]"
//               required
//             />
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#54A15D]"
//                 required
//               />
//               <FontAwesomeIcon
//                 icon={showPassword ? faEyeSlash : faEye}
//                 onClick={handleShowPasswordToggle}
//                 className="absolute top-3 right-3 cursor-pointer text-gray-500"
//               />
//             </div>
//             <div className="relative">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               name="confirmPassword"
//               value={confirmPassword}
//               onChange={handleChange}
//               placeholder="Confirm Password"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#54A15D]"
//               required
//             />
//             <FontAwesomeIcon
//                 icon={showPassword ? faEyeSlash : faEye}
//                 onClick={handleShowPasswordToggle}
//                 className="absolute top-3 right-3 cursor-pointer text-gray-500"
//               />
//             </div>
            
//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-[#54A15D] hover:bg-[#54A15D] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#54A15D]"
//             >
//               Sign Up
//             </button>
//           </form>
//           <div className="flex justify-between mt-4">
//             <hr className="w-full border-gray-300" />
//             <span className="px-4 text-gray-500">OR</span>
//             <hr className="w-full border-gray-300" />
//           </div>
//           <div className="space-y-4">
//             <button
//               type="button"
//               className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
//             >
//               <img
//                 src="assets/images/google.png"
//                 alt="Google"
//                 className="w-5 h-5 mr-2"
//               />
//               Sign in with Google
//             </button>
//             <button
//               type="button"
//               className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
//             >
//               <img
//                 src="assets/images/fb.png"
//                 alt="Facebook"
//                 className="w-5 h-5 mr-2"
//               />
//               Sign in with Facebook
//             </button>
//           </div>
//           <p className="text-sm text-center text-gray-500 mt-4">
//             Already have an account? <a href="/login" className="text-[#54A15D] hover:underline">Sign in</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { createUserApi } from '../apis/Api';  // Ensure this path is correct

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const { userName, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === 'password') {
      setPasswordStrength(calculatePasswordStrength(e.target.value));
    }
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[@$!%*?&#]/.test(password)) strength += 1;

    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const dataToSend = {
      userName,
      email,
      password
    };

    try {
      const res = await createUserApi(dataToSend);
      if (res.data.success) {
        toast.success('Signup successful!');
        navigate('/login');  // Adjust if your path is different
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex max-w-4xl">
        <div className="w-1/2 hidden md:block">
          <img src="assets/images/signup.png" alt="Signup" className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome To Nepal Traveller👋</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#54A15D]"
              required
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#54A15D]"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#54A15D]"
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={handleShowPasswordToggle}
                className="absolute top-3 right-3 cursor-pointer text-gray-500"
              />
              <div className="mt-2">
                <div className="w-full h-2 bg-gray-300 rounded">
                  <div
                    className={`h-full rounded ${passwordStrength === 1 ? 'bg-red-500' : ''} ${passwordStrength === 2 ? 'bg-yellow-500' : ''} ${passwordStrength >= 3 ? 'bg-green-500' : ''}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Password strength: {passwordStrength < 3 ? 'Weak' : passwordStrength < 4 ? 'Moderate' : 'Strong'}
                </p>
              </div>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#54A15D]"
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={handleShowPasswordToggle}
                className="absolute top-3 right-3 cursor-pointer text-gray-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#54A15D] hover:bg-[#54A15D] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#54A15D]"
            >
              Sign Up
            </button>
          </form>
          <div className="flex justify-between mt-4">
            <hr className="w-full border-gray-300" />
            <span className="px-4 text-gray-500">OR</span>
            <hr className="w-full border-gray-300" />
          </div>
          <div className="space-y-4">
            <button
              type="button"
              className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
            >
              <img
                src="assets/images/google.png"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </button>
            <button
              type="button"
              className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
            >
              <img
                src="assets/images/fb.png"
                alt="Facebook"
                className="w-5 h-5 mr-2"
              />
              Sign in with Facebook
            </button>
          </div>
          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account? <a href="/login" className="text-[#54A15D] hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
