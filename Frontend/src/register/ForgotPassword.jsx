import React, { useState } from 'react';
import {EyeClosed, Eye} from "lucide-react";
import {Link, useNavigate} from "react-router";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

// The main App component containing the registration form.
const ForgotPassword = () => {
  const navigate = useNavigate();
    const api = import.meta.env.VITE_BACKEND_API;
    // console.log(api);
  // State to hold form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // State for form validation errors
  const [errors, setErrors] = useState({});
  // State to track successful submission
  const [submissionStatus, setSubmissionStatus] = useState(null);
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input changes and update form data state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //Basic validation for the form fields
  const validateForm = () => {
    const newErrors = {};
    // if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } 
    // if (formData.password !== formData.confirmPassword) {
    //   newErrors.confirmPassword = 'Passwords do not match.';
    // }

    setErrors(newErrors);
    console.log("new errors",newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const submitForm = async ()=>{
    const backend = import.meta.env.VITE_BACKEND_API
    console.log("submiting form");
    try{
    const response = await axios.put(`${backend}/user/forgotpassword`,formData);
    if(response.status === 201){
        navigate('/login');
    }
    }catch(err){
        console.log("response :",err.response.data.message);
        const newError={};
        newError.email=err.response.data.message;
        newError.password= "";
        setErrors(newError);
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handling submit",formData);
    setSubmissionStatus(null); // Reset submission status

    if (validateForm()) {
      submitForm();
      // Clear the form after successful submission
      setFormData({
        email: '',
        password: '',
      });
      setErrors({});
    } else {
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Change Password</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors 
              ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 mt-8 px-3 py-2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <EyeClosed/> : <Eye/>}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Submission Status Message */}
          {submissionStatus === 'success' && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl relative">
              <span className="block sm:inline">Registration successful!</span>
            </div>
          )}

          {submissionStatus === 'error' && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative">
              <span className="block sm:inline">Please correct the errors and try again.</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-xl transition-colors duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
